import PropTypes from 'prop-types';

import { TextRow } from '@/elements';

const AddressInfo = ({ address }) => {
  const { addressLine1, addressLine2, city, state, postal, country } = address;
  return (
    <>
      <TextRow title="Address line #1:" subtitle={addressLine1} />
      <TextRow title="Address line #2:" subtitle={addressLine2} />
      <TextRow title="City:" subtitle={city} />
      <TextRow title="State / Province / Region:" subtitle={state} />
      <TextRow title="Zip / Postal code:" subtitle={postal} />
      <TextRow title="Country:" subtitle={country} />
    </>
  );
};

AddressInfo.propTypes = {
  address: PropTypes.shape({
    addressLine1: PropTypes.string,
    addressLine2: PropTypes.string,
    state: PropTypes.string,
    city: PropTypes.string,
    postal: PropTypes.string,
    country: PropTypes.string,
  }).isRequired,
};

export default AddressInfo;
