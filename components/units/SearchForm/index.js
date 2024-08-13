'use client';

import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useSelector } from 'react-redux';

import * as yup from 'yup';

import { SearchFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Button } from '@/elements';
import { searchForTankerSchema } from '@/lib/schemas';
import { getSearchSelector } from '@/store/selectors';
import { SearchFormFields } from '@/units';
import { resetObjectFields } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const SearchForm = ({ onSubmit, onReset, isLoading = false, isAccountSearch = false }) => {
  const { prefilledSearchData } = useSelector(getSearchSelector);

  const [productState, setProductState] = useState(prefilledSearchData?.productsByIndex || [0]);

  const schema = yup.object({ ...searchForTankerSchema() });
  const methods = useHookFormParams({ schema, state: prefilledSearchData });

  const handleResetFields = () => {
    methods.reset((formValues) => {
      resetObjectFields(formValues);
      return formValues;
    });

    onReset();
    setProductState([0]);
  };

  return (
    <div className="bg-white rounded-base shadow-2xmd p-5 mt-5 w-full relative">
      <FormProvider {...methods}>
        <FormManager
          submitAction={(formData) => onSubmit(formData)}
          submitButton={{
            text: 'Show results',
            variant: 'secondary',
            size: 'large',
            className: '!w-max ml-auto !text-white',
            disabled: isLoading,
          }}
          className={`${isAccountSearch ? 'gap-20 sm:gap-9 md:gap-5' : 'gap-5'} flex flex-col`}
        >
          <SearchFormFields productState={productState} setProductState={setProductState} />
          {isAccountSearch && (
            <div className="flex items-end flex-col sm:flex-row gap-4 absolute bottom-[4.5rem] md:bottom-6 md:left-5 right-5 md:right-0 ">
              <Button
                buttonProps={{ text: 'Mark as Favorite', variant: 'primary', size: 'medium' }}
                onClick={handleResetFields}
              />
              <Button
                buttonProps={{ text: 'View Favorite Searches', variant: 'primary', size: 'medium' }}
                onClick={handleResetFields}
              />
            </div>
          )}
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
