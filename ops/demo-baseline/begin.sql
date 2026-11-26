BEGIN;
SET LOCAL standard_conforming_strings = on;
CREATE SCHEMA demo_baseline AUTHORIZATION postgres;
REVOKE ALL ON SCHEMA demo_baseline FROM PUBLIC;
DO $$
DECLARE
    name text;
    tables text[] := ARRAY['blogs', 'blogsCategoriesCategories', 'blogsMore_blogsBlogs',
        'brands', 'categories', 'feedbacks', 'files', 'orders', 'payments', 'products',
        'productsCategoriesCategories', 'productsMore_productsProducts', 'users', 'usersWishlistProducts'];
BEGIN
    IF (SELECT array_agg(tablename::text ORDER BY tablename COLLATE "C")
        FROM pg_tables WHERE schemaname = 'public') IS DISTINCT FROM tables THEN
        RAISE EXCEPTION 'Unexpected set of application tables. Review the baseline mapping.';
    END IF;
    FOREACH name IN ARRAY tables LOOP
        EXECUTE format('CREATE TABLE demo_baseline.%I (LIKE public.%I INCLUDING ALL)', name, name);
    END LOOP;
END $$;

-- These UUIDs identify the original accounts in the backend's admin-user seeder.
-- Use the exact archived rows, including the soft-deleted state and credentials.
INSERT INTO demo_baseline.users SELECT * FROM public.users
WHERE id IN ('7facf8cc-0af5-448a-a17c-84bbf22f2ded', '7facf8cc-0af5-448a-a17c-84bbf22f2de6');
