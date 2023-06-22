'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';
import * as yup from 'yup';

import { CompanyInfoFormPropTypes } from '@/lib/types';

import { ModalFormManager } from '@/common';
import { Title } from '@/elements';
import { companyAddressesSchema, companyDetailsSchema } from '@/lib/schemas';
import { updateCompany } from '@/services';
import { fetchUserProfileData } from '@/store/entities/user/actions';
import { getUserDataSelector } from '@/store/selectors';
import { CargoesSlotsDetailsStatic, CompanyAddresses, CompanyDetails, Notes, TankerSlotsDetailsStatic } from '@/units';
import { getRoleIdentity, makeId } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const CompanyInfoForm = ({ closeModal }) => {
  const [sameAddress, setSameAddress] = useState(false);

  const dispatch = useDispatch();
  const { data: session } = useSession();
  const { data } = useSelector(getUserDataSelector);
  const { isOwner, isCharterer } = getRoleIdentity({ role: session?.role });

  const schema = yup.object({
    ...companyDetailsSchema(),
    ...companyAddressesSchema(sameAddress),
  });

  const methods = useHookFormParams({ state: data?.companyDetails, schema });

  const addressValue = methods.watch('sameAddresses', sameAddress);

  useEffect(() => {
    methods.setValue('sameAddresses', addressValue);
    setSameAddress(addressValue);
  }, [addressValue, methods]);

  const onSubmit = async (formData) => {
    const { status, error, data: response } = await updateCompany({ data: formData, role: data?.role });

    if (status === 200) {
      dispatch(fetchUserProfileData());
      successToast(null, response.message);
    }
    if (error) errorToast(error?.message);
    return null;
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
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Edit company details', variant: 'primary', size: 'large' }}
      >
        <Title level="3" className="text-lg text-black font-bold capitalize pb-5">
          Edit Company Details
        </Title>
        <Notes
          title="Please note!"
          subtitle="This is a list of fields that you can edit, but for this you need to submit a data change request, which can be considered up to 24 hours, and upon confirmation, your data will be updated automatically."
          data={noteList}
        />
        <div className="flex flex-col gap-5 px-2.5 py-2.5 h-[480px] overflow-y-scroll">
          <Title level="4" className="text-sm !text-black">
            Сompany information
          </Title>
          <CompanyDetails />
          {isOwner && <TankerSlotsDetailsStatic data={data?.companyDetails.imos} />}
          <CompanyAddresses />
          {isCharterer && <CargoesSlotsDetailsStatic data={data?.companyDetails.cargoes} />}
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

CompanyInfoForm.propTypes = CompanyInfoFormPropTypes;

export default CompanyInfoForm;
