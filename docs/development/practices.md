# Development Best Practices

Building a maritime B2B platform requires careful attention to both technical excellence and industry-specific requirements. These development practices ensure that ShipLink maintains high code quality while accurately representing complex maritime business processes. Our practices focus on creating maintainable, scalable code that can handle real-world shipping operations, from vessel position tracking to complex charter party negotiations.

## Anti-Patterns to Avoid

### Technical Anti-Patterns

- **Direct API calls in components** - Use the service layer pattern
- **Inline styles** - Use Tailwind CSS utility classes exclusively
- **Complex logic in UI components** - Extract to custom hooks or utilities
- **Nested ternaries beyond 2 levels** - Use early returns or separate components
- **Magic numbers/strings** - Define constants in `/lib/constants.js`
- **Direct DOM manipulation** - Use React refs and declarative patterns
- **Prop drilling beyond 2 levels** - Implement Context API or Redux
- **Mixing business and presentation logic** - Maintain clear separation of concerns

### Maritime-Specific Anti-Patterns

- **Inconsistent maritime terminology** - Use standardized terms (vessel not ship)
- **Hardcoded maritime values** - Use configuration files for rates, limits
- **Ignoring IMO standards** - Follow international maritime regulations
- **Non-standard unit conversions** - Use established maritime conversion utilities
- **Improper date handling for laycans** - Use date-fns with timezone awareness

## Preferred Patterns

### React Patterns

```javascript
// Functional components with hooks
const VesselSearchForm = ({ onSearch, initialFilters }) => {
  const [filters, setFilters] = useState(initialFilters);
  const { vessels, loading, error } = useVesselSearch(filters);

  const handleSubmit = useCallback(
    (formData) => {
      const searchParams = vesselSearchAdapter(formData);
      onSearch(searchParams);
    },
    [onSearch]
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Form fields */}
    </form>
  );
};
```

### State Management

```javascript
// Redux Toolkit slice pattern
const vesselSlice = createSlice({
  name: 'vessels',
  initialState: {
    list: [],
    selectedVessel: null,
    loading: false,
    error: null,
  },
  reducers: {
    setVessels: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    selectVessel: (state, action) => {
      state.selectedVessel = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});
```

### Service Layer Pattern

```javascript
// Centralized API service
export async function searchVessels({ filters }) {
  try {
    const response = await postData({
      url: '/api/v1/vessels/search',
      data: vesselSearchRequestAdapter(filters),
    });

    return vesselSearchResponseAdapter(response);
  } catch (error) {
    throw new Error(`Vessel search failed: ${error.message}`);
  }
}
```

### Component Validation

```javascript
// PropTypes validation for maritime components
VesselCard.propTypes = {
  vessel: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imo: PropTypes.string.isRequired,
    dwt: PropTypes.number.isRequired,
    flag: PropTypes.string.isRequired,
  }).isRequired,
  onSelect: PropTypes.func,
  showDetails: PropTypes.bool,
};

VesselCard.defaultProps = {
  onSelect: () => {},
  showDetails: false,
};
```

## Maritime Business Logic Implementation

### Offer Workflow Implementation

```javascript
// Business rule validation for offers
export const validateOfferTransition = (currentStage, targetStage, userRole) => {
  const transitions = {
    negotiating: {
      'pre-fixture': ['owner', 'charterer'],
      declined: ['owner'],
      failed: ['system'],
    },
    'pre-fixture': {
      'on-subs': ['owner', 'charterer'],
      negotiating: ['owner', 'charterer'],
      failed: ['system'],
    },
    'on-subs': {
      fixture: ['owner', 'charterer'],
      failed: ['system'],
    },
    fixture: {
      'post-fixture': ['system'],
    },
  };

  const allowedRoles = transitions[currentStage]?.[targetStage];
  return allowedRoles?.includes(userRole) || false;
};
```

### Maritime Data Validation

```javascript
// IMO number validation
export const validateIMO = (imo) => {
  const imoRegex = /^\d{7}$/;
  if (!imoRegex.test(imo)) return false;

  // IMO check digit validation
  const digits = imo.split('').map(Number);
  const checkSum = digits.slice(0, 6).reduce((sum, digit, index) => sum + digit * (7 - index), 0);

  return digits[6] === checkSum % 10;
};

// Cargo quantity validation
export const validateCargoQuantity = (quantity, vesselDWT) => {
  const minCargo = 1; // 1 MT minimum
  const maxCargo = vesselDWT * 0.95; // 95% of vessel capacity

  return quantity >= minCargo && quantity <= maxCargo;
};
```

