# Maritime Standards & Business Rules

Maritime operations require strict adherence to international shipping standards and precise calculations. This document outlines the core maritime standards implemented in ShipLink, ensuring compliance with IMO regulations, industry-standard cargo calculations, and vessel specifications. These standards govern everything from vessel capacity measurements to laycan time calculations, providing a reliable foundation for maritime business operations.

## International Standards Compliance

### IMO (International Maritime Organization) Standards
- **SOLAS**: Safety of Life at Sea regulations for vessel certification
- **MARPOL**: Marine pollution prevention standards
- **ISM Code**: International Safety Management for vessel operations
- **ISPS Code**: International Ship and Port Facility Security requirements
- **STCW**: Standards of Training, Certification and Watchkeeping

### Classification Society Standards
- **ABS**: American Bureau of Shipping
- **DNV GL**: Det Norske Veritas Germanischer Lloyd
- **LR**: Lloyd's Register
- **BV**: Bureau Veritas
- **NK**: Nippon Kaiji Kyokai

### Port and Terminal Standards
- **UN/LOCODE**: United Nations Location Codes for ports
- **IMDG Code**: International Maritime Dangerous Goods regulations
- **Port State Control**: Regional port inspection requirements

## Maritime Units and Measurements

### Weight and Capacity Units
```javascript
const MARITIME_UNITS = {
  // Weight measurements
  DWT: 'Deadweight Tonnage', // Maximum cargo weight vessel can carry
  GT: 'Gross Tonnage', // Total enclosed volume of vessel
  NT: 'Net Tonnage', // Cargo-carrying volume
  MT: 'Metric Tons', // Standard cargo weight unit (1000 kg)
  LT: 'Long Tons', // Imperial ton (1016 kg) - UK markets
  ST: 'Short Tons', // US ton (907 kg) - US markets
  
  // Volume measurements
  CBM: 'Cubic Meters', // Cargo volume
  BBL: 'Barrels', // Oil industry standard (158.987 liters)
  MMBBL: 'Million Barrels', // Large oil cargo volumes
  
  // Distance and navigation
  NM: 'Nautical Miles', // Maritime distance (1.852 km)
  KM: 'Kilometers', // Metric distance
  KNOTS: 'Nautical miles per hour', // Vessel speed
};
```

### Density Standards by Cargo Type
```javascript
const CARGO_DENSITIES = {
  'crude-oil': { min: 0.75, max: 0.95, unit: 'MT/m³' },
  'refined-products': { min: 0.68, max: 0.98, unit: 'MT/m³' },
  'lng': { min: 0.42, max: 0.48, unit: 'MT/m³' },
  'lpg': { min: 0.49, max: 0.58, unit: 'MT/m³' },
  'chemicals': { min: 0.6, max: 2.0, unit: 'MT/m³' },
  'iron-ore': { min: 2.8, max: 5.2, unit: 'MT/m³' },
  'coal': { min: 0.8, max: 1.4, unit: 'MT/m³' },
  'grain': { min: 0.6, max: 0.85, unit: 'MT/m³' },
};
```

### Conversion Utilities
```javascript
/**
 * Convert between maritime units
 */
export const convertMaritimeUnits = {
  // Weight conversions
  mtToLt: (mt) => mt * 0.984207, // Metric tons to long tons
  mtToSt: (mt) => mt * 1.102311, // Metric tons to short tons
  ltToMt: (lt) => lt * 1.016047, // Long tons to metric tons
  stToMt: (st) => st * 0.907185, // Short tons to metric tons
  
  // Volume conversions
  bblToCbm: (bbl) => bbl * 0.158987, // Barrels to cubic meters
  cbmToBbl: (cbm) => cbm * 6.28981, // Cubic meters to barrels
  
  // Distance conversions
  nmToKm: (nm) => nm * 1.852, // Nautical miles to kilometers
  kmToNm: (km) => km * 0.539957, // Kilometers to nautical miles
};
```

## Vessel Specifications and Validation

### Vessel Type Classifications
```javascript
const VESSEL_TYPES = {
  TANKER: {
    subtypes: ['crude-tanker', 'product-tanker', 'chemical-tanker', 'lng-carrier', 'lpg-carrier'],
    dwtRange: { min: 5000, max: 500000 },
    requiredCertificates: ['ISM', 'ISPS', 'IOPP', 'NLS'],
  },
  BULK_CARRIER: {
    subtypes: ['handysize', 'handymax', 'supramax', 'panamax', 'capesize'],
    dwtRange: { min: 10000, max: 400000 },
    requiredCertificates: ['ISM', 'ISPS', 'IOPP'],
  },
  CONTAINER: {
    subtypes: ['feeder', 'handy', 'sub-panamax', 'panamax', 'post-panamax', 'ultra-large'],
    capacity: 'TEU', // Twenty-foot Equivalent Units
    requiredCertificates: ['ISM', 'ISPS', 'CSC'],
  },
};
```

