# API Architecture

The ShipLink API is built to handle complex maritime B2B operations, connecting vessel owners, charterers, and brokers in a secure and efficient environment. Our API structure supports real-time vessel tracking, complex freight negotiations, and maritime document handling while ensuring compliance with international shipping standards. This architecture enables seamless integration of maritime business processes while maintaining strict security and data integrity requirements for global shipping operations.

## Base Structure

- Root: `pages/api`
- Version: v1
- Endpoints:
  - `/auth/*`
  - `/calculator/freightestimation/*`
  - `/v1/owner/*`
  - `/v1/charterer/*`
  - `/v1/cargotypes/*`
  - `/v1/*/vessels/*`
  - `/v1/*/deals/*`
  - `/v1/*/account/*`
  - `/v1/*/deals/negotiating`

## Handlers

- Pattern: responseHandler
- Required:
  - Data adapter
  - Request method validation
  - Authorization checks
- Error Handling:
  - Status codes
  - Error messages
  - Detailed descriptions
  - Mandatory logging

## Adapters

- Location: `/adapters/${domain}`
- Naming: `${domain}${Direction}Adapter`
- Requirements:
  - Input validation
  - Data transformation
  - Error handling
