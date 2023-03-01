import { useCallback, useMemo } from 'react';

import PropTypes from 'prop-types';

import { DatePicker, Dropdown, Input } from '@/elements';
import { useHookForm } from '@/utils/hooks';

const InputsList = ({ data, isNested }) => {
  const { register, control, formState } = useHookForm();
  const { errors } = formState;

  const containerStyles = useMemo(() => {
    return isNested ? 'grid grid-cols-1 gap-5' : 'grid grid-cols-2 md:grid-cols-4 gap-5';
  }, [isNested]);

  const inputName = useCallback(
    (rowIndex, colIndex, element) => {
      return isNested ? `slots.list[${rowIndex}][${colIndex}].${element?.name}` : `slots.list[${rowIndex}]`;
    },
    [isNested]
  );

  const inputError = useCallback(
    (rowIndex, colIndex, element) => {
      return isNested
        ? errors.slots?.list?.[rowIndex]?.[colIndex]?.[element?.name]?.message
        : errors.slots?.list?.[rowIndex]?.message;
    },
    [errors.slots?.list, isNested]
  );

  const printInput = useCallback(
    (element, rowIndex, colIndex) => {
      return (
        <Input
          type="number"
          key={element?.id}
          label={element?.label}
          name={inputName(rowIndex, colIndex, element)}
          error={inputError(rowIndex, colIndex, element)}
          register={register}
        />
      );
    },
    [inputError, inputName, register]
  );

  const printDropDown = useCallback(
    (element, rowIndex, colIndex) => (
      <Dropdown
        label={element?.label}
        name={inputName(rowIndex, colIndex, element)}
        error={inputError(rowIndex, colIndex, element)}
        dropdownOptions={element?.options}
        control={control}
      />
    ),
    [control, inputError, inputName]
  );

  const printDatePicker = useCallback(
    (element, rowIndex, colIndex) => (
      <DatePicker
        inputClass="w-full"
        label={element?.label}
        name={inputName(rowIndex, colIndex, element)}
        error={inputError(rowIndex, colIndex, element)}
        register={register}
      />
    ),
    [inputError, inputName, register]
  );

  const printMarkup = useCallback(
    (element, colIndex = 0, rowIndex = 0) => {
      switch (element.name) {
        case 'imo':
          return printInput(element, rowIndex, colIndex);
        case 'port':
          return printDropDown(element, rowIndex, colIndex);
        case 'date':
          return printDatePicker(element, rowIndex, colIndex);
        default:
          return null;
      }
    },
    [printDatePicker, printDropDown, printInput]
  );

  const printCargoes = useCallback(
    (cargoes, colIndex) => (
      <div className="grid grid-cols-3 gap-5">
        {cargoes?.map((item, rowIndex) => printMarkup(item, rowIndex, colIndex))}
      </div>
    ),
    [printMarkup]
  );

  return (
    <ul className={containerStyles}>
      {data?.map((item, index) => (isNested ? printCargoes(item, index) : printInput(item, index)))}
    </ul>
  );
};

InputsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  isNested: PropTypes.bool.isRequired,
};

export default InputsList;
