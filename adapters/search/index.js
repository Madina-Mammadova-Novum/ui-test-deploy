import { trimTonValue } from '@/utils/helpers';

export const searchHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { tankerName, imo, flagOfRegistry, dwt, estimatedArrival, ballastLeg } = data;

  return [
    {
      label: 'Tanker name',
      text: tankerName ?? '',
    },
    {
      label: 'Imo',
      text: imo ?? '',
    },
    {
      label: 'Flag',
      text: flagOfRegistry?.name,
      country: flagOfRegistry,
    },
    {
      label: 'Dwt',
      text: dwt && `${trimTonValue(dwt)} tons`,
    },
    {
      label: 'Estimated arrival',
      text: estimatedArrival ?? '',
      customStyles: '[&>label]:w-32',
    },
    {
      label: 'Ballast leg',
      text: ballastLeg ?? '',
      customStyles: '[&>label]:w-32',
    },
  ];
};
