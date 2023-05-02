import { AddressInfoPropTypes } from '@/lib/types';

import { TextRow } from '@/elements';

const AddressInfo = ({ address = {} }) => {
  const { addressLine1, addressLine2, city, state, postal, country } = address;
  return (
    <div className="flex flex-col gap-y-[2px]">
      <TextRow title="Address line #1">{addressLine1 || '—'}</TextRow>
      <TextRow title="Address line #2">{addressLine2 || '—'}</TextRow>
      <TextRow title="City" subtitle={city}>
        {city || '—'}
      </TextRow>
      <TextRow title="State / Province / Region">{state || '—'}</TextRow>
      <TextRow title="Zip / Postal code">{postal || '—'}</TextRow>
      <TextRow title="Country">{country || '—'}</TextRow>
    </div>
  );
};

AddressInfo.propTypes = AddressInfoPropTypes;

export default AddressInfo;
