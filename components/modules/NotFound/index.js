'use client';

import { LinkAsButton, NextImage, Title } from '@/elements';

export default function NotFound() {
  return (
    <section className="relative min-h-screen">
      <NextImage
        src="/images/crash.jpg"
        alt="error"
        customStyles="absolute inset-0 -z-10 h-full w-full object-cover"
        height={750}
        width={1440}
      />
      <div className="container mx-auto text-center flex flex-col justify-center items-center py-12">
        <div className="font-bold text-[333px] leading-none text-transparent bg-clip-text bg-gradient-to-t from-purple-light/0 to-purple-light/100 opacity-30">
          404
        </div>
        <Title level={1} className="text-white">
          Page not found
        </Title>
        <p className="max-w-xs text-xsm text-white mt-1.5 mb-5">
          It seems that we can’t find the page you’re looking for. Try going back to the previous page.
        </p>
        <LinkAsButton href="/" buttonProps={{ variant: 'tertiary', size: 'large' }} customStyles="w-auto border-none">
          Back to Home
        </LinkAsButton>
      </div>
    </section>
  );
}
