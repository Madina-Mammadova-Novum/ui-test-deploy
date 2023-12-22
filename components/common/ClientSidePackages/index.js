'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import { Hydrate } from '@/elements';
import 'react-toastify/dist/ReactToastify.css';
import { useExtraData } from '@/utils/hooks';

const ClientSidePackages = () => {
  useExtraData();

  return (
    <Hydrate loader={null}>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={3000} hideProgressBar />
    </Hydrate>
  );
};

export default ClientSidePackages;
