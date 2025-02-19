'use client';

import { FormProvider } from 'react-hook-form';
import { components } from 'react-select';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { RequestCharterPartyFormPropTypes } from '@/lib/types';

import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import { ModalFormManager } from '@/common';
import { Button, FormDropdown, Title } from '@/elements';
import { useHookFormParams } from '@/utils/hooks';

const CustomOption = ({ data, children, ...props }) => {
  const { pdfUrl } = data;

  const handleViewPdf = (e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    console.info('View PDF URL:', pdfUrl);
  };

  return (
    <components.Option data={data} {...props}>
      <div className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 hover:bg-gray-darker">
        <span className="grow">{children}</span>
        {pdfUrl && (
          <Button
            buttonProps={{
              text: 'View',
              icon: { before: <FileInfoAlt className="h-5 w-5 fill-gray-600" /> },
              variant: 'tertiary',
              size: 'small',
            }}
            onClick={handleViewPdf}
            customStyles="ml-2 !p-1 min-w-0"
          />
        )}
      </div>
    </components.Option>
  );
};

CustomOption.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    pdfUrl: PropTypes.string,
  }).isRequired,
};

const schema = yup.object({
  baseCharterParty: yup.object().required('Please select a base charter party'),
});

const RequestCharterPartyForm = ({ closeModal }) => {
  const methods = useHookFormParams({ schema });
  const { setValue, getValues } = methods;

  const baseCharterPartyData = {
    data: [
      { id: '1', name: 'GENCON 1994', pdfUrl: 'https://example.com/gencon1994.pdf' },
      { id: '2', name: 'GENCON 2022', pdfUrl: 'https://example.com/gencon2022.pdf' },
      { id: '3', name: 'SHELLTIME 4', pdfUrl: 'https://example.com/shelltime4.pdf' },
      { id: '4', name: 'NYPE 1946', pdfUrl: 'https://example.com/nype1946.pdf' },
      { id: '5', name: 'NYPE 1993', pdfUrl: 'https://example.com/nype1993.pdf' },
      { id: '6', name: 'NYPE 2015', pdfUrl: 'https://example.com/nype2015.pdf' },
      { id: '7', name: 'ASBATANKVOY', pdfUrl: 'https://example.com/asbatankvoy.pdf' },
    ],
  };

  const charterPartyOptions = baseCharterPartyData.data.map((item) => ({
    value: item.id,
    label: item.name,
    pdfUrl: item.pdfUrl,
  }));

  const handleChange = (value) => {
    if (JSON.stringify(getValues('baseCharterParty')) === JSON.stringify(value)) return;
    setValue('baseCharterParty', value);
  };

  const onSubmit = async (formData) => {
    // TODO: Implement request charter party API call
    console.info('Requesting charter party:', formData);
    closeModal();
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{ text: 'Submit Base Charter Party Request', variant: 'primary', size: 'large' }}
      >
        <div className="w-[400px]">
          <Title level="2">Request Base Charter Party</Title>
          <p className="mb-4 mt-2 text-sm text-gray-600">
            Base charter parties define the standard terms of agreement between vessel owners and charterers. Please
            select the most suitable base charter party for your contract.
          </p>
          <FormDropdown
            label="Base Charter Party"
            labelBadge="*"
            options={charterPartyOptions}
            name="baseCharterParty"
            placeholder="Select a base charter party"
            error={methods.formState.errors?.baseCharterParty?.message}
            onChange={handleChange}
            customStyles={{
              dropdownExpanded: true,
              className: 'mb-4',
            }}
            maxMenuHeight={112}
            components={{ Option: CustomOption }}
          />
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

RequestCharterPartyForm.propTypes = RequestCharterPartyFormPropTypes;

export default RequestCharterPartyForm;
