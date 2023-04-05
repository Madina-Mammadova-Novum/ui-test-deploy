import PropTypes from 'prop-types';

import InfoSVG from '@/assets/images/info.svg';
import InformationRow from '@/ui/InformationRow';

const VoyageDetailsContent = ({ data }) => {
  return (
    <div>
      <div className="flex justify-between">
        <h3>Voyage details</h3>
        <div className="flex ">
          <span className="mr-1.5">Charterer Information</span>
          <InfoSVG className="fill-black w-3.5" />
        </div>
      </div>

      <div className="text-xsm mt-2.5">
        <h5 className="uppercase text-[12px] text-gray font-semibold">dates</h5>
        {data.dates.map((pair) => (
          <div className="mt-2.5">
            {pair.map((detail) => (
              <InformationRow keyText={detail.key} label={detail.label} />
            ))}
          </div>
        ))}

        <hr className="my-4" />

        <h5 className="uppercase text-[12px] text-gray font-semibold">ports</h5>
        {data.ports.map((pair) => (
          <div className="mt-2.5">
            {pair.map((detail) => (
              <InformationRow
                keyText={detail.key}
                label={detail.label}
                iconProps={{ src: detail.countryFlag, alt: detail.countryCode || 'country flag' }}
              />
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
