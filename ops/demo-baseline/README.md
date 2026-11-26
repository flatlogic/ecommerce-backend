# Optional hourly reset for the public ecommerce demo

The backend schedules the reset at the top of each UTC hour when `DEMO_RESET_HOURLY=true`. Leave the setting unset on regular installations. To disable a running scheduler, set `DEMO_RESET_HOURLY=false` in the deployment configuration and recreate the backend container.

## Prepare the baseline

On the operator host, restore the full pre-reset database backup into an isolated PostgreSQL 12 container named `ecommerce-reset-qa-*` with Docker network mode `none`. Use a snapshot with the two original seed accounts in their expected state. Keep the full backup and verify that it restores before changing the public demo.

Create the baseline from the isolated clone and the exact backend image used for the demo. Save the archive in a root-owned directory with mode 0700. Supply a new archive filename.

```sh
./ops/demo-baseline/prepare.sh "$isolated_clone" "$backend_image_sha256" "$archive"
```

The script copies the two account rows directly inside PostgreSQL. It preserves the active admin and the soft-deleted user, including their existing authentication fields. The seven catalog seeders supply 9 products, 4 brands, 7 categories, 4 blogs, 4 feedback records, 9 product/category links and 38 bundled file references. Orders, payments, wishlists and the remaining relation tables start empty. The seeders generate new file IDs and timestamps each time a baseline is built. Recover from the saved archive to retain those exact values.

The script checks counts, native constraints, catalog links, ownership and permissions. It verifies the bundled image files in the image and requests each distinct asset from the public HTTPS backend. It outputs the SHA-256 of a PostgreSQL custom-format archive containing only `demo_baseline`. This archive contains the seed account credentials. Its file mode is 0600. Keep it and the full database backup in protected operator storage.

## Restore and enable

First verify the archive by restoring it into a second isolated database with the same public schema and enum types. Compare counts and schema permissions there. Before installing the baseline on the public demo, disable the scheduler and confirm that a current full rollback backup is available.

On the database host, verify the stored SHA-256 and inspect the archive table of contents with `pg_restore --list`. For the following commands, set `pg_container` to the intended PostgreSQL container and `archive` to the verified local backup path. Run in a shell with `set -e`.

```sh
test "$(docker exec "$pg_container" psql -XAt -U postgres -d ecommerce \
  -c "SELECT to_regnamespace('demo_baseline') IS NULL")" = t
docker exec -i "$pg_container" pg_restore -U postgres -d ecommerce \
  --single-transaction --exit-on-error < "$archive"
```

The restore creates the baseline and applies its grants in one transaction. An existing schema causes the restore to fail. The archive restores ownership to `postgres`. The backend role `ecommerce` needs `USAGE` on the schema and `SELECT` on its 14 tables. Verify those grants before enabling the scheduler. The expected result is `t | f | 14 | 14`.

```sql
SELECT has_schema_privilege('ecommerce', 'demo_baseline', 'USAGE'),
       has_schema_privilege('ecommerce', 'demo_baseline', 'CREATE'),
       count(*),
       count(*) FILTER (WHERE c.relowner = 'postgres'::regrole
         AND has_table_privilege('ecommerce',c.oid,'SELECT')
         AND NOT has_table_privilege('ecommerce',c.oid,'INSERT,UPDATE,DELETE,TRUNCATE,REFERENCES,TRIGGER'))
FROM pg_class c WHERE c.relnamespace = 'demo_baseline'::regnamespace AND c.relkind = 'r';
```

Set `DEMO_RESET_HOURLY=true` on the demo backend and recreate its container. After the first scheduled reset, verify the catalog and authenticated admin in the application and look for `Hourly demo reset completed` in the backend log. To recover a previous visitor state, disable the scheduler first and use the verified full pre-reset backup.