### IMO Number Validation
```javascript
/**
 * Validate IMO number according to IMO standards
 * @param {string} imo - 7-digit IMO number
 * @returns {Object} Validation result
 */
export function validateIMONumber(imo) {
  // Format validation
  if (!/^\d{7}$/.test(imo)) {
    return { valid: false, error: 'IMO must be exactly 7 digits' };
  }
  
  // Check digit validation (IMO algorithm)
  const digits = imo.split('').map(Number);
  const checkSum = digits.slice(0, 6)
    .reduce((sum, digit, index) => sum + digit * (7 - index), 0);
  
  const calculatedCheckDigit = checkSum % 10;
  
  if (digits[6] !== calculatedCheckDigit) {
    return { valid: false, error: 'Invalid IMO check digit' };
  }
  
  return { valid: true };
}
```

## Cargo Capacity Calculations

### Deadweight Tonnage Calculations
```javascript
/**
 * Calculate maximum cargo capacity considering vessel limitations
 * @param {Object} vessel - Vessel specifications
 * @param {Object} cargo - Cargo specifications
 * @returns {Object} Capacity calculation
 */
export function calculateCargoCapacity(vessel, cargo) {
  const { dwt, bunkerCapacity, freshWaterCapacity, crewWeight } = vessel;
  const { density, stowageFactor } = cargo;
  
  // Calculate available cargo weight
  const constantWeight = bunkerCapacity + freshWaterCapacity + crewWeight;
  const availableCargoWeight = dwt - constantWeight;
  
  // Calculate cargo volume limitation
  const availableCargoVolume = vessel.cargoCapacity; // in cubic meters
  const maxCargoByVolume = availableCargoVolume * density;
  
  // The limiting factor determines actual capacity
  const maxCargoCapacity = Math.min(availableCargoWeight, maxCargoByVolume);
  
  return {
    maxCapacity: maxCargoCapacity,
    limitingFactor: availableCargoWeight < maxCargoByVolume ? 'weight' : 'volume',
    utilization: {
      weight: (maxCargoCapacity / availableCargoWeight) * 100,
      volume: (maxCargoCapacity / maxCargoByVolume) * 100,
    },
  };
}
```

### Cargo Compatibility Matrix
```javascript
const CARGO_COMPATIBILITY = {
  'crude-oil': {
    compatible: ['crude-oil', 'fuel-oil'],
    incompatible: ['chemicals', 'refined-products', 'lng'],
    cleaningRequired: ['refined-products'],
  },
  'refined-products': {
    compatible: ['refined-products', 'clean-petroleum'],
    incompatible: ['crude-oil', 'chemicals', 'lng'],
    cleaningRequired: ['crude-oil', 'chemicals'],
  },
  'chemicals': {
    compatible: ['chemicals'],
    incompatible: ['crude-oil', 'refined-products', 'food-grade'],
    cleaningRequired: ['all'],
  },
};
```

## Laycan and Time Calculations

### Laycan (Lay Days Cancelling) Standards
```javascript
/**
 * Validate laycan period according to maritime standards
 * @param {Date} startDate - Laycan start date
 * @param {Date} endDate - Laycan end date
 * @returns {Object} Validation result
 */
export function validateLaycan(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const now = new Date();
  
  // Business rules validation
  const rules = {
    // Minimum advance notice (48 hours)
    minimumNotice: start.getTime() > now.getTime() + (48 * 60 * 60 * 1000),
    
    // Laycan spread (minimum 3 days, maximum 30 days)
    validSpread: (() => {
      const daysDiff = Math.ceil((end - start) / (24 * 60 * 60 * 1000));
      return daysDiff >= 3 && daysDiff <= 30;
    })(),
    
    // End date after start date
    validSequence: end > start,
    
    // Not in the past
    notInPast: start >= now,
  };
  
  const errors = [];
  if (!rules.minimumNotice) errors.push('Minimum 48 hours advance notice required');
  if (!rules.validSpread) errors.push('Laycan spread must be 3-30 days');
  if (!rules.validSequence) errors.push('End date must be after start date');
  if (!rules.notInPast) errors.push('Laycan cannot be in the past');
  
  return {
    valid: Object.values(rules).every(rule => rule),
    errors,
    spread: Math.ceil((end - start) / (24 * 60 * 60 * 1000)),
  };
}
```

