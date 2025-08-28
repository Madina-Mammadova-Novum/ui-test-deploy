import { useDispatch, useSelector } from 'react-redux';

import { FixtureDocumentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { uploadDocument } from '@/services/on-subs';
import { updateDocumentList } from '@/store/entities/fixture/slice';
import { updateDealData } from '@/store/entities/notifications/slice';
import { getNotificationsDataSelector, getUserDataSelector } from '@/store/selectors';
import { UploadForm } from '@/units';
import { errorToast, successToast } from '@/utils/hooks';
import { fixtureHeader } from '@/utils/mock';

const FixtureDocumentsContent = ({ rowsData = [], offerId }) => {
  const dispatch = useDispatch();
  const { role } = useSelector(getUserDataSelector);
  const { deal } = useSelector(getNotificationsDataSelector);

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

  return (
    <div className="flex flex-col gap-y-2.5 pb-3">
      <UploadForm
        onSubmit={onSubmit}
        dropzoneProps={{
          multiple: true,
          maxFiles: 10,
        }}
      />
      <div className="table-scroll">
        <Table headerData={fixtureHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </div>
  );
};

FixtureDocumentsContent.propTypes = FixtureDocumentsContentPropTypes;

export default FixtureDocumentsContent;
