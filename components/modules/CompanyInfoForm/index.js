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

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Submit', variant: 'primary', size: 'large' }}
        className="h-full"
      >
        <Title level="3" className="pb-5 text-lg font-bold capitalize text-black">
          Edit Company Details
        </Title>
        <Notes subtitle="Please note that any changes to these fields will require verification by Ship.Link." />
        <div className="flex flex-col gap-5 overflow-y-scroll px-2.5 py-2.5">
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
