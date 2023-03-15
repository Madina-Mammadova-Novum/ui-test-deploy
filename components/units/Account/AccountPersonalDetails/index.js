'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Modal, TextRow, Title } from '@/elements';
import { PersonalDetailsForm } from "@/modules";

const AccountPersonalDetails = ({ user }) => { // todo: rules for fields
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <div className="bg-white rounded-md border-2 border-solid border-gray-darker p-5 w-full">
        <div className="flex justify-between items-center">
          <Title component="h3" className="text-lg text-black font-bold">
            Personal Details
          </Title>
          <Button
            buttonProps={{ text: 'Edit personal details', variant: 'primary', size: 'medium' }}
            customStyles="!py-1 !px-2.5"
            onClick={handleOpenModal}
          />
        </div>
        <div className="grid grid-cols-1 3sm:grid-cols-2">
          <div className="col-start-1">
            <TextRow title="First Name" subtitle={user?.firstName} />
            <TextRow title="Last Name" subtitle={user?.lastName} />
            <TextRow title="Email Address" subtitle={user?.email} />
          </div>
          <div className="col-start-1 3sm:col-start-2">
            <TextRow title="Primary phone number" subtitle={user?.primaryPhone} />
            <TextRow title="Secondary phone number" subtitle={user?.secondaryPhone} />
          </div>
        </div>
      </div>
      <Modal opened={opened} onClose={handleCloseModal}>
        <PersonalDetailsForm />
      </Modal>
    </>
  );
};

AccountPersonalDetails.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    primaryPhone: PropTypes.string,
    secondaryPhone: PropTypes.string,
  }),
};

export default AccountPersonalDetails;
