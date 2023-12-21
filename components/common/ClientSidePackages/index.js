'use client';

import React from 'react';
import { ToastContainer } from 'react-toastify';

import { Hydrate } from '@/elements';
import 'react-toastify/dist/ReactToastify.css';

const ClientSidePackages = () => {
  return (
    <Hydrate>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={3000} hideProgressBar />
    </Hydrate>
  );
};

export default ClientSidePackages;
