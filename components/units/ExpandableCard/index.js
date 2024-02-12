import { ExpandableCardPropTypes } from '@/lib/types';

import { fleetsHeaderDataAdapter, fleetsRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader, ExpandableCardWrapper, Table } from '@/elements';
import { fleetsHeader } from '@/utils/mock';

const ExpandableCard = ({ data, expandAll, className }) => {
  const headerData = fleetsHeaderDataAdapter({ data });
  const rowsData = fleetsRowsDataAdapter({ data: data?.tankers });

  return (
    <ExpandableCardWrapper
      expandAll={expandAll}
      className={className}
      headerComponent={<ExpandableCardHeader headerData={headerData} gridLayout={false} />}
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
