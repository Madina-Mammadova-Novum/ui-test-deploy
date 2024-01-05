'use client';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ClientSidePackages = () => {
  return (
    <>
      <div id="portal" />
      <ToastContainer position="top-right" closeOnClick={false} closeButton={false} autoClose={1000} hideProgressBar />
    </>
  );
};

export default ClientSidePackages;
