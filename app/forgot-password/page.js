'use client';

import cover from '@/assets/images/cover.jpg';
import { NextImage } from '@/elements';
import { ForgotPasswordBlock } from '@/ui';

const ForgotPassword = () => {
  return (
    <section className="px-10 h-[calc(100vh-12px)]">
      <div className="absolute  left-0 top-0 -z-50 h-full w-screen hidden 3sm:block">
        <NextImage src={cover} alt="cover" customStyles="h-full w-2/5 pr-10 object-cover" />
      </div>
      <div className="3sm:ml-[40%] flex items-center justify-center h-full">
        <div className=" max-w-[300px]">
          <ForgotPasswordBlock
            title="Forgot your password?"
            subtitle="Enter your email address and you will receive an email with password reset link"
          />
        </div>
      </div>
    </section>
  );
};

export default ForgotPassword;