### Date Handling for Maritime Operations

```javascript
import { addDays, isAfter, isBefore, format } from 'date-fns';

// Laycan validation
export const validateLaycan = (startDate, endDate) => {
  const minSpread = 3; // Minimum 3 days between start and end
  const maxSpread = 30; // Maximum 30 days spread

  if (!isAfter(endDate, startDate)) {
    return { valid: false, error: 'End date must be after start date' };
  }

  const daysDiff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));

  if (daysDiff < minSpread) {
    return { valid: false, error: `Minimum ${minSpread} days spread required` };
  }

  if (daysDiff > maxSpread) {
    return { valid: false, error: `Maximum ${maxSpread} days spread allowed` };
  }

  return { valid: true };
};
```

## Code Organization Standards

### File Structure Conventions

```
src/
├── components/
│   ├── elements/     # Basic UI components
│   ├── units/        # Reusable components
│   ├── modules/      # Business logic components
│   └── layouts/      # Page layouts
├── services/         # API integration layer
├── adapters/         # Data transformation
├── store/           # Redux state management
├── utils/           # Helper functions
├── hooks/           # Custom React hooks
└── constants/       # Application constants
```

### Import Organization

```javascript
// External library imports
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'date-fns';

// Internal imports - absolute paths
import { Button, Table } from '@/elements';
import { SearchForm } from '@/units';
import { vesselService } from '@/services';
import { vesselAdapter } from '@/adapters';
import { VESSEL_TYPES } from '@/lib/constants';

// Component definition
const VesselManager = () => {
  // Component logic
};
```

### Naming Conventions

- **Components**: PascalCase (`VesselSearchForm`)
- **Files**: camelCase for utilities, PascalCase for components
- **Functions**: camelCase (`calculateFreightRate`)
- **Constants**: SCREAMING_SNAKE_CASE (`MAX_CARGO_QUANTITY`)
- **CSS Classes**: kebab-case with Tailwind utilities

## Error Handling Best Practices

### Component Error Boundaries

```javascript
class MaritimeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log maritime-specific errors
    console.error('Maritime operation failed:', error, errorInfo);

    // Report to monitoring service
    this.reportError(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="border border-red-200 bg-red-50 p-4">
          <h3 className="text-red-800">Maritime Operation Failed</h3>
          <p className="text-red-600">
            We encountered an issue processing your maritime data. Please try again or contact support.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### Service Error Handling

```javascript
export const handleApiError = (error, context) => {
  const errorMap = {
    400: 'Invalid request data',
    401: 'Authentication required',
    403: 'Insufficient permissions',
    404: 'Resource not found',
    422: 'Business rule violation',
    500: 'Internal server error',
  };

  const message = errorMap[error.status] || 'Unknown error occurred';

  // Log with maritime context
  console.error(`Maritime API Error [${context}]:`, {
    status: error.status,
    message: error.message,
    timestamp: new Date().toISOString(),
  });

  return {
    type: 'error',
    message,
    details: error.message,
    context,
  };
};
```

## Performance Optimization

### Component Optimization

```javascript
// Memoization for expensive calculations
const VesselCalculations = React.memo(({ vessel, cargo }) => {
  const calculations = useMemo(() => {
    return {
      cargoCapacity: calculateCargoCapacity(vessel.dwt, cargo.density),
      voyageDuration: calculateVoyageDuration(vessel.speed, voyage.distance),
      fuelConsumption: calculateFuelUsage(vessel.consumption, voyage.duration),
    };
  }, [vessel.dwt, vessel.speed, vessel.consumption, cargo.density, voyage]);

  return <CalculationDisplay calculations={calculations} />;
});
```

### Lazy Loading

```javascript
// Code splitting for maritime modules
const VesselManagement = lazy(() => import('@/modules/VesselManagement'));
const OfferNegotiation = lazy(() => import('@/modules/OfferNegotiation'));

const MaritimeApp = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/vessels" element={<VesselManagement />} />
      <Route path="/offers" element={<OfferNegotiation />} />
    </Routes>
  </Suspense>
);
```

## Testing Standards

### Unit Testing

```javascript
import { render, screen, fireEvent } from '@testing-library/react';
import { VesselSearchForm } from '../VesselSearchForm';

