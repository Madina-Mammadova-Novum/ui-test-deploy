import { ExpandableCardPropTypes } from '@/lib/types';

import { fleetsHeaderDataAdapter, fleetsRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader, ExpandableCardWrapper, Table } from '@/elements';
import { fleetsHeader } from '@/utils/mock';

const ExpandableCard = ({ data, expandAll, className, onClick }) => {
  const headerData = fleetsHeaderDataAdapter({ data });
  const rowsData = fleetsRowsDataAdapter({ data: data?.tankers });

  return (
    <ExpandableCardWrapper
      headerComponent={<ExpandableCardHeader headerData={headerData} />}
      className={className}
      onClick={onClick}
      expandAll={expandAll}
    >
      <Table headerData={fleetsHeader} rows={rowsData} />
    </ExpandableCardWrapper>
  );
};

ExpandableCard.propTypes = ExpandableCardPropTypes;

export default ExpandableCard;
