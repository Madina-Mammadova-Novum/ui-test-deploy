# Documentation Standards

Clear, comprehensive documentation is essential for maintaining a complex maritime B2B platform. These standards ensure that all team members understand both the technical implementation and maritime business context of our codebase. Our documentation requirements emphasize the connection between shipping industry requirements and technical solutions, making it easier to maintain and extend the platform's capabilities.

## Documentation Hierarchy

### Level 1: Architecture Documentation
- **Purpose**: High-level system design and maritime business context
- **Audience**: Technical leads, product managers, new team members
- **Location**: `/docs/architecture/`
- **Update Frequency**: Quarterly or with major architectural changes

### Level 2: API Documentation
- **Purpose**: Detailed API specifications and maritime data contracts
- **Audience**: Frontend and backend developers, integration partners
- **Location**: `/docs/api/` and inline code documentation
- **Update Frequency**: With each API change

### Level 3: Component Documentation
- **Purpose**: Individual component usage and maritime-specific props
- **Audience**: Frontend developers
- **Location**: Component files and Storybook
- **Update Frequency**: With each component change

### Level 4: Business Rules Documentation
- **Purpose**: Maritime industry rules and compliance requirements
- **Audience**: Product team, QA, developers
- **Location**: `/docs/maritime/` and inline business logic
- **Update Frequency**: When maritime regulations change

## Component Documentation Standards

### JSDoc Component Template
```javascript
/**
 * @component VesselSearchCard
 * @description Interactive vessel search result card with maritime-specific details
 * 
 * Displays comprehensive vessel information including technical specifications,
 * current position, cargo capabilities, and availability status. Integrates with
 * maritime databases for real-time vessel tracking and charter availability.
 * 
 * @param {Object} props - Component properties
 * @param {Vessel} props.vessel - Complete vessel object with technical specs
 * @param {string} props.vessel.id - Unique vessel identifier
 * @param {string} props.vessel.name - Vessel name as registered with IMO
 * @param {string} props.vessel.imo - 7-digit IMO number (International Maritime Organization)
 * @param {number} props.vessel.dwt - Deadweight tonnage capacity
 * @param {string} props.vessel.flag - Flag state registration
 * @param {Object} props.vessel.position - Current geographical position
 * @param {Function} props.onSelect - Callback when vessel is selected for charter
 * @param {boolean} props.showTechnicalDetails - Whether to display technical specifications
 * @param {string} props.userRole - Current user role (owner/charterer)
 * 
 * @maritime
 * - Displays DWT (Deadweight Tonnage) in metric tons
 * - Shows vessel type according to IMO classification
 * - Includes current position with port proximity
 * - Indicates charter availability status
 * - Complies with maritime data privacy regulations
 * 
 * @business
 * - Only shows available vessels to charterers
 * - Owners see all their fleet vessels regardless of status
 * - Pricing information hidden until formal negotiation starts
 * 
 * @example
 * <VesselSearchCard
 *   vessel={{
 *     id: "vessel-123",
 *     name: "MT Nordic Star",
 *     imo: "9123456",
 *     dwt: 75000,
 *     flag: "Marshall Islands",
 *     position: { lat: 51.5074, lng: -0.1278 }
 *   }}
 *   onSelect={handleVesselSelection}
 *   showTechnicalDetails={true}
 *   userRole="charterer"
 * />
 */
```

### PropTypes Documentation
```javascript
VesselSearchCard.propTypes = {
  // Core vessel data - required for maritime compliance
  vessel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imo: PropTypes.string.isRequired, // Must be valid 7-digit IMO
    dwt: PropTypes.number.isRequired, // Deadweight tonnage in MT
    flag: PropTypes.string.isRequired,
    position: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }),
    // Technical specifications
    buildYear: PropTypes.number,
    vesselType: PropTypes.oneOf(['tanker', 'bulk-carrier', 'container', 'lng']),
    enginePower: PropTypes.number, // in kW
    fuelConsumption: PropTypes.number, // MT per day
  }).isRequired,
  
  // Interaction handlers
  onSelect: PropTypes.func,
  onFavorite: PropTypes.func,
  
  // Display options
  showTechnicalDetails: PropTypes.bool,
  showPosition: PropTypes.bool,
  compact: PropTypes.bool,
  
  // User context
  userRole: PropTypes.oneOf(['owner', 'charterer', 'broker']).isRequired,
};

VesselSearchCard.defaultProps = {
  onSelect: () => {},
  onFavorite: () => {},
  showTechnicalDetails: false,
  showPosition: true,
  compact: false,
};
```

## Utility Function Documentation

