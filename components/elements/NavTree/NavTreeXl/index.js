import { useMemo } from 'react';

import PropTypes from 'prop-types';

import NavTreeHeader from '../NavTreeHeader';
import NavTreeTitle from '../NavTreeTitle';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon, SearchIcon } from '@/assets/icons';

const NavTreeXl = ({ data, active, opened, onChange }) => {
  const hasNestedLinks = Boolean(data?.items?.length);

  const printIcon = useMemo(() => {
    switch (data?.variant) {
      case 'search':
        return <SearchIcon isActive={active} />;
      case 'positions':
        return <PositionIcon isActive={active} />;
      case 'offers':
        return <OfferIcon isActive={active} />;
      case 'fleets':
        return <AnchorIcon isActive={active} />;
      case 'faq':
        return <FaqIcon isActive={active} />;
      default:
        return null;
    }
  }, [data?.variant, active]);

  return (
    <NavTreeHeader
      href={data.path}
      onClick={() => onChange('opened', !opened)}
      isSubMenu={hasNestedLinks}
      className="flex items-center transition-all"
    >
      {data.title && (
        <NavTreeTitle
          icon={printIcon}
          title={data.title}
          isActive={active}
          isOpened={opened}
          links={data?.items}
          hasNestedLinks={hasNestedLinks}
        />
      )}
    </NavTreeHeader>
  );
};

NavTreeXl.propTypes = {
  active: PropTypes.string,
  opened: PropTypes.bool,
  onChange: PropTypes.func,
  data: PropTypes.shape({
    id: PropTypes.oneOf([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    path: PropTypes.string,
    variant: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default NavTreeXl;
