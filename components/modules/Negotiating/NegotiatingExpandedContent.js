import React, { useMemo, useState } from 'react';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import {
  sentOffersTabRowsDataAdapter,
  ownerFailedTabRowsDataAdapter,
  incomingTabRowsDataAdapter,
  sentCounteroffersTabRowsDataAdapter,
  counteroffersTabRowsDataAdapter,
  chartererFailedTabRowsDataAdapter,
} from '@/adapters/negotiating';
import { Modal, Table } from '@/elements';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import {
  ownerNegotiatingCounterofferTableHeader,
  ownerNegotiatingFailedTableHeader,
  negotiatingIncomingTableHeader,
  negotiatingSentOffersTableHeader,
  chartererNegotiatingCounterofferTableHeader,
  chartererNegotiatingFailedTableHeader,
} from '@/utils/mock';
import { useSession } from 'next-auth/react';

const NegotiatingExpandedContent = ({ data, currentTab }) => {
  const [modal, setModal] = useState(null);
  const { data: { role } = {} } = useSession()
  const isOwner = role === 'owner'
  
  const handleCloseModal = () => setModal(null);
  const handleOpenModal = ({ id }) => setModal(id);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'counteroffers':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingCounterofferTableHeader : chartererNegotiatingCounterofferTableHeader}
            rows={isOwner ? sentCounteroffersTabRowsDataAdapter({ data: data.sentCounteroffers }) : counteroffersTabRowsDataAdapter({ data: data.sentCounteroffers })}
            handleActionClick={handleOpenModal}
          />
        );
      case 'failed':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingFailedTableHeader : chartererNegotiatingFailedTableHeader}
            rows={isOwner ? ownerFailedTabRowsDataAdapter({ data: data.failedOffers }) : chartererFailedTabRowsDataAdapter({ data: data.failedOffers })}
            handleActionClick={handleOpenModal}
          />
        );
      default:
        return (
          <Table
            headerData={isOwner ? negotiatingIncomingTableHeader : negotiatingSentOffersTableHeader}
            rows={isOwner ? incomingTabRowsDataAdapter({ data: data.incomingOffers }) : sentOffersTabRowsDataAdapter({ data: data.incomingOffers })}
            handleActionClick={handleOpenModal}
          />
        );
    }
  }, [currentTab, data.failedOffers, data.incomingOffers, data.sentCounteroffers]);

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
      <div className="mb-3">{tabContent}</div>

      <Modal opened={modal} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </div>
  );
};

NegotiatingExpandedContent.propTypes = negotiatingExpandedContentPropTypes;

export default NegotiatingExpandedContent;
