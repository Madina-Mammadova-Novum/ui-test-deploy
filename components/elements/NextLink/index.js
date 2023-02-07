import React from 'react';

import classnames from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';

const NextLink = ({ label, href, type, isActive, disabled, customStyles, icon, ...rest }) => {
  return (
    <Link
      className={classnames(
        'text-sm font-bold',
        {
          'bg-primary text-white whitespace-nowrap rounded-[5px] px-9 flex items-center h-[50px]  hover:bg-primary-darker active:bg-primary-darker':
            type === 'primary',
          'text-primary text-xsm hover:text-primary-darker active:text-primary-darker': type === 'secondary',
          'text-black group relative': type === 'default',
          'opacity-[0.4]': disabled,
        },
        customStyles
      )}
      href={href}
      {...rest}
    >
      {label}
      <svg
        className={classnames('absolute top-[-50%] transition-transform duration-500', {
          'block scale-0 group-hover:scale-100 group-active:block': !isActive,
          'block scale-100': isActive,
        })}
        width="77"
        height="40"
        viewBox="0 0 77 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.59968 33.2861C0.957806 31.5226 1.27725 29.44 2.52638 27.1336C3.77514 24.8279 5.92624 22.3535 8.83645 19.8631C14.6539 14.8847 23.4201 9.91356 33.7582 6.15079C44.0964 2.38802 54.0071 0.561268 61.6635 0.635575C65.4937 0.672748 68.732 1.1855 71.1707 2.14909C73.6101 3.11296 75.1935 4.50299 75.8354 6.26654C76.4773 8.03009 76.1578 10.1127 74.9087 12.4191C73.6599 14.7248 71.5088 17.1991 68.5986 19.6896C62.7812 24.668 54.015 29.6391 43.6768 33.4019C33.3387 37.1646 23.428 38.9914 15.7715 38.9171C11.9414 38.8799 8.70303 38.3672 6.26435 37.4036C3.82495 36.4397 2.24156 35.0497 1.59968 33.2861Z"
          stroke="#4286C5"
        />
      </svg>
      {icon && <div className="absolute right-0 top-[-50%] translate-y-1/2">{icon}</div>}
    </Link>
  );
};

NextLink.defaultProps = {
  disabled: false,
  isActive: false,
  customStyles: '',
  icon: null,
};

NextLink.propTypes = {
  label: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['primary', 'secondary', 'default']).isRequired,
  isActive: PropTypes.bool,
  icon: PropTypes.node,
  disabled: PropTypes.bool,
  customStyles: PropTypes.string,
};

export default NextLink;
