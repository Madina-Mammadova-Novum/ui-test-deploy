# Performance Guidelines

In the fast-paced world of maritime commerce, performance is crucial. These guidelines ensure that ShipLink delivers rapid response times for critical operations like vessel searches, real-time position updates, and time-sensitive negotiations. Our performance optimization strategies are specifically tailored to handle large datasets common in maritime operations while maintaining responsive user experiences across global locations.

## Core Performance Requirements

### Response Time Targets
- **Vessel Search**: < 2 seconds for basic queries
- **Offer Submission**: < 1 second for form processing
- **Real-time Updates**: < 500ms for chat and notifications
- **Page Load**: < 3 seconds for initial content
- **Maritime Calculations**: < 1 second for freight estimations

### Data Volume Handling
- **Vessel Lists**: Support 10,000+ vessels with pagination
- **Search Results**: Handle 1,000+ concurrent searches
- **Chat History**: Maintain 6 months of chat data
- **Document Storage**: Process files up to 50MB
- **Real-time Connections**: Support 1,000+ concurrent users

## Pagination Strategies

### Server-Side Pagination
```javascript
// Required for all lists > 10 items
const VesselList = ({ filters }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  
  const { vessels, totalCount, loading } = useVesselPagination({
    filters,
    page: currentPage,
    limit: pageSize,
  });
  
  return (
    <div>
      <VesselGrid vessels={vessels} loading={loading} />
      <Pagination
        current={currentPage}
        total={totalCount}
        pageSize={pageSize}
        onChange={setCurrentPage}
      />
    </div>
  );
};
```

### Virtual Scrolling for Large Datasets
```javascript
import { FixedSizeList as List } from 'react-window';

const VirtualizedVesselList = ({ vessels }) => {
  const Row = ({ index, style }) => (
    <div style={style}>
      <VesselCard vessel={vessels[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={vessels.length}
      itemSize={120}
      width="100%"
    >
      {Row}
    </List>
  );
};
```

### Infinite Scrolling for Mobile
```javascript
const useInfiniteVessels = (filters) => {
  const [vessels, setVessels] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    try {
      const newVessels = await searchVessels({
        ...filters,
        offset: vessels.length,
        limit: 20,
      });
      
      setVessels(prev => [...prev, ...newVessels.data]);
      setHasMore(newVessels.hasMore);
    } finally {
      setLoading(false);
    }
  }, [filters, vessels.length, loading, hasMore]);
  
  return { vessels, loadMore, hasMore, loading };
};
```

## Lazy Loading Implementation

### Component-Level Lazy Loading
```javascript
// Heavy maritime modules
const VesselManagement = lazy(() => import('@/modules/VesselManagement'));
const OfferNegotiation = lazy(() => import('@/modules/OfferNegotiation'));
const MaritimeCalculator = lazy(() => import('@/modules/MaritimeCalculator'));
const DocumentManager = lazy(() => import('@/modules/DocumentManager'));

const MaritimeApp = () => (
  <Suspense fallback={<MaritimeLoadingSpinner />}>
    <Routes>
      <Route path="/vessels/*" element={<VesselManagement />} />
      <Route path="/offers/*" element={<OfferNegotiation />} />
      <Route path="/calculator" element={<MaritimeCalculator />} />
      <Route path="/documents" element={<DocumentManager />} />
    </Routes>
  </Suspense>
);
```

### Image Lazy Loading
```javascript
const VesselImage = ({ vessel, priority = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="relative">
      {!imageLoaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={vessel.imageUrl}
        alt={`${vessel.name} vessel`}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={() => setImageLoaded(true)}
        className={`transition-opacity duration-300 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};
