'use client';

import Signup from '@/blocks/Signup';

export default function SignUp() {
  return (
    <section className="grid grid-cols-2 gap-5p px-10">
      <div className="col-start-2 mt-11">
        <Signup title="Registration" />
      </div>
    </section>
  );
}
