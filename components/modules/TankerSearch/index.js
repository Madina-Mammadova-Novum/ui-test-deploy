'use client';

import React, { useState } from 'react';

import { Loading } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { searchVessels } from '@/services/vessel';
import { SearchForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const TankerSearch = () => {
  const [sort, setSort] = useState({
    freeParam: 'Ballast leg',
    direction: 'Ascending',
  });
  const [requestOptions, setRequestOptions] = useState({ request: false, loading: false });
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (formData, methods) => {
    setRequestOptions((prevState) => ({ ...prevState, loading: true }));
    const { error, data } = await searchVessels({ data: formData });
    setRequestOptions((prevState) => ({ ...prevState, loading: false }));
    if (data) {
      setSearchResult(data.results);
      setRequestOptions((prevState) => ({ ...prevState, request: true }));
      successToast(data.message);
      methods.reset();
    }
    if (error) {
      const { message, errors, description } = error;
      setRequestOptions((prevState) => ({ ...prevState, request: false }));
      console.error(errors);
      errorToast(message, description);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {!requestOptions.loading ? (
        <TankerSearchResults
          request={requestOptions.request}
          setSort={setSort}
          sort={sort}
          searchResult={searchResult}
        />
      ) : (
        <Loading />
      )}
    </>
  );
};

export default TankerSearch;
