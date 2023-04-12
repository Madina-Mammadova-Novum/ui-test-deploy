'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Loader, Title } from '@/elements';
import { getUserDetails } from '@/services';
import {
  AccountCompanyDetails,
  AccountDeactivateDetails,
  AccountDeleteDetails,
  AccountPasswordDetails,
  AccountPersonalDetails,
} from '@/units';

const AccountDetails = ({ title, containerClass = '' }) => {
  const [accountData, setAccountData] = useState(null);

  const fetchData = async () => {
    const data = await getUserDetails();
    setAccountData(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={containerClass}>
      <Title level={1} className="py-5">
        {title}
      </Title>
      {accountData ? (
        <>
          <AccountPersonalDetails user={accountData?.personalDetails} />
          <AccountCompanyDetails company={accountData?.companyDetails} />
          <AccountPasswordDetails user={accountData?.accountDetails} />
          <div className="pt-2.5 pb-5">
            <AccountDeactivateDetails />
            <AccountDeleteDetails />
          </div>
        </>
      ) : (
        <Loader className="h-8 w-8 absolute top-1/2" />
      )}
    </div>
  );
};

AccountDetails.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.shape({
    personalDetails: PropTypes.shape({}),
    companyDetails: PropTypes.shape({}),
    accountDetails: PropTypes.shape({}),
  }),
  containerClass: PropTypes.string,
};

export default AccountDetails;
