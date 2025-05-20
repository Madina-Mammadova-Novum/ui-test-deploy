import { AuthBasePropTypes } from '@/lib/types';

import { NewAuthHeader, PageFooter } from '@/modules';

const NewAuthLayout = ({ navigation, children, containerClass = '' }) => {
  return (
    <div className="max-w-screen flex min-h-screen flex-col justify-between">
      <NewAuthHeader navigation={navigation} />
      <section className={containerClass}>{children}</section>
      <PageFooter />
    </div>
  );
};

NewAuthLayout.propTypes = AuthBasePropTypes;

export default NewAuthLayout;
