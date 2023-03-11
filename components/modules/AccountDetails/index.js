'use client';

import { useCallback, useState } from 'react';

import PropTypes from 'prop-types';

import { ModalManager } from '@/common';
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
      <ModalManager opened={modalState.isOpened} modalId={modalState?.modalId} onClose={handleCloseModal} />
    </>
  );
};

AccountDetails.propTypes = {
  containerClass: PropTypes.string,
};

export default AccountDetails;
