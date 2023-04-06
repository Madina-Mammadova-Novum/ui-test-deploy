import PropTypes from 'prop-types';

import { Title } from '@/elements';

const AccountWrapper = ({ title, suptitle, children, containerClass }) => {
  return (
    <main className={containerClass}>
      <div className="text-black py-5">
        {suptitle && (
          <Title level="6" className="uppercase text-gray font-bold text-xxs">
            {suptitle}
          </Title>
        )}
        <Title level="1" className="text-2xl">
          {title}
        </Title>
      </div>
      {children}
    </main>
  );
};

AccountWrapper.defaultProps = {
  containerClass: 'w-full',
  suptitle: '',
};

AccountWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  containerClass: PropTypes.string,
  suptitle: PropTypes.string,
};

export default AccountWrapper;
