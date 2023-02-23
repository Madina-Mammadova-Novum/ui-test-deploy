'use client';

import { ForgotPasswordBlock } from '@/ui';

const ForgotPassword = () => {
  return (
    <section className="grid grid-cols-2 gap-5p px-10">
      <div className="col-start-2 mt-11 max-w-[300px]">
        <ForgotPasswordBlock
          title="Forgot your password?"
          subtitle="Enter your email address and you will receive an email with password reset link"
        />
      </div>
    </section>
  );
};

export default ForgotPassword;
