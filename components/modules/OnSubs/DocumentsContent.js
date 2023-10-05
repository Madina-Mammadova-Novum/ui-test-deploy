import { useSession } from 'next-auth/react';

import { documentsContentPropTypes } from '@/lib/types';

import { Table } from '@/elements';
import { uploadOnSubsDocument } from '@/services/on-subs';
import { UploadForm } from '@/units';
import { parseErrors } from '@/utils/helpers';
import { errorToast, successToast } from '@/utils/hooks';
import { onSubsHeader } from '@/utils/mock';

const DocumentsContent = ({ rowsData = [], offerId }) => {
  const { data: session } = useSession();

  const onSubmit = async (formData) => {
    const { error, message: successMessage } = await uploadOnSubsDocument({
      data: { ...formData, offerId },
      role: session?.role,
    });
    if (error) {
      const { errors } = error;
      errorToast(parseErrors({ errors }));
    } else {
      successToast(successMessage);
    }
  };

  return (
    <div className="flex flex-col gap-y-2.5">
      <UploadForm onSubmit={onSubmit} />
      <div className="table-scroll">
        <Table headerData={onSubsHeader} rows={rowsData} noDataMessage="You did not upload any documents yet" />
      </div>
    </div>
  );
};

DocumentsContent.propTypes = documentsContentPropTypes;

export default DocumentsContent;
