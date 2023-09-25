import React, { memo } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { FlagPropTypes } from '@/lib/types';

import { getCountryById } from '@/utils/helpers';

const Flag = ({ id, data = [] }) => {
  const country = getCountryById({ data, id });

  return <ReactCountryFlag countryCode={country?.countryCode} svg />;
};

Flag.propTypes = FlagPropTypes;

export default memo(Flag);
