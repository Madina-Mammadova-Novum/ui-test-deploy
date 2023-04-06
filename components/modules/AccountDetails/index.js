'use client';

import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import { Loader } from '@/elements';
import { getUserDetails } from '@/services';
import {
  AccountCompanyDetails,
  AccountDeactivateDetails,
  AccountDeleteDetails,
  AccountPasswordDetails,
  AccountPersonalDetails,
} from '@/units';

const AccountDetails = ({ containerClass = '' }) => {
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
        <Loader />
      )}
    </div>
  );
};

AccountDetails.propTypes = {
  data: PropTypes.shape({
    personalDetails: PropTypes.shape({}),
    companyDetails: PropTypes.shape({}),
    accountDetails: PropTypes.shape({}),
  }),
  containerClass: PropTypes.string,
};

export default AccountDetails;
