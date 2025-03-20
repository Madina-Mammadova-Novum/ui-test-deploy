'use client';

import PropTypes from 'prop-types';

import { LinkAsButton, NextImage, Title } from '@/elements';
import { CountdownTimer } from '@/units';

export default function Maintenance({ title, description, variant = 'maintenance' }) {
  // May 1st, 2025
  const targetDate = new Date(2025, 4, 1);

  return (
    <section className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-black via-black/95 to-blue-dark/90">
      {variant === 'maintenance' ? (
        <>
          <NextImage
            src="/images/maintenance.jpg"
            alt="Maintenance"
            customStyles="absolute inset-0 -z-10 h-full w-full object-cover"
            height={750}
            width={1440}
          />

          <div className="container mx-auto flex h-full flex-col items-center justify-center py-12 text-center opacity-95">
            <div className="rounded-lg bg-white/70 p-8 shadow-lg">
              <Title level="1" className="text-black">
                {title}
              </Title>
              <p className="mb-5 mt-1.5 max-w-lg text-base text-black">{description}</p>
              {variant === 'maintenance' && (
                <LinkAsButton
                  href="/contact-us"
                  buttonProps={{ variant: 'secondary', size: 'large' }}
                  customStyles="w-auto border-none"
                >
                  Contact Us for More Information
                </LinkAsButton>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="container mx-auto flex flex-col items-center justify-center py-12 text-center">
          <div className="relative mb-24">
            <div className="absolute -inset-8 -z-10 animate-pulse rounded-full bg-blue/20 blur-2xl" />
            <NextImage
              src="/images/logo.png"
              alt="Logo"
              customStyles="h-48 w-auto md:h-64 drop-shadow-lg"
              height={256}
              width={500}
            />
          </div>

          {description && <p className="mb-16 max-w-xl text-xl leading-relaxed text-white">{description}</p>}

          <div className="mb-16">
            <CountdownTimer targetDate={targetDate} />
          </div>

          <div className="mt-6 rounded-full border border-blue-darker/30 bg-black/60 px-8 py-3 backdrop-blur-md">
            <p className="text-sm text-blue-light">We&apos;re launching on May 1st</p>
          </div>
        </div>
      )}
    </section>
  );
}

Maintenance.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  variant: PropTypes.oneOf(['maintenance', 'comingSoon']),
};
