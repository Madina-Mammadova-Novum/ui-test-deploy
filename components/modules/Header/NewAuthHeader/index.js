import { AuthBasePropTypes } from '@/lib/types';

import { NewNavbar } from '@/modules';

const NewAuthHeader = ({ navigation }) => {
  const { placeholder, cta, contrasted, path } = navigation;
  return (
    <header className="sticky left-0 top-0 z-10 mx-auto flex w-full max-w-[1152px] px-4 md:px-8 xl:px-0">
      <NewNavbar placeholder={placeholder} cta={cta} contrasted={contrasted} path={path} />
    </header>
  );
};

NewAuthHeader.propTypes = AuthBasePropTypes;

export default NewAuthHeader;
