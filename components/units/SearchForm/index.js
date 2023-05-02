'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { SearchFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Button } from '@/elements';
import { searchForTankerSchema } from '@/lib/schemas';
import { SearchFormFields } from '@/units';
import { resetObjectFields } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...searchForTankerSchema(),
});

const SearchForm = ({ onSubmit }) => {
  const methods = useHookFormParams({ schema });

  const handleResetFields = () => {
    methods.reset((formValues) => {
      resetObjectFields(formValues);
      return formValues;
    });
  };

  return (
    <div className="bg-white rounded-base shadow-xmd p-5 w-full relative">
      <FormProvider {...methods}>
        <FormManager
          submitAction={(formData) => onSubmit(formData)}
          submitButton={{
            text: 'Show results',
            variant: 'secondary',
            size: 'large',
            className: '!w-max ml-auto !text-white',
          }}
        >
          <SearchFormFields />
          <div className="absolute bottom-5 right-40">
            <Button
              buttonProps={{ text: 'Reset all', variant: 'primary', size: 'small' }}
              onClick={handleResetFields}
            />
          </div>
        </FormManager>
      </FormProvider>
    </div>
  );
};

SearchForm.propTypes = SearchFormPropTypes;

export default SearchForm;
