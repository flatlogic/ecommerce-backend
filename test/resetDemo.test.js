const assert = require('assert');
const path = require('path');
const { Sequelize } = require('sequelize');
const resetDemo = require('../src/db/resetDemo');

// Supply DEMO_RESET_TEST_SOCKET to run against a local PostgreSQL cluster.
// The test user needs CREATEDB. All fixtures live inside a fresh database.
const socket = process.env.DEMO_RESET_TEST_SOCKET;
const tables = [
  'users', 'brands', 'categories', 'products', 'blogs', 'orders', 'payments',
  'feedbacks', 'files', 'blogsCategoriesCategories', 'blogsMore_blogsBlogs',
  'productsCategoriesCategories', 'productsMore_productsProducts', 'usersWishlistProducts',
];

(socket ? describe : describe.skip)('hourly demo reset on PostgreSQL', function () {
  this.timeout(15000);
  const name = 'ecommerce_demo_reset_test_' + process.pid;
  let admin, db, created = false;

  before(async function () {
    assert(path.isAbsolute(socket), 'DEMO_RESET_TEST_SOCKET must be a local socket directory');
    const user = process.env.DEMO_RESET_TEST_USER || process.env.USER;
    const options = { dialect: 'postgres', host: socket, logging: false };
    admin = new Sequelize('postgres', user, '', options);
    await admin.query('CREATE DATABASE "' + name + '"');
    created = true;
    db = new Sequelize(name, user, '', options);
    await db.query('CREATE SCHEMA demo_baseline');
    for (const table of tables) {
      // Deliberately vary column order and use the real users self-reference.
      await db.query('CREATE TABLE public."' + table + '" (' +
        'id integer PRIMARY KEY, owner_id integer REFERENCES public.users(id), label text NOT NULL)');
      await db.query('CREATE TABLE demo_baseline."' + table + '" (' +
        'label text NOT NULL, id integer PRIMARY KEY, owner_id integer)');
      if (table === 'users') {
        await db.query("INSERT INTO demo_baseline.users VALUES ('first', 1, 2), ('second', 2, 1)");
      } else {
        const count = table === 'products' ? 9 : 1;
        await db.query('INSERT INTO demo_baseline."' + table + '"' +
          " SELECT 'label-' || n, n, 1 FROM generate_series(1, " + count + ') n');
      }
    }
    await db.query('CREATE TABLE public.untouched (value integer)');
    await db.query('INSERT INTO public.untouched VALUES (17)');
  });

  after(async function () {
    if (db) await db.close();
    if (created) await admin.query('DROP DATABASE "' + name + '"');
    if (admin) await admin.close();
  });

  it('copies every named field, removes demo edits and leaves other tables alone', async function () {
    assert.strictEqual(await resetDemo(db), 'restored');
    await db.query("INSERT INTO public.categories VALUES (42, 1, 'demo edit')");
    await db.query("UPDATE public.products SET label = 'demo edit'");
    assert.strictEqual(await resetDemo(db), 'restored');
    for (const table of tables) {
      const fields = 'SELECT id, label, owner_id FROM ';
      const [actual] = await db.query(fields + 'public."' + table + '" ORDER BY id');
      const [expected] = await db.query(fields + 'demo_baseline."' + table + '" ORDER BY id');
      assert.deepStrictEqual(actual, expected, table);
    }
    const [rows] = await db.query('SELECT value FROM public.untouched');
    assert.deepStrictEqual(rows, [{ value: 17 }]);
  });

  it('skips an overlapping reset without waiting or modifying data', async function () {
    await db.transaction(async transaction => {
      await db.query("SELECT pg_advisory_xact_lock(hashtext(current_database()), " +
        "hashtext('ecommerce.hourly-demo-reset'))", { transaction });
      assert.strictEqual(await resetDemo(db), 'skipped');
    });
  });

  it('rolls back changes after a late constraint failure and reports only the table and code', async function () {
    await resetDemo(db);
    await db.query("UPDATE public.products SET label = 'keep me' WHERE id = 1");
    await db.query('UPDATE demo_baseline."usersWishlistProducts" SET owner_id = 9999');
    try {
      await assert.rejects(() => resetDemo(db), {
        message: 'restoring usersWishlistProducts (SQLSTATE 23503)',
      });
      const [rows] = await db.query('SELECT label FROM public.products WHERE id = 1');
      assert.deepStrictEqual(rows, [{ label: 'keep me' }]);
    } finally {
      await db.query('UPDATE demo_baseline."usersWishlistProducts" SET owner_id = 1');
    }
  });

  it('rejects an incomplete baseline or a changed column type', async function () {
    await db.query('DELETE FROM demo_baseline.products WHERE id = 9');
    try {
      await assert.rejects(() => resetDemo(db), /two users and nine products/);
    } finally {
      await db.query("INSERT INTO demo_baseline.products VALUES ('label-9', 9, 1)");
    }
    await db.query('ALTER TABLE demo_baseline.brands ALTER COLUMN label TYPE varchar(25)');
    try {
      await assert.rejects(() => resetDemo(db), /baseline columns differ for brands/);
    } finally {
      await db.query('ALTER TABLE demo_baseline.brands ALTER COLUMN label TYPE text');
    }
  });

  it('rejects a foreign key that could cascade to an unrelated table', async function () {
    await db.query('CREATE TABLE public.external_reference (id integer REFERENCES public.users(id) ON DELETE CASCADE)');
    try {
      await assert.rejects(() => resetDemo(db), /outside the reset list/);
    } finally {
      await db.query('DROP TABLE public.external_reference');
    }
  });
});
