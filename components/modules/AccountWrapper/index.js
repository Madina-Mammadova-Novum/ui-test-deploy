import PropTypes from 'prop-types';

import { Title } from '@/elements';

const AccountWrapper = ({ title, suptitle, children, containerClass }) => {
  return (
    <main className={containerClass}>
      <div className="text-black py-5">
        {suptitle && (
          <Title component="h6" className="uppercase text-gray font-bold text-[10px]">
            {suptitle}
          </Title>
        )}
        <Title component="h1" className="text-2xl">
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
