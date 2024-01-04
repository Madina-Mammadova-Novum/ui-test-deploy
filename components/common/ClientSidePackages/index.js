'use client';

import { ToastContainer } from 'react-toastify';

import { Hydrate } from '@/elements';

const ClientSidePackages = () => {
  return (
    <>
      <div id="portal" />
      <Hydrate>
        <ToastContainer
          position="top-right"
          closeOnClick={false}
          closeButton={false}
          autoClose={1000}
          hideProgressBar
        />
      </Hydrate>
    </>
  );
};

export default ClientSidePackages;
