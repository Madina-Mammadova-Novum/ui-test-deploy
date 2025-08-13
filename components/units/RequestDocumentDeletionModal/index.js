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
import { updateDealData } from '@/store/entities/notifications/slice';
import { updateDocumentStatus as updateOnSubsDocumentStatus } from '@/store/entities/on-subs/slice';
import { updateDocumentStatus as updatePostFixtureDocumentStatus } from '@/store/entities/post-fixture/slice';
import { updateDocumentStatus as updatePreFixtureDocumentStatus } from '@/store/entities/pre-fixture/slice';
import { getNotificationsDataSelector, getUserDataSelector } from '@/store/selectors';
import { errorToast, successToast } from '@/utils/hooks';

const RequestDocumentDeletionModal = ({ closeModal, documentId }) => {
  const [loading, setLoading] = useState(false);
  const { role } = useSelector(getUserDataSelector);
  const { deal } = useSelector(getNotificationsDataSelector);
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
      case ROUTES.ACCOUNT_PREFIXTURE:
        return { updateDocumentStatus: updatePreFixtureDocumentStatus };
      default:
        return {
          // eslint-disable-next-line no-nested-ternary
          updateDocumentStatus: pathname.includes(ROUTES.ACCOUNT_ONSUBS)
            ? updateOnSubsDocumentStatus
            : pathname.includes(ROUTES.ACCOUNT_PREFIXTURE)
              ? updatePreFixtureDocumentStatus
              : null,
        };
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
      // Also reflect status in notifications.dealData documents
      if (Array.isArray(deal?.documents)) {
        const updatedDocuments = deal.documents.map((doc) =>
          doc.id === documentId ? { ...doc, status: 'Deletion Requested' } : doc
        );
        dispatch(updateDealData({ documents: updatedDocuments }));
      }
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
