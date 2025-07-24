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
- `/utils/hooks/` - Custom React hooks for complex logic
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
- **Assigned Tasks**: Task management system for countdown timers and deadline tracking
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
  reducers: {
    /* reducers */
  },
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
- Magic numbers/strings (extract countdown values to constants)
- Prop drilling beyond 2 levels
- Mixing business and presentation logic
- Using deprecated `frozenAt` field (use `countdownStatus` instead)
- Hardcoded success/error messages (extract to constants)
- Deep object access without optional chaining
- Including `selectedOption` in useEffect dependencies when it causes infinite loops

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
    data: requestAdapter(data),
  });
  return responseAdapter(response);
}
```

#### Assigned Tasks Services

```javascript
// Location: /services/assignedTasks/index.js
// Pattern for task-based countdown management
export const getAssignedTasks = async ({ targetId, purpose, status }) => {
  const queryParams = new URLSearchParams();
  if (targetId) queryParams.append('targetId', targetId);
  if (purpose) queryParams.append('purpose', purpose);

  const endpoint = `assigned-tasks${queryParams.toString() ? `?${queryParams}` : ''}`;
  return await getData(endpoint);
};

export const submitTaskExtensionRequest = async ({ taskId, data }) => {
  const endpoint = `assigned-tasks/${taskId}/extension-requests`;
  return await postData(endpoint, data);
};
```

#### Enhanced Countdown Services

```javascript
// Location: /services/countdownTimer/index.js
// Updated pattern with purpose-based configuration
export const getCountdownConfigs = async ({ purpose = null } = {}) => {
  const queryParams = purpose ? `?purpose=${purpose}` : '';
  return await getData(`countdown-configs${queryParams}`);
};
```

#### Components

```javascript
// PropTypes validation required for units/modules
ComponentName.propTypes = {
  prop1: PropTypes.string.isRequired,
  prop2: PropTypes.func,
};

