import { useDispatch, useSelector } from 'react-redux';

import { FailedOffersDocumentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { uploadDocument } from '@/services/on-subs';
import { updateDocumentList } from '@/store/entities/post-fixture/slice';
import { getUserDataSelector } from '@/store/selectors';
import { UploadForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';
import { fixtureHeader } from '@/utils/mock';

const FailedOffersDocumentsContent = ({ rowsData = [], offerId }) => {
  const dispatch = useDispatch();
  const { role } = useSelector(getUserDataSelector);

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
    <div className="flex flex-col gap-y-5 pb-3">
      <UploadForm onSubmit={onSubmit} />
      <div className="table-scroll">
        <Table headerData={fixtureHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </div>
  );
};

FailedOffersDocumentsContent.propTypes = FailedOffersDocumentsContentPropTypes;

export default FailedOffersDocumentsContent;
