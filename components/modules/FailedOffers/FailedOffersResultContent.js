'use client';

import { FailedOffersResultContentPropTypes } from '@/lib/types';

import {
  failedOffersDetailsAdapter,
  failedOffersDocumentsTabRowsDataAdapter,
  failedOffersHeaderDataAdapter,
} from '@/adapters/failed-offers';
import { ExpandableCardHeader } from '@/elements';
import { ExpandableRow, FailedOffersExpandedContent } from '@/modules';

const FailedOffersResultContent = ({ data, toggle, isOpened, tab }) => {
  const printExpandableRow = (rowData) => {
    const rowHeader = failedOffersHeaderDataAdapter({ data: rowData });
    const cargoTypeData = rowHeader.find((item) => item.label === 'Cargo type');
    const isChemicals = cargoTypeData?.text?.toLowerCase().includes('chemicals');
    const gridStyles = `1fr 1fr 2fr ${isChemicals ? '2fr' : '1fr'} 1fr 2fr 1fr 1fr 1fr`;

    return (
      <ExpandableRow
        className="px-5"
        header={<ExpandableCardHeader headerData={rowHeader} gridStyles={gridStyles} />}
        expand={toggle}
        isOpened={isOpened}
      >
        <FailedOffersExpandedContent
          offerId={rowData?.id}
          tab={tab}
          detailsData={failedOffersDetailsAdapter({ data: rowData })}
          documentsData={failedOffersDocumentsTabRowsDataAdapter({ data: rowData?.documents })}
        />
      </ExpandableRow>
    );
  };

  return <div className="flex flex-col gap-2.5">{data?.map(printExpandableRow)}</div>;
};

FailedOffersResultContent.propTypes = FailedOffersResultContentPropTypes;

export default FailedOffersResultContent;
