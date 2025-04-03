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
import { counterproposeBaseCharterParty, getBaseCharterPartyTemplates, proposeBaseCharterParty } from '@/services';
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

/**
 * @component RequestCharterPartyForm
 * @description Form for requesting or counterproposing a base charter party
 * @props {Function} closeModal - Function to close the modal
 * @props {String} offerId - ID of the deal
 * @props {String} proposalId - ID of the proposal (for counterproposals)
 * @props {Boolean} isCounterproposal - Whether this is a counterproposal
 * @props {Function} onSuccess - Callback function to be called after successful submission
 * @maritime Handles charter party template selection for maritime contracts
 */
const RequestCharterPartyForm = ({
  closeModal,
  offerId,
  proposalId,
  isCounterproposal = false,
  onSuccess = null,
  templateId = null,
}) => {
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
          let options = response.data.map((item) => ({
            value: item?.id,
            label: item?.name,
            url: item?.url,
          }));

          if (templateId) {
            options = options.filter((option) => option.value !== templateId);
          }

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
  }, [templateId]);

  const handleChange = (value) => {
    if (JSON.stringify(getValues('baseCharterParty')) === JSON.stringify(value)) return;
    setValue('baseCharterParty', value);
  };

  const onSubmit = async (formData) => {
    setIsSubmitting(true);

    try {
      let response;

      if (isCounterproposal) {
        response = await counterproposeBaseCharterParty({
          dealId: offerId,
          newBaseCPTemplateId: formData.baseCharterParty.value,
          proposalId,
        });
      } else {
        response = await proposeBaseCharterParty({
          dealId: offerId,
          baseCPTemplateId: formData.baseCharterParty.value,
        });
      }

      const { error } = response;

      if (!error) {
        const message = isCounterproposal
          ? 'Counter proposal submitted successfully'
          : 'Base charter party request submitted';
        successToast('Success', message);

        // Call onSuccess callback if provided
        if (onSuccess && typeof onSuccess === 'function') {
          onSuccess(response);
        }

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

  const getFormTitle = () => {
    return isCounterproposal ? 'Propose Different Charter Party' : 'Request Base Charter Party';
  };

  const getSubmitButtonText = () => {
    return isCounterproposal ? 'Submit Counter Proposal' : 'Submit Base Charter Party Request';
  };

  return (
    <FormProvider {...methods}>
      <ModalFormManager
        onClose={closeModal}
        submitAction={onSubmit}
        submitButton={{
          text: getSubmitButtonText(),
          variant: 'primary',
          size: 'large',
          loading: isSubmitting || isLoading,
        }}
      >
        <div className="w-[400px]">
          <Title level="2">{getFormTitle()}</Title>

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
            {isCounterproposal
              ? 'Propose a different base charter party that better suits your requirements. The counterparty will review your proposal.'
              : 'Base charter parties define the standard terms of agreement between vessel owners and charterers. Please select the most suitable base charter party for your contract.'}
          </p>
        </div>
      </ModalFormManager>
    </FormProvider>
  );
};

RequestCharterPartyForm.propTypes = {
  ...RequestCharterPartyFormPropTypes,
  offerId: PropTypes.string,
  proposalId: PropTypes.string,
  isCounterproposal: PropTypes.bool,
  onSuccess: PropTypes.func,
  templateId: PropTypes.string,
};

export default RequestCharterPartyForm;
