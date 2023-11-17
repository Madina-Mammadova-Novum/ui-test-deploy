import { AccountToolsPropTypes } from '@/lib/types';

import { Title } from '@/elements';
import { CalculatedForm, Map } from '@/units';

const AccountTools = ({ title }) => {
  return (
    <section>
      {title && (
        <Title level="1" className="py-5">
          {title}
        </Title>
      )}
      <CalculatedForm>
        <Map />
      </CalculatedForm>
    </section>
  );
};

AccountTools.propTypes = AccountToolsPropTypes;

export default AccountTools;
