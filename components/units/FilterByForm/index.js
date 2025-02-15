'use client';

import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { FilterByFormPropTypes } from '@/lib/types';

import { filtersAdapter as failedOffersFiltersAdapter } from '@/adapters/failed-offers';
import { filtersAdapter as postFixtureFiltersAdapter } from '@/adapters/post-fixture';
import { FormManager } from '@/common';
import { Title } from '@/elements';
import { fetchCargoCodes, fetchVesselNames } from '@/store/entities/cargo-vessel/actions';
import { fetchFailedOffers } from '@/store/entities/failed-offers/actions';
import { fetchPostFixtureOffers } from '@/store/entities/post-fixture/actions';
import { getFailedOffersDataSelector, getPostFixtureDataSelector } from '@/store/selectors';
import { resetForm } from '@/utils/helpers';
import { useHookFormParams } from '@/utils/hooks';

const FilterByForm = ({ children, title = 'Filter by', isLoading = false, type = 'post-fixture' }) => {
  const dispatch = useDispatch();
  const methods = useHookFormParams({ state: null, schema: null });

  const isFailedOffers = type === 'failed-offers';
  const selector = isFailedOffers ? getFailedOffersDataSelector : getPostFixtureDataSelector;
  const { sorting, perPage } = useSelector(selector);

  const onSubmit = async (formData) => {
    const data = isFailedOffers ? failedOffersFiltersAdapter(formData) : postFixtureFiltersAdapter(formData);
    const action = isFailedOffers ? fetchFailedOffers : fetchPostFixtureOffers;
    dispatch(action({ page: 1, perPage, searchParams: data, sorting }));
  };

  const onReset = () => {
    resetForm(methods, '');
    const action = isFailedOffers ? fetchFailedOffers : fetchPostFixtureOffers;
    dispatch(action({ page: 1, perPage, sorting }));

    if (isFailedOffers) {
      // Fetch initial lists for failed offers
      dispatch(fetchCargoCodes());
      dispatch(fetchVesselNames());
    }
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
