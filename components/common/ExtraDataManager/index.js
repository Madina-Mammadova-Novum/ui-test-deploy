'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';

const ExtraDataManager = () => {
  const dispatch = useDispatch();

  const getGeneralData = async () => {
    dispatch(fetchPorts());
    dispatch(fetchCountries());
  };

  useEffect(() => {
    getGeneralData();
  }, []);
};

export default ExtraDataManager;
