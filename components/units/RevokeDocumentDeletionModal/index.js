'use client';

import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { usePathname } from 'next/navigation';

import ModalHeader from '../ModalHeader';

import { RevokeDocumentDeletionModalPropTypes } from '@/lib/types';

import { Button } from '@/elements';
import { ROUTES } from '@/lib';
import { revokeDocumentDeletion } from '@/services/on-subs';
import { updateDocumentStatus as updateFixtureDocumentStatus } from '@/store/entities/fixture/slice';
import { updateDocumentStatus as updateOnSubsDocumentStatus } from '@/store/entities/on-subs/slice';
import { updateDocumentStatus as updatePostFixtureDocumentStatus } from '@/store/entities/post-fixture/slice';
import { getUserDataSelector } from '@/store/selectors';
import { errorToast, successToast } from '@/utils/hooks';

const RevokeDocumentDeletionModal = ({ closeModal, documentId }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const { role } = useSelector(getUserDataSelector);
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
