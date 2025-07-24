# ShipLink Frontend UI - GitHub Copilot Instructions

## Project Overview

ShipLink is a maritime B2B platform built with Next.js 14 that facilitates vessel chartering, cargo negotiations, and maritime documentation workflows. The platform handles complex shipping operations including vessel position tracking, charter party negotiations, and real-time updates for maritime business processes.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: JavaScript (ES6+)
- **Styling**: Tailwind CSS with custom design system
- **State Management**: Redux Toolkit with Redux Persist
- **Form Handling**: React Hook Form with Yup validation
- **HTTP Client**: Axios
- **UI Components**: Custom component library
- **Authentication**: JWT-based with role-based access control
- **Real-time**: SignalR for chat and notifications
- **Maps**: Leaflet with React Leaflet
- **File Upload**: React Dropzone
- **Date Handling**: date-fns
- **Package Manager**: Yarn (exclusively)

## Architecture Patterns

### Component Hierarchy

```
components/
├── elements/     # Basic UI building blocks (buttons, inputs, etc.)
├── units/        # Reusable UI components with medium complexity
├── modules/      # Complex business logic components
├── layouts/      # Page layout components
├── blocks/       # CMS-driven content blocks
└── common/       # Shared utilities and providers
```

### Key Architectural Principles

1. **Separation of Concerns**: Business logic separated from presentation
2. **Adapter Pattern**: Data transformation layer between API and UI
3. **Service Layer**: Centralized API calls and business logic
4. **Role-based Access**: Owner vs Charterer role differentiation
5. **Real-time Updates**: Live chat, notifications, and status updates

### Directory Structure

- `/adapters/` - Data transformation layer for API responses
- `/services/` - API integration and business logic
- `/store/` - Redux store, slices, and selectors
- `/utils/` - Helper functions and utilities
- `/lib/` - Constants, types, and configuration
- `/models/` - Data models for forms and API
- `/pages/api/` - Next.js API routes (proxy layer)
- `/app/` - Next.js App Router pages
- `/public/` - Static assets and media files

## Maritime Domain Context

### Core Business Entities

- **Vessels/Tankers**: Ships with detailed specifications, Q88 data
- **Cargo**: Different cargo types, terminals, loading/discharge ports
- **Offers**: Negotiation workflow (Negotiating → Pre-fixture → On Subs → Fixture → Post-fixture)
- **Fleets**: Vessel management and organization
- **Charter Parties**: Legal agreements and documentation
- **Positions**: Available vessel positions for chartering

### User Roles

- **Owner**: Vessel owners offering ships for charter
- **Charterer**: Companies seeking to charter vessels for cargo transport

### Workflow Stages

1. **Search**: Charterers search for available vessel positions
2. **Negotiating**: Initial offer discussions and counter-offers
3. **Pre-fixture**: Detailed terms negotiation
4. **On Subs**: Subject to final conditions
5. **Fixture**: Confirmed deal with documentation
6. **Post-fixture**: Execution and completion

## Development Standards

### Component Naming Conventions

- **Pattern**: PascalCase (`^[A-Z][a-zA-Z]+$`)
- **Suffixes**:
  - `*Content` - Content components
  - `*Form` - Form components
  - `*Modal` - Modal dialogs
  - `*List` - List components
  - `*Details` - Detail view components
  - `*Container` - Container components
  - `*Wrapper` - Wrapper components

### Code Patterns

#### Preferred Patterns
```javascript
// Functional components with hooks
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState();
  
  return <div className="tailwind-classes">{content}</div>;
};

// Redux with toolkit
const slice = createSlice({
  name: 'feature',
  initialState,
  reducers: { /* reducers */ }
});

// Service layer for API calls
export async function serviceFunction({ data }) {
  const response = await postData({ url, data: adapter(data) });
  return responseAdapter(response);
}
```

#### Patterns to Avoid
- Direct API calls in components
- Inline styles (use Tailwind classes)
- Complex logic in UI components
- Nested ternaries (max 2 levels)
- Magic numbers/strings
- Prop drilling beyond 2 levels
- Mixing business and presentation logic

### File Organization

#### Adapters
```javascript
// Location: /adapters/${domain}/index.js
// Naming: ${domain}${Direction}Adapter
export function requestDataAdapter({ data }) {
  // Transform UI data for API
}

export function responseDataAdapter({ data }) {
  // Transform API response for UI
}
```

