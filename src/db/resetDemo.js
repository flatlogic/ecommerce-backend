const tables = [
  'users', 'brands', 'categories', 'products', 'blogs', 'orders', 'payments',
  'feedbacks', 'files', 'blogsCategoriesCategories', 'blogsMore_blogsBlogs',
  'productsCategoriesCategories', 'productsMore_productsProducts', 'usersWishlistProducts',
];

function identifier(name) {
  return '"' + name.replace(/"/g, '""') + '"';
}

function tableList(schema) {
  return tables.map(name => 'ONLY ' + schema + '.' + identifier(name)).join(', ');
}

class DemoResetError extends Error {}

async function resetDemo(sequelize) {
  let stage = 'opening transaction';
  try {
    return await sequelize.transaction({ logging: false }, async transaction => {
      const options = { transaction, logging: false };
      await sequelize.query("SET LOCAL lock_timeout = '5s'", options);
      await sequelize.query("SET LOCAL statement_timeout = '30s'", options);
      stage = 'acquiring reset lock';
      const [lock] = await sequelize.query(
        "SELECT pg_try_advisory_xact_lock(hashtext(current_database()), hashtext('ecommerce.hourly-demo-reset')) AS acquired",
        options
      );
      if (!lock[0].acquired) return 'skipped';

      // Readers retain their MVCC snapshot while API writes wait for the restore.
      stage = 'locking live tables';
      await sequelize.query('LOCK TABLE ' + tableList('public') + ' IN SHARE ROW EXCLUSIVE MODE', options);
      stage = 'locking baseline tables';
      await sequelize.query('LOCK TABLE ' + tableList('demo_baseline') + ' IN ACCESS SHARE MODE', options);

      stage = 'validating reset scope';
      const catalogOptions = { ...options, replacements: { tables } };
      const [externalReferences] = await sequelize.query(`
        SELECT 1
        FROM pg_constraint fk
        JOIN pg_class parent ON parent.oid = fk.confrelid
        JOIN pg_namespace parent_ns ON parent_ns.oid = parent.relnamespace
        JOIN pg_class child ON child.oid = fk.conrelid
        JOIN pg_namespace child_ns ON child_ns.oid = child.relnamespace
        WHERE fk.contype = 'f' AND parent_ns.nspname = 'public' AND parent.relname IN (:tables)
          AND NOT (child_ns.nspname = 'public' AND child.relname IN (:tables))
        LIMIT 1`, catalogOptions);
      if (externalReferences.length) {
        throw new DemoResetError('a table outside the reset list references live demo data');
      }

      stage = 'validating baseline columns';
      const [shapes] = await sequelize.query(`
        SELECT ns.nspname AS schema_name, rel.relname AS table_name,
               json_agg(json_build_array(col.attname, col.atttypid, col.atttypmod, col.attcollation)
                        ORDER BY col.attname COLLATE "C") AS columns
        FROM pg_attribute col
        JOIN pg_class rel ON rel.oid = col.attrelid
        JOIN pg_namespace ns ON ns.oid = rel.relnamespace
        WHERE ns.nspname IN ('public', 'demo_baseline') AND rel.relname IN (:tables)
          AND rel.relkind = 'r' AND col.attnum > 0 AND NOT col.attisdropped
        GROUP BY ns.nspname, rel.relname`, catalogOptions);
      const columns = new Map();
      for (const name of tables) {
        const target = shapes.find(row => row.schema_name === 'public' && row.table_name === name);
        const source = shapes.find(row => row.schema_name === 'demo_baseline' && row.table_name === name);
        if (!target || !source || JSON.stringify(target.columns) !== JSON.stringify(source.columns)) {
          throw new DemoResetError('baseline columns differ for ' + name);
        }
        columns.set(name, target.columns.map(column => identifier(column[0])).join(', '));
      }

      stage = 'validating baseline counts';
      const [counts] = await sequelize.query(`
        SELECT (SELECT count(*) FROM ONLY demo_baseline.users) = 2
           AND (SELECT count(*) FROM ONLY demo_baseline.products) = 9 AS ready`, options);
      if (!counts[0].ready) {
        throw new DemoResetError('baseline must contain two users and nine products');
      }

      for (const name of tables.slice().reverse()) {
        stage = 'clearing ' + name;
        await sequelize.query('DELETE FROM ONLY public.' + identifier(name), options);
      }
      for (const name of tables) {
        stage = 'restoring ' + name;
        const fields = columns.get(name);
        const table = identifier(name);
        await sequelize.query('INSERT INTO public.' + table + ' (' + fields + ') ' +
          'SELECT ' + fields + ' FROM ONLY demo_baseline.' + table, options);
      }
      stage = 'committing reset';
      return 'restored';
    });
  } catch (error) {
    if (error instanceof DemoResetError) throw error;
    // Database messages and error.detail may contain complete row values.
    const code = error.original && error.original.code;
    const suffix = /^[A-Z0-9]{5}$/.test(code) ? ' (SQLSTATE ' + code + ')' : '';
    throw new DemoResetError(stage + suffix);
  }
}

module.exports = resetDemo;
