'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import OfferDeclineFields from './OfferDeclineFields';

import { OfferDeclinePropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { declineOfferSchema } from '@/lib/schemas';
import { declineOffer } from '@/services/offer';
import { fetchUserNegotiating } from '@/store/entities/negotiating/actions';
import { setExpandedParent, setTabForParent } from '@/store/entities/negotiating/slice';
import { getUserDataSelector } from '@/store/selectors';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...declineOfferSchema(),
});

const OfferDeclineForm = ({ closeModal, goBack, title = '', showCancelButton, offerDetails, itemId, parentId }) => {
  const dispatch = useDispatch();
  const { role } = useSelector(getUserDataSelector);

  const methods = useHookFormParams({ state: {}, schema });
  const reason = methods.watch('reason');

  const handleSubmit = async (formData) => {
    const { message: successMessage, error } = await declineOffer({
      data: { ...formData, offerId: itemId },
      role,
    });

    if (!error) {
      successToast(successMessage);

      if (parentId) {
        // Set the tab for this specific card to 'failed' (Declined)
        dispatch(setTabForParent({ parentId, tab: 'failed' }));

        // Keep this card expanded after data refetch
        dispatch(setExpandedParent({ parentId }));
      }

      // Refetch all negotiating data to get updated offer lists
      dispatch(fetchUserNegotiating({ page: 1, perPage: 5 }));

      closeModal();
    } else {
      errorToast(error?.title, error?.message);
    }
  };

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        submitButton={{
          text: 'Proceed',
          variant: 'delete',
          size: 'large',
          disabled: !reason,
          className: `absolute cursor-pointer !max-w-[145px] whitespace-nowrap right-8 bottom-8 !px-2.5 ${
            !showCancelButton && 'left-8 !max-w-[unset] !w-auto'
          }`,
        }}
        className="!gap-0"
      >
        <OfferDeclineFields
          closeModal={closeModal}
          title={title}
          goBack={goBack}
          showCancelButton={showCancelButton}
          offerDetails={offerDetails}
        />
      </FormManager>
    </FormProvider>
  );
};

OfferDeclineForm.propTypes = OfferDeclinePropTypes;

export default OfferDeclineForm;
