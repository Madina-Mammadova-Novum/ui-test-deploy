import { transformDate } from '@/utils/date';

const cargoTypeAdapter = ({ data }) => {
  if (data === null || data === undefined) return [];
  const { id, name } = data;
  return {
    id,
    name,
  };
};

export const cargoTypesAdapter = ({ data }) => {
  if (data === null) return [];
  return data.map((port) => {
    return cargoTypeAdapter({ data: port });
  });
};

const cargoesTableRowAdapter = ({ data, index }) => {
  if (!data) return {};

  const { date, imo, port } = data;

  return [
    {
      value: index + 1,
    },
    {
      value: imo,
    },
    {
      value: port?.portName,
    },
    {
      value: transformDate(date, 'MMM dd, yyyy'),
    },
  ];
};

export const cargoesTableRowsAdapter = ({ data }) => {
  if (!data) return [];

  return data.map((item, index) => cargoesTableRowAdapter({ data: item, index }));
};
