import { getLocode } from '@/utils/helpers';

export const dropDownOptionAdapter = (data) => {
  if (!data) return {};

  const { id, countryId, label, code, countryFlag, countryName, countryCode } = data;

  return {
    value: id || countryId,
    label: label || countryName,
    countryFlag: countryFlag || countryCode || getLocode(code),
  };
};

export const dropDownOptionsAdapter = ({ data }) => {
  if (!data) return [];

  return data?.map((option) => dropDownOptionAdapter(option));
};
