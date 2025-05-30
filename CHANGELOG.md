# Changelog

All notable changes to this project will be documented in this file.

## [0.0.91] - 2025-05-30

### Changed

- Check if azure is already initialized before initializing

## [0.0.9] - 2025-05-30

### Changed

- Trying to fix the issue in v.0.0.8 by installing pg, pg types and node types

## [0.0.8] - 2025-05-30

### Changed

- When the npm package is used, there seem to be an error, installing firebase-admin to see if it is a dependency for firebase.

```ts
node_modules/@types/pg/index.d.ts:12:31 - error TS2307: Cannot find module 'pg-protocol/dist/messages' or its corresponding type declarations.

12 import { NoticeMessage } from 'pg-protocol/dist/messages';
```

## [0.0.7] - 2025-05-30

### Changed

- code is only a number (not number or string) in both `CustomLog` and `AppErrorOptions`

## [0.0.6] - 2025-05-30

### Changed

- Removed reliance on `globalThis.context` for Azure logging.
- Logging now depends on presence of `.env` variable `APPINSIGHTS_CONNECTIONSTRING` for initializing Azure Application Insights and `USE_FIREBASE_LOGGING` for Firebase logging.
- `smartCloudLog` now auto-selects logger based on `.env` configuration instead of runtime environment detection.

## [0.0.5] - 2025-05-30

## [0.0.4] - 2025-05-30

## [0.0.3] - 2025-05-30

### Changed

- More exported interfaces
- README has examples of showUser usage

## [0.0.2] - 2025-05-30

### Changed

- README changed

## [0.0.1] - 2025-05-30

### Added

- Initial release with core `AppError` class
- Logger implementations for Azure and Firebase with console fallback
- Automatic platform detection
- Basic README and example usage
