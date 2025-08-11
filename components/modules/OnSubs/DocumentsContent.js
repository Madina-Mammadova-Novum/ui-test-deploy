import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { ROLES } from '@/lib/constants';
import {
  approveDocumentRequest,
  completeUploadDocumentRequest,
  createDocumentRequest,
  getDocumentRequests,
  revisionDocumentRequest,
} from '@/services/documentRequests';
import { uploadDocument } from '@/services/on-subs';
import { updateDocumentList } from '@/store/entities/on-subs/slice';
import { getUserDataSelector } from '@/store/selectors';
import { ConfirmModal, DocumentRequestForm, UploadForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';
import { onSubsHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [], offerId }) => {
  const { role } = useSelector(getUserDataSelector);

  const dispatch = useDispatch();
  const [documentRequests, setDocumentRequests] = useState([]);
  const [requestStatus, setRequestStatus] = useState('initial');
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [useForDocumentRequest, setUseForDocumentRequest] = useState(false);
  const [pendingUploadData, setPendingUploadData] = useState(null);

  // Fetch document requests on component mount
  useEffect(() => {
    const fetchDocumentRequests = async () => {
      setLoading(true);
      try {
        const response = await getDocumentRequests({ dealId: offerId });

        if (response.error) {
          console.error('Failed to fetch document requests:', response.error);
          // If there's no data, keep status as 'initial'
          setRequestStatus('initial');
          setDocumentRequests([]);
        } else if (response.data && response.data.length > 0) {
          // If we have data, use the status from the latest request
          setDocumentRequests(response.data);
          const latestRequest = response.data[0]; // Assuming the first item is the latest
          setRequestStatus(latestRequest.status || 'Pending');
        } else {
          // No data found, status remains 'initial'
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
  }, [offerId]);

  const onSubmit = async (formData) => {
    // Check if there's an ongoing document request
    const ongoingStatuses = ['Pending', 'In Progress', 'Documents Uploaded', 'Revision Requested'];
    const hasOngoingRequest = ongoingStatuses.includes(requestStatus);

    if (hasOngoingRequest) {
      // Show confirmation modal for ongoing requests
      setPendingUploadData(formData);
      setShowConfirmModal(true);
      return;
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
        case 'create': {
          const { requestedFiles } = formData;
          const response = await createDocumentRequest({
            dealId: offerId,
            title: 'Document Request',
            requestedFiles,
          });

          if (response.error) {
            errorToast(response.error?.title, response.error?.message);
          } else {
            successToast('Document request created successfully');
            // Refresh document requests
            const updatedRequests = await getDocumentRequests({ dealId: offerId });
            if (updatedRequests.data && updatedRequests.data.length > 0) {
              setDocumentRequests(updatedRequests.data);
              setRequestStatus(updatedRequests.data[0].status || 'Pending');
            }
          }
          break;
        }
        case 'update':
          // TODO: Implement update document request

          successToast('Document request updated successfully');
          break;
        case 'revision': {
          // Get the first document request ID for the revision
          const requestId = documentRequests.length > 0 ? documentRequests[0].id : null;

          if (!requestId) {
            errorToast('Error', 'No document request found');
            break;
          }

          const response = await revisionDocumentRequest({
            requestId,
            comment: formData.comments || '',
          });

          if (response.error) {
            errorToast(response.error?.title, response.error?.message);
          } else {
            successToast('Revision requested successfully');
            // Refresh document requests to get updated status
            const updatedRequests = await getDocumentRequests({ dealId: offerId });
            if (updatedRequests.data && updatedRequests.data.length > 0) {
              setDocumentRequests(updatedRequests.data);
              setRequestStatus(updatedRequests.data[0].status || 'Pending');
            }
          }
          break;
        }
        case 'confirm': {
          // Get the first document request ID for the approval
          const requestId = documentRequests.length > 0 ? documentRequests[0].id : null;

          if (!requestId) {
            errorToast('Error', 'No document request found');
            break;
          }

          const response = await approveDocumentRequest({ requestId });

          if (response.error) {
            errorToast(response.error?.title, response.error?.message);
          } else {
            successToast('Documents confirmed as complete');
            // Refresh document requests to get updated status
            const updatedRequests = await getDocumentRequests({ dealId: offerId });
            if (updatedRequests.data && updatedRequests.data.length > 0) {
              setDocumentRequests(updatedRequests.data);
              setRequestStatus(updatedRequests.data[0].status || 'Pending');
            }
          }
          break;
        }
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
            successToast('Submitted to charterer successfully');
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

  // Determine what to render based on role and status
  const shouldRenderDocumentRequestForm = () => {
    const isCharterer = role === ROLES.CHARTERER;
    const isOwner = role === ROLES.OWNER;

    // Define ongoing statuses where interaction is possible
    const ongoingStatuses = ['Pending', 'In Progress', 'Documents Uploaded', 'Revision Requested'];
    const isOngoing = ongoingStatuses.includes(requestStatus);

    // For charterer: always show the form regardless of status
    if (isCharterer && requestStatus !== 'Approved') {
      return true;
    }

    // For owner: only show if there's an ongoing request
    if (isOwner) {
      return isOngoing;
    }

    return false;
  };

  // Get initial data for the form
  const getInitialFormData = () => {
    if (documentRequests.length > 0) {
      const latestRequest = documentRequests[0];
      return {
        initialDocuments: latestRequest.requestedFiles?.map((file) => file.id || file.name) || [],
        comments: latestRequest.revisionComment || '',
        title: latestRequest.title || '',
      };
    }
    return {
      initialDocuments: [],
      comments: '',
      title: '',
    };
  };

  const { initialDocuments, comments, title } = getInitialFormData();

  return (
    <div className="mb-5 flex flex-col gap-y-5">
      {loading ? (
        <div className="flex items-center justify-center p-8">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      ) : shouldRenderDocumentRequestForm ? (
        <DocumentRequestForm
          role={role}
          onSubmit={onDocumentRequest}
          title={title || 'Please choose the documents required for clearance of the vessel.'}
          status={requestStatus}
          initialDocuments={initialDocuments}
          comments={comments}
          requestedFiles={documentRequests.length > 0 ? documentRequests[0].requestedFiles : []}
          documentRequestId={documentRequests.length > 0 ? documentRequests[0].id : null}
          offerId={offerId}
        />
      ) : null}

      <UploadForm
        onSubmit={onSubmit}
        dropzoneProps={{
          multiple: true,
          maxFiles: 10,
        }}
      />
      <Table headerData={onSubsHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />

      <ConfirmModal
        isOpen={showConfirmModal}
        onConfirm={handleConfirmUpload}
        onClose={handleCancelUpload}
        title="Document Request Association"
        confirmText="Upload"
        cancelText="Cancel"
        variant="primary"
      >
        <div className="space-y-4">
          <p className="text-sm text-black">
            You have requested documents from this deal. Would you like to associate this file upload with the document
            request?
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
              Use this file upload for the document request
            </label>
          </div>
        </div>
      </ConfirmModal>
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
