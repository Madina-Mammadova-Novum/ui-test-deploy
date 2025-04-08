'use client';

import { AccountToolsPropTypes } from '@/lib/types';

import { Title } from '@/elements';
import { CalculatedForm, Map } from '@/units';

const AccountTools = ({ title, customHeight = '', isLoggedIn = false }) => {
  return (
    <>
      {title && (
        <Title level="1" className="py-5">
          {title}
        </Title>
      )}
      <CalculatedForm isLoggedIn={isLoggedIn} customHeight={customHeight}>
        <Map className="h-full" />
      </CalculatedForm>
    </>
  );
};

AccountTools.propTypes = AccountToolsPropTypes;

export default AccountTools;
