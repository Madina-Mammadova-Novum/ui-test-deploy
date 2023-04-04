import PropTypes from 'prop-types';

import InformationRow from '@/ui/InformationRow';

const IncomingCOTContent = ({ data }) => {
  return (
    <div className="text-xsm">
      <h3>Commercial Offer Terms</h3>
      <div className="mt-2.5">
        {data.cargo.map(({ key, label }) => (
          <InformationRow keyText={key} label={label} />
        ))}
      </div>

      <hr className="my-4" />

      <h5 className="uppercase text-[12px] text-gray font-semibold">Products</h5>
      <div className="mt-2.5 flex">
        {data.products.map((product) => (
          <div className="w-full">
            {product.map(({ key, label }) => (
              <InformationRow keyText={key} label={label} />
            ))}
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {data.details.map(({ key, label }) => (
        <InformationRow keyText={key} label={label} />
      ))}
    </div>
  );
};

IncomingCOTContent.defaultProps = {
  data: {
    cargo: [],
    products: [],
    details: [],
  },
};

IncomingCOTContent.propTypes = {
  data: PropTypes.shape({
    cargo: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    products: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
      })
    ),
    details: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }),
};

export default IncomingCOTContent;
