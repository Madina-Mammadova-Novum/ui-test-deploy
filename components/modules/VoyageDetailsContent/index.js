import { VoyageDetailsContentPropTypes } from '@/lib/types';

import { Divider, IconComponent, TextRow, Title } from '@/elements';

const VoyageDetailsContent = ({ data = { dates: [], ports: [] } }) => {
  const { dates, ports } = data;

  return (
    <div>
      <div className="flex justify-between">
        <Title level="3">Voyage details</Title>
      </div>

      <div className="mt-2.5 text-xsm">
        <Title level="5" className="text-[12px] font-semibold uppercase text-gray">
          dates
        </Title>
        {dates.map((pair) => (
          <div className="mr-2.5 mt-2.5">
            {pair.map((detail) => (
              <TextRow title={detail.key}>{detail.label}</TextRow>
            ))}
          </div>
        ))}
        <Divider className="my-4" />
        <Title level="5" className="text-[12px] font-semibold uppercase text-gray">
          ports
        </Title>
        {ports.map((pair) => (
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

VoyageDetailsContent.propTypes = VoyageDetailsContentPropTypes;

export default VoyageDetailsContent;
