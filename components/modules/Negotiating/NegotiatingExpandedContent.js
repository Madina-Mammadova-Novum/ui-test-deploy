import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import { counteroffersTabDataByRole, failedTabDataByRole, offerTabDataByRole } from '@/adapters/negotiating';
import { Modal, Table } from '@/elements';
import { ROLES } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import { getFailedOffers, getIncomingOffers, getSentCounteroffers } from '@/services/offer';
import { negotiatingSelector } from '@/store/selectors';
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
  const [incomingOffers, setIncomingOffers] = useState([]);
  const [sentCounteroffers, setSentCounteroffers] = useState([]);
  const [failedOffers, setFailedOfffers] = useState([]);
  const { refetchOffers } = useSelector(negotiatingSelector);
  const { data: session } = useSession();
  const isOwner = session?.role === ROLES.OWNER;

  const handleCloseModal = () => setModal(null);
  const handleOpenModal = ({ id }) => setModal(id);

  useEffect(() => {
    (async () => {
      const [{ data: incomingOffersData }, { data: sentCounteroffersData }, { data: failedOffersData }] =
        await Promise.all([getIncomingOffers(data.id), getSentCounteroffers(data.id), getFailedOffers(data.id)]);
      setIncomingOffers(incomingOffersData);
      setSentCounteroffers(sentCounteroffersData);
      setFailedOfffers(failedOffersData);
    })();
  }, [refetchOffers]);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'counteroffers':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingCounterofferTableHeader : chartererNegotiatingCounterofferTableHeader}
            rows={counteroffersTabDataByRole({ data: sentCounteroffers, role: session?.role })}
            handleActionClick={handleOpenModal}
            noDataMessage="No data provided"
          />
        );
      case 'failed':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingFailedTableHeader : chartererNegotiatingFailedTableHeader}
            rows={failedTabDataByRole({ data: failedOffers, role: session?.role })}
            handleActionClick={handleOpenModal}
            noDataMessage="No data provided"
          />
        );
      default:
        return (
          <Table
            headerData={isOwner ? negotiatingIncomingTableHeader : negotiatingSentOffersTableHeader}
            rows={offerTabDataByRole({ data: incomingOffers, role: session?.role })}
            handleActionClick={handleOpenModal}
            noDataMessage="No data provided"
          />
        );
    }
  }, [currentTab, incomingOffers, isOwner, session?.role]);

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
      <div className="mb-3 table-scroll">{tabContent}</div>
      <Modal opened={modal} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </div>
  );
};

NegotiatingExpandedContent.propTypes = negotiatingExpandedContentPropTypes;

export default NegotiatingExpandedContent;
