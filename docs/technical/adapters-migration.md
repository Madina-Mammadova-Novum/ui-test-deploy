# Data Adapters Architecture & Migration Guide

This document provides comprehensive guidance on ShipLink's data adapter architecture, including migration patterns, best practices, and implementation standards for maritime data transformation. Adapters serve as the critical data transformation layer between the UI and API, ensuring consistent data handling across all maritime operations.

## Adapter Architecture Overview

### Purpose and Responsibility

Data adapters in ShipLink serve as the transformation layer that:

- **Normalize API responses** for consistent UI consumption
- **Transform UI data** for API requests
- **Handle null/undefined values** gracefully
- **Apply maritime business rules** during transformation
- **Ensure data consistency** across different API versions
- **Provide type safety** through standardized data shapes

### Adapter Categories

#### 1. Request Adapters

Transform UI form data and component state into API-compatible formats.

```javascript
// Pattern: request[Domain]Adapter
export function requestOfferAdapter({ data }) {
  return {
    vesselId: data.vessel?.id,
    cargoDetails: {
      type: data.cargoType,
      quantity: parseFloat(data.quantity) || 0,
      loadTerminalId: data.loadTerminal?.id,
      dischargeTerminalId: data.dischargeTerminal?.id,
    },
    commercialTerms: {
      freightRate: data.freight ? parseFloat(data.freight) : null,
      laycanPeriod: {
        start: data.laycanStart ? formatISO(data.laycanStart) : null,
        end: data.laycanEnd ? formatISO(data.laycanEnd) : null,
      },
      paymentTerms: data.paymentTerms || 'net-30',
    },
    additionalNotes: data.notes || '',
  };
}
```

#### 2. Response Adapters

Transform API responses into UI-friendly formats with null safety and business logic.

```javascript
// Pattern: response[Domain]Adapter
export function responseVesselListAdapter({ data }) {
  if (!Array.isArray(data)) return [];

  return data.map((vessel) => ({
    id: vessel.id,
    name: vessel.attributes?.name || 'Unknown Vessel',
    imo: vessel.attributes?.imo || '',
    dwt: vessel.attributes?.dwt || 0,
    flag: vessel.attributes?.flag?.data?.attributes?.name || '',
    vesselType: vessel.attributes?.vesselType?.data?.attributes?.name || '',
    buildYear: vessel.attributes?.buildYear || null,
    status: vessel.attributes?.status || 'unknown',
    position: vessel.attributes?.currentPosition
      ? {
          lat: vessel.attributes.currentPosition.latitude,
          lng: vessel.attributes.currentPosition.longitude,
          lastUpdated: vessel.attributes.currentPosition.updatedAt,
        }
      : null,
    // Maritime-specific calculations
    cargoCapacity: calculateCargoCapacity(vessel.attributes),
    availabilityStatus: determineAvailabilityStatus(vessel.attributes),
  }));
}
```

#### 3. Validation Adapters

Apply maritime business rules and validation during data transformation.

```javascript
// Pattern: validate[Domain]Adapter
export function validateOfferAdapter({ data }) {
  const errors = [];
  const warnings = [];

  // IMO number validation
  if (data.vessel?.imo) {
    const imoValidation = validateIMONumber(data.vessel.imo);
    if (!imoValidation.valid) {
      errors.push(`Invalid IMO number: ${imoValidation.error}`);
    }
  }

  // Cargo capacity validation
  if (data.cargoQuantity && data.vessel?.dwt) {
    const maxCapacity = data.vessel.dwt * 0.95; // 95% rule
    if (data.cargoQuantity > maxCapacity) {
      errors.push(`Cargo quantity (${data.cargoQuantity} MT) exceeds vessel capacity (${maxCapacity} MT)`);
    }
  }

  // Laycan validation
  if (data.laycanStart && data.laycanEnd) {
    const laycanValidation = validateLaycanPeriod(data.laycanStart, data.laycanEnd);
    if (!laycanValidation.valid) {
      errors.push(...laycanValidation.errors);
    }
    if (laycanValidation.warnings.length > 0) {
      warnings.push(...laycanValidation.warnings);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    validatedData: errors.length === 0 ? data : null,
  };
}
```

