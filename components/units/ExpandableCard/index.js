import PropTypes from 'prop-types';

import { fleetsHeaderDataAdapter, fleetsRowsDataAdapter } from '@/adapters';
import { ExpandableCardHeader, ExpandableCardWrapper, Table } from '@/elements';
import { fleetsHeader } from '@/utils/mock';

const ExpandableCard = ({ data }) => {
  const headerData = fleetsHeaderDataAdapter({ data });
  const rowsData = fleetsRowsDataAdapter({ data: data.tankers });

  return (
    <ExpandableCardWrapper headerComponent={<ExpandableCardHeader headerData={headerData} />}>
      <Table headerData={fleetsHeader} rows={rowsData} />
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
