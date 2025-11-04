import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { ROLES } from '@/lib/constants';
import { completeUploadDocumentRequest, getDocumentRequests } from '@/services/documentRequests';
import { uploadDocument } from '@/services/on-subs';
import { updateDealData } from '@/store/entities/notifications/slice';
import { updateDocumentList } from '@/store/entities/pre-fixture/slice';
import { getNotificationsDataSelector, getUserDataSelector } from '@/store/selectors';
import { ConfirmModal, PreFixtureDocumentRequestForm, UploadForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';
import { prefixtureHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [], offerId }) => {
  const { role } = useSelector(getUserDataSelector);

  const dispatch = useDispatch();
  const [documentRequests, setDocumentRequests] = useState([]);
  const { deal } = useSelector(getNotificationsDataSelector);
  const [requestStatus, setRequestStatus] = useState('initial');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [useForDocumentRequest, setUseForDocumentRequest] = useState(false);
  const [pendingUploadData, setPendingUploadData] = useState(null);

  // Fetch document requests on component mount (only for owners in pre-fixture)
  useEffect(() => {
    const fetchDocumentRequests = async () => {
      if (role !== ROLES.OWNER) return; // Only owners can see document requests in pre-fixture

      setLoading(true);
      try {
        const response = await getDocumentRequests({ dealId: offerId });

        if (response.error) {
          console.error('Failed to fetch document requests:', response.error);
          setRequestStatus('initial');
          setDocumentRequests([]);
        } else if (response.data && response.data.length > 0) {
          setDocumentRequests(response.data);
          const latestRequest = response.data[0]; // Assuming the first item is the latest
          setRequestStatus(latestRequest.status || 'Pending');
        } else {
          setRequestStatus('initial');
          setDocumentRequests([]);
        }
      } catch (error) {
        console.error('Error fetching document requests:', error);
        setRequestStatus('initial');
        setDocumentRequests([]);
      } finally {
        setLoading(false);
      }
    };

    if (offerId) {
      fetchDocumentRequests();
    }
  }, [offerId, role]);

  const onSubmit = async (formData) => {
    // Check if there's an ongoing document request for owners
    if (role === ROLES.OWNER) {
      const ongoingStatuses = ['Pending', 'In Progress', 'Documents Uploaded', 'Revision Requested'];
      const hasOngoingRequest = ongoingStatuses.includes(requestStatus);

      if (hasOngoingRequest) {
        // Show confirmation modal for ongoing requests
        setPendingUploadData(formData);
        setShowConfirmModal(true);
        return;
      }
    }

    // If no ongoing request, proceed with normal upload
    await handleUpload(formData, false);
  };

  const handleUpload = async (formData, useDocumentRequest) => {
    const dealDocumentRequestId = useDocumentRequest && documentRequests.length > 0 ? documentRequests[0].id : null;

    const uploadData = {
      ...formData,
      offerId,
      ...(dealDocumentRequestId && { dealDocumentRequestId }),
    };

    const {
      data,
      error,
      message: successMessage,
    } = await uploadDocument({
      data: uploadData,
      role,
    });
    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      dispatch(updateDocumentList({ offerId, newDocuments: data }));

      // Also keep notifications.dealData in sync with latest documents
      const newDocuments = Array.isArray(data) ? data : [data];
      const currentDocuments = Array.isArray(deal?.documents) ? deal.documents : [];

      dispatch(
        updateDealData({
          documents: [...currentDocuments, ...newDocuments],
        })
      );
      successToast(successMessage);
    }
  };

  const handleConfirmUpload = async () => {
    setShowConfirmModal(false);
    await handleUpload(pendingUploadData, useForDocumentRequest);
    setPendingUploadData(null);
    setUseForDocumentRequest(false);
  };

  const handleCancelUpload = () => {
    setShowConfirmModal(false);
    setPendingUploadData(null);
    setUseForDocumentRequest(false);
  };

  const onDocumentRequest = async (formData, action) => {
    try {
      switch (action) {
        case 'submit': {
          // Get the first document request ID for the complete upload
          const requestId = documentRequests.length > 0 ? documentRequests[0].id : null;

          if (!requestId) {
            errorToast('Error', 'No document request found');
            break;
          }

          const response = await completeUploadDocumentRequest({ requestId });

          if (response.error) {
            errorToast(response.error?.title, response.error?.message);
          } else {
            successToast('Submitted to broker successfully');
            // Refresh document requests to get updated status
            const updatedRequests = await getDocumentRequests({ dealId: offerId });
            if (updatedRequests.data && updatedRequests.data.length > 0) {
              setDocumentRequests(updatedRequests.data);
              setRequestStatus(updatedRequests.data[0].status || 'Pending');
            }
          }
          break;
        }
        default:
          successToast('Action completed successfully');
          break;
      }
    } catch (error) {
      console.error('Error handling document request action:', error);
      errorToast(error?.title || 'Error', error?.message || 'Failed to process document request');
    }
  };

  // Get initial data for the form
  const getInitialFormData = () => {
    if (documentRequests.length > 0) {
      const latestRequest = documentRequests[0];
      return {
        requestedFiles: latestRequest.requestedFiles || [],
        comments: latestRequest.revisionComment || '',
        title: latestRequest.title || '',
      };
    }
    return {
      requestedFiles: [],
      comments: '',
      title: '',
    };
  };

  const { requestedFiles, comments, title } = getInitialFormData();

  return (
    <div className="mb-5 flex flex-col gap-y-5">
      {role === ROLES.OWNER && loading && (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      )}

      {role === ROLES.OWNER && !loading && (
        <PreFixtureDocumentRequestForm
          role={role}
          onSubmit={onDocumentRequest}
          title={title || 'Please review the document request from the broker.'}
          status={requestStatus}
          requestedFiles={requestedFiles}
          comments={comments}
          documentRequestId={documentRequests.length > 0 ? documentRequests[0].id : null}
        />
      )}

      <UploadForm
        onSubmit={onSubmit}
        dropzoneProps={{
          multiple: true,
          maxFiles: 10,
        }}
      />
      <div className="table-scroll">
        <Table headerData={prefixtureHeader} rows={rowsData} noDataMessage="No Documents Provided" />
      </div>

      <ConfirmModal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmUpload}
        onClose={handleCancelUpload}
        title="Link this upload to the pending request"
        confirmText="Upload"
        cancelText="Cancel"
        variant="primary"
      >
        <div className="space-y-4">
          <p className="text-sm text-black">
            This deal has a pending document request. If this file (or these files) address that request, check the box
            below. After uploading, please click Submit to Broker to complete the process.
          </p>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="useForDocumentRequest"
              checked={useForDocumentRequest}
              onChange={(e) => setUseForDocumentRequest(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600"
            />
            <label htmlFor="useForDocumentRequest" className="text-sm text-gray-700">
              Link this file to the document request
            </label>
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
