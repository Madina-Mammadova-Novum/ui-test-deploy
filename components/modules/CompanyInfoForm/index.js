'use client';

import { FormProvider } from 'react-hook-form';

import * as yup from 'yup';

import { FormManager } from '@/common';
import { Title } from '@/elements';
import { companyDetailsSchema, tankerSlotsDetailsSchema } from '@/lib/schemas';
import { updateCompany } from '@/services';
import { CompanyAddresses, CompanyDetails, Notes, TankerSlotsDetails } from '@/units';
import { makeId } from '@/utils/helpers';
import { successToast, useHookFormParams } from '@/utils/hooks';

const schema = yup.object({
  ...companyDetailsSchema(),
  ...tankerSlotsDetailsSchema(),
  // ...companyAddressesSchema()
});

const state = {
  companyName: 'Ship.link',
  companyNumberOfOperation: '5',
  cityId: ' New York',
  State: 'NY',
  PostalCode: '10012',
  AddressOptional: '',
};

const CompanyInfoForm = () => {
  const methods = useHookFormParams({ state, schema });

  const onSubmit = async (data) => {
    const { message } = await updateCompany({ data });
    successToast(message, 'You will be notified soon. The rest of the changes have been edited');
  };

  const noteList = [
    {
      id: makeId(),
      label: 'Сompany information',
      list: ['Company Name', 'Years of Operation', 'Number of Tankers', 'IMOs'],
    },
    {
      id: makeId(),
      label: 'Company Registration Address',
      list: ['City', 'Country', 'Address line #1', 'Address line #2', 'Zip / Postal code', 'State / Province / Region'],
    },
  ];

  return (
    <FormProvider {...methods}>
      <FormManager
        submitAction={onSubmit}
        submitButton={{ text: 'Edit company details', variant: 'primary', size: 'large' }}
      >
        <Title component="h3" className="text-lg text-black font-bold capitalize pb-5">
          Edit Company Details
        </Title>
        <Notes
          title="Please note!"
          subtitle="This is a list of fields that you can edit, but for this you need to submit a data change request, which can be considered up to 24 hours, and upon confirmation, your data will be updated automatically."
          data={noteList}
        />
        <div className="flex flex-col gap-4">
          <Title component="h4" className="text-sm !text-black">
            Сompany information
          </Title>
          <CompanyDetails />
          <TankerSlotsDetails />
          <CompanyAddresses />
        </div>
      </FormManager>
    </FormProvider>
  );
};

export default CompanyInfoForm;
