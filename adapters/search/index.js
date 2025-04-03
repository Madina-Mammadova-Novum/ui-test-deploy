import StatusIndicator from '@/elements/StatusIndicator';
import { trimTonValue } from '@/utils/helpers';

export const searchHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { tankerName, imo, flagOfRegistry, dwt, estimatedArrival, ballastLeg, hasFailedOffer } = data;

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
      countryCode: flagOfRegistry?.codeISO2 || flagOfRegistry?.codeISO3,
    },
    {
      label: 'Dwt',
      text: dwt && `${trimTonValue(dwt)} tons`,
    },
    {
      label: 'Offer status',
      text: (
        <span className="flex items-center gap-1">
          <StatusIndicator status="Failed" />
          Offer already failed
        </span>
      ),
      isHidden: !hasFailedOffer,
    },
    {
      label: 'Estimated arrival',
      text: estimatedArrival ?? '',
      customStyles: '[&>label]:min-w-[8rem]',
    },
    {
      label: 'Ballast leg',
      text: ballastLeg ?? '',
      customStyles: '[&>label]:min-w-[8rem]',
    },
  ];
};
