'use client';

import { useMemo } from 'react';

import PropTypes from 'prop-types';

import { Modal } from '@/elements';
import {
  CompanyInfoForm,
  DeactivateAccountForm,
  DeleteAccountForm,
  PasswordInfoForm,
  PersonalInfoForm,
} from '@/modules';

const ModalManager = ({ modalId, opened, onClose }) => {
  const printModalContent = useMemo(() => {
    switch (modalId) {
      case 'personal_details':
        return <PersonalInfoForm title="Edit Personal Details" />;
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
  }, [modalId]);

  return (
    <Modal opened={opened} onClose={onClose}>
      {printModalContent}
    </Modal>
  );
};

ModalManager.propTypes = {
  modalId: PropTypes.string.isRequired,
  opened: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ModalManager;
