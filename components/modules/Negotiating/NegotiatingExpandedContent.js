import React, { useMemo, useState } from 'react';

import { useSession } from 'next-auth/react';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import { counteroffersTabDataByRole, failedTabDataByRole, offerTabDataByRole } from '@/adapters/negotiating';
import { Modal, Table } from '@/elements';
import { ROLES } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import {
  chartererNegotiatingCounterofferTableHeader,
  chartererNegotiatingFailedTableHeader,
  negotiatingIncomingTableHeader,
  negotiatingSentOffersTableHeader,
  ownerNegotiatingCounterofferTableHeader,
  ownerNegotiatingFailedTableHeader,
} from '@/utils/mock';

const NegotiatingExpandedContent = ({ data, currentTab }) => {
  const [modal, setModal] = useState(null);
  const { data: session } = useSession();
  const isOwner = session?.role === ROLES.OWNER;

  const handleCloseModal = () => setModal(null);
  const handleOpenModal = ({ id }) => setModal(id);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'counteroffers':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingCounterofferTableHeader : chartererNegotiatingCounterofferTableHeader}
            rows={counteroffersTabDataByRole({ data: data.sentCounteroffers, role: session?.role })}
            handleActionClick={handleOpenModal}
          />
        );
      case 'failed':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingFailedTableHeader : chartererNegotiatingFailedTableHeader}
            rows={failedTabDataByRole({ data: data.failedOffers, role: session?.role })}
            handleActionClick={handleOpenModal}
          />
        );
      default:
        return (
          <Table
            headerData={isOwner ? negotiatingIncomingTableHeader : negotiatingSentOffersTableHeader}
            rows={offerTabDataByRole({ data: data.incomingOffers, role: session?.role })}
            handleActionClick={handleOpenModal}
          />
        );
    }
  }, [currentTab, data.failedOffers, data.incomingOffers, data.sentCounteroffers, isOwner, session?.role]);

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
