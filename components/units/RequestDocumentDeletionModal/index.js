'use client';

import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';

import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import ModalHeader from '../ModalHeader';

import { RequestDocumentDeletionModalPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { requestDocumentDeletion } from '@/services/on-subs';
import { updateDocumentStatus as updateFixtureDocumentStatus } from '@/store/entities/fixture/slice';
import { updateDocumentStatus as updateOnSubsDocumentStatus } from '@/store/entities/on-subs/slice';
import { updateDocumentStatus as updatePostFixtureDocumentStatus } from '@/store/entities/post-fixture/slice';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';

const RequestDocumentDeletionModal = ({ closeModal, documentId }) => {
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const modalSettings = {
    '/account/fixture': {
      updateDocumentStatus: updateFixtureDocumentStatus,
    },
    '/account/onsubs': {
      updateDocumentStatus: updateOnSubsDocumentStatus,
    },
    '/account/post-fixture': {
      updateDocumentStatus: updatePostFixtureDocumentStatus,
    },
  };

  const { updateDocumentStatus } = useMemo(() => modalSettings[pathname], [pathname]);

  const handleDocumentDeletion = async () => {
    setLoading(true);
    const { error, message: successMessage } = await requestDocumentDeletion({
      data: { documentId },
      role: session?.role,
    });
    setLoading(false);
    if (error) {
      const { errors } = error;
      errorToast(parseErrors({ ...errors }));
    } else {
      dispatch(updateDocumentStatus({ documentId, status: 'Deletion Requested' }));
      successToast(successMessage);
      closeModal();
    }
  };

  return (
    <div className="w-[296px]">
      <ModalHeader>Delete the file</ModalHeader>
      <p className="mt-2.5 text-xsm">
        You cannot delete a file without broker approval. After approval, it will be automatically deleted.
      </p>
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
            text: 'Send a request',
            size: 'large',
            variant: 'delete',
          }}
          customStyles="w-full whitespace-nowrap"
          customStylesFromWrap="w-full"
          onClick={handleDocumentDeletion}
          disabled={loading}
        />
      </div>
    </div>
  );
};

RequestDocumentDeletionModal.propTypes = RequestDocumentDeletionModalPropTypes;

export default RequestDocumentDeletionModal;
