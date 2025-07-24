# API Architecture

The ShipLink API is built to handle complex maritime B2B operations, connecting vessel owners, charterers, and brokers in a secure and efficient environment. Our API structure supports real-time vessel tracking, complex freight negotiations, and maritime document handling while ensuring compliance with international shipping standards. This architecture enables seamless integration of maritime business processes while maintaining strict security and data integrity requirements for global shipping operations.

## Base Structure

### API Organization
- **Root**: `pages/api` (Next.js API routes acting as proxy layer)
- **Backend Integration**: Strapi-based backend with custom maritime extensions
- **Version**: v1 (with backwards compatibility support)
- **Protocol**: HTTPS only with JWT authentication

### Core Endpoint Categories

#### Authentication & Authorization
- `/auth/login` - User authentication with role-based access
- `/auth/refresh` - JWT token refresh mechanism
- `/auth/logout` - Secure session termination
- `/auth/verify` - Account verification for new users

#### Maritime Business Operations
- `/calculator/freightestimation/*` - Freight calculation tools
- `/v1/owner/*` - Vessel owner specific operations
- `/v1/charterer/*` - Charterer specific operations
- `/v1/cargotypes/*` - Cargo type management
- `/v1/*/vessels/*` - Vessel and fleet operations
- `/v1/*/deals/*` - Offer and negotiation management
- `/v1/*/account/*` - User account management

#### Real-time Features
- `/chat/*` - Chat system integration
- `/notifications/*` - Push notification handling
- `/websocket/*` - SignalR connection endpoints

## API Handler Pattern

### Response Handler Structure
```javascript
// Standard pattern for all API routes
export default async function handler(req, res) {
  return responseHandler({
    req,
    res,
    path: getApiURL(endpoint),
    dataAdapter: domainAdapter,
    requestMethod: 'GET|POST|PUT|DELETE',
    options: { headers: { ...ContentTypeJson() } },
  });
}
```

### Required Components
- **Data Adapter**: Transform request/response data
- **Request Method Validation**: Ensure proper HTTP method usage
- **Authorization Checks**: Role-based access control
- **Error Handling**: Comprehensive error management
- **Logging**: Audit trail for maritime operations

### Security Middleware
- JWT token validation
- Role-based endpoint access
- Rate limiting for API calls
- CORS configuration for cross-origin requests
- Request sanitization and validation

## Data Adapters

### Adapter Architecture
- **Location**: `/adapters/${domain}/index.js`
- **Naming Convention**: `${domain}${Direction}Adapter`
- **Purpose**: Data transformation layer between UI and API

### Adapter Types

#### Request Adapters
```javascript
// Transform UI data for API consumption
export function requestOfferAdapter({ data }) {
  return {
    vesselId: data.vessel?.id,
    cargoDetails: {
      type: data.cargoType,
      quantity: parseFloat(data.quantity),
      loadPort: data.loadTerminal?.port?.id,
      dischargePort: data.dischargeTerminal?.port?.id,
    },
    commercialTerms: {
      freight: formatFreightRate(data.freight),
      laycan: {
        start: formatDate(data.laycanStart),
        end: formatDate(data.laycanEnd),
      },
    },
  };
}
```

#### Response Adapters
```javascript
// Transform API response for UI consumption
export function responseOffersAdapter({ data }) {
  if (!Array.isArray(data)) return [];
  
  return data.map(offer => ({
    id: offer.id,
    status: offer.attributes.status,
    vessel: {
      name: offer.attributes.vessel?.data?.attributes?.name,
      imo: offer.attributes.vessel?.data?.attributes?.imo,
    },
    cargo: {
      type: offer.attributes.cargoType?.data?.attributes?.name,
      quantity: offer.attributes.quantity,
    },
    dates: {
      laycanStart: offer.attributes.laycanStart,
      laycanEnd: offer.attributes.laycanEnd,
      expiresAt: offer.attributes.expiresAt,
    },
  }));
}
```

### Adapter Requirements
- **Input Validation**: Validate all incoming data
- **Data Transformation**: Convert between UI and API formats
- **Error Handling**: Graceful error management
- **Null Safety**: Handle missing or undefined data
- **Maritime Standards**: Comply with shipping industry formats

## Business Rules Implementation

### Offer Workflow Rules
1. **Negotiating Stage**:
   - Only charterers can initiate offers
   - Owners can accept, decline, or counter-offer
   - Maximum 5 counter-offers per deal
   - 24-hour expiration for initial offers