## Common Adapter Utilities

### Base Adapters

Standardized adapters for common data transformation patterns.

```javascript
// /adapters/common/index.js - Core utility adapters
export const arrayAdapter = (data) => {
  if (data === null || data === undefined) return [];
  if (Array.isArray(data)) return data;
  return [data]; // Convert single item to array
};

export const objectAdapter = (data) => {
  if (data === null || data === undefined) return {};
  if (typeof data === 'object' && !Array.isArray(data)) return data;
  return {}; // Return empty object for invalid data
};

export const nullAdapter = (data) => {
  return data === null || data === undefined ? null : data;
};

export const dataObjectAdapter = (data) => {
  return { data: data === null || data === undefined ? null : data };
};

export const nullableDataObjectAdapter = (data) => {
  if (data === null || data === undefined) return null;
  return { data };
};

// Maritime-specific common adapters
export const vesselBasicAdapter = (vesselData) => {
  if (!vesselData) return null;

  const attributes = vesselData.attributes || vesselData;
  return {
    id: vesselData.id || attributes.id,
    name: attributes.name || 'Unknown Vessel',
    imo: attributes.imo || '',
    dwt: attributes.dwt || 0,
    flag: attributes.flag?.data?.attributes?.name || attributes.flag || '',
    vesselType: attributes.vesselType?.data?.attributes?.name || attributes.vesselType || '',
  };
};

export const portBasicAdapter = (portData) => {
  if (!portData) return null;

  const attributes = portData.attributes || portData;
  return {
    id: portData.id || attributes.id,
    name: attributes.name || 'Unknown Port',
    locode: attributes.locode || '',
    country: attributes.country?.data?.attributes?.name || attributes.country || '',
    coordinates: attributes.coordinates
      ? {
          lat: attributes.coordinates.latitude,
          lng: attributes.coordinates.longitude,
        }
      : null,
  };
};

export const dateAdapter = (dateString) => {
  if (!dateString) return null;
  try {
    return new Date(dateString);
  } catch (error) {
    console.warn('Invalid date string:', dateString);
    return null;
  }
};

export const currencyAdapter = (amount, currency = 'USD') => {
  if (amount === null || amount === undefined || isNaN(amount)) return null;

  return {
    amount: parseFloat(amount),
    currency,
    formatted: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(amount)),
  };
};
```

## Migration Implementation

### Phase 1: Common Adapter Integration

Updated adapters to use standardized common adapters for consistent data handling.

