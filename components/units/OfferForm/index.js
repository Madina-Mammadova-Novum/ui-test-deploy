'use client';

import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { OfferFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { searchSelector } from '@/store/selectors';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...offerSchema(),
});

const OfferForm = ({ children, handleSubmit = () => {} }) => {
  const {
    searchData: { products = [], cargoType },
  } = useSelector(searchSelector);
  const methods = useHookFormParams({
    schema,
    state: {
      cargoType,
      ...products
        .filter((product) => product)
        .reduce(
          (_, curr, index) => ({
            [`products[${index}].product`]: curr.product,
            [`products[${index}].density`]: curr.density,
            [`products[${index}].tolerance`]: curr.tolerance,
            [`products[${index}].quantity`]: curr.quantity * (1 - curr.tolerance / 100),
          }),
          {}
        ),
    },
  });

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        className="!gap-0"
        submitButton={{
          text: 'Send offer',
          variant: 'primary',
          size: 'large',
          className: 'absolute bottom-8 right-8 text-xsm z-[1] !w-32',
        }}
      >
        {children}
      </FormManager>
    </FormProvider>
  );
};

OfferForm.propTypes = OfferFormPropTypes;

export default OfferForm;
