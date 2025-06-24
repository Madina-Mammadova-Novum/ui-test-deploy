'use client';

import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { TankerExpandedFooterPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';
import { ROUTES } from '@/lib';
import OfferModalContent from '@/modules/OfferModalContent';
import { getUserDataSelector } from '@/store/selectors';
import { ExpandableRowFooter, ModalWindow } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';

const TankerExpandedFooter = ({ tankerId, tankerData }) => {
const TankerExpandedFooter = ({ tankerId, tankerData, products }) => {
  const { role } = useSelector(getUserDataSelector);
  const { isCharterer, isOwner } = getRoleIdentity({ role });

  const printModalAction = useMemo(() => {
    if (isCharterer) {
      return (
        <ModalWindow
          key={tankerId}
          buttonProps={{
            variant: 'primary',
            size: 'large',
            text: 'Send offer',
            className: `ml-auto ${!isCharterer && 'hidden'}`,
          }}
          containerClass="h-full"
        >
          <OfferModalContent tankerId={tankerId} tankerData={tankerData} />
          <OfferModalContent tankerId={tankerId} tankerData={tankerData} products={products} />
        </ModalWindow>
      );
    }

    if (isOwner) {
      return (
        <LinkAsButton
          href={ROUTES.ACCOUNT_POSITIONS}
          buttonProps={{ variant: 'primary', size: 'large' }}
          customStyles="ml-auto w-fit"
        >
          Go to my positions
        </LinkAsButton>
      );
    }

    return (
      <LinkAsButton
        href={ROUTES.SIGNUP}
        buttonProps={{ variant: 'primary', size: 'large' }}
        customStyles="ml-auto w-fit"
      >
        Register to Send offer
      </LinkAsButton>
    );
  }, [isCharterer, tankerId, tankerData]);

  return <ExpandableRowFooter>{printModalAction}</ExpandableRowFooter>;
};

TankerExpandedFooter.propTypes = TankerExpandedFooterPropTypes;

export default TankerExpandedFooter;
