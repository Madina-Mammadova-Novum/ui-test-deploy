'use client';

import { Button } from '@/elements';

const AccountDisabledTools = () => {
  return (
    <div className="pt-2.5">
      <Button
        buttonProps={{ text: 'Do you want to deactivate your account?', variant: 'delete', size: 'small' }}
        customStyles="!p-0"
      />
      <Button
        buttonProps={{ text: 'Do you want to delete your account?', variant: 'delete', size: 'small' }}
        customStyles="!p-0"
      />
    </div>
  );
};

export default AccountDisabledTools;
