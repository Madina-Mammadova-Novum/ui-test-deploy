# Technical Stack Overview

ShipLink is built with modern web technologies, optimized for maritime B2B operations. Our stack is carefully chosen to handle complex shipping operations while maintaining excellent performance and developer experience. This document provides a comprehensive overview of our technology choices, architectural decisions, and implementation patterns.

## Core Framework Architecture

### Next.js 14 Application Structure

```
shiplink-frontend-ui/
├── app/                    # Next.js App Router (App directory)
│   ├── layout.js          # Root layout with providers
│   ├── not-found.js       # 404 page
│   ├── error.js           # Global error boundary
│   └── [[...slug]]/       # Dynamic routing for CMS pages
├── pages/                 # Traditional Pages Router
│   └── api/              # API routes (proxy layer)
├── components/           # Component architecture
│   ├── elements/         # Basic UI building blocks
│   ├── units/           # Reusable components
│   ├── modules/         # Complex business logic
│   ├── layouts/         # Page layouts
│   ├── blocks/          # CMS-driven blocks
│   └── common/          # Shared utilities
├── services/            # API integration layer
├── adapters/           # Data transformation
├── store/              # Redux state management
├── utils/              # Helper functions
└── lib/                # Constants and configuration
```

### Framework Features Utilized

- **Hybrid Rendering**: SSR for SEO-critical pages, CSR for interactive maritime tools
- **API Routes**: Proxy layer to backend with authentication and data transformation
- **Dynamic Imports**: Code splitting for maritime modules (vessel management, calculations)
- **Image Optimization**: Optimized vessel images and maritime document previews
- **Internationalization**: Multi-language support for global maritime operations

## State Management Architecture

### Redux Toolkit Implementation

```javascript
// Store structure for maritime operations
store/
├── entities/
│   ├── user/              # User authentication and profile
│   ├── vessels/           # Vessel fleet management
│   ├── offers/            # Charter offer negotiations
│   ├── deals/             # Active charter deals
│   ├── chat/              # Real-time messaging
│   ├── notifications/     # System notifications
│   ├── search/            # Vessel search state
│   └── calculator/        # Maritime calculation tools
├── selectors/             # Reusable state selectors
└── middleware/            # Custom maritime middleware
```

### Key Redux Patterns

```javascript
// Maritime-specific slice example
const vesselSlice = createSlice({
  name: 'vessels',
  initialState: {
    fleet: [],
    selectedVessel: null,
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {
    setFleet: (state, action) => {
      state.fleet = action.payload;
    },
    selectVessel: (state, action) => {
      state.selectedVessel = action.payload;
    },
    updateVesselPosition: (state, action) => {
      const { vesselId, position } = action.payload;
      const vessel = state.fleet.find((v) => v.id === vesselId);
      if (vessel) {
        vessel.position = position;
        vessel.lastUpdated = new Date().toISOString();
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchVessels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchVessels.fulfilled, (state, action) => {
        state.searchResults = action.payload;
        state.loading = false;
      })
      .addCase(searchVessels.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});
```

### Redux Persist Configuration

```javascript
const persistConfig = {
  key: 'shiplink',
  storage,
  whitelist: ['user', 'preferences', 'savedSearches'],
  blacklist: ['chat', 'notifications'], // Real-time data
  transforms: [
    // Custom transform for maritime data
    createTransform(
      // Serialize: filter sensitive maritime data
      (inboundState) => {
        const { sensitiveData, ...publicState } = inboundState;
        return publicState;
      },
      // Deserialize: restore with defaults
      (outboundState) => ({
        ...outboundState,
        lastHydrated: Date.now(),
      }),
      { whitelist: ['user'] }
    ),
  ],
};
```

## Styling and Design System

### Tailwind CSS Configuration

