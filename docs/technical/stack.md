# Technical Stack Overview

ShipLink is built with modern web technologies, optimized for maritime B2B operations. Our stack is carefully chosen to handle complex shipping operations while maintaining excellent performance and developer experience.

## Core Technologies

### Framework

- **Next.js 14**
  - Traditional API routes (`pages/api`)
  - Server-side rendering for better SEO
  - Dynamic routing for complex maritime workflows
  - App directory structure (partial migration)

### State Management

- **Redux Toolkit**
  - Centralized state for maritime operations
  - Redux Persist for offline capabilities
  - Custom maritime-specific slices
  - Thunk middleware for async operations

### Styling

- **Tailwind CSS**
  - Custom maritime-themed design system
  - Responsive layouts
  - Utility-first approach
  - Custom breakpoints (3md: 1024px)

### Form Management

- **React Hook Form**
  - Complex maritime form validation
  - Performance-optimized
  - Custom maritime validation rules
  - Integration with Yup schema validation

## Development Tools

- ### Code Quality
  - **ESLint & Prettier**
    - Custom maritime-specific rules
    - Code style consistency
    - Automated formatting
    - Git hooks (husky)
  - **PropTypes**
    - Runtime type checking for React components
    - Required for all components (except children)
    - Component property documentation
    - Maritime data shape validation

### Testing

- **Jest & React Testing Library**
  - Unit testing
  - Integration testing
  - Maritime business logic testing
  - API mocking

## Additional Libraries

### Data Handling

- **date-fns**: Maritime timezone and laycan calculations
- **lodash**: Utility functions and data manipulation
- **axios**: API requests with custom maritime headers
- **yup**: Schema validation for maritime data

### UI Components

- **react-select**: Advanced vessel/port selection
  - Async search for ports and vessels
  - Debounced API calls (400ms)
  - Caching for performance
- **react-datepicker**: Laycan date selection

### Maps & Tracking

- **react-leaflet**: Interactive maritime maps
  - Vessel position tracking
  - Port location visualization
  - Custom maritime markers
  - Interactive route plotting
  - Port search and selection

/\*\*

- @todo Planned Map Features
- TODO(maritime): Implement vessel position tracking system [P1] [SL-TRACK]
- TODO(maritime): Add interactive route plotting for voyages [P2] [SL-ROUTE]
- TODO(maritime): Integrate real-time vessel updates [P2] [SL-VESSEL]
  \*/

## Development Environment

### Build Tools

- **Webpack**: Asset bundling
- **Babel**: JavaScript compilation
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
