import PropTypes from 'prop-types';

import { fleetsHeaderDataAdapter } from '@/adapters';
import { ExpandableCardHeader, ExpandableCardWrapper, Table } from '@/elements';
import { fleetsHeader, fleetsTableRow } from '@/utils/mock';

const ExpandableCard = ({ data }) => {
  const headerData = fleetsHeaderDataAdapter({ data });

  return (
    <ExpandableCardWrapper headerComponent={<ExpandableCardHeader headerData={headerData} />}>
      {/* Table is draft version */}
      <Table headerData={fleetsHeader} rows={fleetsTableRow} />
    </ExpandableCardWrapper>
  );
};

ExpandableCard.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string,
    activeTankers: PropTypes.string,
    inActiveTankers: PropTypes.string,
    tankers: PropTypes.arrayOf(PropTypes.shape({})),
  }),
};

export default ExpandableCard;
