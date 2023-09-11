'use client';

import { useSession } from 'next-auth/react';

import { TankerExpandedFooterPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';
import { ROUTES } from '@/lib';
import OfferModalContent from '@/modules/OfferModalContent';
import { ExpandableRowFooter, ModalWindow } from '@/units';

const TankerExpandedFooter = ({ tankerId }) => {
  const { status } = useSession();
  const isAuthorized = status === 'authenticated';
  return (
    <ExpandableRowFooter>
      {isAuthorized ? (
        <ModalWindow buttonProps={{ variant: 'primary', size: 'large', text: 'Send offer', className: 'ml-auto' }}>
          <OfferModalContent tankerId={tankerId} />
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
