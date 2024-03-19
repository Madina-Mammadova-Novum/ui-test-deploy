'use client';

import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PropTypes from 'prop-types';

import { Loader } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { setSearchParams } from '@/store/entities/search/slice';
import { getSearchSelector } from '@/store/selectors';
import { SearchForm } from '@/units';
import { errorToast } from '@/utils/hooks';

const TankerSearch = () => {
  const dispatch = useDispatch();

  const { data, loading, error } = useSelector(getSearchSelector);
  const [tankerStore, setTankerStore] = useState({ request: false });

  useEffect(() => {
    if (data) {
      handleChangeState('request', true);
    }

    if (error) {
      handleChangeState('request', false);
      errorToast(error.title, error.message);
    }
  }, [error, data]);

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setTankerStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSearch = (formData) => dispatch(setSearchParams(formData));

  const printResult = useMemo(() => {
    if (loading) {
      return (
        <p className="inline-flex pt-5 w-full justify-center items-center gap-x-2.5 text-black text-xsm">
          Searching... <Loader className="h-4 w-4" />
        </p>
      );
    }

    return <TankerSearchResults data={data} request={tankerStore.request} />;
  }, [loading, data, tankerStore.request]);

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {printResult}
    </>
  );
};

TankerSearch.propTypes = {
  title: PropTypes.string,
};

export default TankerSearch;