### Maritime Utility Template
```javascript
/**
 * @util calculateFreightEstimate
 * @description Calculates freight estimation for maritime cargo transportation
 * 
 * Implements industry-standard freight calculation methodology accounting for:
 * - Base freight rate per metric ton
 * - Distance-based adjustments using great circle navigation
 * - Seasonal rate variations (Q4 premium, Q1 discount)
 * - Port congestion surcharges based on current port status
 * - Fuel price fluctuations with Bunker Adjustment Factor (BAF)
 * - Currency exchange rate considerations
 * 
 * @param {Object} params - Freight calculation parameters
 * @param {number} params.cargoQuantity - Cargo quantity in metric tons (MT)
 * @param {string} params.cargoType - Cargo type identifier (crude-oil, lng, chemicals)
 * @param {Object} params.route - Route information
 * @param {string} params.route.loadPort - Loading port UN/LOCODE (5 characters)
 * @param {string} params.route.dischargePort - Discharge port UN/LOCODE (5 characters)
 * @param {number} params.route.distance - Route distance in nautical miles
 * @param {Date} params.laycanStart - Earliest loading date (laycan start)
 * @param {Date} params.laycanEnd - Latest loading date (laycan end)
 * @param {number} params.baseRate - Base freight rate per MT in USD
 * @param {Object} params.vessel - Vessel specifications
 * @param {number} params.vessel.dwt - Vessel deadweight tonnage
 * @param {number} params.vessel.speed - Service speed in knots
 * @param {number} params.vessel.consumption - Daily fuel consumption in MT
 * 
 * @returns {Object} Comprehensive freight calculation result
 * @returns {number} returns.totalFreight - Total freight cost in USD
 * @returns {number} returns.ratePerTon - Effective rate per metric ton
 * @returns {number} returns.voyageDuration - Estimated voyage duration in days
 * @returns {Array<Object>} returns.adjustments - Applied rate adjustments
 * @returns {Object} returns.breakdown - Detailed cost breakdown
 * 
 * @throws {ValidationError} When cargo quantity exceeds vessel DWT capacity
 * @throws {ValidationError} When port codes are not valid UN/LOCODE format
 * @throws {BusinessRuleError} When ports are not accessible for specified cargo type
 * @throws {BusinessRuleError} When laycan dates are in the past or invalid
 * 
 * @maritime
 * - Follows IMO guidelines for cargo capacity calculations
 * - Respects port restrictions for specific cargo types
 * - Accounts for seasonal weather patterns affecting voyage times
 * - Includes mandatory port state control delays
 * 
 * @business
 * - Freight rates are indicative only until formal offer
 * - Final rates subject to market conditions at fixture time
 * - Additional costs (port charges, agencies) are separate
 * - Currency hedging options available for long-term contracts
 * 
 * @example
 * const estimate = calculateFreightEstimate({
 *   cargoQuantity: 50000,
 *   cargoType: 'crude-oil',
 *   route: {
 *     loadPort: 'AEJEA', // Jebel Ali, UAE
 *     dischargePort: 'USHOU', // Houston, USA
 *     distance: 8200
 *   },
 *   laycanStart: new Date('2024-03-15'),
 *   laycanEnd: new Date('2024-03-18'),
 *   baseRate: 45.50,
 *   vessel: {
 *     dwt: 75000,
 *     speed: 14,
 *     consumption: 35
 *   }
 * });
 * 
 * console.log(estimate.totalFreight); // 2,275,000 USD
 * console.log(estimate.ratePerTon); // 45.50 USD/MT
 * console.log(estimate.voyageDuration); // 24 days
 */
export function calculateFreightEstimate(params) {
  // Implementation with comprehensive validation and calculation
}
```

### Data Validation Documentation
```javascript
/**
 * @util validateIMONumber
 * @description Validates International Maritime Organization (IMO) vessel numbers
 * 
 * Performs comprehensive IMO number validation including:
 * - Format validation (exactly 7 digits)
 * - Check digit algorithm verification
 * - Blacklist verification against known invalid numbers
 * - Integration with IMO database for existence verification
 * 
 * @param {string} imo - IMO number to validate
 * @returns {Object} Validation result
 * @returns {boolean} returns.valid - Whether IMO number is valid
 * @returns {string} returns.error - Error message if invalid
 * @returns {Object} returns.vessel - Basic vessel info if valid (optional)
 * 
 * @maritime
 * IMO numbers are assigned by Lloyd's Register on behalf of the IMO.
 * The check digit is calculated using the sum of the first 6 digits
 * multiplied by their position (7,6,5,4,3,2) modulo 10.
 * 
 * @example
 * validateIMONumber('9074729'); // { valid: true }
 * validateIMONumber('1234567'); // { valid: false, error: 'Invalid check digit' }
 */
```

## Service Documentation Standards

