const rangeDataAdapter = ({ data }) => {
  if (!data) return null;

  const { speed, fromPort, toPort } = data;

  return {
    speed,
    fromPortId: fromPort?.value,
    toPortId: toPort?.value,
  };
};

const freightDataAdapter = ({ data }) => {
  if (!data) return null;

  const { cargoQuantity, fromPort, toPort } = data;

  return {
    cargoQuantity,
    fromPortId: fromPort?.value,
    toPortId: toPort?.value,
  };
};

export const estimationBodyAdataper = ({ data }) => {
  if (!data) return null;

  const { calculator } = data;

  const body = {
    distanceandduration: rangeDataAdapter({ data }),
    freightestimation: freightDataAdapter({ data }),
  };

  return body[calculator?.value];
};

export const estimationResponseDataAdapter = ({ data }) => {
  if (!data) return null;

  return { data };
};