describe('VesselSearchForm', () => {
  it('validates IMO number format', async () => {
    render(<VesselSearchForm onSearch={jest.fn()} />);

    const imoInput = screen.getByLabelText('IMO Number');
    fireEvent.change(imoInput, { target: { value: '123456' } });
    fireEvent.blur(imoInput);

    expect(screen.getByText('IMO must be 7 digits')).toBeInTheDocument();
  });

  it('submits valid maritime search data', async () => {
    const mockSearch = jest.fn();
    render(<VesselSearchForm onSearch={mockSearch} />);

    // Fill form with valid maritime data
    fireEvent.change(screen.getByLabelText('Cargo Type'), {
      target: { value: 'crude-oil' },
    });

    fireEvent.click(screen.getByText('Search Vessels'));

    expect(mockSearch).toHaveBeenCalledWith({
      cargoType: 'crude-oil',
      // ... other expected data
    });
  });
});
```

### Integration Testing

```javascript
import { renderWithProviders } from '@/test-utils';
import { OfferWorkflow } from '../OfferWorkflow';

describe('Offer Workflow Integration', () => {
  it('completes full negotiation process', async () => {
    const { user } = renderWithProviders(<OfferWorkflow dealId="test-deal-123" />, {
      preloadedState: {
        user: { role: 'charterer' },
        deals: { current: mockDeal },
      },
    });

    // Test complete maritime workflow
    await user.click(screen.getByText('Make Counter Offer'));
    await user.type(screen.getByLabelText('Freight Rate'), '45.50');
    await user.click(screen.getByText('Submit Counter Offer'));

    expect(screen.getByText('Counter offer submitted')).toBeInTheDocument();
  });
});
```

## Security Best Practices

### Input Sanitization

```javascript
import DOMPurify from 'dompurify';

export const sanitizeMaritimeInput = (input, type) => {
  const sanitizers = {
    vesselName: (value) => DOMPurify.sanitize(value.trim()),
    imoNumber: (value) => value.replace(/\D/g, '').slice(0, 7),
    cargoQuantity: (value) => Math.max(0, parseFloat(value) || 0),
    freightRate: (value) => Math.max(0, parseFloat(value) || 0),
  };

  return sanitizers[type] ? sanitizers[type](input) : DOMPurify.sanitize(input);
};
```

### Role-Based Access Control

```javascript
export const useMaritimePermissions = (requiredRole) => {
  const currentRole = useSelector(selectUserRole);
  const permissions = useSelector(selectUserPermissions);

  const hasAccess = useMemo(() => {
    return permissions.roles.includes(requiredRole) || permissions.roles.includes('admin');
  }, [permissions, requiredRole]);

  const checkPermission = useCallback(
    (action) => {
      return permissions.actions.includes(action);
    },
    [permissions]
  );

  return { hasAccess, checkPermission };
};
```

## Documentation Standards

### Component Documentation

```javascript
/**
 * VesselSearchForm - Advanced search interface for maritime vessels
 *
 * Provides comprehensive search capabilities for vessel owners and charterers
 * including filters for vessel type, cargo capacity, availability dates,
 * and geographical constraints.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onSearch - Callback fired when search is submitted
 * @param {Object} props.initialFilters - Default search filter values
 * @param {boolean} props.showAdvanced - Whether to show advanced filters
 * @param {string} props.userRole - Current user role (owner/charterer)
 *
 * @example
 * <VesselSearchForm
 *   onSearch={handleVesselSearch}
 *   initialFilters={{ cargoType: 'crude-oil' }}
 *   showAdvanced={true}
 *   userRole="charterer"
 * />
 */
```

### Business Logic Documentation

```javascript
/**
 * Calculate freight estimation for maritime cargo
 *
 * This function implements the industry-standard freight calculation
 * methodology used in maritime trade, accounting for:
 * - Base freight rate per metric ton
 * - Distance-based adjustments
 * - Seasonal rate variations
 * - Port congestion surcharges
 * - Fuel price fluctuations
 *
 * @param {Object} params - Calculation parameters
 * @param {number} params.cargoQuantity - Cargo quantity in metric tons
 * @param {string} params.cargoType - Type of cargo (crude-oil, lng, etc.)
 * @param {Object} params.route - Loading and discharge ports
 * @param {Date} params.laycanStart - Earliest loading date
 * @param {number} params.baseRate - Base freight rate per MT
 *
 * @returns {Object} Freight calculation result
 * @returns {number} returns.totalFreight - Total freight cost
 * @returns {number} returns.ratePerTon - Effective rate per metric ton
 * @returns {Array} returns.adjustments - Applied rate adjustments
 *
 * @throws {Error} When cargo quantity exceeds vessel capacity
 * @throws {Error} When ports are not accessible for cargo type
 */
```

This comprehensive update provides detailed best practices for developing the ShipLink maritime platform with specific focus on code quality, maritime business rules, and industry-specific requirements.