### API Service Template
```javascript
/**
 * @service VesselSearchService
 * @description Comprehensive vessel search functionality for maritime charter operations
 * 
 * Provides advanced search capabilities across global vessel fleet including:
 * - Real-time availability status from maritime databases
 * - Technical specification filtering
 * - Geographical constraint-based search
 * - Charter history and reputation scoring
 * - Integration with AIS (Automatic Identification System) for positions
 * 
 * @endpoint /api/v1/vessels/search
 * @method POST
 * @authentication Required - JWT token with vessel search permissions
 * @rateLimit 20 requests per minute per user
 * 
 * @business
 * - Charterers see only available vessels matching their cargo requirements
 * - Owners can search across all vessels for market intelligence
 * - Brokers have access to extended fleet information
 * - Historical charter data influences search ranking
 * 
 * @maritime
 * - Complies with ISPS (International Ship and Port Facility Security) code
 * - Respects flag state regulations for vessel information disclosure
 * - Integrates with port state control databases
 * - Follows IMO data classification standards
 * 
 * @param {Object} searchCriteria - Vessel search parameters
 * @param {string} searchCriteria.cargoType - Required cargo type capability
 * @param {Object} searchCriteria.capacity - Cargo capacity requirements
 * @param {number} searchCriteria.capacity.min - Minimum DWT in metric tons
 * @param {number} searchCriteria.capacity.max - Maximum DWT in metric tons
 * @param {Object} searchCriteria.position - Geographical constraints
 * @param {Array<string>} searchCriteria.acceptableFlags - Acceptable flag states
 * @param {Date} searchCriteria.availableFrom - Required availability date
 * @param {Object} searchCriteria.route - Optional route information for optimization
 * 
 * @returns {Promise<Object>} Search results with vessel list and metadata
 * @returns {Array<Vessel>} returns.vessels - Matching vessels with complete information
 * @returns {number} returns.totalCount - Total vessels matching criteria
 * @returns {Object} returns.aggregations - Search result aggregations
 * @returns {Array<string>} returns.suggestedRefinements - Suggested search refinements
 * 
 * @throws {ValidationError} 400 - Invalid search criteria format
 * @throws {AuthenticationError} 401 - Invalid or expired authentication token
 * @throws {AuthorizationError} 403 - Insufficient permissions for vessel search
 * @throws {RateLimitError} 429 - Too many search requests
 * @throws {ServiceError} 500 - Internal vessel database service failure
 * 
 * @example
 * const searchResults = await vesselSearchService({
 *   cargoType: 'crude-oil',
 *   capacity: { min: 50000, max: 100000 },
 *   position: {
 *     region: 'persian-gulf',
 *     radius: 500 // nautical miles
 *   },
 *   acceptableFlags: ['Marshall Islands', 'Liberia', 'Panama'],
 *   availableFrom: new Date('2024-04-01')
 * });
 */
```

## Business Rules Documentation

### Maritime Compliance Documentation
```javascript
/**
 * @businessRule VesselCharter Approval Process
 * @regulation IMO MARPOL Annex I & VI, Flag State Requirements
 * @description Automated vessel charter approval workflow
 * 
 * MANDATORY CHECKS:
 * 1. Vessel Certificate Validation
 *    - Class Certificate (valid and not expired)
 *    - Safety Management Certificate (ISM Code compliance)
 *    - ISPS Certificate (security compliance)
 *    - P&I Insurance Certificate (minimum $1B coverage)
 * 
 * 2. Flag State Compliance
 *    - Vessel must be flagged in acceptable jurisdictions
 *    - White list: Marshall Islands, Liberia, Panama, Singapore, UK
 *    - Gray list: Requires additional documentation
 *    - Black list: Automatic rejection
 * 
 * 3. Port State Control History
 *    - No detention in last 12 months
 *    - Maximum 2 deficiencies in last 6 months
 *    - Clean PSC record required for high-value cargoes
 * 
 * 4. Cargo Compatibility
 *    - Vessel type must match cargo requirements
 *    - Previous cargo compatibility (no contamination risk)
 *    - Tank coating compatibility for chemical cargoes
 * 
 * @implementation
 * - Automated certificate verification via maritime APIs
 * - Real-time PSC database integration
 * - Machine learning risk assessment
 * - Manual override capability for senior chartering managers
 * 
 * @exceptions
 * - Emergency charter situations (requires C-level approval)
 * - Government requisition orders
 * - Force majeure circumstances
 * 
 * @auditRequirements
 * - All approval decisions logged with reasoning
 * - Quarterly compliance review with maritime legal team
 * - Annual external audit by maritime insurance surveyors
 */
```

## TODO and Technical Debt Documentation

