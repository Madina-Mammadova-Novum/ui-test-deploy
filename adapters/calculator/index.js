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
  if (!data) return {};
  return data;
};
