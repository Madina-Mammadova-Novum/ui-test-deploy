'use client';

import { useState } from 'react';

import PropTypes from 'prop-types';

import { Loading, Title } from '@/elements';
import { TankerSearchResults } from '@/modules';
import { searchVessels } from '@/services/vessel';
import { SearchForm } from '@/units';
import { options } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const TankerSearch = ({ title }) => {
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
    <>
      <Title level={1} className="py-5">
        {title}
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
    </>
  );
};

TankerSearch.propTypes = {
  title: PropTypes.string.isRequired,
};

export default TankerSearch;
