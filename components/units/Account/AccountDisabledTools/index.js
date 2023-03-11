'use client';

import PropTypes from 'prop-types';

import { Button } from '@/elements';

const AccountDisabledTools = ({ onDelete, onDeactivate }) => {
  return (
    <div className="pt-2.5">
      <Button
        buttonProps={{ text: 'Do you want to deactivate your account?', variant: 'delete', size: 'small' }}
        customStyles="!p-0"
        onClick={onDeactivate}
      />
      <Button
        buttonProps={{ text: 'Do you want to delete your account?', variant: 'delete', size: 'small' }}
        customStyles="!p-0"
        onClick={onDelete}
      />
    </div>
  );
};

AccountDisabledTools.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onDeactivate: PropTypes.func.isRequired,
};

export default AccountDisabledTools;
