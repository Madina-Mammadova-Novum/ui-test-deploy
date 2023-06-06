import classnames from "classnames";
import PropTypes from 'prop-types';

import NavTreeBody from './NavTreeBody';

import AngleDownSVG from '@/assets/images/angleDown.svg';

const NavTreeTitle = ({ title, icon, isOpened, isActive, links, hasNestedLinks }) => {
  return (
    <>
      <div
        className={classnames('flex items-center text-sm text-white font-semibold capitalize gap-2.5 w-full px-5 py-2.5 rounded-xl',
          isActive ? 'bg-blue' : 'hover:bg-blue-dark',
          isOpened && hasNestedLinks && 'bg-blue-dark'
          )}
      >
        {icon}
        {!hasNestedLinks ? (
          <p className="text-white">{title}</p>
        ) : (
          <p className="flex w-full justify-between items-center">
            <span className="text-white">{title}</span>
            <AngleDownSVG className={`fill-white transition duration-200 ${isOpened && 'rotate-180'}`} />
          </p>
        )}
      </div>
      {links.length > 0 && <NavTreeBody list={links} toggle={isOpened} />}
    </>
  );
};

NavTreeTitle.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.node,
  isOpened: PropTypes.bool,
  isActive: PropTypes.bool,
  links: PropTypes.arrayOf(PropTypes.shape({})),
  hasNestedLinks: PropTypes.bool,
};

export default NavTreeTitle;
