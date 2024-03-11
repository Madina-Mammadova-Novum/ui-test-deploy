import { useDispatch, useSelector } from 'react-redux';

import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { uploadDocument } from '@/services/on-subs';
import { updateDocumentList } from '@/store/entities/on-subs/slice';
import { getUserDataSelector } from '@/store/selectors';
import { UploadForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';
import { onSubsHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [], offerId }) => {
  const { role } = useSelector(getUserDataSelector);
  const dispatch = useDispatch();

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
      dispatch(updateDocumentList({ offerId, newDocument: data }));
      successToast(successMessage);
    }
  };

  return (
    <div className="flex flex-col gap-y-5 mb-5">
      <UploadForm onSubmit={onSubmit} />
      <Table headerData={onSubsHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
