'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';

import { Loader, Title } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { searchVessels } from '@/services/vessel';
import { setSearchData } from '@/store/entities/search/slice';
import { SearchForm } from '@/units';
import { options, parseErrorMessage } from '@/utils/helpers';
import { errorToast } from '@/utils/hooks';

const TankerSearch = ({ title }) => {
  const [tankerStore, setTankerStore] = useState({
    params: options(['Ballast leg', 'Arrival']),
    directions: options(['Ascending', 'Descending']),
    currentDirection: '',
    currentParam: '',
    request: false,
    loading: false,
    searchResult: [],
  });

  const dispatch = useDispatch();

  /* Change handler by key-value for userStore */
  const handleChangeState = (key, value) => {
    setTankerStore((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSearch = async (formData) => {
    handleChangeState('loading', true);
    const { error, data } = await searchVessels({ data: formData });
    handleChangeState('loading', false);

    if (data) {
      const filteredProducts = formData?.products?.filter((product) => product);

      dispatch(setSearchData({ ...formData, products: filteredProducts }));
      handleChangeState('searchResult', data);
      handleChangeState('request', true);
    }
    if (error) {
      handleChangeState('request', false);
      errorToast(parseErrorMessage(error));
    }
  };

  const { request, loading, params, directions, searchResult } = tankerStore;

  return (
    <>
      {title && (
        <Title level="1" className="py-5">
          {title}
        </Title>
      )}
      <SearchForm onSubmit={handleSearch} />
      {!loading ? (
        <TankerSearchResults
          data={searchResult}
          request={request}
          params={params}
          directions={directions}
          onChange={handleChangeState}
        />
      ) : (
        <p className="inline-flex pt-5 w-full justify-center items-center gap-x-2.5 text-black text-xsm">
          Searching <Loader className="h-4 w-4" />
        </p>
      )}
    </>
  );
};

TankerSearch.propTypes = {
  title: PropTypes.string,
};

export default TankerSearch;
