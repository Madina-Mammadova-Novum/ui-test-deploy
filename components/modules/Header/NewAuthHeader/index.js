import { AuthBasePropTypes } from '@/lib/types';

import { NewNavbar } from '@/modules';

const NewAuthHeader = ({ navigation }) => {
  const { placeholder, cta, contrasted, path } = navigation;
  return (
    <header className="sticky left-0 top-0 z-10 flex w-full">
      <NewNavbar placeholder={placeholder} cta={cta} contrasted={contrasted} path={path} />
    </header>
  );
};

NewAuthHeader.propTypes = AuthBasePropTypes;

export default NewAuthHeader;
