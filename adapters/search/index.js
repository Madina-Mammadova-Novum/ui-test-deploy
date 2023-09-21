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
      countryCode: flagOfRegistry?.codeISO2,
    },
    {
      label: 'Dwt',
      text: dwt && `${trimTonValue(dwt)} tons`,
    },
    {
      label: 'Estimated arrival',
      text: estimatedArrival ?? '',
    },
    {
      label: 'Ballast leg',
      text: ballastLeg ?? '',
    },
  ];
};
