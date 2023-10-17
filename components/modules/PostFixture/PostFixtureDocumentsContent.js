import { useDispatch, useSelector } from 'react-redux';

import { PostFixtureDocumentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { uploadOnSubsDocument } from '@/services/on-subs';
import { updateDocumentList } from '@/store/entities/post-fixture/slice';
import { getUserDataSelector } from '@/store/selectors';
import { UploadForm } from '@/units';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';
import { fixtureHeader } from '@/utils/mock';

const PostFixtureDocumentsContent = ({ rowsData = [], offerId }) => {
  const dispatch = useDispatch();
  const { role } = useSelector(getUserDataSelector);

  const onSubmit = async (formData) => {
    const {
      data,
      error,
      message: successMessage,
    } = await uploadOnSubsDocument({
      data: { ...formData, offerId },
      role,
    });
    if (error) {
      const { errors } = error;
      errorToast(parseErrors({ errors }));
    } else {
      dispatch(updateDocumentList({ offerId, newDocument: data }));
      successToast(successMessage);
    }
  };
  return (
    <div className="flex flex-col gap-y-2.5">
      <UploadForm onSubmit={onSubmit} />
      <div className="table-scroll">
        <Table headerData={fixtureHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </div>
  );
};

PostFixtureDocumentsContent.propTypes = PostFixtureDocumentsContentPropTypes;

export default PostFixtureDocumentsContent;
