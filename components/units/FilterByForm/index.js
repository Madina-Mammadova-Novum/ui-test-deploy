'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { FilterByFormPropTypes } from '@/lib/types';

import { filtersAdapter } from '@/adapters/post-fixture';
import { FormManager } from '@/common';
import { Title } from '@/elements';
import { fetchPostFixtureOffers } from '@/store/entities/post-fixture/actions';
import { postFixtureSelector } from '@/store/selectors';
import { resetForm } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const FilterByForm = ({ children, title = 'Filter by' }) => {
  const schema = yup.object().shape({});

  const methods = useHookFormParams({ schema });
  const dispatch = useDispatch();
  const {
    data: { perPage },
  } = useSelector(postFixtureSelector);

  const onSubmit = (formData) => {
    const filters = filtersAdapter(formData);
    dispatch(fetchPostFixtureOffers({ page: 1, perPage, filters }));
  };

  const onReset = () => resetForm(methods, '');

  return (
    <>
      <Title level="3" className="uppercase text-xsm py-5">
        {title}
      </Title>

      <div className="bg-white rounded-base shadow-xmd p-5 flex w-full relative">
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
              buttonContainerClassName: 'absolute right-10 bottom-5',
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
