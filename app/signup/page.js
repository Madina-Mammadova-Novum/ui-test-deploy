'use client';

import cover from '@/assets/images/cover.jpg';
import { FormManager } from '@/common';
import { NextImage, SignupForm } from '@/elements';
import { options } from '@/utils/formOptions';

export default function SignUp() {
  return (
    <section className="px-10">
      <div className="fixed  left-0 top-0 -z-50 h-full w-screen hidden 3sm:block">
        <NextImage src={cover} alt="cover" customStyles="h-full w-2/5 pr-10 object-cover" />
      </div>

      <div className="3sm:ml-[40%] flex items-center justify-center h-full">
        <div className="col-start-2 mt-14 mb-2">
          <h1 className="text-lg text-black font-bold">Registration</h1>
          <FormManager options={options.signup}>
            <SignupForm />
          </FormManager>
        </div>
      </div>
    </section>
  );
}
