'use client';

import { useSelector } from 'react-redux';

import { TankerExpandedFooterPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';
import { ROUTES } from '@/lib';
import OfferModalContent from '@/modules/OfferModalContent';
import { getUserDataSelector } from '@/store/selectors';
import { ExpandableRowFooter, ModalWindow } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';

const TankerExpandedFooter = ({ tankerId, tankerData }) => {
  const { role } = useSelector(getUserDataSelector);

  const { isCharterer } = getRoleIdentity({ role });

  return (
    <ExpandableRowFooter>
      {role ? (
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