#### Services
```javascript
// Location: /services/${domain}/index.js
import { adapter } from '@/adapters/${domain}';

export async function serviceFunction({ data }) {
  const response = await postData({
    url: '/api/endpoint',
    data: requestAdapter(data)
  });
  return responseAdapter(response);
}
```

#### Components
```javascript
// PropTypes validation required for units/modules
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func
};

ComponentName.defaultProps = {
  prop2: () => {}
};
```

## Maritime-Specific Guidelines

### Terminology
- Use proper maritime terms: "vessel" not "ship", "cargo" not "goods"
- Standard units: MT (metric tons), DWT (deadweight tonnage)
- Port codes: Use LOCODE format (5-character codes)
- Vessel types: Tanker, Bulk Carrier, Container Ship, etc.

### Data Handling
- IMO numbers: 7-digit vessel identification
- Cargo quantities: Always in metric tons
- Dates: Use laycan (lay days cancelling) for charter periods
- Freight rates: Various formats (lump sum, per MT, percentage)

### UI Patterns
- Vessel information cards with technical details
- Interactive maps for port/terminal selection
- Real-time countdown timers for offer deadlines
- Document upload with maritime document types
- Chat system for negotiations

## State Management

### Redux Store Structure
```javascript
store/
├── entities/     # Domain-specific slices
│   ├── user/
│   ├── vessels/
│   ├── offers/
│   ├── chat/
│   └── notifications/
└── selectors/    # Reusable selectors
```

### Key Selectors
- User role and permissions
- Active deals and offers
- Fleet information
- Notification state
- Chat sessions

## API Integration

### Proxy Pattern
- Frontend API routes in `/pages/api/` proxy to backend
- Data adapters transform requests/responses
- Centralized error handling
- Authentication middleware

### Common Endpoints
- `/v1/owner/*` - Owner-specific operations
- `/v1/charterer/*` - Charterer-specific operations
- `/v1/deals/*` - Offer and deal management
- `/v1/vessels/*` - Vessel and fleet operations

## Styling Guidelines

### Tailwind Configuration
- Custom breakpoints for responsive design
- Maritime-themed color palette
- Typography scale optimized for data-heavy interfaces
- Component-specific utility classes

### Responsive Design
- Mobile-first approach
- Breakpoints: xs(375px), sm(480px), md(768px), lg(1280px), xl(1440px)
- Table layouts adapt to mobile with horizontal scroll
- Touch-friendly interface elements

## Performance Considerations

- Dynamic imports for large components
- Image optimization with Next.js Image component
- Lazy loading for data tables and lists
- Efficient re-renders with proper memoization
- Bundle splitting for role-based features

## Security & Authorization

### Role-Based Access Control
```javascript
// Check user permissions
const { isOwner, isCharterer } = getRoleIdentity({ role });

// Conditional rendering
{isOwner && <OwnerOnlyComponent />}
{isCharterer && <ChartererOnlyComponent />}
```

### Data Protection
- JWT token management with automatic refresh
- Sensitive maritime data encryption
- Role-based API endpoint access
- Secure file upload validation

## Common Utilities

### Helper Functions
- `getRoleIdentity()` - User role checking
- `formatCurrency()` - Maritime currency formatting
- `transformDate()` - Date formatting for maritime contexts
- `freightFormatter()` - Freight rate formatting
- `imoFormatter()` - IMO number validation/formatting

### Validation Schemas
- Yup schemas for maritime-specific validations
- IMO number validation
- Port code validation
- Cargo quantity validation
- Date range validation for laycans

## Testing Approach

- Unit tests for adapters and utilities
- Component testing with maritime data scenarios
- Integration tests for critical workflows
- E2E tests for complete charter processes

## Common Issues & Solutions

### Maritime Data Complexity
- Use adapters to normalize complex API responses
- Implement proper error boundaries for data failures
- Handle missing/optional maritime data gracefully

### Real-time Updates
- SignalR connection management
- State synchronization for live data
- Proper cleanup of connections

### Performance with Large Datasets
- Virtual scrolling for large vessel lists
- Pagination for search results
- Efficient filtering and sorting

Remember: This is a complex maritime B2B platform where data accuracy and user experience are critical for multi-million dollar shipping deals. Always consider the business impact of UI/UX decisions and maintain the highest code quality standards.