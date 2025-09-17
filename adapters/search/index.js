import { UilInfoCircle } from '@iconscout/react-unicons';

import { HoverTooltip } from '@/elements';
import StatusIndicator from '@/elements/StatusIndicator';
import { trimTonValue } from '@/utils/helpers';

export const searchHeaderDataAdapter = ({ data }) => {
  if (!data) return null;

  const { tankerName, imo, flagOfRegistry, dwt, estimatedArrival, ballastLeg, ballastLegTooltipText, hasFailedOffer } =
    data;

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
      label: (
        <span className="flex items-center gap-1 text-xs-sm font-semibold uppercase text-gray">
          Ballast Leg
          {ballastLegTooltipText && (
            <HoverTooltip
              className="!-top-11 left-12 !max-w-[320px] !-translate-x-[50%] !whitespace-pre-wrap 3md:left-0"
              data={{ description: ballastLegTooltipText }}
            >
              <UilInfoCircle className="h-4 w-4 cursor-help fill-black hover:fill-blue-darker" />
            </HoverTooltip>
          )}
        </span>
      ),
      text: ballastLeg ?? '',
      customStyles: '[&>label]:min-w-[8rem]',
    },
  ];
};
