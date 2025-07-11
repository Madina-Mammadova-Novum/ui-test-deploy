import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { ROLES } from '@/lib/constants';
import { createDocumentRequest, getDocumentRequests } from '@/services/documentRequests';
import { uploadDocument } from '@/services/on-subs';
import { updateDocumentList } from '@/store/entities/on-subs/slice';
import { getUserDataSelector } from '@/store/selectors';
import { DocumentRequestForm, UploadForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';
import { onSubsHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [], offerId }) => {
  const { role } = useSelector(getUserDataSelector);
  const dispatch = useDispatch();
  const [documentRequests, setDocumentRequests] = useState([]);
  const [requestStatus, setRequestStatus] = useState('initial');
  const [loading, setLoading] = useState(false);

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
    const {
      data,
      error,
      message: successMessage,
    } = await uploadDocument({
      data: { ...formData, offerId },
      role,
    });
    if (error) {
      errorToast(error?.title, error?.message);
    } else {
      dispatch(updateDocumentList({ offerId, newDocuments: data }));
      successToast(successMessage);
    }
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
            errorToast('Error', 'Failed to create document request');
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
        case 'revision':
          // TODO: Implement ask for revision

          successToast('Revision requested successfully');
          break;
        case 'confirm':
          // TODO: Implement confirm completeness

          successToast('Documents confirmed as complete');
          break;
        case 'submit':
          // TODO: Implement submit to charterer

          successToast('Submitted to charterer successfully');
          break;
        default:
          successToast('Action completed successfully');
          break;
      }
    } catch (error) {
      console.error('Error handling document request action:', error);
      errorToast('Error', 'Failed to process document request');
    }
  };

  // Determine what to render based on role and status
  const shouldRenderDocumentRequestForm = () => {
    const isCharterer = role === ROLES.CHARTERER;
    const isOwner = role === ROLES.OWNER;

    // Define ongoing statuses where interaction is possible
    const ongoingStatuses = ['initial', 'Pending', 'UploadInProgress', 'DocumentsUploaded', 'RevisionRequested'];
    const isOngoing = ongoingStatuses.includes(requestStatus);

    // For charterer: always show the form regardless of status
    if (isCharterer) {
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
      {shouldRenderDocumentRequestForm() &&
        (loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
          </div>
        ) : (
          <DocumentRequestForm
            role={role}
            onSubmit={onDocumentRequest}
            title={title || 'Please choose the documents required for clearance of the vessel.'}
            status={requestStatus}
            initialDocuments={initialDocuments}
            comments={comments}
          />
        ))}
      <UploadForm
        onSubmit={onSubmit}
        dropzoneProps={{
          multiple: true,
          maxFiles: 10,
        }}
      />
      <Table headerData={onSubsHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
