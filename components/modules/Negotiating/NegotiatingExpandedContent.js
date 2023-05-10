import React, { useState, useMemo } from 'react';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import {
  failedTabRowsDataAdapter,
  incomingTabRowsDataAdapter,
  sentCounteroffersTabRowsDataAdapter,
} from '@/adapters/negotiating';
import { Modal, Table } from '@/elements';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import { Tabs } from '@/units';
import {
  negotiatingCounterofferTableHeader,
  negotiatingFailedTableHeader,
  negotiatingIncomingTableHeader,
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

const NegotiatingExpandedContent = ({ data }) => {
  const [currentTab, setCurrentTab] = useState(tabs[0].value);
  const [modal, setModal] = useState(null);

  const handleCloseModal = () => setModal(null);
  const handleOpenModal = ({ id }) => setModal(id);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'counteroffers':
        return (
          <Table
            headerData={negotiatingCounterofferTableHeader}
            rows={sentCounteroffersTabRowsDataAdapter({ data: data.sentCounteroffers })}
            handleActionClick={handleOpenModal}
          />
        );
      case 'failed':
        return (
          <Table
            headerData={negotiatingFailedTableHeader}
            rows={failedTabRowsDataAdapter({ data: data.failedOffers })}
            handleActionClick={handleOpenModal}
          />
        );
      default:
        return (
          <Table
            headerData={negotiatingIncomingTableHeader}
            rows={incomingTabRowsDataAdapter({ data: data.incomingOffers })}
            handleActionClick={handleOpenModal}
          />
        );
    }
  }, [currentTab])

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

      <div className='mb-3'>{tabContent}</div>

      <Modal opened={modal} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </div>
  );
};

NegotiatingExpandedContent.propTypes = negotiatingExpandedContentPropTypes;

export default NegotiatingExpandedContent;
