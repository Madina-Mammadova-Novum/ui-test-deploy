'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FilterByFormPropTypes } from '@/lib/types';

import { FormManager } from '@/common';
import { Title } from '@/elements';
import { resetForm } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const FilterByForm = ({ children, title = 'Filter by' }) => {
  const schema = yup.object().shape({});

  const methods = useHookFormParams({ schema });

  const onSubmit = (formData) => {
    return { formData };
  };

  const onReset = () => resetForm(methods, '');

  return (
    <>
      <Title level="3" className="uppercase text-xsm py-5">
        {title}
      </Title>

      <div className="bg-white rounded-base shadow-xmd p-5 flex w-full">
        <FormProvider {...methods}>
          <FormManager
            showReset
            resetAction={onReset}
            submitAction={onSubmit}
            className="flex flex-col lg:flex-row items-end gap-5 justify-between w-full"
            submitButton={{
              text: 'Show results',
              variant: 'secondary',
              size: 'large',
            }}
          >
            {children}
          </FormManager>
        </FormProvider>
      </div>
    </>
  );
};

FilterByForm.propTypes = FilterByFormPropTypes;

export default FilterByForm;
