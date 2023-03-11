'use client';

import PropTypes from 'prop-types';

import { Button, Title } from '@/elements';

const AccountPasswordDetails = ({ onEdit }) => {
  return (
    <div className="bg-white rounded-md border-2 border-solid border-gray-darker p-5 w-full">
      <div className="flex justify-between items-center">
        <Title component="h3" className="text-lg text-black font-bold">
          Password
        </Title>
        <Button
          buttonProps={{ text: 'Change your password', variant: 'primary', size: 'medium' }}
          customStyles="!py-1 !px-2.5"
          onClick={onEdit}
        />
      </div>
    </div>
  );
};

AccountPasswordDetails.defaultProps = {
  data: {},
};

AccountPasswordDetails.propTypes = {
  onEdit: PropTypes.func.isRequired,
  data: PropTypes.shape({}),
};

export default AccountPasswordDetails;
