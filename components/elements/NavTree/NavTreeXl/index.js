import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import NavTreeHeader from '../NavTreeHeader';
import NavTreeTitle from '../NavTreeTitle';

import { AnchorIcon, FaqIcon, OfferIcon, PositionIcon, SearchIcon } from '@/assets/icons';
import { handleToggle } from '@/store/entities/user/slice';
import { getSidebarSelector } from '@/store/selectors';

const NavTreeXl = ({ data, active }) => {
  const dispatch = useDispatch();
  const { opened } = useSelector(getSidebarSelector);
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
      onClick={() => dispatch(handleToggle(!opened))}
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
