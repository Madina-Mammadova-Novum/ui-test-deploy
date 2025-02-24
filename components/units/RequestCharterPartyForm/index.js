'use client';

import { useEffect, useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { components } from 'react-select';

import PropTypes from 'prop-types';
import * as yup from 'yup';

import { RequestCharterPartyFormPropTypes } from '@/lib/types';

import FileInfoAlt from '@/assets/images/fileInfoAlt.svg';
import { ModalFormManager } from '@/common';
import { Button, FormDropdown, Title } from '@/elements';
import { getBaseCharterPartyTemplates, proposeBaseCharterParty } from '@/services';
import { handleViewDocument } from '@/utils/helpers';
import { errorToast, successToast, useHookFormParams } from '@/utils/hooks';

const CustomOption = ({ data, children, ...props }) => {
  const { url } = data;

  const handleViewPdf = async (e) => {
    e.stopPropagation(); // Prevent dropdown from closing
    try {
      await handleViewDocument(url);
    } catch (error) {
      errorToast('View Error', error.message);
    }
  };

  return (
    <components.Option data={data} {...props}>
      <div className="flex cursor-pointer items-center justify-between rounded-lg px-2 py-1 hover:bg-gray-darker">
        <span className="grow">{children}</span>
        {url && (
          <Button
            buttonProps={{
              text: 'View',
              icon: { before: <FileInfoAlt className="h-6 w-6 fill-gray-600" /> },
              variant: 'tertiary',
              size: 'small',
            }}
            onClick={handleViewPdf}
            customStyles="ml-2 !p-1 min-w-0 hover:bg-gray-light"
          />
        )}
      </div>
    </components.Option>
  );
};

CustomOption.propTypes = {
  children: PropTypes.node.isRequired,
  data: PropTypes.shape({
    url: PropTypes.string,
  }).isRequired,
};

const schema = yup.object({
  baseCharterParty: yup.object().required('Please select a base charter party'),
});

const RequestCharterPartyForm = ({ closeModal, offerId }) => {
  const [charterPartyOptions, setCharterPartyOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const methods = useHookFormParams({ schema });
  const { setValue, getValues } = methods;

  useEffect(() => {
    const fetchTemplates = async () => {
      setIsLoading(true);
      try {
        const response = await getBaseCharterPartyTemplates({});

        if (response?.data) {
          const options = response.data.map((item) => ({
            value: item?.id,
            label: item?.name,
            url: item?.url,
          }));

          setCharterPartyOptions(options);
        }
      } catch (error) {
        console.error('Error fetching charter party templates:', error);
        errorToast('Error', 'Failed to load charter party templates');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

  const handleChange = (value) => {
    if (JSON.stringify(getValues('baseCharterParty')) === JSON.stringify(value)) return;
    setValue('baseCharterParty', value);
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      const { error } = await proposeBaseCharterParty({
        dealId: offerId,
        baseCPTemplateId: formData.baseCharterParty.value,
      });

      if (!error) {
        successToast('Success', 'Base charter party request submitted');
        closeModal();
      } else {
        errorToast(error?.title, error?.message);
      }
    } catch (error) {
      console.error('Error submitting charter party request:', error);
      errorToast('Error', 'Failed to submit charter party request');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{
          text: 'Submit Base Charter Party Request',
          variant: 'primary',
          size: 'large',
          loading: isSubmitting || isLoading,
        }}
      >
        <div className="w-[400px]">
          <Title level="2">Request Base Charter Party</Title>

          <FormDropdown
            label="Base Charter Party"
            labelBadge="*"
            options={charterPartyOptions}
            name="baseCharterParty"
            placeholder="Select a base charter party"
            error={methods.formState.errors?.baseCharterParty?.message}
            onChange={handleChange}
            loading={isLoading}
            disabled={isSubmitting || isLoading}
            customStyles={{
              dropdownExpanded: true,
              className: 'mb-4 mt-2',
            }}
            maxMenuHeight={112}
            components={{ Option: CustomOption }}
          />

          <p className="mb-4 text-sm text-gray-600">
            Base charter parties define the standard terms of agreement between vessel owners and charterers. Please
            select the most suitable base charter party for your contract.
          </p>
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

RequestCharterPartyForm.propTypes = {
  ...RequestCharterPartyFormPropTypes,
  offerId: PropTypes.string,
};

export default RequestCharterPartyForm;
