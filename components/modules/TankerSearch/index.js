'use client';

import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Dropdown, DynamicLoader, Title } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { fetchVesselsBySearch } from '@/store/entities/search/actions';
import { onReset, setRequest, setSearchParams, setSortingParams } from '@/store/entities/search/slice';
import { getSearchSelector } from '@/store/selectors';
import { SearchForm } from '@/units';
import { errorToast } from '@/utils/hooks';

const TankerSearch = () => {
  const dispatch = useDispatch();

  const { data, loading, error, sorting, searchParams, request } = useSelector(getSearchSelector);
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
    const result = {
      ...searchParams,
      sortBy: sorting?.currentDirection?.value || sorting?.directions[0]?.value,
      rangeBy: sorting?.currentRange?.value || sorting?.range[0]?.value,
    };

    dispatch(fetchVesselsBySearch(result));
  }, [searchParams, sorting]);

  const printResult = useMemo(() => {
    if (loading) {
      return <DynamicLoader className="h-56 w-56" />;
    }

    return <TankerSearchResults data={data} request={request} />;
  }, [loading, data, request]);

  return (
    <>
      <SearchForm onSubmit={handleSearch} onReset={handleReset} />
      {request && (
        <div className="mt-8 flex flex-col sm:flex-row">
          <Title level="2" className="mr-auto">
            Search results
          </Title>

          <div className="flex justify-center items-start sm:items-center gap-2 flex-col sm:flex-row">
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

export default TankerSearch;
