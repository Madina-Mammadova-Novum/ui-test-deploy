'use client';

import cover from '@/assets/images/cover.jpg';
import { NextImage } from '@/elements';
import { Signup } from '@/ui';

export default function SignUp() {
  return (
    <section className="grid grid-cols-2 gap-5p px-0 md:px-10">
      <div className="absolute left-0 top-0 -z-50 h-full w-screen">
        <NextImage src={cover} alt="cover" customStyles="h-full w-1/2 pr-10 object-cover" />
      </div>
      <Signup containerClass="col-start-2 mt-11" />
    </section>
  );
}
