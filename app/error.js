'use client';

import { useEffect } from 'react';

import PropTypes from 'prop-types';

import { GlobalError } from '@/modules';

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <GlobalError reset={reset} />;
}

Error.propTypes = {
  error: PropTypes.instanceOf(Error).isRequired,
  reset: PropTypes.func.isRequired,
};
