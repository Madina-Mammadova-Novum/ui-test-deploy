import PropTypes from 'prop-types';

import { Title } from '@/elements';

const AccountWrapper = ({ title, children, containerClass }) => {
  return (
    <div className={containerClass}>
      <Title component="h1" className="text-2xl text-black py-5">
        {title}
      </Title>
      {children}
    </div>
  );
};

AccountWrapper.defaultProps = {
  containerClass: 'w-full',
};

AccountWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
};

export default AccountWrapper;
