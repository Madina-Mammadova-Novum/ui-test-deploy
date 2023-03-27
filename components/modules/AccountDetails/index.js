'use client';

import PropTypes from 'prop-types';

import {
  AccountCompanyDetails,
  AccountDeactivateDetails,
  AccountDeleteDetails,
  AccountPasswordDetails,
  AccountPersonalDetails,
} from '@/units';

const AccountDetails = ({ containerClass }) => {
  return (
    <div className={containerClass}>
      <AccountPersonalDetails />
      <AccountCompanyDetails />
      <AccountPasswordDetails />
      <AccountDeactivateDetails />
      <AccountDeleteDetails />
    </div>
  );
};

AccountDetails.propTypes = {
  containerClass: PropTypes.string,
};

export default AccountDetails;
