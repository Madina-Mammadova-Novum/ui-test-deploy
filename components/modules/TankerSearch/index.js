'use client';

import React, { useState } from 'react';

import { TankerSearchResults } from '@/modules';
import { searchVessels } from '@/services/vessel';
import { SearchForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';

const TankerSearch = () => {
  const [sortParams, setSortParams] = useState({
    freeParam: 'Ballast leg',
    direction: 'Ascending',
  });
  const [loading, setLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleSearch = async (formData, methods) => {
    setLoading(true);
    const { error, data } = await searchVessels({ data: formData });
    setLoading(false);
    if (data) {
      setSearchResult(data.results);
      successToast(data.message);
      methods.reset();
    }
    if (error) {
      const { message, errors, description } = error;
      console.error(errors);
      errorToast(message, description);
    }
  };

  return (
    <>
      <SearchForm onSubmit={handleSearch} />
      {/* eslint-disable-next-line no-nested-ternary */}
      {!loading ? (
        searchResult?.exactResults?.length || searchResult?.partialResults?.length ? (
          <TankerSearchResults setSortParams={setSortParams} sortParams={sortParams} searchResult={searchResult} />
        ) : null
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default TankerSearch;
