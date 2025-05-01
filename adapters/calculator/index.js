import { objectAdapter } from '@/adapters/common';

export const requestFreightEstimationAdapter = ({ data }) => {
  if (!data) return {};
  const { loadPortId, dischargePortId, totalCargoQuantity } = data;
  return {
    cargoQuantity: totalCargoQuantity,
    fromPortId: loadPortId,
    toPortId: dischargePortId,
  };
};

export const responseFreightEstimationAdapter = ({ data }) => {
  return objectAdapter(data);
};