### Standard TODO Format
```javascript
/**
 * TODO Categories:
 * - P0: Critical - Blocks release or creates security vulnerability
 * - P1: High - Significant impact on user experience or performance
 * - P2: Medium - Nice to have improvement or minor bug
 * - P3: Low - Future enhancement or optimization
 * 
 * Format: TODO(assignee): Description [Priority] [Ticket] [Deadline]
 */

// TODO(john.smith): Implement vessel speed validation for fuel consumption accuracy [P2] [SL-456] [2024-Q2]
// TODO(maritime-team): Add IMO DCS compliance reporting [P1] [SL-789] [2024-03-15]
// TODO(performance): Optimize vessel search query for >10k vessels [P2] [SL-234]

/**
 * FIXME: Temporary workaround for API rate limiting
 * 
 * Current implementation uses setTimeout to throttle requests,
 * but this should be replaced with proper rate limiting middleware.
 * 
 * @see https://github.com/company/maritime-api/issues/123
 * @deadline 2024-04-01
 * @assignee api-team
 */
```

### Technical Debt Documentation
```javascript
/**
 * @technicalDebt Vessel Position Caching
 * @priority P2
 * @effort 2 weeks
 * @impact Performance improvement for 80% of vessel searches
 * 
 * @problem
 * Current implementation fetches vessel positions in real-time for every search,
 * causing 2-3 second delays and high API costs. AIS data updates every 3 minutes
 * but we're fetching every request.
 * 
 * @solution
 * Implement Redis-based caching with 3-minute TTL for vessel positions.
 * Background job updates positions from AIS stream. Fallback to real-time
 * for critical operations.
 * 
 * @risks
 * - Slightly stale position data (max 3 minutes)
 * - Additional Redis infrastructure complexity
 * - Cache invalidation complexity for specific vessels
 * 
 * @metrics
 * - Current: 2.3s average search response time
 * - Target: 0.8s average search response time
 * - Cost reduction: 60% fewer AIS API calls
 */
```

## API Documentation Standards

### Endpoint Documentation Template
```markdown
## POST /api/v1/deals/offers

### Description
Create a new charter party offer between vessel owner and charterer.

### Maritime Context
This endpoint initiates the formal offer process in maritime charter negotiations.
Offers are legally binding preliminary agreements subject to detailed terms
negotiation and subject removal.

### Business Rules
- Only charterers can initiate offers
- Vessel must be available during specified laycan period
- Cargo quantity must not exceed 95% of vessel DWT
- Offer automatically expires after 48 hours unless extended

### Authentication
Bearer token required with `offers:create` permission.

### Rate Limiting
- 10 offers per hour per user
- 50 offers per day per company

### Request Body
```json
{
  "vesselId": "string", // Required - UUID of target vessel
  "cargoDetails": {
    "type": "string", // Required - Cargo type identifier  
    "quantity": "number", // Required - Quantity in metric tons
    "loadTerminal": "string", // Required - Loading terminal ID
    "dischargeTerminal": "string" // Required - Discharge terminal ID
  },
  "commercialTerms": {
    "freight": "number", // Required - Freight rate in USD/MT
    "laycanStart": "string", // Required - ISO date string
    "laycanEnd": "string", // Required - ISO date string
    "paymentTerms": "string" // Required - Payment terms code
  },
  "additionalTerms": "string" // Optional - Additional conditions
}
```

### Response Body
```json
{
  "success": true,
  "data": {
    "offerId": "string",
    "status": "negotiating",
    "expiresAt": "string",
    "estimatedValue": "number"
  },
  "message": "Offer created successfully"
}
```

### Error Responses
- `400` - Invalid request data or business rule violation
- `401` - Authentication required
- `403` - Insufficient permissions (not a charterer)
- `409` - Vessel not available during specified period
- `429` - Rate limit exceeded

### Example Usage
```javascript
const response = await fetch('/api/v1/deals/offers', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    vesselId: 'vessel-123',
    cargoDetails: {
      type: 'crude-oil',
      quantity: 75000,
      loadTerminal: 'terminal-456',
      dischargeTerminal: 'terminal-789'
    },
    commercialTerms: {
      freight: 45.50,
      laycanStart: '2024-04-15T00:00:00Z',
      laycanEnd: '2024-04-18T00:00:00Z',
      paymentTerms: 'net-15'
    }
  })
});
```
```

## Documentation Maintenance

### Review Schedule
- **Weekly**: Component documentation updates with new features
- **Monthly**: API documentation review and updates
- **Quarterly**: Architecture documentation review
- **Annually**: Complete maritime business rules audit

### Documentation Ownership
- **Components**: Frontend team members who create/modify components
- **APIs**: Backend team with frontend team review
- **Business Rules**: Product team with maritime expert review
- **Architecture**: Technical leads and senior developers

### Quality Gates
- All new components require JSDoc documentation
- All API changes require updated documentation
- Business rule changes require stakeholder approval
- Documentation must be reviewed before code merge

This comprehensive documentation standard ensures that ShipLink's complex maritime operations are well-documented, maintainable, and accessible to all team members while preserving critical maritime industry knowledge.
