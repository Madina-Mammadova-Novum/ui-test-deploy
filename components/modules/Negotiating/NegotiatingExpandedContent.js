import React, { useState } from 'react';

import { Modal, Table } from '@/elements';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import { Tabs } from '@/units';
import {
  negotiatingCounterofferTableHeader,
  negotiatingCounterofferTableRows,
  negotiatingFailedTableHeader,
  negotiatingFailedTableRows,
  negotiatingIncomingTableHeader,
  negotiatingIncomingTableRows,
} from '@/utils/mock';

const tabs = [
  {
    value: 'incoming',
    label: 'Incoming',
  },
  {
    value: 'counteroffers',
    label: 'Sent counteroffers',
  },
  {
    value: 'failed',
    label: 'Failed',
  },
];

const NegotiatingExpandedContent = () => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [modal, setModal] = useState(null);

  const handleCloseModal = () => setModal(null);
  const handleOpenModal = ({ id }) => setModal(id);

  const tabContent = () => {
    switch (currentTab) {
      case 'counteroffers':
        return (
          <Table
            headerData={negotiatingCounterofferTableHeader}
            rows={negotiatingCounterofferTableRows}
            handleActionClick={handleOpenModal}
          />
        );
      case 'failed':
        return (
          <Table
            headerData={negotiatingFailedTableHeader}
            rows={negotiatingFailedTableRows}
            handleActionClick={handleOpenModal}
          />
        );
      default:
        return (
          <Table
            headerData={negotiatingIncomingTableHeader}
            rows={negotiatingIncomingTableRows}
            handleActionClick={handleOpenModal}
          />
        );
    }
  };

  const modalContent = () => {
    switch (modal) {
      case 'view_counteroffer':
        return <ViewCounteroffer />;
      case 'view_failed_offer':
        return <ViewFailedOffer />;
      default:
        return <ViewIncomingOffer closeModal={handleCloseModal} />;
    }
  };
  return (
    <div>
      <Tabs
        onClick={({ target }) => setCurrentTab(target.value)}
        activeTab={currentTab}
        tabs={tabs}
        customStyles="my-3 mx-auto"
      />

      {tabContent()}

      <Modal opened={modal} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </div>
  );
};

export default NegotiatingExpandedContent;
