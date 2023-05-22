import { VoyageDetailsTabContentPropTypes } from '@/lib/types';

import InfoSVG from '@/assets/images/info.svg';
import { IconComponent, ManualTooltip, TextRow, Title } from '@/elements';
import { ChartererInformationContent } from '@/units';

const VoyageDetailsTabContent = ({ data = {} }) => {
  return (
    <div>
      <div className="flex justify-between">
        <Title level={3}>Voyage details</Title>
        <div className="flex relative">
          <span className="mr-1.5">Charterer Information</span>
          <ManualTooltip
            className="!right-0 min-w-[260px] !p-2.5"
            data={{ description: <ChartererInformationContent /> }}
          >
            <InfoSVG className="!w-3.5" />
          </ManualTooltip>
        </div>
      </div>

      <div className="text-xsm mt-2.5">
        <Title level={5} className="uppercase text-[12px] text-gray font-semibold">
          dates
        </Title>
        {data.dates.map((pair) => (
          <div className="mt-2.5">
            {pair.map((detail) => (
              <TextRow title={detail.key}>{detail.label}</TextRow>
            ))}
          </div>
        ))}

        <hr className="my-4" />

        <Title level={5} className="uppercase text-[12px] text-gray font-semibold">
          ports
        </Title>
        {data.ports.map((pair) => (
          <div className="mt-2.5">
            {pair.map((detail) => (
              <TextRow title={detail.key}>
                <IconComponent icon={detail.countryFlag} />
                {detail.label}
              </TextRow>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

VoyageDetailsTabContent.propTypes = VoyageDetailsTabContentPropTypes;

export default VoyageDetailsTabContent;
