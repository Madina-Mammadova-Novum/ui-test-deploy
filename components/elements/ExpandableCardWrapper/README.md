# ExpandableCardWrapper Component

The `ExpandableCardWrapper` component provides an expandable/collapsible card interface with automatic first-item expansion logic for mapped scenarios.

## Props

- `headerComponent` (required): React element for the card header
- `footerComponent` (optional): React element for the card footer
- `children` (required): Content to display when expanded
- `className` (optional): Additional CSS classes
- `expandAll` (optional): Boolean to control expansion of all cards
- `index` (optional): Number representing the item's position in a mapped array

## First Item Expansion Logic

When the `index` prop is provided:

- `index === 0`: The first item will be expanded by default and remain expanded
- `index > 0`: Other items follow the `expandAll` prop behavior

## Basic Usage

```jsx
import { ExpandableCardWrapper, ExpandableCardHeader } from '@/elements';

// Single card usage
<ExpandableCardWrapper headerComponent={<ExpandableCardHeader headerData={headerData} />} expandAll={false}>
  <div>Card content here</div>
</ExpandableCardWrapper>;
```

## Mapping Usage (Recommended)

```jsx
import { ExpandableCardWrapper, ExpandableCardHeader } from '@/elements';

const MyComponent = () => {
  const [expandAll, setExpandAll] = useState(false);
  const items = [
    /* your data array */
  ];

  return (
    <div>
      {items.map((item, index) => (
        <ExpandableCardWrapper
          key={item.id}
          index={index} // Pass the index for first-item expansion logic
          expandAll={expandAll}
          headerComponent={<ExpandableCardHeader headerData={item.headerData} />}
        >
          <div>Content for {item.name}</div>
        </ExpandableCardWrapper>
      ))}
    </div>
  );
};
```

## Using with ExpandableCard Unit Component

```jsx
import { ExpandableCard } from '@/units';

const FleetsList = () => {
  const fleets = [
    /* your fleet data */
  ];
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div>
      {fleets.map((fleet, index) => (
        <ExpandableCard
          key={fleet.id}
          data={fleet}
          index={index} // First fleet will be expanded by default
          expandAll={expandAll}
          className="mb-4"
        />
      ))}
    </div>
  );
};
```

## Behavior Examples

### Scenario 1: First Item Expansion

```jsx
// First item (index=0) will be expanded automatically
// Other items will be collapsed unless expandAll=true
{
  items.map((item, index) => (
    <ExpandableCardWrapper
      key={item.id}
      index={index}
      expandAll={false} // This won't affect the first item
      headerComponent={<Header data={item} />}
    >
      Content
    </ExpandableCardWrapper>
  ));
}
```

### Scenario 2: Expand All Override

```jsx
// When expandAll=true, all items will be expanded
// First item remains expanded even if expandAll changes to false
{
  items.map((item, index) => (
    <ExpandableCardWrapper
      key={item.id}
      index={index}
      expandAll={true} // All items expanded
      headerComponent={<Header data={item} />}
    >
      Content
    </ExpandableCardWrapper>
  ));
}
```

### Scenario 3: No Index (Legacy Behavior)

```jsx
// Without index prop, behaves like before
// All items follow expandAll prop
<ExpandableCardWrapper expandAll={someCondition} headerComponent={<Header />}>
  Content
</ExpandableCardWrapper>
```

## Integration with Existing Patterns

This component works seamlessly with existing maritime components:

- `ExpandableCardHeader` for rich header content
- `Table` components for displaying vessel/cargo data
- Modal forms and action buttons
- Dynamic content loading states

The first-item expansion logic is particularly useful for:

- Fleet listings where the first fleet should be visible
- Negotiation offers where the primary offer is expanded
- Search results where the best match is shown first
- Any list where the first item contains the most relevant information
