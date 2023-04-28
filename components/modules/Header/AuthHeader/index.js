import { AuthBasePropTypes } from '@/lib/types';

import { Navbar } from '@/modules';

const AuthHeader = ({ navigation }) => {
  const { placeholder, cta, contrasted, path } = navigation;
  return (
    <header className="flex w-full sticky z-10 left-0 top-0">
      <Navbar placeholder={placeholder} cta={cta} contrasted={contrasted} path={path} />
    </header>
  );
};

AuthHeader.propTypes = AuthBasePropTypes;

export default AuthHeader;
