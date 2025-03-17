'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import * as yup from 'yup';

import { CompanyInfoFormPropTypes } from '@/lib/types';

import { dropDownOptionsAdapter } from '@/adapters/countryOption';
import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { companyAddressesSchema, companyDetailsSchema } from '@/lib/schemas';
import { updateCompany } from '@/services';
import { fetchUserProfileData } from '@/store/entities/user/actions';
import { getGeneralDataSelector, getUserDataSelector } from '@/store/selectors';
import { CargoesSlotsDetailsStatic, CompanyAddresses, CompanyDetails, Notes } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import { errorToast, useHookFormParams } from '@/utils/hooks';

const CompanyInfoForm = ({ closeModal }) => {
  const dispatch = useDispatch();

  const [sameAddress, setSameAddress] = useState(false);

  const { data, role } = useSelector(getUserDataSelector);
  const { countries } = useSelector(getGeneralDataSelector);

  const schema = yup.object({
    ...companyDetailsSchema(),
    ...companyAddressesSchema(sameAddress),
  });

  const { isCharterer } = getRoleIdentity({ role });

  const methods = useHookFormParams({ state: data?.companyDetails, schema });

  const addressValue = methods.watch('sameAddresses', sameAddress);

  useEffect(() => {
    methods.setValue('sameAddresses', addressValue);
    setSameAddress(addressValue);
  }, [addressValue, methods]);

  const onSubmit = async (formData) => {
    const { error } = await updateCompany({ data: formData, role });

    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      closeModal();
      dispatch(fetchUserProfileData());
    }
  };

  const noteList = [
    {
      id: 1,
      label: 'Сompany information',
      list: ['Company Name'],
    },
    {
      id: 2,
      label: 'Company Registration Address',
      list: ['Address line #1', 'Address line #2', 'City', 'State / Province / Region', 'Zip / Postal code', 'Country'],
    },
  ];

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Edit company details', variant: 'primary', size: 'large' }}
        className="h-full"
      >
        <Title level="3" className="pb-5 text-lg font-bold capitalize text-black">
          Edit Company Details
        </Title>
        <Notes
          title="Please note!"
          subtitle="Please note that any changes to these fields will require verification by ShipLink."
          data={noteList}
        />
        <div className="flex h-[480px] flex-col gap-5 overflow-y-scroll px-2.5 py-2.5">
          <Title level="4" className="text-sm !text-black">
            Сompany information
          </Title>
          <CompanyDetails notEditable />
          <CompanyAddresses countries={dropDownOptionsAdapter({ data: countries })} />
          {isCharterer && <CargoesSlotsDetailsStatic data={data?.companyDetails.cargoes} />}
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

CompanyInfoForm.propTypes = CompanyInfoFormPropTypes;

export default CompanyInfoForm;