ComponentName.defaultProps = {
  prop2: () => {},
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
- Dynamic countdown timers with status-based rendering (`Running`, `Paused`, `NotStarted`, `Expired`)
- Extension request modals with configurable time options
- Document upload with maritime document types
- Dropdown components with external state synchronization
- Chat system for negotiations

## State Management

### Redux Store Structure

```javascript
store/
├── entities/     # Domain-specific slices
│   ├── user/
│   ├── vessels/
│   ├── offers/
│   ├── negotiating/     # Negotiation workflow state
│   ├── pre-fixture/     # Pre-fixture state with countdown data
│   ├── on-subs/         # On-subs workflow state
│   ├── chat/
│   └── notifications/   # Notifications with deal data updates
└── selectors/    # Reusable selectors
```

### Key Selectors

- User role and permissions
- Active deals and offers
- Fleet information
- Notification state with deal countdown data
- Chat sessions
- Assigned tasks and countdown status

## Countdown Timer & Task Management System

### Architecture Overview

The platform uses a sophisticated countdown system for managing offer deadlines with the following components:

#### Assigned Tasks System

```javascript
// Service layer for assigned tasks
import { getAssignedTasks, getTaskExtensionTimeOptions, submitTaskExtensionRequest } from '@/services/assignedTasks';

// Typical usage pattern
const assignedTasksResponse = await getAssignedTasks({
  targetId: offerId,
  purpose: 'NegotiatingOffer', // or 'PreFixture'
});

// Common task selection pattern - prioritize "Created" status
const tasks = assignedTasksResponse?.data || [];
const createdTask = tasks.find((task) => task.status === 'Created') || tasks[0];

// Extract countdown data from the selected task
const expiresAt = createdTask?.countdownTimer?.expiresAt;
const countdownStatus = createdTask?.countdownTimer?.status;
const taskId = createdTask?.id;
```

#### Countdown Status Management

- **`Running`**: Active countdown timer
- **`Paused`**: Timer temporarily stopped
- **`NotStarted`**: Timer not yet activated
- **`Expired`**: Countdown has finished

#### Dynamic Configuration

```javascript
// Get countdown configurations by purpose
const response = await getCountdownConfigs({ purpose: 'NegotiatingOffer' });
const convertedOptions = convertDataToOptions({ data: response.data }, 'value', 'text');

// Default countdown is now in minutes (not a string)
const defaultCountdown = convertedOptions.find(({ value }) => value === DEFAULT_COUNTDOWN_OPTION); // 45 minutes
```

### Key Patterns

#### Countdown Data Calculation

```javascript
// Updated helper - no longer uses frozenAt parameter
export const calculateCountdown = (expiresAt) => {
  const currentUTCtime = Date.now();
  const millisecondsUntilExpiration = new Date(expiresAt).getTime() - currentUTCtime;

  // Return 0 to explicitly indicate expiration state
  return millisecondsUntilExpiration < 0 ? 0 : Date.now() + millisecondsUntilExpiration;
};
```

#### Extension Request Pattern

```javascript
// Modern extension pattern using assigned tasks
const handleExtendCountdown = async () => {
  const { error, message } = await submitTaskExtensionRequest({
    taskId,
    data: {
      requestedMinutes: selectedOption.value,
      description: `Requesting extension for offer ${offerId}`,
    },
  });

  if (!error) {
    dispatch(
      updateCountdown({
        offerId,
        extendMinute: selectedOption.value,
      })
    );
    onExtensionSuccess(selectedOption.value);
  }
};
```

#### Extension Time Options Pattern

```javascript
// Fetch extension options and check availability
const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId });
const allowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
const extensionTimeOptions = extensionTimeOptionsResponse?.data?.options || [];

// Adapt options for dropdown component
import { extensionTimeOptionsAdapter } from '@/adapters/pre-fixture';
const adaptedOptions = extensionTimeOptionsAdapter({ options: extensionTimeOptions });
```

#### Adapter Patterns for Countdown

```javascript
// Enhanced adapters now include countdown status
export const offerDetailsAdapter = ({ data, role }) => {
  const { expiresAt, countdownStatus, allowExtension, extensionTimeOptions, taskId } = data;

  return {
    allowExtension,
    isCountdownActive: countdownStatus === 'Running',
    extensionTimeOptions:
      extensionTimeOptions?.map((option) => ({
        value: option.value,
        label: option.text || option.label,
      })) || [],
    taskId,
    countdownData: {
      date: calculateCountdown(expiresAt),
      autoStart: countdownStatus === 'Running',
    },
    // ... other properties
  };
};

// Extension time options adapter for dropdown formatting
export const extensionTimeOptionsAdapter = ({ options }) => {
  if (!Array.isArray(options)) return [];

  return options.map((option) => ({
    label: option.label || `${option.value} Minutes`,
    value: option.value,
    ...option, // preserve any other properties
  }));
};
```

### Component Integration

#### ExtendCountdown Unit Component

```javascript
// Reusable countdown extension modal
<ExtendCountdown
  offerId={offerId}
  taskId={taskId}
  onExtensionSuccess={handleExtensionSuccess}
  title="Request to change countdown"
  description="In order to increase countdown time, please send the request."
  options={extensionTimeOptions}
/>
```

#### Enhanced Dropdown with External State

```javascript
// Dropdown now supports defaultValue synchronization
<Dropdown
  defaultValue={selectedOption}
  options={extensionTimeOptions}
  onChange={setSelectedOption}
  customStyles={{ dropdownWidth: 130 }}
/>
```

#### Dynamic Countdown Timer with Status

```javascript
// Updated timer component with status support
<DynamicCountdownTimer
  date={countdownData.date}
  autoStart={countdownData.autoStart}
  status={countdownStatus} // 'Running', 'Paused', 'NotStarted', 'Expired'
  variant="primary"
/>
```

### State Management Patterns

#### Redux Actions for Countdown

```javascript
// Updated actions accept extendMinute parameter
dispatch(
  updateCountdown({
    offerId,
    parentId,
    extendMinute: selectedOption.value, // Dynamic extension time
  })
);

// New action for assigned tasks synchronization
dispatch(
  updateAssignedTasksForOffers({
    parentId,
    offers: enhancedOffers,
    type: 'incoming',
  })
);

// Fetch countdown data for individual deals
dispatch(
  fetchDealCountdownData({
    dealId: offerId,
  })
);
```

#### Custom Hook for Assigned Tasks

```javascript
// Centralized hook for task management
import { useAssignedTasks } from '@/utils/hooks';

const { fetchAndUpdateAssignedTasks } = useAssignedTasks();

// Usage in components
useEffect(() => {
  if (incomingData?.length > 0) {
    fetchAndUpdateAssignedTasks(incomingData, data.id, 'incoming');
  }
}, []);
```

### Error Prevention Patterns

Based on PR review feedback, always implement these safety patterns:

#### Null Safety for Arrays

```javascript
// Always check array length before accessing elements
const maxTime = options.length > 0 ? options[options.length - 1]?.label : 'N/A';
```

#### Optional Chaining for Deep Objects

```javascript
// Use optional chaining to prevent runtime errors
if (state.data.offerById?.[parentId]?.[type]) {
  state.data.offerById[parentId][type] = offers;
}
```

#### Constants for Repeated Messages

```javascript
// Extract repeated messages to constants
export const EXTENSION_SUCCESS_MESSAGE = 'Extension request submitted successfully';
export const EXTENSION_ERROR_MESSAGE = 'Extension Request Failed';
```

#### UseEffect Dependencies

```javascript
// Avoid infinite loops in useEffect
useEffect(() => {
  if (defaultValue !== prevDefaultValue.current) {
    setSelectedOption(defaultValue);
    prevDefaultValue.current = defaultValue;
  }
}, [defaultValue]); // Remove selectedOption from dependencies
```

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
- `/v1/assignedtasks/*` - Task management and countdown operations
- `/v1/countdownconfigs/*` - Dynamic countdown configuration

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
{
  isOwner && <OwnerOnlyComponent />;
}
{
  isCharterer && <ChartererOnlyComponent />;
}
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
- `calculateCountdown()` - Updated countdown calculation (no longer uses frozenAt)

### Custom Hooks

- `useAssignedTasks()` - Task management and countdown synchronization
- `useHookFormParams()` - Form parameter management
- `errorToast()`, `successToast()` - Consistent notification patterns

### Countdown-Specific Utilities

```javascript
// Extension time options formatting
export const extensionTimeOptionsAdapter = ({ options }) => {
  if (!Array.isArray(options)) return [];

  return options.map((option) => ({
    label: option.label || `${option.value} Minutes`,
    value: option.value,
    ...option, // preserve any other properties
  }));
};

// Convert data to dropdown options (updated for new API format)
const convertedOptions = convertDataToOptions(
  { data: response.data },
  'value', // Changed from 'id' to 'value'
  'text'
);

// Extension availability check pattern
const extensionTimeOptionsResponse = await getTaskExtensionTimeOptions({ taskId });
const allowExtension = extensionTimeOptionsResponse?.data?.isAvailable || false;
```

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

### Countdown Timer Management

- Always fetch assigned tasks data for accurate countdown status
- Use `countdownStatus` field instead of deprecated `frozenAt` logic
- Implement proper null checking for extension time options
- Synchronize countdown state between Redux slices using `updateDealData` actions

### Real-time Updates

- SignalR connection management
- State synchronization for live data
- Proper cleanup of connections
- Coordinate between assigned tasks and UI state updates

### Performance with Large Datasets

- Virtual scrolling for large vessel lists
- Pagination for search results
- Efficient filtering and sorting
- Memoize processed countdown data to prevent unnecessary recalculations

### Component State Synchronization

- Use `defaultValue` prop pattern for controlled components
- Avoid infinite loops in useEffect with proper dependency management
- Implement refs for tracking previous values when needed
- Use optional chaining for deep object property access

## Recent Architectural Changes (PR #8: Countdown Improvements)

### Key Updates to Follow

1. **Replaced Static Countdown System**:

   - Old: `FIFTEEN_MINUTES_IN_MS` constant with `frozenAt` logic
   - New: Dynamic `extendMinute` parameters with `countdownStatus` field

2. **Enhanced API Integration**:

   - New endpoints: `/v1/assignedtasks/*` and `/v1/countdownconfigs/*`
   - Changed from `countDownTimerSettingId` to `responseTimeMinutes` in requests
   - Updated `DEFAULT_COUNTDOWN_OPTION` from string `'20 Mins'` to number `45` (minutes)

3. **Improved Component Architecture**:

   - New `ExtendCountdown` unit component replaces old modal patterns
   - Enhanced `Dropdown` component with `defaultValue` synchronization
   - Status-aware `DynamicCountdownTimer` with visual states

4. **Redux State Management**:

   - Added `updateAssignedTasksForOffers` action for task synchronization
   - Enhanced countdown actions to accept dynamic `extendMinute` values
   - Added `fetchDealCountdownData` action with proper error handling

5. **Error Prevention Patterns** (from PR review):
   - Always check array bounds before accessing elements
   - Use optional chaining for deep object property access
   - Extract repeated success/error messages to constants
   - Avoid infinite loops in useEffect dependencies

Remember: This is a complex maritime B2B platform where data accuracy and user experience are critical for multi-million dollar shipping deals. Always consider the business impact of UI/UX decisions and maintain the highest code quality standards. The countdown system is especially critical for time-sensitive negotiations.
