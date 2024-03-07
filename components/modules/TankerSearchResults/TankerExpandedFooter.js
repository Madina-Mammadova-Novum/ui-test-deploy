'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TankerExpandedFooterPropTypes } from '@/lib/types';

import { LinkAsButton } from '@/elements';
import { ROUTES } from '@/lib';
import OfferModalContent from '@/modules/OfferModalContent';
import { sendOfferValidation } from '@/services/offer';
import { setRanges } from '@/store/entities/offer/slice';
import { getSearchSelector, getUserDataSelector } from '@/store/selectors';
import { ExpandableRowFooter, ModalWindow } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const TankerExpandedFooter = ({ tankerId, tankerData }) => {
  const dispatch = useDispatch();
  const [valid, setValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { data: offerData } = useSelector(getSearchSelector);
  const { role } = useSelector(getUserDataSelector);
  const { isCharterer } = getRoleIdentity({ role });

  const validationAction = async () => {
    setLoading(true);
    const { data } = await sendOfferValidation({ data: { ...offerData, tankerId } });

    if (data) {
      setLoading(false);
      setValid(data?.canProceed);
      if (data?.canProceed) {
        dispatch(setRanges(data?.ranges));
      } else {
        errorToast('Bad request', data?.message);
      }
    }

    setLoading(false);

    return { result: valid };
  };

  return (
    <ExpandableRowFooter>
      {role ? (
        <ModalWindow
          key={tankerId}
          useValidation
          buttonProps={{
            variant: 'primary',
            size: 'large',
            disabled: loading,
            text: loading ? 'Loading...' : 'Send offer',
            onClick: () => validationAction(),
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
