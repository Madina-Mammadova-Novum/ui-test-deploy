'use client';

import PropTypes from 'prop-types';

import {
  CompanyInfoForm,
  DeactivateAccountForm,
  DeleteAccountForm,
  PasswordInfoForm,
  PersonalDetailsForm,
} from '@/modules';
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
      <AccountPersonalDetails>
        <PersonalDetailsForm />
      </AccountPersonalDetails>

      <AccountCompanyDetails>
        <CompanyInfoForm />
      </AccountCompanyDetails>

      <AccountPasswordDetails>
        <PasswordInfoForm />
      </AccountPasswordDetails>

      <AccountDeactivateDetails>
        <DeactivateAccountForm />
      </AccountDeactivateDetails>

      <AccountDeleteDetails>
        <DeleteAccountForm />
      </AccountDeleteDetails>
    </div>
  );
};

AccountDetails.propTypes = {
  containerClass: PropTypes.string,
};

export default AccountDetails;
