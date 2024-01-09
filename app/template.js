'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getCountries, getPorts, getPortsForSearcForm } from '@/services';
import { setGeneralData } from '@/store/entities/general/slice';

export default function RootTemplate({ children }) {
  const dispatch = useDispatch();

  const getData = async () => {
    const [countries, allPorts, searchPorts] = await Promise.all([getCountries(), getPorts(), getPortsForSearcForm()]);

    const result = {
      countries: countries.data,
      ports: {
        allPorts: allPorts.data,
        searchPorts: searchPorts.data,
      },
    };

    dispatch(setGeneralData(result));
  };

  useEffect(() => {
    getData();
  }, []);

  return children;
}
