'use client';

import { useState } from 'react';

import { Loading, Title } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { searchVessels } from '@/services/vessel';
import { SearchForm } from '@/units';
import { options } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const TankerSearch = () => {
  const [tankerStore, setTankerStore] = useState({
    freeParam: options(['Ballast leg']),
    direction: options(['Ascendingg', 'Descending']),
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

  const { request, loading, freeParam, direction, searchResult } = tankerStore;

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
          params={freeParam}
          direction={direction}
          onChange={handleChangeState}
        />
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default TankerSearch;
