'use client';

import { CargoesSlotsPropTypes } from '@/lib/types';

import { Input } from '@/elements';

const CargoesSlotsDetailsStatic = ({ data = {} }) => {
  const { countOfCargoes } = data;

  return (
    <div className="relative w-full">
      <Input
        label="How many cargoes have you chartered during the last 6 months?"
        value={countOfCargoes}
        type="number"
        customStyles="z-10 w-1/2"
        disabled
      />
    </div>
  );
};

CargoesSlotsDetailsStatic.propTypes = CargoesSlotsPropTypes;

export default CargoesSlotsDetailsStatic;
