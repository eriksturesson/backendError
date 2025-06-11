# Changelog

All notable changes to this project will be documented in this file.

## [1.0.2] - 2025-06-11

### Changed

- `httpErrorFormatter` now returns `message` and `showUser` in addition to `status` and `body`.
- When using `BackendErrorOptions` with a `data` property and `showUser` set to `true`, `httpErrorFormatter` includes the input `data` in the returned `body`.

## [1.0.1] - 2025-06-11

### Changed

- Improved README
- Bumped version to 1.0.0 to mark production readiness
- Removed `npm`from dependencies

## [0.0.6] - 2025-06-10

### Changed

- Changed package name from @eriksturesson/backend-error to backend-error (without @eriksturesson/)

## [0.0.5] - 2025-06-03

### Fixed

- Built the 0.0.4 version

## [0.0.4] - 2025-06-03

### Added

- `httpErrorFormatter` added to give body and status (but not headers) to send http response

## [0.0.3] - 2025-06-03

### Fixed

- Readme has correct shield
- Dist folder added

## [0.0.2] - 2025-05-30

### Fixed

- Readme is correct

## [0.0.1] - 2025-05-30

### Added

- Initial release with core `BackendError` class
