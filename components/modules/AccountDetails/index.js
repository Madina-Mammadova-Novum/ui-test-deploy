'use client';

import PropTypes from 'prop-types';

import { AccountCompanyDetails, AccountDisabledTools, AccountPasswordDetails, AccountPersonalDetails } from '@/units';

const AccountDetails = ({ containerClass }) => {
  return (
    <div className={containerClass}>
      <AccountPersonalDetails />
      <AccountCompanyDetails />
      <AccountPasswordDetails />
      <AccountDisabledTools />
    </div>
  );
};

AccountDetails.propTypes = {
  containerClass: PropTypes.string,
};

export default AccountDetails;