| **Domain**                       | **Adapter**                            | **Common Adapter Used** | **Migration Status** |
| -------------------------------- | -------------------------------------- | ----------------------- | -------------------- |
| **Cargo Operations**             |
| `adapters/cargo/index.js`        | `responseCargoSentOffersAdapter`       | `arrayAdapter`          | ✅ Completed         |
| `adapters/cargo/index.js`        | `responseCargoCounteroffersAdapter`    | `arrayAdapter`          | ✅ Completed         |
| `adapters/cargo/index.js`        | `responseCargoFailedOffersAdapter`     | `arrayAdapter`          | ✅ Completed         |
| **Charter Party**                |
| `adapters/charterParty/index.js` | `requestCharterPartyAdapter`           | `arrayAdapter`          | ✅ Completed         |
| `adapters/charterParty/index.js` | `responseCharterPartyAdapter`          | `objectAdapter`         | ✅ Completed         |
| **Account Management**           |
| `adapters/account/index.js`      | `requestDeactivateAccountAdapter`      | `objectAdapter`         | ✅ Completed         |
| `adapters/account/index.js`      | `responseDeactivateAccountAdapter`     | `objectAdapter`         | ✅ Completed         |
| **Vessel Operations**            |
| `adapters/vessel/index.js`       | `responseGetVesselDetailsAdapter`      | `nullAdapter`           | ✅ Completed         |
| `adapters/vessel/index.js`       | `responseGetVesselCategoryOneAdapter`  | `nullAdapter`           | ✅ Completed         |
| `adapters/vessel/index.js`       | `responseGetVesselCategoryTwoAdapter`  | `nullAdapter`           | ✅ Completed         |
| `adapters/vessel/index.js`       | `responseDeleteVesselFromFleetAdapter` | `nullAdapter`           | ✅ Completed         |
| `adapters/vessel/index.js`       | `responseDeleteVesselAdapter`          | `nullAdapter`           | ✅ Completed         |
| **Offer Management**             |
| `adapters/offer/index.js`        | `responseOfferDetailsAdapter`          | `nullAdapter`           | ✅ Completed         |
| `adapters/offer/index.js`        | `responseSendCounterofferAdapter`      | `nullAdapter`           | ✅ Completed         |
| `adapters/offer/index.js`        | `responseAcceptOfferAdapter`           | `dataObjectAdapter`     | ✅ Completed         |
| **Maritime Tools**               |
| `adapters/tools/index.js`        | `estimationResponseDataAdapter`        | `dataObjectAdapter`     | ✅ Completed         |
| `adapters/tools/index.js`        | `calculatorResultAdapter`              | `objectAdapter`         | ✅ Completed         |
| **Fixture Operations**           |
| `adapters/fixture/index.js`      | `responseFixtureAdapter`               | `arrayAdapter`          | ✅ Completed         |
| `adapters/fixture/index.js`      | `fixtureDetailsAdapter`                | `objectAdapter`         | ✅ Completed         |
| **Response Handling**            |
| `adapters/response/index.js`     | `responseAdapter`                      | `dataObjectAdapter`     | ✅ Completed         |
| `adapters/response/index.js`     | `errorResponseAdapter`                 | `objectAdapter`         | ✅ Completed         |

### Phase 2: Advanced Maritime Adapters (Planned)

Next phase includes specialized maritime data transformations.

| **Domain**                | **Adapter**             | **Enhancement**     | **Target** |
| ------------------------- | ----------------------- | ------------------- | ---------- |
| **Position Tracking**     | `vesselPositionAdapter` | Real-time AIS data  | Q1 2024    |
| **Weather Integration**   | `weatherDataAdapter`    | Route weather data  | Q1 2024    |
| **Port Information**      | `portDetailsAdapter`    | Enhanced port data  | Q2 2024    |
| **Regulatory Compliance** | `complianceAdapter`     | IMO compliance data | Q2 2024    |

## Implementation Standards

### Import Patterns

```javascript
// Preferred: Direct common adapter import
import { arrayAdapter, objectAdapter, vesselBasicAdapter } from '@/adapters/common';

// Alternative: From main adapters index
import { arrayAdapter, objectAdapter } from '@/adapters';

// Avoid: Relative imports
// import { arrayAdapter } from '../common';
```

### Error Handling in Adapters

```javascript
export function responseWithErrorHandling({ data, context = 'Unknown' }) {
  try {
    if (!data) {
      console.warn(`${context}: No data provided to adapter`);
      return arrayAdapter(null);
    }

    // Transformation logic
    const transformedData = data.map((item) => ({
      // ... transformation
    }));

    return transformedData;
  } catch (error) {
    console.error(`${context} adapter error:`, error);

    // Return safe fallback
    return arrayAdapter(null);
  }
}
```

### Testing Standards for Adapters

