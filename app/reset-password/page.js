'use client';

import { ResetPasswordBlock } from '@/ui';

const ResetPassword = () => {
  return (
    <section className="grid grid-cols-2 gap-5p px-10">
      <div className="col-start-2 mt-11 max-w-[477px]">
        <ResetPasswordBlock
          title="Reset your password"
          subtitle="Pick and set a new password for your account and you’re good to go!"
        />
      </div>
    </section>
  );
};

export default ResetPassword;
