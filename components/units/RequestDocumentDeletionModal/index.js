'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import ModalHeader from '../ModalHeader';

import { RequestDocumentDeletionModalPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { ROUTES } from '@/lib';
import { requestDocumentDeletion } from '@/services/on-subs';
import { updateDocumentStatus as updateFixtureDocumentStatus } from '@/store/entities/fixture/slice';
import { updateDocumentStatus as updateOnSubsDocumentStatus } from '@/store/entities/on-subs/slice';
import { updateDocumentStatus as updatePostFixtureDocumentStatus } from '@/store/entities/post-fixture/slice';
import { getUserDataSelector } from '@/store/selectors';
import { errorToast, successToast } from '@/utils/hooks';

const RequestDocumentDeletionModal = ({ closeModal, documentId }) => {
  const [loading, setLoading] = useState(false);
  const { role } = useSelector(getUserDataSelector);
  const dispatch = useDispatch();
  const pathname = usePathname();

  const modalSettings = useMemo(() => {
    switch (pathname) {
      case ROUTES.ACCOUNT_FIXTURE:
        return { updateDocumentStatus: updateFixtureDocumentStatus };
      case ROUTES.ACCOUNT_ONSUBS:
        return { updateDocumentStatus: updateOnSubsDocumentStatus };
      case ROUTES.ACCOUNT_POSTFIXTURE:
        return { updateDocumentStatus: updatePostFixtureDocumentStatus };
      default:
        return { updateDocumentStatus: pathname.includes(ROUTES.ACCOUNT_ONSUBS) ? updateOnSubsDocumentStatus : null };
    }
  }, [ROUTES, pathname, updateFixtureDocumentStatus, updateOnSubsDocumentStatus, updatePostFixtureDocumentStatus]);

  const { updateDocumentStatus } = modalSettings;

  const handleDocumentDeletion = async () => {
    setLoading(true);
    const { error, message: successMessage } = await requestDocumentDeletion({
      data: { documentId },
      role,
    });
    setLoading(false);
    if (error) {
      errorToast(error?.title, error?.message);
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
      <div className="mt-5 flex gap-x-2.5">
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
