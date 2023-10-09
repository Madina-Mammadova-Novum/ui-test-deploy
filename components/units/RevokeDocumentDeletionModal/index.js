'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useSession } from 'next-auth/react';

import ModalHeader from '../ModalHeader';

import { RevokeDocumentDeletionModalPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { revokeOnSubsDocumentDeletion } from '@/services/on-subs';
import { updateDocumentStatus } from '@/store/entities/on-subs/slice';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const RevokeDocumentDeletionModal = ({ closeModal, documentId }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const handleRevokeDocumentDeletion = async () => {
    setLoading(true);
    const { error, message: successMessage } = await revokeOnSubsDocumentDeletion({
      data: { documentId },
      role: session?.role,
    });
    setLoading(false);
    if (error) {
      const { errors } = error;
      errorToast(parseErrors({ ...errors }));
    } else {
      dispatch(updateDocumentStatus({ documentId, status: 'Active' }));
      successToast(successMessage);
      closeModal();
    }
  };

  return (
    <div className="w-[272px]">
      <ModalHeader>Revoke the request to delete the file</ModalHeader>
      <div className="flex gap-x-2.5 mt-5">
        <Button
          buttonProps={{
            text: 'Cancel',
            size: 'large',
            variant: 'tertiary',
          }}
          customStyles="w-full"
          customStylesFromWrap="w-full"
          onClick={closeModal}
        />
        <Button
          buttonProps={{
            text: 'Revoke',
            size: 'large',
            variant: 'primary',
          }}
          customStyles="w-full"
          customStylesFromWrap="w-full"
          onClick={handleRevokeDocumentDeletion}
          disabled={loading}
        />
      </div>
    </div>
  );
};

RevokeDocumentDeletionModal.propTypes = RevokeDocumentDeletionModalPropTypes;

export default RevokeDocumentDeletionModal;
