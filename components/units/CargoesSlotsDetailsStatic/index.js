'use client';

import { CargoesSlotsPropTypes } from '@/lib/types';

import { Button, DatePicker, Dropdown, Input } from '@/elements';
import { options } from '@/utils/helpers';

const CargoesSlotsDetailsStatic = ({ data = {} }) => {
  const { countOfCargoes, listOfCargoes } = data;

  const printCargoes = (item, index) => {
    return (
      <div className="grid relative grid-cols-1 lg:grid-cols-3 justify-center items-center gap-x-5" key={item}>
        <Input label={`Imo #${index + 1}`} value={item?.imo} disabled placeholder="Enter IMO" type="number" />
        <Dropdown label="Load port" value={options([item?.port?.portName])[0]} disabled />
        <DatePicker
          label="Bill of lading date"
          dateValue={item?.date}
          inputClass="w-full"
          calendarClass="absolute -left-2.5"
          disabled
        />
      </div>
    );
  };

  return (
    <div className="grid gap-5">
      <div className="w-full relative">
        <Input
          label="How many cargoes have you chartered during the last 6 months?"
          value={countOfCargoes}
          type="number"
          customStyles="z-10 w-full"
          disabled
        />

        <Button
          type="button"
          customStyles="absolute top-[17px] right-1 my-1 !py-4"
          buttonProps={{
            text: 'Apply',
            variant: 'primary',
            size: 'medium',
          }}
          disabled
        />
      </div>

      {listOfCargoes.length > 0 && listOfCargoes?.map(printCargoes)}
    </div>
  );
};

CargoesSlotsDetailsStatic.propTypes = CargoesSlotsPropTypes;

export default CargoesSlotsDetailsStatic;
