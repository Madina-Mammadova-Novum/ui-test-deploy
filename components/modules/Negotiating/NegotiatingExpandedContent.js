import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useSession } from 'next-auth/react';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import { counteroffersTabDataByRole, failedTabDataByRole, offerTabDataByRole } from '@/adapters/negotiating';
import { Modal, Table } from '@/elements';
import { ROLES } from '@/lib/constants';
import { ViewCounteroffer, ViewFailedOffer, ViewIncomingOffer } from '@/modules';
import { fetchNegotiatingOffers } from '@/store/entities/negotiating/actions';
import { negotiatingSelector } from '@/store/selectors';
import { Tabs } from '@/units';
import {
  chartererNegotiatingCounterofferTableHeader,
  chartererNegotiatingFailedTableHeader,
  negotiatingIncomingTableHeader,
  negotiatingSentOffersTableHeader,
  ownerNegotiatingCounterofferTableHeader,
  ownerNegotiatingFailedTableHeader,
} from '@/utils/mock';

const NegotiatingExpandedContent = ({ data, tabs }) => {
  const [modal, setModal] = useState(null);
  const [currentTab, setCurrentTab] = useState(tabs[0].value);

  const dispatch = useDispatch();
  const { refetchOffers, negotiatingOffers } = useSelector(negotiatingSelector);
  const { incoming, sent, failed } = negotiatingOffers;
  const { data: session } = useSession();
  const isOwner = session?.role === ROLES.OWNER;

  const handleCloseModal = () => setModal(null);
  const handleOpenModal = ({ id }) => setModal(id);

  useEffect(() => {
    dispatch(fetchNegotiatingOffers({ isOwner, id: data.id }));
  }, [refetchOffers]);

  const tabContent = useMemo(() => {
    switch (currentTab) {
      case 'counteroffers':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingCounterofferTableHeader : chartererNegotiatingCounterofferTableHeader}
            rows={counteroffersTabDataByRole({ data: sent, role: session?.role })}
            handleActionClick={handleOpenModal}
            noDataMessage="No data provided"
          />
        );
      case 'failed':
        return (
          <Table
            headerData={isOwner ? ownerNegotiatingFailedTableHeader : chartererNegotiatingFailedTableHeader}
            rows={failedTabDataByRole({ data: failed, role: session?.role })}
            handleActionClick={handleOpenModal}
            noDataMessage="No data provided"
          />
        );
      default:
        return (
          <Table
            headerData={isOwner ? negotiatingIncomingTableHeader : negotiatingSentOffersTableHeader}
            rows={offerTabDataByRole({ data: incoming, role: session?.role })}
            handleActionClick={handleOpenModal}
            noDataMessage="No data provided"
          />
        );
    }
  }, [currentTab, failed, incoming, isOwner, sent, session?.role]);

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
        customStyles="my-3 mr-[-50%] mx-auto absolute left-1/2 top-[7%] translate-(x/y)-1/2 custom-container "
      />
      <div className="mb-3 table-scroll">{tabContent}</div>
      <Modal opened={modal} onClose={handleCloseModal}>
        {modalContent()}
      </Modal>
    </div>
  );
};

NegotiatingExpandedContent.propTypes = negotiatingExpandedContentPropTypes;

export default NegotiatingExpandedContent;
