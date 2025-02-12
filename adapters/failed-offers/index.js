import { transformDate } from '@/utils/date';

export const responseFailedOffersAdapter = ({ data }) => {
  if (!data) return { data: [] };

  return {
    data,
  };
};

export const filtersAdapter = (formData = {}) => {
  const { cargoId, cargoType, tankerName, rangeDate, stage } = formData || {};

  return {
    CargoCode: cargoId?.value,
    CargoTypeId: cargoType?.value,
    TankerName: tankerName?.value,
    Stage: stage?.value,
    LaycanDateFrom: transformDate(rangeDate?.startDate, 'yyyy-MM-dd'),
    LaycanDateTo: transformDate(rangeDate?.endDate, 'yyyy-MM-dd'),
  };
};
