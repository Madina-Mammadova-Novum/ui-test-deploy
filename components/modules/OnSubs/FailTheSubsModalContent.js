'use client';

import { useState } from 'react';

import { FailTheSubsModalContentPropTypes } from '@/lib/types';

import { Button, Title } from '@/elements';
import { failTheSubs } from '@/services/on-subs';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const FailTheSubsModalContent = ({ closeModal, offerId }) => {
  const [loading, setLoading] = useState(false);

  const handleFailTheSubs = async () => {
    setLoading(true);
    const { error, message: successMessage } = await failTheSubs({ data: { offerId } });
    setLoading(false);
    if (error) {
      const { errors } = error;
      errorToast(parseErrors({ ...errors }));
    } else {
      successToast(successMessage);
      closeModal();
    }
  };

  return (
    <div>
      <Title level={2}>Do you want to fail the Subs?</Title>
      <div className="flex gap-x-2.5 mt-7">
        <div className="w-full">
          <Button
            onClick={closeModal}
            buttonProps={{ text: 'Cancel', variant: 'tertiary', size: 'large' }}
            customStyles="w-full whitespace-nowrap"
          />
        </div>
        <div className="w-full">
          <Button
            buttonProps={{ text: loading ? 'Please wait...' : 'Fail the Subs', variant: 'delete', size: 'large' }}
            customStyles="w-full whitespace-nowrap"
            onClick={handleFailTheSubs}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

FailTheSubsModalContent.propTypes = FailTheSubsModalContentPropTypes;

export default FailTheSubsModalContent;
