import { getLocode } from '@/utils/helpers';

export const countryOptionAdapter = (data) => {
  if (!data) return {};

  const { id, countryId, label, code, countryFlag, countryName, countryCode } = data;

  return {
    value: id || countryId,
    label: label || countryName,
    countryFlag: countryFlag || countryCode || getLocode(code),
  };
};

export const countryOptionsAdapter = ({ data }) => {
  if (!data) return [];

  return data?.map((option) => countryOptionAdapter(option));
};