```javascript
// tailwind.config.js - Maritime-optimized configuration
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // ... other paths
  ],
  theme: {
    extend: {
      // Maritime-specific breakpoints
      screens: {
        xs: '375px', // Mobile
        msm: '425px', // Large mobile
        sm: '480px', // Small tablet
        md: '768px', // Tablet
        '2md': '980px', // Large tablet
        '3md': '1024px', // Small desktop
        lg: '1280px', // Desktop
        xl: '1440px', // Large desktop
        '2xl': '1920px', // Ultra-wide
      },

      // Maritime color palette
      colors: {
        maritime: {
          blue: {
            50: '#eff6ff',
            500: '#3b82f6',
            700: '#1d4ed8',
            900: '#1e3a8a',
          },
          navy: {
            50: '#f8fafc',
            500: '#475569',
            700: '#334155',
            900: '#0f172a',
          },
          ocean: {
            50: '#f0f9ff',
            500: '#0ea5e9',
            700: '#0369a1',
            900: '#0c4a6e',
          },
        },

        // Status colors for maritime operations
        status: {
          negotiating: '#f59e0b', // Amber
          prefixture: '#3b82f6', // Blue
          onsubs: '#8b5cf6', // Purple
          fixture: '#10b981', // Green
          failed: '#ef4444', // Red
        },
      },

      // Typography optimized for maritime data
      fontSize: {
        xs: ['12px', '130%'],
        sm: ['16px', '140%'],
        base: ['18px', '140%'],
        lg: ['20px', '140%'],
        xl: ['24px', '140%'],
        '2xl': ['26px', '140%'],
        '3xl': ['34px', '140%'],
        '4xl': ['42px', '140%'],
      },

      // Spacing for maritime forms and data tables
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
```

### Component Design Patterns

