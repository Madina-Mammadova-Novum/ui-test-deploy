'use client';

import { useSession } from 'next-auth/react';

import { TankerExpandedFooterPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';
import { ROUTES } from '@/lib';
import OfferModalContent from '@/modules/OfferModalContent';
import { ExpandableRowFooter, ModalWindow } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';

const TankerExpandedFooter = ({ tankerId, tankerData }) => {
  const { status, data: session } = useSession();
  const { isCharterer } = getRoleIdentity({ role: session?.role });
  const isAuthorized = status === 'authenticated';
  return (
    <ExpandableRowFooter>
      {isAuthorized ? (
        <ModalWindow
          buttonProps={{
            variant: 'primary',
            size: 'large',
            text: 'Send offer',
            className: `ml-auto ${!isCharterer && 'hidden'}`,
          }}
        >
          <OfferModalContent tankerId={tankerId} tankerData={tankerData} />
        </ModalWindow>
      ) : (
        <LinkAsButton
          href={ROUTES.SIGNUP}
          buttonProps={{ variant: 'primary', size: 'large' }}
          customStyles="ml-auto w-fit"
        >
          Register to Send offer
        </LinkAsButton>
      )}
    </ExpandableRowFooter>
  );
};

TankerExpandedFooter.propTypes = TankerExpandedFooterPropTypes;

export default TankerExpandedFooter;
