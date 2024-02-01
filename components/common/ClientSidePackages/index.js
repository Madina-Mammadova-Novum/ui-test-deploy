'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { fetchCountries, fetchPorts } from '@/store/entities/general/actions';

import 'react-toastify/dist/ReactToastify.css';

const ClientSidePackages = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCountries());
    dispatch(fetchPorts());
  }, []);

  return (
    <>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={1000} hideProgressBar />
    </>
  );
};

export default ClientSidePackages;
