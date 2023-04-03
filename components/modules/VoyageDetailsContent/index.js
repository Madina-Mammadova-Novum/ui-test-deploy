import PropTypes from 'prop-types';

import InfoSVG from '@/assets/images/info.svg';
import { IconComponent, TextRow, Title } from '@/elements';

const VoyageDetailsContent = ({ data }) => {
  const { dates, ports } = data;

  return (
    <div>
      <div className="flex justify-between">
        <Title level="3">Voyage details</Title>
        <div className="flex ">
          <span className="mr-1.5">Charterer Information</span>
          <InfoSVG className="fill-black w-3.5" />
        </div>
      </div>

      <div className="text-xsm mt-2.5">
        <Title level="5" className="uppercase text-[12px] text-gray font-semibold">
          dates
        </Title>
        {dates.map((pair) => (
          <div className="mt-2.5">
            {pair.map((detail) => (
              <TextRow title={detail.key}>{detail.label}</TextRow>
            ))}
          </div>
        ))}

        <hr className="my-4" />

        <Title level="5" className="uppercase text-[12px] text-gray font-semibold">
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

VoyageDetailsContent.defaultProps = {
  data: {
    dates: [],
    ports: [],
  },
};

VoyageDetailsContent.propTypes = {
  data: PropTypes.shape({
    dates: PropTypes.shape([]),
    ports: PropTypes.shape([]),
  }),
};

export default VoyageDetailsContent;
