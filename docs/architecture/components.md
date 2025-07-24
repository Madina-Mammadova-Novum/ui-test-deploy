# Component Architecture

ShipLink's component architecture is designed to support complex maritime operations while maintaining clean separation of concerns. Our platform handles critical vessel chartering workflows, cargo negotiations, and maritime documentation, requiring a robust and scalable component structure. This architecture ensures that business logic for maritime operations remains separate from presentation concerns, while supporting real-time updates for vessel positions, cargo status, and negotiation states.

## Component Hierarchy

```
components/
├── elements/     # Basic UI building blocks
├── units/        # Reusable UI components
├── modules/      # Complex business logic components
├── layouts/      # Page layout components
├── blocks/       # CMS-driven content blocks
└── common/       # Shared utilities and providers
```

## Module Components

- **Location**: `/components/modules/${domain}`
- **Purpose**: Complex business logic components with full application context
- **Responsibilities**:
  - Redux state management integration
  - API service integration
  - Role-based rendering logic
  - Complex maritime business workflows
  - Real-time data handling (SignalR)
  - Authentication and authorization

### Key Module Examples

- `Chat` - Real-time messaging system
- `Negotiating` - Offer negotiation workflows
- `PreFixture` - Pre-fixture stage management
- `OnSubs` - On subs stage with document handling
- `Fixture` - Final fixture documentation
- `PostFixture` - Post-fixture execution
- `Fleets` - Vessel fleet management
- `AccountTools` - Maritime calculation tools

## Unit Components

- "Location\*\*: `/components/units`
- **Purpose**: Reusable UI components with moderate complexity
- **Rules**:
  - Medium logic complexity maximum
  - Required PropTypes and defaultProps for complex components
  - camelCase prop naming convention
  - Self-contained functionality
  - Reusable across different modules

### Key Unit Examples

- `SearchForm` - Advanced maritime search interface
- `OfferForm` - Structured offer creation
- `VesselInformationContent` - Vessel detail display
- `ChatConversation` - Chat interface components
- `DocumentUpload` - File upload with maritime document types
- `CountdownTimer` - Real-time offer expiration timers

## Element Components

- **Location**: `/components/elements`
- **Purpose**: Basic UI building blocks
- **Rules**:
  - No business logic whatsoever
  - Pure presentation components
  - Fully reusable across the application
  - Consistent with design system
  - Tailwind CSS only for styling

### Key Element Examples

- `Button` - All button variants and states
- `Table` - Data table with maritime-specific features
- `Portal` - Modal and overlay rendering
- `Toggle` - Switch and checkbox components
- `StatusIndicator` - Visual status representation
- `Dropdown` - Select and multi-select inputs

## Layout Components

- **Location**: `/components/layouts`
- **Purpose**: Page structure and navigation
- **Types**:
  - `BaseLayout` - Root application wrapper
  - `AccountLayout` - Authenticated user interface
  - `PageLayout` - Public page structure
  - `MaintenanceLayout` - System maintenance mode

## Block Components

- **Location**: `/components/blocks`
- **Purpose**: CMS-driven content blocks
- **Integration**: Strapi headless CMS
- **Examples**: Hero blocks, feature sections, contact forms

## Common Components

- **Location**: `/components/common`
- **Purpose**: Shared utilities and providers
- **Examples**:
  - `ClientSidePackages` - Browser-only components
  - `StoreManager` - Redux store provider
  - `BlockManager` - CMS block renderer

## Naming Conventions

- **Pattern**: `^[A-Z][a-zA-Z]+$` (PascalCase)
- **File Structure**: Each component in its own directory with `index.js`
- **Export Pattern**: Named exports preferred for reusability

### Component Suffixes

- **Content components**: `*Content` (e.g., `ChartererInformationContent`)
- **Forms**: `*Form` (e.g., `OfferForm`, `SearchForm`)
- **Modals**: `*Modal` (e.g., `CargoesInfoModal`, `ChatModal`)
- **Lists**: `*List` (e.g., `NotificationList`, `ChatList`)
- **Details**: `*Details` (e.g., `NegotiatingDetails`, `FixtureDetails`)
- **Containers**: `*Container` (e.g., `AccountContainer`)
- **Wrappers**: `*Wrapper` (e.g., `AuthWrapper`, `ModalWrapper`)

## Maritime-Specific Components

### Vessel Components

- Pattern: `Vessel${Purpose}` or `Tanker${Purpose}`
- Examples: `TankerInformationContent`, `VesselSearchResults`
- Purpose: Display vessel specifications, Q88 data, fleet management

### Cargo Components

- Pattern: `Cargo${Purpose}`
- Examples: `CargoesInfoModal`, `CargoesSlotsDetailsForm`
- Purpose: Cargo type selection, quantity management, terminal details

### Negotiation Stage Components

- Pattern: `${Stage}${Component}`
- Examples: `NegotiatingDetails`, `PreFixtureDetails`, `OnSubsDetails`
- Purpose: Stage-specific workflows and data presentation

### Chat Components

- Pattern: `Chat${Purpose}`
- Examples: `ChatConversation`, `ChatMessage`, `ChatModal`
- Purpose: Real-time communication during negotiations

## Component Development Guidelines

### PropTypes Requirements

```javascript
// Required for units and modules
ComponentName.propTypes = {
  // Required props
  vesselId: PropTypes.string.isRequired,
  role: PropTypes.oneOf(['owner', 'charterer']).isRequired,

  // Optional props with defaults
  onUpdate: PropTypes.func,
  showDetails: PropTypes.bool,
};

ComponentName.defaultProps = {
  onUpdate: () => {},
  showDetails: false,
};
```

### State Management Integration

```javascript
// Modules should connect to Redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUserRole } from '@/store/selectors';

const ModuleComponent = () => {
  const role = useSelector(selectUserRole);
  const dispatch = useDispatch();

  // Component logic
};
```

### Role-Based Rendering

```javascript
// Implement role-based access
import { getRoleIdentity } from '@/utils/helpers';

const Component = ({ role }) => {
  const { isOwner, isCharterer } = getRoleIdentity({ role });

  return (
    <>
      {isOwner && <OwnerSpecificContent />}
      {isCharterer && <ChartererSpecificContent />}
    </>
  );
};
```

## Performance Considerations

### Dynamic Imports

```javascript
// For large modules
const HeavyModule = dynamic(() => import('@/modules/HeavyModule'), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});
```

### Memoization

```javascript
// For expensive calculations
const MemoizedComponent = React.memo(({ data }) => {
  const processedData = useMemo(() => expensiveCalculation(data), [data]);

  return <div>{processedData}</div>;
});
```

## Testing Patterns

### Unit Testing

- Test components in isolation
- Mock maritime data scenarios
- Validate PropTypes and error boundaries

### Integration Testing

- Test component interactions
- Validate maritime workflows
- Test role-based rendering

### E2E Testing

- Complete charter party workflows
- Multi-user negotiation scenarios
- Document upload and management flows

## Migration Guidelines

When updating existing components:

1. **Maintain backward compatibility** during transitions
2. **Update PropTypes** to reflect current requirements
3. **Implement proper error boundaries** for maritime data failures
4. **Add loading states** for async operations
5. **Ensure responsive design** across all device sizes

## Common Anti-Patterns to Avoid

- **Direct API calls in components** - Use services layer
- **Inline styles** - Use Tailwind CSS classes only
- **Complex conditional rendering** - Extract to separate components
- **Prop drilling beyond 2 levels** - Use context or Redux
- **Maritime terminology inconsistency** - Follow domain glossary
- **Missing error boundaries** - Critical for financial data accuracy
