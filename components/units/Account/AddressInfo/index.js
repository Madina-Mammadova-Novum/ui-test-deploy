import PropTypes from 'prop-types';

import { TextRow } from '@/elements';

const AddressInfo = ({ address = {} }) => {
  const { addressLine1, addressLine2, city, state, postal, country } = address;
  return (
    <>
      <TextRow title="Address line #1:">{addressLine1}</TextRow>
      <TextRow title="Address line #2:">{addressLine2}</TextRow>
      <TextRow title="City:" subtitle={city}>
        {city}
      </TextRow>
      <TextRow title="State / Province / Region:">{state}</TextRow>
      <TextRow title="Zip / Postal code:">{postal}</TextRow>
      <TextRow title="Country:">{country}</TextRow>
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
