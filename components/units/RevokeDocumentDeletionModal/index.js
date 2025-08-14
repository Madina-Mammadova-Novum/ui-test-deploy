'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import ModalHeader from '../ModalHeader';

import { RevokeDocumentDeletionModalPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { ROUTES } from '@/lib/constants';
import { revokeDocumentDeletion } from '@/services/on-subs';
import { updateDocumentStatus as updateFixtureDocumentStatus } from '@/store/entities/fixture/slice';
import { updateDealData } from '@/store/entities/notifications/slice';
import { updateDocumentStatus as updateOnSubsDocumentStatus } from '@/store/entities/on-subs/slice';
import { updateDocumentStatus as updatePostFixtureDocumentStatus } from '@/store/entities/post-fixture/slice';
import { updateDocumentStatus as updatePreFixtureDocumentStatus } from '@/store/entities/pre-fixture/slice';
import { getNotificationsDataSelector, getUserDataSelector } from '@/store/selectors';
import { errorToast, successToast } from '@/utils/hooks';

const RevokeDocumentDeletionModal = ({ closeModal, documentId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { role } = useSelector(getUserDataSelector);
  const { deal } = useSelector(getNotificationsDataSelector);
  const pathname = usePathname();

  const modalSettings = useMemo(() => {
    if (pathname.startsWith(ROUTES.ACCOUNT_FIXTURE)) {
      return { updateDocumentStatus: updateFixtureDocumentStatus };
    }
    if (pathname.startsWith(ROUTES.ACCOUNT_ONSUBS)) {
      return { updateDocumentStatus: updateOnSubsDocumentStatus };
    }
    if (pathname.startsWith(ROUTES.ACCOUNT_POSTFIXTURE)) {
      return { updateDocumentStatus: updatePostFixtureDocumentStatus };
    }
    if (pathname.startsWith(ROUTES.ACCOUNT_PREFIXTURE)) {
      return { updateDocumentStatus: updatePreFixtureDocumentStatus };
    }
    return {
      updateDocumentStatus: null,
    };
  }, [
    pathname,
    updateFixtureDocumentStatus,
    updateOnSubsDocumentStatus,
    updatePostFixtureDocumentStatus,
    updatePreFixtureDocumentStatus,
  ]);

  const { updateDocumentStatus } = modalSettings;

  const handleRevokeDocumentDeletion = async () => {
    setLoading(true);
    const { error, message: successMessage } = await revokeDocumentDeletion({
      data: { documentId },
      role,
    });
    setLoading(false);
    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      dispatch(updateDocumentStatus({ documentId, status: 'Active' }));
      // Also reflect status in notifications.dealData documents
      if (Array.isArray(deal?.documents)) {
        const updatedDocuments = deal.documents.map((doc) =>
          doc.id === documentId ? { ...doc, status: 'Active' } : doc
        );
        dispatch(updateDealData({ documents: updatedDocuments }));
      }
      successToast(successMessage);
      closeModal();
    }
  };

  return (
    <div className="w-[272px]">
      <ModalHeader>Revoke the request to delete the file</ModalHeader>
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
