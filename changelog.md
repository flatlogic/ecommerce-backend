# Changelog

## [2.0.0] - 26/11/2026

### Changed

- Upgrade the supported runtime from Node.js 12 to Node.js 24 LTS.
- Upgrade Sequelize from 6.3.5 to 6.37.8 and the PostgreSQL driver from 8.4.1 to 8.23.1.
- Upgrade bcrypt from 5.0.0 to 6.0.0 for password verification on Node.js 24.

- Update Express, Passport, JWT verification, Nodemailer, the MySQL driver, the scheduler and their locked dependencies.
- Use Node's built-in watch mode, UUID generator and test runner.

### Fixed

- Keep local and OAuth sessions tied to the signed-in account and omit private authentication fields from its profile. Reject duplicate signups.
- Preserve the original request body when verifying a Stripe checkout webhook signature.

## [1.0.1] - 26/11/2026

### Fixed

- Restore the hosted demo's sample data at the start of each hour. The reset uses a single PostgreSQL transaction and preserves the configured demo accounts.
- Count each product once in catalog totals when it has multiple images or categories.

## [1.0.0]

Initial production release
