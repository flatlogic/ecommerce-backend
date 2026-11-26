'use strict';

// Run from /app in the deployed backend image. Only these public fixture seeders are loaded.
const fs = require('fs');
const path = require('path');
const seeds = {
  '20210106081207-blogs.js': 'blogs',
  '20210106081207-feedbacks.js': 'feedbacks',
  '20210106081207-products.js': 'products',
  '20210106104706-files.js': 'files',
  '20210115101121-categories.js': 'categories',
  '20210122124235-productCategoriesCategories.js': 'productsCategoriesCategories',
  '20210215124344-brands.js': 'brands',
};
const frontend = 'https://flatlogic-ecommerce.flatlogic.com';
const backend = 'https://flatlogic-ecommerce-backend.flatlogic.com';
function normalize(key, value) {
  if (typeof value !== 'string') return value;
  const updated = value
    .replace(/https:\/\/flatlogic-ecommerce-backend\.herokuapp\.com(?=\/)/g, backend)
    .replace(/https:\/\/flatlogic-ecommerce\.herokuapp\.com(?=\/)/g, frontend);
  if (updated.includes('herokuapp.com')) throw Error('Unexpected legacy URL in ' + key);
  if (['publicUrl', 'privateUrl', 'meta_og_image'].includes(key)) {
    const { origin, pathname } = new URL(updated);
    if (origin !== backend || !pathname.startsWith('/images/') ||
        !fs.statSync(path.join('/app/src', pathname)).isFile()) {
      throw Error('Invalid bundled demo asset in ' + key);
    }
  }
  return updated;
}

async function main() {
  for (const [file, target] of Object.entries(seeds)) {
    await require('/app/src/db/seeders/' + file).up({
      bulkInsert(table, rows) {
        if (target !== table) throw Error('Unexpected fixture target in ' + file);
        // PostgreSQL JSON conversion uses the actual column types, including UUIDs, enums and dates.
        const json = JSON.stringify(rows, normalize).replace(/'/g, "''");
        console.log('INSERT INTO demo_baseline."' + target + '" SELECT * FROM json_populate_recordset(NULL::demo_baseline."' + target + '", \'' + json + '\'::json);');
      },
    });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
