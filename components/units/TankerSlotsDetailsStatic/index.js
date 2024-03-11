'use client';

import { TankerSlotsPropTypes } from '@/lib/types';

import { Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';

const TankerSlotsDetailsStatic = ({ data, helperText = null }) => {
  const { countOfTankers } = data;

  return (
    <div className="w-full !relative">
      <Input
        type="number"
        value={countOfTankers}
        label="Number of tankers"
        placeholder={`Please enter no more than ${SETTINGS.MAX_NUMBER_OF_TANKERS} tankers.`}
        customStyles="z-10 w-full"
        helperText={helperText}
        disabled
      />
    </div>
  );
};

TankerSlotsDetailsStatic.propTypes = TankerSlotsPropTypes;

export default TankerSlotsDetailsStatic;
