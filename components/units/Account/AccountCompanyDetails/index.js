'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { Button, Modal, TextRow, Title } from '@/elements';
import { AddressInfo } from '@/units';

const AccountCompanyDetails = ({ company, children }) => {
  const [opened, setOpened] = useState(false);

  const handleOpenModal = () => setOpened(true);
  const handleCloseModal = () => setOpened(false);

  return (
    <>
      <div className="bg-white rounded-md border-2 border-solid border-gray-darker p-5 w-full">
        <div className="flex justify-between items-center pb-2.5">
          <Title component="h3" className="text-lg text-black font-bold">
            Company Details
          </Title>
          <Button
            buttonProps={{ text: 'Edit company details', variant: 'primary', size: 'medium' }}
            customStyles="!py-1 !px-2.5"
            onClick={handleOpenModal}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-gray font-semibold text-xs-sm uppercase pb-2.5">company information</p>
            <TextRow title="Company name" subtitle={company?.name} />
            <TextRow title="Years in operation" subtitle={company?.years} />
            <TextRow title="Number of tankers" subtitle={company?.totalTankers} />
          </div>
          <hr className="h-px w-full bg-gray" />
          <div className="grid grid-cols-2">
            <AddressInfo containerClass="col-start-1" label="registration address" data={company?.registration} />
            <AddressInfo containerClass="col-start-2" label="correspondence address" data={company?.correspondence} />
          </div>
        </div>
      </div>
      <Modal opened={opened} onClose={handleCloseModal}>
        {children}
      </Modal>
    </>
  );
};

AccountCompanyDetails.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    years: PropTypes.string,
    totalTankers: PropTypes.string,
    registration: PropTypes.shape({
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postal: PropTypes.string,
      country: PropTypes.string,
    }),
    correspondence: PropTypes.shape({
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postal: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
};

export default AccountCompanyDetails;
