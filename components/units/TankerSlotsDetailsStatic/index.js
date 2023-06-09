'use client';

import { TankerSlotsPropTypes } from '@/lib/types';

import { Button, Input } from '@/elements';
import { SETTINGS } from '@/lib/constants';

const TankerSlotsDetailsStatic = ({ data, helperText = null }) => {
  const { countOfTankers, listOfTankers } = data;

  const printTankers = (item, index) => {
    return (
      <div key={item} className="relative">
        <Input label={`Imo #${index + 1}`} value={item} disabled placeholder="Enter IMO" type="number" />
      </div>
    );
  };

  return (
    <div className="grid gap-5">
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

        <Button
          type="button"
          customStyles="absolute top-[17px] right-1 my-1 !py-4"
          buttonProps={{ text: 'Apply', variant: 'primary', size: 'medium' }}
          disabled
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">{listOfTankers.map(printTankers)}</div>
    </div>
  );
};

TankerSlotsDetailsStatic.propTypes = TankerSlotsPropTypes;

export default TankerSlotsDetailsStatic;