### Laytime Calculations
```javascript
/**
 * Calculate laytime for cargo operations
 * @param {Object} params - Laytime parameters
 * @returns {Object} Laytime calculation
 */
export function calculateLaytime(params) {
  const { cargoQuantity, loadingRate, dischargingRate, cargoType } = params;
  
  // Standard loading/discharging rates by cargo type (MT/hour)
  const STANDARD_RATES = {
    'crude-oil': { loading: 3000, discharging: 2500 },
    'refined-products': { loading: 2500, discharging: 2000 },
    'lng': { loading: 1500, discharging: 1200 },
    'chemicals': { loading: 1000, discharging: 800 },
    'dry-bulk': { loading: 2000, discharging: 1500 },
  };
  
  const rates = STANDARD_RATES[cargoType] || STANDARD_RATES['crude-oil'];
  const actualLoadingRate = loadingRate || rates.loading;
  const actualDischargingRate = dischargingRate || rates.discharging;
  
  // Calculate time in hours
  const loadingTime = cargoQuantity / actualLoadingRate;
  const dischargingTime = cargoQuantity / actualDischargingRate;
  const totalLaytime = loadingTime + dischargingTime;
  
  return {
    loadingTime: Math.ceil(loadingTime),
    dischargingTime: Math.ceil(dischargingTime),
    totalLaytime: Math.ceil(totalLaytime),
    laytimeAllowed: Math.ceil(totalLaytime * 1.1), // 10% tolerance
  };
}
```

## Freight Rate Calculations

### Freight Estimation Models
```javascript
/**
 * Calculate freight rates using industry-standard models
 * @param {Object} params - Freight calculation parameters
 * @returns {Object} Freight calculation result
 */
export function calculateFreightRate(params) {
  const {
    cargoQuantity,
    route,
    vesselSpecs,
    marketConditions,
    timeOfYear,
  } = params;
  
  // Base calculation using distance and cargo quantity
  const baseRate = calculateBaseFreightRate(route.distance, cargoQuantity);
  
  // Market adjustments
  const marketAdjustment = applyMarketConditions(baseRate, marketConditions);
  
  // Seasonal adjustments
  const seasonalAdjustment = applySeasonalFactors(marketAdjustment, timeOfYear, route);
  
  // Vessel-specific adjustments
  const vesselAdjustment = applyVesselFactors(seasonalAdjustment, vesselSpecs);
  
  // Port-specific costs
  const portCosts = calculatePortCosts(route.loadPort, route.dischargePort);
  
  return {
    baseRate,
    adjustments: {
      market: marketAdjustment - baseRate,
      seasonal: seasonalAdjustment - marketAdjustment,
      vessel: vesselAdjustment - seasonalAdjustment,
    },
    portCosts,
    totalFreight: vesselAdjustment + portCosts,
    ratePerTon: (vesselAdjustment + portCosts) / cargoQuantity,
  };
}
```

## Charter Party Workflow States

### Deal State Machine
```javascript
const DEAL_STATES = {
  NEGOTIATING: {
    description: 'Initial offer and counter-offer phase',
    allowedTransitions: ['PRE_FIXTURE', 'DECLINED', 'EXPIRED'],
    timeLimit: 48, // hours
    requiredActions: ['offer_submission', 'counter_offer_response'],
  },
  
  PRE_FIXTURE: {
    description: 'Terms finalization and documentation preparation',
    allowedTransitions: ['ON_SUBS', 'FAILED', 'BACK_TO_NEGOTIATING'],
    timeLimit: 72, // hours
    requiredActions: ['terms_agreement', 'preliminary_documents'],
  },
  
  ON_SUBS: {
    description: 'Subject to final conditions and approvals',
    allowedTransitions: ['FIXTURE', 'FAILED'],
    timeLimit: 120, // hours
    requiredActions: ['subject_removal', 'final_approvals'],
  },
  
  FIXTURE: {
    description: 'Confirmed charter party agreement',
    allowedTransitions: ['POST_FIXTURE'],
    requiredActions: ['charter_party_signing', 'deposit_payment'],
    immutable: true, // Commercial terms cannot be changed
  },
  
  POST_FIXTURE: {
    description: 'Cargo operations and voyage execution',
    allowedTransitions: ['COMPLETED', 'DISPUTE'],
    requiredActions: ['cargo_loading', 'voyage_completion'],
  },
  
  COMPLETED: {
    description: 'Successfully completed charter',
    allowedTransitions: [], // Final state
    requiredActions: ['final_payment', 'discharge_completion'],
  },
  
  FAILED: {
    description: 'Charter failed or cancelled',
    allowedTransitions: [], // Final state
    reasons: ['subject_not_lifted', 'commercial_failure', 'technical_failure'],
  },
};
```