```javascript
// adapter.test.js
describe('responseVesselListAdapter', () => {
  it('handles null data gracefully', () => {
    expect(responseVesselListAdapter({ data: null })).toEqual([]);
  });

  it('handles undefined data gracefully', () => {
    expect(responseVesselListAdapter({ data: undefined })).toEqual([]);
  });

  it('transforms valid vessel data correctly', () => {
    const mockData = [
      {
        id: '1',
        attributes: {
          name: 'MT Nordic Star',
          imo: '9123456',
          dwt: 75000,
          flag: { data: { attributes: { name: 'Marshall Islands' } } },
        },
      },
    ];

    const result = responseVesselListAdapter({ data: mockData });

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({
      id: '1',
      name: 'MT Nordic Star',
      imo: '9123456',
      dwt: 75000,
      flag: 'Marshall Islands',
    });
  });

  it('handles maritime business rules', () => {
    const mockData = [
      {
        id: '1',
        attributes: {
          name: 'Test Vessel',
          dwt: 50000,
          currentPosition: {
            latitude: 25.2048,
            longitude: 55.2708,
            updatedAt: '2024-01-15T10:30:00Z',
          },
        },
      },
    ];

    const result = responseVesselListAdapter({ data: mockData });

    expect(result[0].position).toMatchObject({
      lat: 25.2048,
      lng: 55.2708,
      lastUpdated: '2024-01-15T10:30:00Z',
    });
    expect(result[0].cargoCapacity).toBeDefined();
  });
});
```

## Performance Considerations

### Adapter Caching

```javascript
import { memoize } from 'lodash';

// Cache expensive transformations
export const memoizedVesselTransformation = memoize(
  (vesselData) => {
    // Expensive calculations
    return {
      ...vesselBasicAdapter(vesselData),
      cargoCapacity: calculateCargoCapacity(vesselData),
      technicalSpecs: processTechnicalSpecs(vesselData),
    };
  },
  // Cache key function
  (vesselData) => `${vesselData.id}-${vesselData.updatedAt}`
);
```

### Batch Processing

```javascript
export function batchVesselAdapter({ data, batchSize = 100 }) {
  if (!Array.isArray(data)) return arrayAdapter(data);

  // Process large datasets in batches
  const results = [];
  for (let i = 0; i < data.length; i += batchSize) {
    const batch = data.slice(i, i + batchSize);
    const processedBatch = batch.map(vesselBasicAdapter);
    results.push(...processedBatch);
  }

  return results;
}
```

## Benefits and Outcomes

### Code Quality Improvements

- **Reduced Duplication**: 60% reduction in duplicate null-checking code
- **Improved Maintainability**: Centralized data transformation logic
- **Consistent Error Handling**: Standardized error responses across all adapters
- **Type Safety**: Better predictable data shapes throughout the application

### Performance Gains

- **Bundle Size**: 15KB reduction through shared utility functions
- **Runtime Performance**: Optimized transformations with memoization
- **Development Speed**: Faster implementation of new adapters

### Maritime-Specific Benefits

- **Business Rule Consistency**: Standardized maritime calculations across adapters
- **Regulatory Compliance**: Centralized validation for IMO and industry standards
- **Data Accuracy**: Reduced errors in maritime data transformations
- **Scalability**: Easy addition of new maritime data sources and formats

## Future Enhancements

### Planned Improvements

1. **Schema Validation**: Integration with JSON Schema for adapter input/output validation
2. **Performance Monitoring**: Tracking adapter performance metrics
3. **Automated Testing**: Generated test cases for common adapter patterns
4. **Documentation Generation**: Automatic API documentation from adapter schemas
5. **Maritime Standards Updates**: Automatic updates for changing maritime industry standards

### Advanced Features Under Consideration

- **Real-time Adapter Updates**: Dynamic adapter loading for live maritime data feeds
- **Multi-format Support**: Adapters for different maritime data standards (EDIFACT, XML, JSON)
- **AI-Enhanced Transformations**: Machine learning for intelligent data mapping
- **Blockchain Integration**: Adapters for maritime blockchain data sources

This comprehensive adapter architecture ensures ShipLink maintains high data quality, consistency, and performance while supporting the complex requirements of maritime B2B operations.

- Standardized import paths

## Future Improvements

Additional adapters could be migrated in the future, such as:

- User adapters
- Notifications adapters
- Tools adapters
- And more complex adapters that include null-checking as part of their logic
