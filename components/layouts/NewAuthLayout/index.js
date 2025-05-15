import { AuthBasePropTypes } from '@/lib/types';

import { NewAuthHeader, PageFooter } from '@/modules';

const NewAuthLayout = ({ navigation, children, containerClass = '' }) => {
  return (
    <div className="max-w-screen container mx-auto flex min-h-screen flex-col px-5 md:px-10">
      <NewAuthHeader navigation={navigation} />
      <section className={containerClass}>{children}</section>
      <PageFooter />
    </div>
  );
};

NewAuthLayout.propTypes = AuthBasePropTypes;

export default NewAuthLayout;
