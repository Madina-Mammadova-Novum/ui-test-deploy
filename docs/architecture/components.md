# Component Architecture

ShipLink's component architecture is designed to support complex maritime operations while maintaining clean separation of concerns. Our platform handles critical vessel chartering workflows, cargo negotiations, and maritime documentation, requiring a robust and scalable component structure. This architecture ensures that business logic for maritime operations remains separate from presentation concerns, while supporting real-time updates for vessel positions, cargo status, and negotiation states.

## Module Components

- **Location**: `/components/modules/${domain}`
- **Purpose**: Complex business logic components
- **Responsibilities**:
  - State management
  - API integration
  - Role-based rendering
  - Complex business logic

## Unit Components

- **Location**: `/components/units`
- **Purpose**: Reusable UI components
- **Rules**:
  - Medium logic complexity maximum
  - Required PropTypes and defaultProps
  - camelCase prop naming

## Element Components

- **Location**: `/components/elements`
- **Purpose**: Basic UI building blocks
- **Rules**:
  - No business logic
  - Pure presentation
  - Fully reusable

## Naming Conventions

- Pattern: ^[A-Z][a-zA-Z]+$
- Suffixes:
  - Content components: \*Content
  - Forms: \*Form
  - Modals: \*Modal
  - Lists: \*List
  - Details: \*Details
  - Containers: \*Container
  - Wrappers: \*Wrapper

## Maritime Components

- Vessel components: Vessel${Purpose}
- Cargo components: Cargo${Purpose}
- Negotiation components: ${Stage}Negotiation
