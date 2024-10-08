import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import NavTreeHeader from '../NavTreeHeader';
import NavTreeTitle from '../NavTreeTitle';

import { menuItemPropTypes } from '@/lib/types';

import AnchorSVG from '@/assets/images/anchor.svg';
import BrowserSVG from '@/assets/images/browser.svg';
import FileInfoAltSVG from '@/assets/images/fileInfoAlt.svg';
import QuestionCircleSVG from '@/assets/images/questionCircle.svg';
import SearchSVG from '@/assets/images/search.svg';
import ToolsSVG from '@/assets/images/wrench.svg';
import { handleToggle } from '@/store/entities/general/slice';
import { getSidebarSelector } from '@/store/selectors';

const NavTreeXl = ({ data, active }) => {
  const dispatch = useDispatch();
  const { opened } = useSelector(getSidebarSelector);
  const hasNestedLinks = Boolean(data?.items?.length);

  const printIcon = useMemo(() => {
    const customStyles = classNames(active ? 'fill-white' : 'fill-gray', 'shrink-0');

    switch (data?.variant) {
      case 'search':
        return <SearchSVG className={customStyles} />;
      case 'positions':
        return <BrowserSVG className={customStyles} />;
      case 'offers':
        return <FileInfoAltSVG className={customStyles} />;
      case 'fleets':
        return <AnchorSVG className={customStyles} />;
      case 'faq':
        return <QuestionCircleSVG className={customStyles} />;
      case 'tools':
        return <ToolsSVG className={customStyles} width="24" height="24" viewBox="0 0 24 24" />;
      default:
        return null;
    }
  }, [data?.variant, active]);

  const onToggle = () => dispatch(handleToggle(!opened));

  return (
    <NavTreeHeader
      href={data.path}
      onClick={onToggle}
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
  active: PropTypes.bool,
  data: menuItemPropTypes,
};

export default NavTreeXl;
