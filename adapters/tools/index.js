import { dataObjectAdapter } from '@/adapters/common';

const rangeDataAdapter = ({ data }) => {
  if (!data) return null;

  const { speed, fromPort, toPort, additionalPorts } = data;

  const filteredPorts = additionalPorts?.filter(({ port }) => port);

  const additional = filteredPorts.map(({ port }, index) => {
    return {
      toPortId: port.value,
      order: index + 1,
    };
  });

  return {
    speed: speed || 11,
    fromPortId: fromPort?.value,
    toPorts:
      additional.length > 0
        ? [{ toPortId: toPort.value, order: 0 }, ...additional]
        : [{ toPortId: toPort.value, order: 0 }],
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

export const estimationBodyAdapter = ({ data }) => {
  if (!data) return null;

  const { calculator } = data;

  const body = {
    distanceandduration: rangeDataAdapter({ data }),
    freightestimation: freightDataAdapter({ data }),
  };

  return body[calculator?.value];
};

export const estimationResponseDataAdapter = ({ data }) => dataObjectAdapter(data);

const successEstimationAdapter = ({ data }) => {
  if (!data) return null;

  const { perTonnage, total, route } = data;

  return {
    resultOne: perTonnage,
    resultTwo: total,
    route,
  };
};

const successDistanceAdapter = ({ data }) => {
  if (!data) return null;

  const { distance, duration, route } = data;

  return {
    resultOne: distance,
    resultTwo: duration,
    route,
  };
};

export const successToolsDataAdapter = ({ data }) => {
  if (!data) return null;

  const response = {
    freightestimation: successEstimationAdapter({ data }),
    distanceandduration: successDistanceAdapter({ data }),
  };

  return response[data?.key];
};
