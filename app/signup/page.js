'use client';

import { FormManager } from '@/common';
import { SignupForm } from '@/elements';
import { options } from '@/utils/formOptions';

export default function SignUp() {
  return (
    <section className="grid grid-cols-2 gap-5p px-10">
      <div className="col-start-2 mt-11">
        <h1 className="text-lg text-black font-bold">Registration</h1>
        <FormManager options={options.signup}>
          <SignupForm />
        </FormManager>
      </div>
    </section>
  );
}
