-- LIKE includes nullability, defaults, unique/primary keys and checks, but omits foreign keys.
SET LOCAL search_path TO demo_baseline, pg_catalog;
DO $$
DECLARE
    fk record;
    expected record;
    actual bigint;
BEGIN
    FOR fk IN SELECT c.relname, k.conname, pg_get_constraintdef(k.oid) AS definition
      FROM pg_constraint k JOIN pg_class c ON c.oid = k.conrelid
      WHERE c.relnamespace = 'public'::regnamespace AND k.contype = 'f'
    LOOP
        EXECUTE format('ALTER TABLE demo_baseline.%I ADD CONSTRAINT %I %s',
            fk.relname, fk.conname, replace(fk.definition, 'REFERENCES public.', 'REFERENCES demo_baseline.'));
    END LOOP;
    FOR expected IN SELECT * FROM (VALUES
        ('blogs',4), ('blogsCategoriesCategories',0), ('blogsMore_blogsBlogs',0),
        ('brands',4), ('categories',7), ('feedbacks',4), ('files',38), ('orders',0),
        ('payments',0), ('products',9), ('productsCategoriesCategories',9),
        ('productsMore_productsProducts',0), ('users',2), ('usersWishlistProducts',0)
    ) AS t(name, n)
    LOOP
        EXECUTE format('SELECT count(*) FROM demo_baseline.%I', expected.name) INTO actual;
        IF actual <> expected.n THEN RAISE EXCEPTION 'Wrong fixture count for %', expected.name; END IF;
    END LOOP;
    IF EXISTS (
        SELECT * FROM users EXCEPT SELECT * FROM public.users WHERE id IN
            ('7facf8cc-0af5-448a-a17c-84bbf22f2ded', '7facf8cc-0af5-448a-a17c-84bbf22f2de6')
    ) OR (SELECT count(*) FROM users WHERE "deletedAt" IS NULL AND role = 'admin' AND NOT disabled) <> 1
      OR (SELECT count(*) FROM users WHERE "deletedAt" IS NOT NULL AND role = 'user') <> 1
      OR EXISTS (SELECT FROM users WHERE "emailVerificationToken" IS NOT NULL OR "passwordResetToken" IS NOT NULL)
    THEN RAISE EXCEPTION 'Archived seed account state does not match expected account state'; END IF;
    IF EXISTS (SELECT FROM products p LEFT JOIN brands b ON p."brandId" = b.id WHERE b.id IS NULL)
       OR EXISTS (SELECT FROM "productsCategoriesCategories" j
                  LEFT JOIN products p ON j."productId" = p.id LEFT JOIN categories c ON j."categoryId" = c.id
                  WHERE p.id IS NULL OR c.id IS NULL)
       OR EXISTS (SELECT FROM files f
                  LEFT JOIN (SELECT 'products' AS kind,id FROM products UNION ALL SELECT 'users',id FROM users
                             UNION ALL SELECT 'blogs',id FROM blogs UNION ALL SELECT 'feedbacks',id FROM feedbacks) owners
                  ON owners.kind = f."belongsTo" AND owners.id = f."belongsToId"
                  WHERE owners.id IS NULL OR f."publicUrl" IS DISTINCT FROM f."privateUrl"
                  OR f."publicUrl" NOT LIKE 'https://flatlogic-ecommerce-backend.flatlogic.com/images/%')
       OR EXISTS (SELECT FROM products p WHERE NOT EXISTS (SELECT FROM files f WHERE
                  f."belongsTo" = 'products' AND f."belongsToColumn" = 'image' AND f."belongsToId" = p.id))
    THEN RAISE EXCEPTION 'Broken seed catalog associations or unsupported asset origin'; END IF;
END $$;

REVOKE ALL ON ALL TABLES IN SCHEMA demo_baseline FROM PUBLIC, ecommerce;
GRANT USAGE ON SCHEMA demo_baseline TO ecommerce;
GRANT SELECT ON ALL TABLES IN SCHEMA demo_baseline TO ecommerce;
DO $$
BEGIN
    IF has_schema_privilege('ecommerce','demo_baseline','CREATE') OR EXISTS (
        SELECT FROM pg_class WHERE relnamespace = 'demo_baseline'::regnamespace AND relkind = 'r'
        AND (relowner <> 'postgres'::regrole OR NOT has_table_privilege('ecommerce',oid,'SELECT')
             OR has_table_privilege('ecommerce',oid,'INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER'))
    ) THEN RAISE EXCEPTION 'Unsafe baseline privileges'; END IF;
END $$;
COMMIT;
