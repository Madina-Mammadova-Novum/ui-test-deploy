# Adapters Migration

This document outlines the migration of duplicate adapter patterns to common adapter utilities.

## Common Adapters

The following common adapters were created:

| Adapter             | Description                                       | Return Type       |
| ------------------- | ------------------------------------------------- | ----------------- |
| `arrayAdapter`      | Returns an empty array if data is null/undefined  | `[]`              |
| `objectAdapter`     | Returns an empty object if data is null/undefined | `{}`              |
| `nullAdapter`       | Returns null if data is null/undefined            | `null`            |
| `dataObjectAdapter` | Returns data wrapped in a data property           | `{ data: value }` |

## Updated Adapters

The following adapters were updated to use common adapters:

| File                             | Adapter                                | Common Adapter Used |
| -------------------------------- | -------------------------------------- | ------------------- |
| `adapters/cargo/index.js`        | `responseCargoSentOffersAdapter`       | `arrayAdapter`      |
| `adapters/cargo/index.js`        | `responseCargoCounteroffersAdapter`    | `arrayAdapter`      |
| `adapters/cargo/index.js`        | `responseCargoFailedOffersAdapter`     | `arrayAdapter`      |
| `adapters/charterParty/index.js` | `requestCharterPartyAdapter`           | `arrayAdapter`      |
| `adapters/account/index.js`      | `requestDeactivateAccountAdapter`      | `objectAdapter`     |
| `adapters/account/index.js`      | `responseDeactivateAccountAdapter`     | `objectAdapter`     |
| `adapters/fixture/index.js`      | `responseFixtureAdapter`               | `arrayAdapter`      |
| `adapters/response/index.js`     | `responseAdapter`                      | `dataObjectAdapter` |
| `adapters/vessel/index.js`       | `responseGetVesselDetailsAdapter`      | `nullAdapter`       |
| `adapters/vessel/index.js`       | `responseGetVesselCategoryOneAdapter`  | `nullAdapter`       |
| `adapters/vessel/index.js`       | `responseGetVesselCategoryTwoAdapter`  | `nullAdapter`       |
| `adapters/vessel/index.js`       | `responseDeleteVesselFromFleetAdapter` | `nullAdapter`       |
| `adapters/vessel/index.js`       | `responseDeleteVesselAdapter`          | `nullAdapter`       |
| `adapters/offer/index.js`        | `responseOfferDetailsAdapter`          | `nullAdapter`       |
| `adapters/offer/index.js`        | `responseSendCounterofferAdapter`      | `nullAdapter`       |
| `adapters/tools/index.js`        | `estimationResponseDataAdapter`        | `dataObjectAdapter` |

## Implementation Details

- Common adapters are exported from `@/adapters/common` and also re-exported from the main `@/adapters` index file
- All imports use the absolute path pattern `import { adapterName } from '@/adapters/common'` for consistency
- This approach enables importing either directly from `@/adapters/common` or from the consolidated `@/adapters`

## Benefits

- Reduced code duplication
- Improved maintainability
- Consistent handling of null/undefined values
- Easier to update common patterns across the codebase
- Standardized import paths

## Future Improvements

Additional adapters could be migrated in the future, such as:

- User adapters
- Notifications adapters
- Tools adapters
- And more complex adapters that include null-checking as part of their logic
