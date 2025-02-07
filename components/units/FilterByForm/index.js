'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { FilterByFormPropTypes } from '@/lib/types';

import { filtersAdapter } from '@/adapters/post-fixture';
import { FormManager } from '@/common';
import { Title } from '@/elements';
import { fetchPostFixtureOffers } from '@/store/entities/post-fixture/actions';
import { getPostFixtureDataSelector } from '@/store/selectors';
import { resetForm } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const FilterByForm = ({ children, title = 'Filter by', isLoading = false }) => {
  const dispatch = useDispatch();
  const methods = useHookFormParams({ state: null, schema: null });

  const { sorting, perPage } = useSelector(getPostFixtureDataSelector);

  const onSubmit = async (formData) => {
    const data = filtersAdapter(formData);

    dispatch(fetchPostFixtureOffers({ page: 1, perPage, searchParams: data, sorting }));
  };

  const onReset = () => {
    resetForm(methods, '');
    dispatch(fetchPostFixtureOffers({ page: 1, perPage, sorting }));
  };

  return (
    <>
      <Title level="3" className="text-xsm uppercase">
        {title}
      </Title>

      <div className="relative flex w-full rounded-base bg-white p-5 shadow-xmd">
        <FormProvider {...methods}>
          <FormManager
            showReset
            resetAction={onReset}
            submitAction={onSubmit}
            className="flex w-full flex-col items-end justify-between gap-5 lg:flex-row"
            submitButton={{
              text: 'Show results',
              variant: 'secondary',
              size: 'large',
              buttonContainerClassName: 'absolute flex-col md:flex-row top-5 2md:right-10 2md:bottom-5 2md:top-auto',
              disabled: isLoading,
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