```javascript
// Standard maritime component styling patterns
const MaritimeButton = ({ variant, size, children, ...props }) => {
  const baseClasses = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2';

  const variants = {
    primary: 'bg-maritime-blue-500 text-white hover:bg-maritime-blue-700 focus:ring-maritime-blue-300',
    secondary: 'bg-maritime-navy-100 text-maritime-navy-700 hover:bg-maritime-navy-200 focus:ring-maritime-navy-300',
    success: 'bg-status-fixture text-white hover:bg-green-700 focus:ring-green-300',
    warning: 'bg-status-negotiating text-white hover:bg-amber-600 focus:ring-amber-300',
    danger: 'bg-status-failed text-white hover:bg-red-700 focus:ring-red-300',
  };

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]}`;

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};
```

## Form Management and Validation

### React Hook Form Integration

```javascript
// Maritime form with complex validation
const VesselOfferForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(vesselOfferSchema),
    defaultValues: {
      cargoQuantity: '',
      cargoType: '',
      laycanStart: null,
      laycanEnd: null,
      freight: '',
      loadPort: null,
      dischargePort: null,
    },
  });

  // Watch for cargo type changes to validate quantity
  const cargoType = watch('cargoType');
  const selectedVessel = watch('vessel');

  useEffect(() => {
    if (cargoType && selectedVessel) {
      // Trigger vessel capacity validation
      trigger('cargoQuantity');
    }
  }, [cargoType, selectedVessel, trigger]);

  const onSubmit = async (data) => {
    try {
      const offerData = vesselOfferAdapter(data);
      await submitVesselOffer(offerData);
      toast.success('Offer submitted successfully');
    } catch (error) {
      toast.error(`Failed to submit offer: ${error.message}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Form fields with maritime-specific validation */}
    </form>
  );
};
```

### Yup Validation Schemas

```javascript
// Maritime-specific validation schemas
const vesselOfferSchema = yup.object({
  vessel: yup.object().required('Vessel selection is required'),

  cargoQuantity: yup
    .number()
    .required('Cargo quantity is required')
    .positive('Cargo quantity must be positive')
    .test('capacity-check', 'Exceeds vessel capacity', function (value) {
      const vessel = this.parent.vessel;
      if (!vessel || !value) return true;

      return value <= vessel.dwt * 0.95; // 95% of vessel capacity
    }),

  cargoType: yup.string().required('Cargo type is required').oneOf(VALID_CARGO_TYPES, 'Invalid cargo type'),

  laycanStart: yup
    .date()
    .required('Laycan start date is required')
    .min(addDays(new Date(), 2), 'Minimum 48 hours advance notice'),

  laycanEnd: yup
    .date()
    .required('Laycan end date is required')
    .min(yup.ref('laycanStart'), 'End date must be after start date')
    .test('laycan-spread', 'Laycan spread must be 3-30 days', function (value) {
      const startDate = this.parent.laycanStart;
      if (!startDate || !value) return true;

      const daysDiff = differenceInDays(value, startDate);
      return daysDiff >= 3 && daysDiff <= 30;
    }),

  freight: yup
    .number()
    .required('Freight rate is required')
    .positive('Freight rate must be positive')
    .max(1000, 'Freight rate seems unreasonably high'),

  loadPort: yup
    .object()
    .required('Loading port is required')
    .test('port-accessibility', 'Port not accessible for cargo type', function (value) {
      const cargoType = this.parent.cargoType;
      if (!value || !cargoType) return true;

      return value.accessibleCargoTypes?.includes(cargoType);
    }),

  dischargePort: yup
    .object()
    .required('Discharge port is required')
    .test('different-ports', 'Load and discharge ports must be different', function (value) {
      const loadPort = this.parent.loadPort;
      return !loadPort || !value || loadPort.id !== value.id;
    }),
});
```

## Real-time Features

### SignalR Integration

```javascript
// Real-time maritime operations with SignalR
const useMaritimeHub = () => {
  const [connection, setConnection] = useState(null);
  const [connectionState, setConnectionState] = useState('disconnected');
  const dispatch = useDispatch();

  useEffect(() => {
    const newConnection = new HubConnectionBuilder()
      .withUrl('/api/maritime-hub', {
        accessTokenFactory: () => getAccessToken(),
      })
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .configureLogging(LogLevel.Information)
      .build();

    const startConnection = async () => {
      try {
        await newConnection.start();
        setConnectionState('connected');
        setConnection(newConnection);

        // Subscribe to maritime events
        newConnection.on('VesselPositionUpdate', (vesselId, position) => {
          dispatch(updateVesselPosition({ vesselId, position }));
        });

        newConnection.on('OfferStatusChange', (offerId, status) => {
          dispatch(updateOfferStatus({ offerId, status }));
        });

        newConnection.on('NewChatMessage', (message) => {
          dispatch(addChatMessage(message));
        });

        newConnection.on('NotificationReceived', (notification) => {
          dispatch(addNotification(notification));
          toast.info(notification.message);
        });
      } catch (error) {
        console.error('SignalR connection failed:', error);
        setConnectionState('failed');
      }
    };

    startConnection();

    return () => {
      newConnection?.stop();
    };
  }, [dispatch]);

  return { connection, connectionState };
};
```

## Performance Optimization Libraries

### Data Fetching and Caching

```javascript
// React Query for maritime data management
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      cacheTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 4xx errors
        if (error.status >= 400 && error.status < 500) return false;
        return failureCount < 3;
      },
    },
    mutations: {
      retry: 1,
    },
  },
});

// Maritime-specific query hooks
const useVesselSearch = (filters) => {
  return useQuery({
    queryKey: ['vessels', 'search', filters],
    queryFn: () => searchVessels(filters),
    enabled: !!filters.cargoType,
    staleTime: 2 * 60 * 1000, // 2 minutes for search results
  });
};

const useOfferDetails = (offerId) => {
  return useQuery({
    queryKey: ['offers', offerId],
    queryFn: () => getOfferDetails(offerId),
    enabled: !!offerId,
    refetchInterval: 30 * 1000, // Refetch every 30 seconds for live offers
  });
};
```

### Bundle Optimization

```javascript
// webpack.config.js - Maritime-specific optimizations
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        // Maritime business logic
        maritime: {
          test: /[\\/](adapters|services|utils)[\\/]/,
          name: 'maritime-core',
          chunks: 'all',
          priority: 10,
        },

        // Maps and visualization
        maps: {
          test: /[\\/](leaflet|react-leaflet)[\\/]/,
          name: 'maps',
          chunks: 'all',
          priority: 8,
        },

        // UI components
        ui: {
          test: /[\\/]components[\\/]/,
          name: 'ui-components',
          chunks: 'all',
          priority: 6,
        },

        // Vendor libraries
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
          priority: 4,
        },
      },
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/components': path.resolve(__dirname, './components'),
      '@/services': path.resolve(__dirname, './services'),
      '@/adapters': path.resolve(__dirname, './adapters'),
      '@/utils': path.resolve(__dirname, './utils'),
      '@/store': path.resolve(__dirname, './store'),
      '@/lib': path.resolve(__dirname, './lib'),
    },
  },
};
```

## Development and Build Tools

### Code Quality and Linting

```javascript
// .eslintrc.js - Maritime-specific rules
module.exports = {
  extends: ['next/core-web-vitals', 'airbnb', 'prettier'],
  rules: {
    // Maritime-specific naming conventions
    camelcase: [
      'error',
      {
        allow: ['^UNSAFE_', '^imo_', '^dwt_', '^mt_'],
      },
    ],

    // Require PropTypes for maritime components
    'react/prop-types': [
      'error',
      {
        ignore: ['children', 'className'],
      },
    ],

    // Maritime data validation rules
    'no-magic-numbers': [
      'warn',
      {
        ignore: [0, 1, -1, 24, 48, 72], // Common maritime time periods
        ignoreArrayIndexes: true,
      },
    ],

    // Async operations for maritime APIs
    'require-await': 'error',
    'no-return-await': 'error',
  },

  overrides: [
    {
      files: ['**/*.test.js', '**/*.spec.js'],
      env: {
        jest: true,
      },
      rules: {
        'no-magic-numbers': 'off',
      },
    },
  ],
};
```

### Testing Configuration

```javascript
// jest.config.js - Maritime testing setup
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/services/(.*)$': '<rootDir>/services/$1',
    '^@/adapters/(.*)$': '<rootDir>/adapters/$1',
    '^@/utils/(.*)$': '<rootDir>/utils/$1',
    '^@/store/(.*)$': '<rootDir>/store/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
  },

  // Mock maritime external dependencies
  moduleNameMapping: {
    '^leaflet$': '<rootDir>/__mocks__/leaflet.js',
    '^@microsoft/signalr$': '<rootDir>/__mocks__/signalr.js',
  },

  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'services/**/*.{js,jsx}',
    'adapters/**/*.{js,jsx}',
    'utils/**/*.{js,jsx}',
    '!**/*.test.{js,jsx}',
    '!**/*.stories.{js,jsx}',
    '!**/node_modules/**',
  ],

  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    // Higher standards for critical maritime logic
    './services/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './adapters/': {
      branches: 85,
      functions: 85,
      lines: 85,
      statements: 85,
    },
  },
};
```

## Security and Authentication

### JWT Token Management

```javascript
// Enhanced security for maritime operations
const useAuthTokens = () => {
  const [tokens, setTokens] = useState({
    accessToken: null,
    refreshToken: null,
  });

  const refreshAccessToken = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: tokens.refreshToken,
        }),
      });

      if (!response.ok) throw new Error('Token refresh failed');

      const newTokens = await response.json();
      setTokens(newTokens);

      // Update axios defaults for maritime API calls
      axios.defaults.headers.common['Authorization'] = `Bearer ${newTokens.accessToken}`;

      return newTokens.accessToken;
    } catch (error) {
      // Redirect to login on refresh failure
      window.location.href = '/login';
      throw error;
    }
  }, [tokens.refreshToken]);

  // Automatic token refresh before expiration
  useEffect(() => {
    if (!tokens.accessToken) return;

    const tokenData = jwt.decode(tokens.accessToken);
    const expirationTime = tokenData.exp * 1000;
    const refreshTime = expirationTime - 5 * 60 * 1000; // 5 minutes before expiry
    const timeUntilRefresh = refreshTime - Date.now();

    if (timeUntilRefresh > 0) {
      const refreshTimer = setTimeout(refreshAccessToken, timeUntilRefresh);
      return () => clearTimeout(refreshTimer);
    }
  }, [tokens.accessToken, refreshAccessToken]);

  return { tokens, refreshAccessToken };
};
```

## Monitoring and Analytics

### Performance Monitoring

```javascript
// Maritime-specific performance tracking
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const trackMaritimePerformance = () => {
  // Core Web Vitals
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);

  // Maritime-specific metrics
  const trackVesselSearchPerformance = () => {
    performance.mark('vessel-search-start');
    // Search logic
    performance.mark('vessel-search-end');
    performance.measure('vessel-search-duration', 'vessel-search-start', 'vessel-search-end');
  };

  const trackOfferSubmissionPerformance = () => {
    performance.mark('offer-submit-start');
    // Offer submission logic
    performance.mark('offer-submit-end');
    performance.measure('offer-submit-duration', 'offer-submit-start', 'offer-submit-end');
  };
};
```

This comprehensive technical stack documentation provides a complete overview of ShipLink's technology choices, implementation patterns, and architectural decisions, enabling developers to understand and contribute effectively to the maritime platform.

- **PostCSS**: CSS processing
- **SWC**: Fast compilation

### Version Control

- **Git**
- **Conventional Commits**
  - Scopes: owner, charterer, vessel, cargo, ui, api, fix, negotiation
  - Consistent commit messages
  - Automated changelog generation

## Performance Optimizations

### Client-side

- Image optimization
- Code splitting
- Route prefetching
- Progressive loading
- Debounced search operations
- Memoized calculations

### Server-side

- API route optimization
- Cache management
- Database query optimization
- Rate limiting

## Security Measures

### Authentication

- JWT with refresh tokens
- Role-based access control (owner/charterer/broker)
- Session management
- Maritime-specific permissions

### Data Protection

- HTTPS enforcement
- API request validation
- Data encryption
- Maritime compliance checks
