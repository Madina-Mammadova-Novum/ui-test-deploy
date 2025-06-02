'use client';

import { NotFoundPropTypes } from '@/lib/types';

import { Button, LinkAsButton, NextImage, Title } from '@/elements';

export default function GlobalError({
  code = '500',
  message = 'Something went wrong',
  messageDetail = "We're sorry, but the page you're looking for is currently unavailable. Please check the URL or try again later.",
  reset,
}) {
  return (
    <section className="relative min-h-screen">
      <NextImage
        src="https://cdne-shiplinkfront-prod-001-a0hmdrbncmhhgfbw.a03.azurefd.net/pageimages/404.webp"
        alt="error"
        customStyles="absolute inset-0 -z-10 h-full w-full object-cover"
        height={750}
        width={1440}
      />
      <div className="container mx-auto flex flex-col items-center justify-center py-12 text-center">
        <div className="bg-gradient-to-t from-purple-light/0 to-purple-light/100 bg-clip-text text-[333px] font-bold leading-none text-transparent opacity-30">
          {code}
        </div>
        <Title level="1" className="text-white">
          {message}
        </Title>
        <p className="mb-5 mt-1.5 max-w-xs text-xsm text-white">{messageDetail}</p>
        <div className="flex gap-4">
          <Button onClick={reset} buttonProps={{ text: 'Try Again', variant: 'secondary', size: 'large' }} />
          <LinkAsButton href="/" buttonProps={{ variant: 'tertiary', size: 'large' }} customStyles="w-auto border-none">
            Back to Home
          </LinkAsButton>
        </div>
      </div>
    </section>
  );
}

GlobalError.propTypes = NotFoundPropTypes;
