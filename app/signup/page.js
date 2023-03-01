'use client';

import cover from '@/assets/images/cover.jpg';
import { NextImage } from '@/elements';
import { Signup } from '@/ui';

export default function SignUp() {
  return (
    <section className="px-10">
      <div className="fixed  left-0 top-0 -z-50 h-full w-screen hidden 3sm:block">
        <NextImage src={cover} alt="cover" customStyles="h-full w-2/5 pr-10 object-cover" />
      </div>
      <div className="3sm:ml-[40%] flex items-center justify-center h-full">
        <div className="col-start-2 mt-14 mb-2">
        <Signup containerClass="col-start-2 mt-11" />

        </div>
      </div>
      </section>
  );
}
