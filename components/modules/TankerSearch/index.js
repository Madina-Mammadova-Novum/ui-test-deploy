'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TankerSearchTypes } from '@/lib/types';

import { Dropdown, DynamicLoader, Title } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { fetchVesselsBySearch } from '@/store/entities/search/actions';
import { onReset, setRequest, setSearchParams, setSortingParams } from '@/store/entities/search/slice';
import { getSearchSelector } from '@/store/selectors';
import { SearchForm } from '@/units';
import { errorToast } from '@/utils/hooks';

const TankerSearch = ({ isAccountSearch = false }) => {
  const dispatch = useDispatch();

  const { data, loading, error, sorting, searchParams, request, prefilledSearchData } = useSelector(getSearchSelector);
  const dropdownStyles = { dropdownWidth: 100, className: 'flex items-center gap-x-2.5' };

  const handleReset = () => dispatch(onReset());

  const handleRequest = (value) => dispatch(setRequest(value));

  const handleSearch = (formData) => {
    dispatch(setSearchParams(formData));
  };

  const handleDirection = (option) => {
    dispatch(setSortingParams({ key: 'currentDirection', data: option }));
  };

  const handleRange = (option) => {
    dispatch(setSortingParams({ key: 'currentRange', data: option }));
  };

  useEffect(() => {
    if (error) {
      handleRequest(false);
      errorToast(error.title, error.message);
    }

    if (data) {
      handleRequest(true);
    }
  }, [error, data]);

  useEffect(() => {
    return () => {
      handleReset();
    };
  }, []);

  useEffect(() => {
    const baseParams = {
      sortBy: sorting?.currentDirection?.value || sorting?.directions[0]?.value,
      rangeBy: sorting?.currentRange?.value || sorting?.range[0]?.value,
    };

    if (prefilledSearchData?.isSavedSearch) {
      const savedSearchParams = {
        ...prefilledSearchData,
        ...baseParams,
      };
      dispatch(fetchVesselsBySearch(savedSearchParams));
    } else {
      const searchParamsWithSorting = {
        ...searchParams,
        ...baseParams,
      };
      dispatch(fetchVesselsBySearch(searchParamsWithSorting));
    }
  }, [searchParams, sorting, prefilledSearchData, dispatch]);

  const printResult = useMemo(() => {
    if (loading) {
      return <DynamicLoader className="h-56 w-56" />;
    }

    return <TankerSearchResults data={data} request={request} isAccountSearch={isAccountSearch} />;
  }, [loading, data, request]);

  return (
    <>
      <SearchForm onSubmit={handleSearch} onReset={handleReset} isLoading={loading} isAccountSearch={isAccountSearch} />
      {request && (
        <div className="mt-8 flex flex-col sm:flex-row">
          <Title level="2" className="mr-auto">
            Search results
          </Title>

          <div className="flex flex-col items-start justify-center gap-2 sm:flex-row sm:items-center">
            <Dropdown
              label="Sort tankers by:"
              options={sorting?.directions}
              value={sorting?.currentDirection || sorting?.directions[0]}
              onChange={handleDirection}
              customStyles={dropdownStyles}
            />

            <Dropdown
              options={sorting?.range}
              value={sorting?.currentRange || sorting?.range[0]}
              onChange={handleRange}
              customStyles={dropdownStyles}
            />
          </div>
        </div>
      )}
      {printResult}
    </>
  );
};

TankerSearch.propTypes = TankerSearchTypes;

export default TankerSearch;
