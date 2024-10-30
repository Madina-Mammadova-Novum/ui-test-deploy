'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import {
  counteroffersTabDataByRole,
  failedTabDataByRole,
  notifiedNegotiatingDataAdapter,
  offerTabDataByRole,
} from '@/adapters/negotiating';
import { Table } from '@/elements';
import { setTab } from '@/store/entities/negotiating/slice';
import { getNegotiatingDataSelector } from '@/store/selectors';
import { Tabs } from '@/units';
import { getRoleIdentity } from '@/utils/helpers';
import {
  chartererNegotiatingCounterofferTableHeader,
  chartererNegotiatingFailedTableHeader,
  negotiatingIncomingTableHeader,
  negotiatingSentOffersTableHeader,
  ownerNegotiatingCounterofferTableHeader,
  ownerNegotiatingFailedTableHeader,
} from '@/utils/mock';

const NegotiatingExpandedContent = ({ data, tab = null, tabs }) => {
  const dispatch = useDispatch();

  const { offerById, role } = useSelector(getNegotiatingDataSelector);
  const [currentTab, setCurrentTab] = useState(tabs?.[0]?.value);

  const { incoming = [], sent = [], failed = [] } = offerById[data.id];
  const { isOwner } = getRoleIdentity({ role });

  const sentData = tab ? notifiedNegotiatingDataAdapter({ tab, data: sent, fleetId: data.fleetId }) : sent;
  const failedData = tab ? notifiedNegotiatingDataAdapter({ tab, data: failed, fleetId: data.fleetId }) : failed;
  const incomingData = tab ? notifiedNegotiatingDataAdapter({ tab, data: incoming, fleetId: data.fleetId }) : incoming;

  const determineInitialTab = () => {
    const urlParams = new URLSearchParams(window.location.href);
    if (tab) {
      const initialTab = urlParams.get('status') === 'incoming' && !incoming.length ? tabs?.[1]?.value : tab;
      setCurrentTab(initialTab);
    } else {
      setCurrentTab(tabs?.[0]?.value);
    }
  };

  const updateTabBasedOnData = () => {
    if (!tab) return;

    if (sentData.length > 0 && incomingData.length > 0) {
      const sentDate = new Date(sentData[0].createdAt);
      const incomingDate = new Date(incomingData[0].createdAt);
      dispatch(setTab(sentDate > incomingDate ? 'counteroffers' : 'incoming'));
    } else if (sentData.length > 0) {
      dispatch(setTab('counteroffers'));
    } else if (incomingData.length > 0) {
      dispatch(setTab('incoming'));
    } else {
      dispatch(setTab('failed'));
    }
  };

  useEffect(() => {
    determineInitialTab();
  }, [tab]);

  useEffect(() => {
    updateTabBasedOnData();
  }, [data, sentData, incomingData, dispatch, tab]);

  const tabContent = {
    counteroffers: (
      <Table
        headerData={isOwner ? ownerNegotiatingCounterofferTableHeader : chartererNegotiatingCounterofferTableHeader}
        rows={counteroffersTabDataByRole({ data: sentData, role, parentId: data.id })}
        noDataMessage="No data provided"
      />
    ),
    failed: (
      <Table
        headerData={isOwner ? ownerNegotiatingFailedTableHeader : chartererNegotiatingFailedTableHeader}
        rows={failedTabDataByRole({ data: failedData, role })}
        noDataMessage="No data provided"
      />
    ),
    incoming: (
      <Table
        headerData={isOwner ? negotiatingIncomingTableHeader : negotiatingSentOffersTableHeader}
        rows={offerTabDataByRole({ data: incomingData, role, parentId: data.id })}
        noDataMessage="No data provided"
      />
    ),
  };

  return (
    <>
      <Tabs
        onClick={({ target }) => setCurrentTab(target.value)}
        activeTab={currentTab}
        tabs={tabs}
        customStyles="my-3 mr-[-50%] mx-auto absolute left-1/2 top-[7%] translate-(x/y)-1/2 custom-container "
      />
      <div className="mb-3">{tabContent[currentTab]}</div>
    </>
  );
};

NegotiatingExpandedContent.propTypes = negotiatingExpandedContentPropTypes;

export default NegotiatingExpandedContent;
