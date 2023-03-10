'use client';

import PropTypes from 'prop-types';

import { Button, TextRow, Title } from '@/elements';

const AccountCompanyDetails = ({ company }) => {
  return (
    <div className="bg-white rounded-md border-2 border-solid border-gray-darker p-5 w-full">
      <div className="flex justify-between items-center pb-2.5">
        <Title component="h3" className="text-lg text-black font-bold">
          Company Details
        </Title>
        <Button
          buttonProps={{ text: 'Edit company details', variant: 'primary', size: 'medium' }}
          customStyles="!py-1 !px-2.5"
        />
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <p className="text-gray font-semibold text-xs-sm uppercase pb-2.5">company information</p>
          <TextRow title="Company name" subtitle={company?.name} />
          <TextRow title="Years in operation" subtitle={company?.years} />
          <TextRow title="Number of tankers" subtitle={company?.totalTankers} />
        </div>
        <hr className="h-px w-full bg-gray" />
        <div className="grid grid-cols-2">
          <div className="col-start-1">
            <p className="text-gray font-semibold text-xs-sm uppercase pb-2.5">registration address</p>
            <TextRow title="Address line #1" subtitle={company?.registration?.addressLine1} />
            <TextRow title="Address line #2" subtitle={company?.registration?.addressLine2} />
            <TextRow title="City" subtitle={company?.registration?.city} />
            <TextRow title="State / Province / Region" subtitle={company?.registration?.state} />
            <TextRow title="Zip / Postal code" subtitle={company?.registration?.postal} />
            <TextRow title="Country: Azerbaijan" subtitle={company?.registration?.country} />
          </div>
          <div className="col-start-2">
            <p className="text-gray font-semibold text-xs-sm uppercase pb-2.5">correspondence address</p>
            <TextRow title="Address line #1" subtitle={company?.correspondence?.addressLine1} />
            <TextRow title="Address line #2" subtitle={company?.correspondence?.addressLine2} />
            <TextRow title="City" subtitle={company?.correspondence?.city} />
            <TextRow title="State / Province / Region" subtitle={company?.correspondence?.state} />
            <TextRow title="Zip / Postal code" subtitle={company?.correspondence?.postal} />
            <TextRow title="Country: Azerbaijan" subtitle={company?.correspondence?.country} />
          </div>
        </div>
      </div>
    </div>
  );
};

AccountCompanyDetails.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    years: PropTypes.string,
    totalTankers: PropTypes.string,
    registration: PropTypes.shape({
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postal: PropTypes.string,
      country: PropTypes.string,
    }),
    correspondence: PropTypes.shape({
      addressLine1: PropTypes.string,
      addressLine2: PropTypes.string,
      city: PropTypes.string,
      state: PropTypes.string,
      postal: PropTypes.string,
      country: PropTypes.string,
    }),
  }),
};

export default AccountCompanyDetails;
