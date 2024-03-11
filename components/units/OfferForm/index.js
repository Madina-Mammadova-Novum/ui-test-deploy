'use client';

import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { OfferFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { offerSchema } from '@/lib/schemas';
import { searchSelector } from '@/store/selectors';
import { useHookFormParams } from '@/utils/hooks';

const OfferForm = ({ children, disabled, handleSubmit = () => {}, handleValidationError = () => {} }) => {
  const schema = yup.object({ ...offerSchema() });

  const {
    searchData: { products = [], cargoType },
  } = useSelector(searchSelector);

  const methods = useHookFormParams({
    schema,
    state: {
      cargoType,
      ...products
        .filter((product) => product)
        .reduce((res, curr, index) => {
          res[`products[${index}].product`] = curr.product;
          res[`products[${index}].density`] = curr.density;
          res[`products[${index}].tolerance`] = curr.tolerance;
          res[`products[${index}].quantity`] = curr.quantity * (1 - curr.tolerance / 100);

          return res;
        }, {}),
    },
  });

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={handleSubmit}
        onErrorAction={handleValidationError}
        className="!gap-0"
        submitButton={{
          text: 'Send offer',
          variant: 'primary',
          size: 'large',
          disabled,
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
