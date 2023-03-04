import PropTypes from 'prop-types';

import { navBarPropTypes } from '@/lib/types';

import { Navbar } from '@/modules';

const AuthHeader = ({ navigation }) => {
  const { placeholder, cta, contrasted, path } = navigation;
  return (
    <header className="flex bg-transparent w-full fixed z-10 left-0 top-0 px-10">
      <Navbar placeholder={placeholder} cta={cta} contrasted={contrasted} path={path} />
    </header>
  );
};

AuthHeader.propTypes = {
  navigation: PropTypes.shape(navBarPropTypes).isRequired,
};

export default AuthHeader;
