import React, { useState } from 'react';

import { Table, Tabs } from '@/elements';
import {
  expandedNegotiatingRowTabs,
  negotiatingCounterofferTableHeader,
  negotiatingCounterofferTableRow,
  negotiatingFailedTableHeader,
  negotiatingFailedTableRow,
  negotiatingIncomingTableHeader,
  negotiatingIncomingTableRow,
} from '@/utils/mock';

const NegotiatingExpandedData = () => {
  const [cutrentTab, setCurrentTab] = useState(expandedNegotiatingRowTabs[0].value);
  return (
    <div>
      <Tabs
        onClick={setCurrentTab}
        defaultTab={cutrentTab}
        tabs={expandedNegotiatingRowTabs}
        customStyles="my-3 mx-auto"
      />
      {cutrentTab === 'incoming' && (
        <Table headerData={negotiatingIncomingTableHeader} rows={negotiatingIncomingTableRow} />
      )}
      {cutrentTab === 'counteroffers' && (
        <Table headerData={negotiatingCounterofferTableHeader} rows={negotiatingCounterofferTableRow} />
      )}
      {cutrentTab === 'failed' && <Table headerData={negotiatingFailedTableHeader} rows={negotiatingFailedTableRow} />}
    </div>
  );
};

export default NegotiatingExpandedData;
