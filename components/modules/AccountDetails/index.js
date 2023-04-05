'use client';

import PropTypes from 'prop-types';

import {
  AccountCompanyDetails,
  AccountDeactivateDetails,
  AccountDeleteDetails,
  AccountPasswordDetails,
  AccountPersonalDetails,
} from '@/units';

const AccountDetails = ({ data, containerClass }) => {
  const { personalDetails, companyDetails, accountDetails } = data;
  return (
    <div className={containerClass}>
      <AccountPersonalDetails user={personalDetails} />
      <AccountCompanyDetails company={companyDetails} />
      <AccountPasswordDetails user={accountDetails} />
      <div className="pt-2.5 pb-5">
        <AccountDeactivateDetails />
        <AccountDeleteDetails />
      </div>
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
