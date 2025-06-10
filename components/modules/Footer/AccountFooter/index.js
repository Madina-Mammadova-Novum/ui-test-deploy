'use client';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import { Copyright } from '@/elements';
import { LegalNavigation, SocialNetworks } from '@/units';

const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

export default function AccountFooter({ socials, legal }) {
  return (
    <InAppChecker>
      <footer className="mt-2 flex flex-col items-start gap-2.5 bg-white px-5 py-2 text-xs-sm shadow-xmd md:grid md:grid-cols-6 md:items-center md:py-4 3md:grid-cols-3">
        <SocialNetworks data={socials} />
        <div className="flex w-full flex-col items-center gap-1 text-center md:col-span-4 md:gap-2 3md:col-span-1">
          <LegalNavigation data={legal} />
          <Copyright />
        </div>
        <div />
      </footer>
    </InAppChecker>
  );
}

AccountFooter.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  socials: PropTypes.array,
  legal: PropTypes.array,
};
