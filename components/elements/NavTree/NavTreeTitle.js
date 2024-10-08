import classNames from 'classnames';
import PropTypes from 'prop-types';

import NavTreeBody from './NavTreeBody';

import AngleDownSVG from '@/assets/images/angleDown.svg';

const NavTreeTitle = ({ title, icon, isOpened, isActive, links, hasNestedLinks }) => {
  return (
    <>
      <div
        className={classNames(
          'flex w-full items-center gap-2.5 rounded-xl px-5 py-2.5 text-sm font-semibold capitalize text-white',
          isActive ? 'bg-blue' : 'hover:bg-blue-dark',
          isOpened && hasNestedLinks && 'bg-blue-dark'
        )}
      >
        {icon}
        {!hasNestedLinks ? (
          <p className="text-white">{title}</p>
        ) : (
          <p className="flex w-full items-center justify-between">
            <span className="text-white">{title}</span>
            <AngleDownSVG className={classNames('fill-white transition duration-200', isOpened && 'rotate-180')} />
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
