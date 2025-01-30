# CryptoBank Changelog

All notable changes to this project will be documented in this file.

## [Unreleased]

### Added
- New feature for multi-signature wallets to enhance security for joint accounts.
- Integration with third-party oracles for real-tiM market data in investment options.
- User notifications for account activities (deposits, withdrawals, loan approvals).
- Support for additional cryptocurrencies in the investment portfolio.

### Changed
- Updated the user interface for the loan application process for improved usability.
- Enhanced the API documentation with additional examples and error handling information.
- Improved performance of the savings account interest calculation algorithm.

### Deprecated
- The legacy loan application endpoint will be deprecated in the next major release.

### Removed
- Removed support for outdated authentication methods; only OAuth2 and JWT are now supported.

## [1.0.0] - 2025-10-01

### Added
- Initial release of CryptoBank with core functionalities:
  - User registration and authentication.
  - Creation and management of savings accounts.
  - Loan application and management features.
  - Basic investment options for users.
  - RESTful API for external interactions.

### Changed
- Refactored the backend architecture for improved scalability and performance.
- Updated the database schema to support new features and improve data integrity.

### Fixed
- Resolved issues with transaction confirmation delays in the savings account module.
- Fixed bugs related to loan application status updates.

## [0.1.0] - 2025-09-01

### Added
- Initial project setup and repository creation.
- Basic structure for the blockchain and wallet functionalities.
- Preliminary documentation for developers.

## [0.0.1] - 2025-08-01

### Added
- Project inception and initial brainstorming.
- Defined project goals and architecture.

## How to Contribute

If you would like to contribute to CryptoBank, please follow the guidelines outlined in the [CONTRIBUTING.md](CONTRIBUTING.md) file.

## License

This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details.
