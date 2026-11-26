#!/usr/bin/env bash
set -euo pipefail
umask 077

clone=${1:?Supply the isolated restored PostgreSQL container name}
image=${2:?Supply the deployed backend image ID}
output=${3:?Supply a new protected backup filename ending in .dump}
root_dir=$(cd "$(dirname "$0")" && pwd)
[[ "$clone" == ecommerce-reset-qa-* ]]
[[ "$(docker inspect --format '{{.HostConfig.NetworkMode}}' "$clone")" == none ]]
[[ "$image" =~ ^sha256:[0-9a-f]{64}$ ]]
[[ "$output" = /*.dump && ! -e "$output" ]]
[[ "$(stat -c '%U:%a' "$(dirname "$output")")" == root:700 ]]
psql=(docker exec -i "$clone" psql -X -q -v ON_ERROR_STOP=1 -v VERBOSITY=terse -U postgres -d ecommerce)

# The last input is COMMIT. A failed fixture generation closes the connection and rolls it back.
(
    cat "$root_dir/begin.sql" &&
    docker run --rm -i --network none --read-only --entrypoint node "$image" - < "$root_dir/fixture-sql.js" &&
    cat "$root_dir/finish.sql"
) | "${psql[@]}"

assets=$("${psql[@]}" -At <<'SQL'
SELECT "publicUrl" FROM demo_baseline.files
UNION SELECT meta_og_image FROM demo_baseline.blogs
UNION SELECT meta_og_image FROM demo_baseline.products
UNION SELECT meta_og_image FROM demo_baseline.categories ORDER BY 1;
SQL
)
verified=0
while IFS= read -r asset; do
    [[ "$asset" == https://flatlogic-ecommerce-backend.flatlogic.com/images/* ]]
    result=$(curl -sS --fail --max-time 30 --retry 2 --output /dev/null --write-out '%{http_code} %{content_type}' "$asset")
    if [[ "$result" != "200 image/"* ]]; then
        echo "Bundled image check failed for $asset ($result)" >&2
        exit 1
    fi
    verified=$((verified + 1))
done <<< "$assets"

# Write and verify the complete dump before linking it to its final name.
tmp=$(mktemp "$(dirname "$output")/.demo-baseline-XXXXXXXX")
trap 'rm -- "$tmp"' EXIT
docker exec "$clone" pg_dump -U postgres -d ecommerce --format=custom --schema=demo_baseline > "$tmp"
docker exec -i "$clone" pg_restore --list < "$tmp" > /dev/null
chown "$(docker exec "$clone" id -u postgres):$(docker exec "$clone" id -g postgres)" "$tmp"
ln -- "$tmp" "$output"
printf 'Validated %d public assets. Backup SHA256\n' "$verified"
sha256sum "$output"