```

### Data Lazy Loading
```javascript
const VesselDetails = ({ vesselId }) => {
  const [activeTab, setActiveTab] = useState('general');
  
  // Only load data for active tab
  const { data: generalData } = useVesselGeneral(vesselId, {
    enabled: activeTab === 'general',
  });
  
  const { data: technicalData } = useVesselTechnical(vesselId, {
    enabled: activeTab === 'technical',
  });
  
  const { data: documentsData } = useVesselDocuments(vesselId, {
    enabled: activeTab === 'documents',
  });
  
  return (
    <TabContainer activeTab={activeTab} onTabChange={setActiveTab}>
      <Tab name="general">{generalData && <GeneralInfo data={generalData} />}</Tab>
      <Tab name="technical">{technicalData && <TechnicalSpecs data={technicalData} />}</Tab>
      <Tab name="documents">{documentsData && <DocumentList data={documentsData} />}</Tab>
    </TabContainer>
  );
};
```

## Memoization Strategies

### Maritime Calculations
```javascript
const FreightCalculator = ({ cargo, vessel, route }) => {
  // Expensive freight calculation
  const freightEstimate = useMemo(() => {
    return calculateFreightEstimate({
      cargoQuantity: cargo.quantity,
      cargoType: cargo.type,
      vesselDWT: vessel.dwt,
      distance: route.nauticalMiles,
      fuelPrice: route.currentFuelPrice,
      portCosts: route.portCharges,
    });
  }, [cargo.quantity, cargo.type, vessel.dwt, route.nauticalMiles, route.currentFuelPrice]);
  
  // Memoize voyage calculations
  const voyageDetails = useMemo(() => {
    return calculateVoyageDetails({
      loadPort: route.loadPort,
      dischargePort: route.dischargePort,
      vesselSpeed: vessel.speed,
      weatherConditions: route.weather,
    });
  }, [route.loadPort, route.dischargePort, vessel.speed, route.weather]);
  
  return (
    <div className="space-y-4">
      <FreightDisplay estimate={freightEstimate} />
      <VoyageDisplay details={voyageDetails} />
    </div>
  );
};
```

### Search and Filter Operations
```javascript
const VesselSearchResults = ({ vessels, filters }) => {
  // Memoize filtered results
  const filteredVessels = useMemo(() => {
    return vessels.filter(vessel => {
      if (filters.cargoType && vessel.cargoTypes?.includes(filters.cargoType)) {
        return false;
      }
      if (filters.minDWT && vessel.dwt < filters.minDWT) {
        return false;
      }
      if (filters.maxDWT && vessel.dwt > filters.maxDWT) {
        return false;
      }
      if (filters.flag && vessel.flag !== filters.flag) {
        return false;
      }
      return true;
    });
  }, [vessels, filters]);
  
  // Memoize sorted results
  const sortedVessels = useMemo(() => {
    const sorted = [...filteredVessels];
    switch (filters.sortBy) {
      case 'dwt':
        return sorted.sort((a, b) => b.dwt - a.dwt);
      case 'age':
        return sorted.sort((a, b) => a.buildYear - b.buildYear);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return sorted;
    }
  }, [filteredVessels, filters.sortBy]);
  
  return <VesselGrid vessels={sortedVessels} />;
};
```

### Component Memoization
```javascript
const VesselCard = React.memo(({ vessel, onSelect, showDetails }) => {
  return (
    <div 
      className="vessel-card p-4 border rounded-lg hover:shadow-lg"
      onClick={() => onSelect(vessel.id)}
    >
      <VesselImage vessel={vessel} />
      <VesselInfo vessel={vessel} showDetails={showDetails} />
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison for vessel data
  return (
    prevProps.vessel.id === nextProps.vessel.id &&
    prevProps.vessel.status === nextProps.vessel.status &&
    prevProps.showDetails === nextProps.showDetails
  );
});
```

## Caching Implementation

### Data Caching Strategy
```javascript
const cacheConfig = {
  // Static maritime data - long cache
  cargoTypes: { ttl: 24 * 60 * 60 * 1000 }, // 24 hours
  countries: { ttl: 24 * 60 * 60 * 1000 },
  ports: { ttl: 12 * 60 * 60 * 1000 }, // 12 hours
  
  // Semi-static data - medium cache
  vesselTypes: { ttl: 6 * 60 * 60 * 1000 }, // 6 hours
  exchangeRates: { ttl: 60 * 60 * 1000 }, // 1 hour
  
  // Dynamic data - short cache
  vesselPositions: { ttl: 5 * 60 * 1000 }, // 5 minutes
  offerStatus: { ttl: 30 * 1000 }, // 30 seconds
  
  // Real-time data - no cache
  chatMessages: { ttl: 0 },
  notifications: { ttl: 0 },
};
```

### React Query Implementation
```javascript
import { useQuery, useQueryClient } from '@tanstack/react-query';

const useVesselSearch = (filters) => {
  return useQuery({
    queryKey: ['vessels', 'search', filters],
    queryFn: () => searchVessels(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    enabled: !!filters.cargoType, // Only search when cargo type is selected
  });
};

const useOfferDetails = (offerId) => {
  return useQuery({
    queryKey: ['offers', offerId],
    queryFn: () => getOfferDetails(offerId),
    staleTime: 30 * 1000, // 30 seconds
    refetchInterval: 60 * 1000, // Refetch every minute
    enabled: !!offerId,
  });
};
```

### Cache Invalidation
```javascript
const useOfferMutations = () => {
  const queryClient = useQueryClient();
  
  const submitOffer = useMutation({
    mutationFn: submitOfferData,
    onSuccess: (data) => {
      // Invalidate related queries
      queryClient.invalidateQueries(['offers']);
      queryClient.invalidateQueries(['vessels', 'positions']);
      queryClient.invalidateQueries(['user', 'deals']);
      
      // Update specific offer cache
      queryClient.setQueryData(['offers', data.id], data);
    },
  });
  
  const acceptOffer = useMutation({
    mutationFn: acceptOfferData,
    onSuccess: () => {
      // Clear negotiation-related caches
      queryClient.invalidateQueries(['offers', 'negotiating']);
      queryClient.invalidateQueries(['deals', 'active']);
    },
  });
  
  return { submitOffer, acceptOffer };
};
```

## Real-Time Performance

### WebSocket Connection Management
```javascript
const useMaritimeWebSocket = () => {
  const [connection, setConnection] = useState(null);
  const [connectionState, setConnectionState] = useState('disconnected');
  
  useEffect(() => {
    const hubConnection = new HubConnectionBuilder()
      .withUrl('/api/maritime-hub')
      .withAutomaticReconnect([0, 2000, 10000, 30000])
      .build();
    
    hubConnection.start()
      .then(() => {
        setConnectionState('connected');
        setConnection(hubConnection);
      })
      .catch(err => {
        console.error('SignalR connection failed:', err);
        setConnectionState('failed');
      });
    
    return () => {
      hubConnection?.stop();
    };
  }, []);
  
  return { connection, connectionState };
};
```

### Throttled Real-time Updates
```javascript
const useThrottledVesselUpdates = (vesselId) => {
  const [position, setPosition] = useState(null);
  const { connection } = useMaritimeWebSocket();
  
  useEffect(() => {
    if (!connection || !vesselId) return;
    
    // Throttle position updates to every 30 seconds
    const throttledUpdate = throttle((newPosition) => {
      setPosition(newPosition);
    }, 30000);
    
    connection.on('VesselPositionUpdate', throttledUpdate);
    
    return () => {
      connection.off('VesselPositionUpdate', throttledUpdate);
    };
  }, [connection, vesselId]);
  
  return position;
};
```

## Bundle Optimization

### Code Splitting
```javascript
// Route-based splitting
const routes = [
  {
    path: '/vessels',
    component: lazy(() => import('@/pages/VesselManagement')),
  },
  {
    path: '/offers',
    component: lazy(() => import('@/pages/OfferManagement')),
  },
  {
    path: '/calculator',
    component: lazy(() => import('@/pages/MaritimeCalculator')),
  },
];

// Feature-based splitting
const features = {
  chat: lazy(() => import('@/features/Chat')),
  notifications: lazy(() => import('@/features/Notifications')),
  documents: lazy(() => import('@/features/DocumentManager')),
};
```

### Tree Shaking Optimization
```javascript
// Import only what you need
import { format } from 'date-fns';
import { debounce } from 'lodash';
import { calculateDistance } from '@/utils/maritime';

// Avoid full library imports
// ❌ import * as dateUtils from 'date-fns';
// ❌ import _ from 'lodash';
// ❌ import * as maritimeUtils from '@/utils/maritime';
```

## Performance Monitoring

### Core Web Vitals Tracking
```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const trackWebVitals = () => {
  getCLS(console.log);
  getFID(console.log);
  getFCP(console.log);
  getLCP(console.log);
  getTTFB(console.log);
};

// Maritime-specific performance metrics
const trackMaritimeMetrics = () => {
  // Track vessel search performance
  performance.mark('vessel-search-start');
  // ... search logic
  performance.mark('vessel-search-end');
  performance.measure('vessel-search', 'vessel-search-start', 'vessel-search-end');
  
  // Track offer submission time
  performance.mark('offer-submit-start');
  // ... submission logic
  performance.mark('offer-submit-end');
  performance.measure('offer-submit', 'offer-submit-start', 'offer-submit-end');
};
```

### Performance Budget
```javascript
// webpack.config.js performance budgets
module.exports = {
  performance: {
    maxAssetSize: 250000, // 250kb
    maxEntrypointSize: 400000, // 400kb
    hints: 'error',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        maritime: {
          test: /[\\/]maritime[\\/]/,
          name: 'maritime',
          chunks: 'all',
        },
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

## Security Performance Balance

### JWT Token Management
```javascript
const useAuthTokens = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  
  // Automatic token refresh before expiration
  useEffect(() => {
    if (!accessToken) return;
    
    const tokenData = jwt.decode(accessToken);
    const expirationTime = tokenData.exp * 1000;
    const refreshTime = expirationTime - 5 * 60 * 1000; // 5 minutes before expiry
    
    const timeUntilRefresh = refreshTime - Date.now();
    
    if (timeUntilRefresh > 0) {
      const refreshTimer = setTimeout(() => {
        refreshAccessToken();
      }, timeUntilRefresh);
      
      return () => clearTimeout(refreshTimer);
    }
  }, [accessToken]);
  
  return { accessToken, refreshToken, refreshAccessToken };
};
```

### Optimized Role Validation
```javascript
const useRolePermissions = (requiredPermissions) => {
  const userPermissions = useSelector(selectUserPermissions);
  
  return useMemo(() => {
    if (!userPermissions || !requiredPermissions) return false;
    
    return requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
  }, [userPermissions, requiredPermissions]);
};
```

## Performance Testing Guidelines

### Load Testing Scenarios
- **Concurrent Users**: Test with 1000+ simultaneous users
- **Data Volume**: Test with 50,000+ vessels in search results
- **Real-time Load**: Test with 500+ concurrent chat sessions
- **File Upload**: Test with multiple 50MB document uploads
- **API Stress**: Test API endpoints with 100 requests/second

### Performance Benchmarks
- Initial page load: < 3 seconds
- Vessel search results: < 2 seconds
- Offer submission: < 1 second
- Real-time updates: < 500ms latency
- File upload progress: Real-time feedback
- Mobile performance: 60 FPS animations

These performance guidelines ensure ShipLink maintains optimal user experience even under heavy maritime industry workloads while handling the complexity of global shipping operations.
