'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { searchForTankerSchema } from '@/lib/schemas';
import { SearchFormFields } from '@/units';
import { useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...searchForTankerSchema(),
});

const SearchForm = () => {
  const methods = useHookFormParams({ schema });
  const handleSubmit = (data) => console.log(data);
  return (
    <div className="bg-white rounded-md border-2 border-solid border-gray-darker p-5 w-full">
      <FormProvider {...methods}>
        <FormManager
          submitAction={handleSubmit}
          submitButton={{ text: 'Show results', variant: 'secondary', size: 'large', className: '!w-max ml-auto' }}
        >
          <SearchFormFields />
        </FormManager>
      </FormProvider>
    </div>
  );
};

export default SearchForm;
