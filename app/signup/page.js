'use client';

import cover from '@/assets/images/cover.jpg';
import { FormManager } from '@/common';
import { NextImage, SignupForm } from '@/elements';
import { options } from '@/utils/formOptions';

export default function SignUp() {
  return (
    <section className="grid grid-cols-2 gap-5p px-10">
      <div className="absolute left-0 top-0 -z-50 h-full w-screen">
        <NextImage src={cover} alt="cover" customStyles="h-full w-1/2 pr-10 w-max object-cover" />
      </div>
      <div className="col-start-2 mt-11">
        <h1 className="text-lg text-black font-bold">Registration</h1>
        <FormManager options={options.signup}>
          <SignupForm />
        </FormManager>
      </div>
    </section>
  );
}
