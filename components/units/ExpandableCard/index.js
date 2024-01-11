import { ExpandableCardPropTypes } from '@/lib/types';

import { fleetsHeaderDataAdapter, fleetsRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader, ExpandableCardWrapper, Table } from '@/elements';
import { fleetsHeader } from '@/utils/mock';

const ExpandableCard = ({ data, expandAll, className, isOpened, onClick }) => {
  const headerData = fleetsHeaderDataAdapter({ data });
  const rowsData = fleetsRowsDataAdapter({ data: data?.tankers });

  return (
    <ExpandableCardWrapper
      headerComponent={<ExpandableCardHeader headerData={headerData} gridLayout={false} />}
      className={className}
      onClick={onClick}
      isOpened={isOpened}
      expandAll={expandAll}
    >
      <Table
        fleetId={data?.fleetId}
        type={data?.type}
        headerData={fleetsHeader}
        rows={rowsData}
        noDataMessage="This Fleet has no tankers"
      />
    </ExpandableCardWrapper>
  );
};

ExpandableCard.propTypes = ExpandableCardPropTypes;

export default ExpandableCard;
