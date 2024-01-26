import { memo } from 'react';
import ReactCountryFlag from 'react-country-flag';

import { FlagPropTypes } from '@/lib/types';

const Flag = ({ countryCode, className }) => {
  return <ReactCountryFlag countryCode={countryCode} className={className} svg />;
};

Flag.propTypes = FlagPropTypes;

export default memo(Flag);
