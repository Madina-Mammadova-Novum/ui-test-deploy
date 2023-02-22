'use client';

import { Signup } from '@/blocks';

export default function SignUp() {
  return (
    <section className="grid grid-cols-2 gap-5p px-10">
      <div className="col-start-2 mt-11">
        <h1 className="text-lg text-black font-bold">Registration</h1>
        <Signup />
      </div>
    </section>
  );
}
