# Changelog

## [1.0.1] - 26/11/2026

### Fixed

- Restore the hosted demo's sample data at the start of each hour. The reset uses a single PostgreSQL transaction and preserves the configured demo accounts.
- Count each product once in catalog totals when it has multiple images or categories.

## [1.0.0]

Initial production release