2. **Pre-fixture Stage**:
   - Detailed vessel and cargo information required
   - Document upload becomes mandatory
   - Final commercial terms must be agreed
   - 48-hour countdown for documentation

3. **On Subs Stage**:
   - Subject removal requires both parties' confirmation
   - Legal documentation review period
   - Bank guarantees and certificates validation
   - 72-hour maximum duration

4. **Fixture Stage**:
   - Immutable commercial terms
   - Charter party generation
   - Final document exchange
   - Deal completion triggers payment processes

### Role-Based Access Rules
```javascript
// Owner permissions
const OWNER_PERMISSIONS = {
  canCreatePositions: true,
  canAcceptOffers: true,
  canManageFleets: true,
  canViewAllDeals: true,
  canUploadVesselDocs: true,
};

// Charterer permissions
const CHARTERER_PERMISSIONS = {
  canSearchVessels: true,
  canMakeOffers: true,
  canViewOwnDeals: true,
  canUploadCargoDocs: true,
  canAccessCalculators: true,
};
```

### Maritime Validation Rules
- **IMO Numbers**: Must be valid 7-digit vessel identification
- **Port Codes**: Must follow UN/LOCODE standard (5 characters)
- **Cargo Quantities**: Minimum 1 MT, maximum vessel DWT capacity
- **Laycan Dates**: Start date must be before end date, minimum 3 days spread
- **Freight Rates**: Must be positive numbers in acceptable currency formats

## Error Handling Strategy

### Error Categories
1. **Validation Errors** (400): Invalid input data
2. **Authentication Errors** (401): Invalid or expired tokens
3. **Authorization Errors** (403): Insufficient permissions
4. **Not Found Errors** (404): Resource doesn't exist
5. **Business Rule Violations** (422): Maritime-specific rule violations
6. **Server Errors** (500): Internal system failures

### Error Response Format
```javascript
{
  error: {
    code: 'INVALID_VESSEL_IMO',
    message: 'The provided IMO number is invalid',
    details: 'IMO numbers must be exactly 7 digits',
    timestamp: '2025-07-24T10:30:00Z',
    traceId: 'abc123-def456-ghi789',
  }
}
```

### Logging Requirements
- All API requests and responses
- Authentication attempts and failures
- Business rule violations
- Performance metrics
- Maritime operation audit trails

## Performance Optimization

### Caching Strategy
- **Static Data**: Port lists, cargo types, vessel categories
- **User Sessions**: Authentication tokens and permissions
- **Frequently Accessed**: Active deals and vessel positions
- **Cache Duration**: Varies by data type (5 minutes to 24 hours)

### Rate Limiting
- **General API**: 100 requests per minute per user
- **Search Operations**: 20 requests per minute
- **File Uploads**: 5 requests per minute
- **Real-time Updates**: 200 requests per minute

### Database Optimization
- Indexed queries for vessel searches
- Optimized joins for complex maritime data
- Connection pooling for high traffic
- Read replicas for reporting queries

## Security Implementation

### Authentication Flow
1. User credentials validation
2. Role-based JWT token generation
3. Token includes user permissions and role
4. Automatic token refresh mechanism
5. Secure logout with token invalidation

### Data Protection
- Sensitive maritime data encryption at rest
- TLS 1.3 for data in transit
- Regular security audits and penetration testing
- GDPR compliance for personal data
- Maritime industry compliance (IMO regulations)

### API Security Headers
```javascript
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Content-Security-Policy': "default-src 'self'",
};
```

## Integration Patterns

### External Services
- **Vessel Tracking**: AIS data integration
- **Weather Services**: Route optimization data
- **Port Information**: Real-time port congestion
- **Exchange Rates**: Multi-currency support
- **Document Verification**: Maritime certificate validation

### Webhook Implementation
- Deal status changes notification
- Vessel position updates
- Document upload confirmations
- Payment status updates
- Regulatory compliance alerts

## API Documentation Standards

### Endpoint Documentation Requirements
- Clear description of maritime business purpose
- Request/response examples with real maritime data
- Error scenarios and handling
- Authentication requirements
- Rate limiting information
- Business rule explanations

### Testing Requirements
- Unit tests for all adapters
- Integration tests for critical workflows
- Load testing for high-traffic endpoints
- Security testing for authentication flows
- Maritime business scenario testing
