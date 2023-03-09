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
  const [currentTab, setCurrentTab] = useState(expandedNegotiatingRowTabs[0].value);
  return (
    <div>
      <Tabs
        onClick={setCurrentTab}
        defaultTab={expandedNegotiatingRowTabs[0].value}
        activeTab={currentTab}
        tabs={expandedNegotiatingRowTabs}
        customStyles="my-3 mx-auto"
      />
      {currentTab === 'incoming' && (
        <Table headerData={negotiatingIncomingTableHeader} rows={negotiatingIncomingTableRow} />
      )}
      {currentTab === 'counteroffers' && (
        <Table headerData={negotiatingCounterofferTableHeader} rows={negotiatingCounterofferTableRow} />
      )}
      {currentTab === 'failed' && <Table headerData={negotiatingFailedTableHeader} rows={negotiatingFailedTableRow} />}
    </div>
  );
};

export default NegotiatingExpandedData;
