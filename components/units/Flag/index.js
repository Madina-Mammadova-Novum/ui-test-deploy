import React, { memo } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { FlagPropTypes } from '@/lib/types';

import { getCountryById } from '@/utils/helpers';

const Flag = ({ id, data = [], className }) => {
  const country = getCountryById({ data, id });

  return <ReactCountryFlag countryCode={country?.countryCode} className={className} svg />;
};

Flag.propTypes = FlagPropTypes;

export default memo(Flag);