### Business Rule Validation
```javascript
/**
 * Validate deal state transition according to maritime business rules
 * @param {string} currentState - Current deal state
 * @param {string} targetState - Desired target state
 * @param {Object} context - Deal context and user permissions
 * @returns {Object} Validation result
 */
export function validateStateTransition(currentState, targetState, context) {
  const stateConfig = DEAL_STATES[currentState];
  
  if (!stateConfig) {
    return { valid: false, error: 'Invalid current state' };
  }
  
  if (!stateConfig.allowedTransitions.includes(targetState)) {
    return { 
      valid: false, 
      error: `Cannot transition from ${currentState} to ${targetState}` 
    };
  }
  
  // Check time limits
  if (stateConfig.timeLimit) {
    const timeElapsed = Date.now() - context.stateStartTime;
    const timeLimit = stateConfig.timeLimit * 60 * 60 * 1000; // Convert to milliseconds
    
    if (timeElapsed > timeLimit) {
      return { 
        valid: false, 
        error: `Time limit exceeded for ${currentState} state` 
      };
    }
  }
  
  // Check required actions completion
  const completedActions = context.completedActions || [];
  const missingActions = stateConfig.requiredActions.filter(
    action => !completedActions.includes(action)
  );
  
  if (missingActions.length > 0) {
    return {
      valid: false,
      error: `Missing required actions: ${missingActions.join(', ')}`,
      missingActions,
    };
  }
  
  // Check user permissions
  if (!hasTransitionPermission(context.userRole, currentState, targetState)) {
    return {
      valid: false,
      error: 'Insufficient permissions for this transition',
    };
  }
  
  return { valid: true };
}
```

## Regulatory Compliance Requirements

### Environmental Regulations
```javascript
const ENVIRONMENTAL_COMPLIANCE = {
  MARPOL_ANNEX_I: {
    description: 'Oil pollution prevention',
    requirements: ['IOPP_certificate', 'oil_record_book', 'sopep_plan'],
    applicableVessels: ['tankers', 'bulk_carriers_over_150gt'],
  },
  
  MARPOL_ANNEX_VI: {
    description: 'Air pollution prevention',
    requirements: ['IAPP_certificate', 'fuel_oil_quality', 'sox_compliance'],
    emissionLimits: {
      sox: { global: 0.5, eca: 0.1 }, // Sulfur content percentage
      nox: 'tier_III_in_neca', // NOx emission standards
    },
  },
  
  BALLAST_WATER_MANAGEMENT: {
    description: 'BWM Convention compliance',
    requirements: ['bwm_certificate', 'bwts_installed', 'bwm_plan'],
    applicableVessels: ['all_vessels_over_400gt'],
  },
};
```

### Security Requirements
```javascript
const SECURITY_COMPLIANCE = {
  ISPS_CODE: {
    description: 'International Ship and Port Facility Security',
    requirements: ['issc_certificate', 'ship_security_plan', 'cso_designated'],
    securityLevels: [1, 2, 3],
    auditFrequency: 'annual',
  },
  
  CSI: {
    description: 'Container Security Initiative',
    requirements: ['24_hour_rule', 'manifest_transmission', 'high_risk_screening'],
    applicablePorts: ['us_ports', 'participating_ports'],
  },
};
```

## Response and Error Handling Standards

### Standard Response Format
```javascript
const MARITIME_RESPONSE_FORMAT = {
  success: {
    data: {}, // Maritime business data
    metadata: {
      units: {}, // Units used in response
      conversions: {}, // Available unit conversions
      standards: [], // Applied maritime standards
      regulations: [], // Relevant regulations
    },
    businessRules: {
      applied: [], // Business rules that were applied
      warnings: [], // Potential issues or recommendations
    },
  },
  
  error: {
    code: '', // Maritime-specific error code
    message: '', // User-friendly message
    technicalDetails: '', // Technical error information
    regulatoryImpact: '', // Impact on regulatory compliance
    suggestedActions: [], // Recommended corrective actions
  },
};
```

This comprehensive maritime standards documentation ensures that ShipLink operates in full compliance with international maritime regulations while providing accurate calculations and validations for all maritime business operations.
