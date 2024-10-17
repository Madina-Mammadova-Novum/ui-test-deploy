'use client';

import PropTypes from 'prop-types';

import { LinkAsButton, NextImage, Title } from '@/elements';

export default function Maintenance({
  title = "We'll Be Back Soon",
  description = 'Our system is undergoing scheduled maintenance. We’re working hard to improve your experience and will be back shortly. Please check back later.',
  variant = 'maintenance',
}) {
  return (
    <section className="relative min-h-screen">
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
    </section>
  );
}

Maintenance.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['maintenance', 'comingSoon']).isRequired,
};
