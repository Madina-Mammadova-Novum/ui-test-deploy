import PropTypes from 'prop-types';

import { TextRow } from '@/elements';

const AddressInfo = ({ data }) => {
  // todo: rules for fields
  return (
    <>
      <TextRow title="Address line #1:" subtitle={data?.addressLine1} />
      <TextRow title="Address line #2:" subtitle={data?.addressLine2} />
      <TextRow title="City:" subtitle={data?.city} />
      <TextRow title="State / Province / Region:" subtitle={data?.state} />
      <TextRow title="Zip / Postal code:" subtitle={data?.postal} />
      <TextRow title="Country:" subtitle={data?.country} />
    </>
  );
};

AddressInfo.propTypes = {
  data: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    postal: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};

export default AddressInfo;
