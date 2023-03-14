'use client';

import { useCallback, useMemo, useState } from 'react';

import PropTypes from 'prop-types';

import { Modal } from '@/elements';
import {
  CompanyInfoForm,
  DeactivateAccountForm,
  DeleteAccountForm,
  PasswordInfoForm,
  PersonalDetailsForm,
} from '@/modules';
import { AccountCompanyDetails, AccountDisabledTools, AccountPasswordDetails, AccountPersonalDetails } from '@/units';

const AccountDetails = ({ containerClass }) => {
  const [modalState, setModalState] = useState({ isOpened: false, modalId: null });

  const handleEdit = (value) =>
    setModalState((prevState) => ({
      ...prevState,
      modalId: value,
      isOpened: true,
    }));

  const handleCloseModal = useCallback(() => {
    setModalState((prevState) => ({
      ...prevState,
      isOpened: false,
    }));
  }, []);

  const printModalContent = useMemo(() => {
    switch (modalState?.modalId) {
      case 'personal_details':
        return <PersonalDetailsForm title="Edit Personal Details" />;
      case 'company_details':
        return <CompanyInfoForm title="Edit Company Details" />;
      case 'password_details':
        return <PasswordInfoForm title="Change Your Password" />;
      case 'delete_details':
        return <DeleteAccountForm title="Delete your account" />;
      case 'deactivate_details':
        return <DeactivateAccountForm title="Deactivation of your account" />;
      default:
        return null;
    }
  }, [modalState?.modalId]);

  return (
    <>
      <div className={containerClass}>
        <AccountPersonalDetails onEdit={() => handleEdit('personal_details')} />
        <AccountCompanyDetails onEdit={() => handleEdit('company_details')} />
        <AccountPasswordDetails onEdit={() => handleEdit('password_details')} />
        <AccountDisabledTools
          onDelete={() => handleEdit('delete_details')}
          onDeactivate={() => handleEdit('deactivate_details')}
        />
      </div>
      <Modal opened={modalState?.isOpened} onClose={handleCloseModal}>
        {printModalContent}
      </Modal>
    </>
  );
};

AccountDetails.propTypes = {
  containerClass: PropTypes.string,
};

export default AccountDetails;
