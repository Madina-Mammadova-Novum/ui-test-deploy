'use client';

import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import { Copyright } from '@/elements';
import { LegalNavigation, SocialNetworks } from '@/units';

const InAppChecker = dynamic(() => import('@/common/InAppChecker'), { ssr: false });

export default function AccountFooter({ socials, legal }) {
  return (
    <InAppChecker>
      <footer className="mt-2 flex flex-wrap items-center justify-between gap-2.5 px-5 py-2 text-xs-sm shadow-xmd 3md:flex-nowrap">
        <SocialNetworks data={socials} />
        <LegalNavigation data={legal} />
        <div className="w-full text-center 3md:w-auto">
          <Copyright />
        </div>
      </footer>
    </InAppChecker>
  );
}

AccountFooter.propTypes = {
  /* eslint-disable react/forbid-prop-types */
  socials: PropTypes.array,
  legal: PropTypes.array,
};
