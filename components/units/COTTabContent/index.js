import PropTypes from 'prop-types';

import { TextRow, Title } from '@/elements';

const COTTabContent = ({ data }) => {
  return (
    <div className="text-xsm">
      <Title component="h3">Commercial Offer Terms</Title>
      <div className="mt-2.5">
        {data.cargo.map(({ key, label }) => (
          <TextRow title={key}>{label}</TextRow>
        ))}
      </div>

      <hr className="my-4" />

      <Title component="h5" className="uppercase text-[12px] text-gray font-semibold">
        Products
      </Title>
      <div className="mt-2.5 flex">
        {data.products.map((product) => (
          <div className="w-full">
            {product.map(({ key, label }) => (
              <TextRow title={key}>{label}</TextRow>
            ))}
          </div>
        ))}
      </div>

      <hr className="my-4" />

      {data.details.map(({ key, label }) => (
        <TextRow title={key}>{label}</TextRow>
      ))}
    </div>
  );
};

COTTabContent.defaultProps = {
  data: {
    cargo: [],
    products: [],
    details: [],
  },
};

COTTabContent.propTypes = {
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

export default COTTabContent;
