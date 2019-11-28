# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.3] - 2019-11-25
### Added
- Adds `discoverEntries(basePath: string): Entrires` function with ability to get config from `package.json`

## [2.0.0] - 2018-11-28
### Removed
- Support for providing parameters in `package.json` was removed. Provide them directly in your `weback.config` file

### Changed
- `discoverEntries` function signature changed to `discoverEntries(params: DiscoverEntriesParams = {}): Entrires` 
