import { AuthBasePropTypes } from '@/lib/types';

import { Navbar } from '@/modules';

const AuthHeader = ({ navigation }) => {
  const { placeholder, cta, contrasted, path } = navigation;
  return (
    <header className="sticky left-0 top-0 z-10 flex w-full">
      <Navbar placeholder={placeholder} cta={cta} contrasted={contrasted} path={path} />
    </header>
  );
};

AuthHeader.propTypes = AuthBasePropTypes;

export default AuthHeader;
