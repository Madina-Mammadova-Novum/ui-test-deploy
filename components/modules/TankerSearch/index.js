'use client';

import { useState } from 'react';

import { Loader, Title } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { searchVessels } from '@/services/vessel';
import { SearchForm } from '@/units';
import { options } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const TankerSearch = () => {
  const [tankerStore, setTankerStore] = useState({
    params: options(['Ballast leg']),
    directions: options(['Ascendingg', 'Descending']),
    currentDirection: '',
    currentParam: '',
    request: false,
    loading: false,
    searchResult: [],
  });

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
      handleChangeState('searchResult', data?.results);
      handleChangeState('request', true);
      successToast(data.message);
    }
    if (error) {
      const { message, errors, description } = error;
      handleChangeState('request', false);
      console.error(errors);
      errorToast(message, description);
    }
  };

  const { request, loading, params, directions, searchResult } = tankerStore;

  return (
    <section>
      <Title level={1} className="py-5">
        Search
      </Title>
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
    </section>
  );
};

export default TankerSearch;
