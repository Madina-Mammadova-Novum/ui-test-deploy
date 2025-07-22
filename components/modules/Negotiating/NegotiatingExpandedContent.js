'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { negotiatingExpandedContentPropTypes } from '@/lib/types';

import {
  counteroffersTabDataByRole,
  failedTabDataByRole,
  notifiedNegotiatingDataAdapter,
  offerTabDataByRole,
} from '@/adapters/negotiating';
import { Table } from '@/elements';
import { getAssignedTasks } from '@/services/assignedTasks';
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
  const [enhancedIncomingData, setEnhancedIncomingData] = useState([]);
  const [enhancedSentData, setEnhancedSentData] = useState([]);

  const { incoming = [], sent = [], failed = [] } = offerById[data.id];
  const { isOwner } = getRoleIdentity({ role });

  // Memoize processed data to prevent unnecessary recalculations
  const sentData = useMemo(
    () => (tab ? notifiedNegotiatingDataAdapter({ tab, data: sent, fleetId: data.fleetId }) : sent),
    [tab, sent, data.fleetId]
  );

  const failedData = useMemo(
    () => (tab ? notifiedNegotiatingDataAdapter({ tab, data: failed, fleetId: data.fleetId }) : failed),
    [tab, failed, data.fleetId]
  );

  const incomingData = useMemo(
    () => (tab ? notifiedNegotiatingDataAdapter({ tab, data: incoming, fleetId: data.fleetId }) : incoming),
    [tab, incoming, data.fleetId]
  );

  const fetchAssignedTasksForIncoming = useCallback(async (incomingItems) => {
    if (!incomingItems || incomingItems.length === 0) {
      setEnhancedIncomingData([]);
      return;
    }

    try {
      const enhancedData = await Promise.all(
        incomingItems.map(async (item) => {
          try {
            const assignedTasksResponse = await getAssignedTasks({
              targetId: item.id,
              purpose: 'NegotiatingOffer',
            });

            // Find the task with status "Created" and extract its countdown timer data
            const createdTask = assignedTasksResponse?.data?.find((task) => task.status === 'Created');
            const expiresAt = createdTask?.countdownTimer?.expiresAt;
            const countdownStatus = createdTask?.countdownTimer?.status;

            return {
              ...item,
              expiresAt,
              countdownStatus,
            };
          } catch (error) {
            console.error(`Error fetching assigned tasks for item ${item.id}:`, error);
            return item; // Return original item if fetch fails
          }
        })
      );

      setEnhancedIncomingData(enhancedData);
    } catch (error) {
      console.error('Error fetching assigned tasks for incoming data:', error);
      setEnhancedIncomingData(incomingItems); // Fallback to original data
    }
  }, []);

  const fetchAssignedTasksForSent = useCallback(async (sentItems) => {
    if (!sentItems || sentItems.length === 0) {
      setEnhancedSentData([]);
      return;
    }

    try {
      const enhancedData = await Promise.all(
        sentItems.map(async (item) => {
          try {
            const assignedTasksResponse = await getAssignedTasks({
              targetId: item.id,
              purpose: 'NegotiatingOffer',
            });

            // Find the task with status "Created" and extract its countdown timer data
            const createdTask = assignedTasksResponse?.data?.find((task) => task.status === 'Created');
            const expiresAt = createdTask?.countdownTimer?.expiresAt;
            const countdownStatus = createdTask?.countdownTimer?.status;

            return {
              ...item,
              expiresAt,
              countdownStatus,
            };
          } catch (error) {
            console.error(`Error fetching assigned tasks for item ${item.id}:`, error);
            return item; // Return original item if fetch fails
          }
        })
      );

      setEnhancedSentData(enhancedData);
    } catch (error) {
      console.error('Error fetching assigned tasks for sent data:', error);
      setEnhancedSentData(sentItems); // Fallback to original data
    }
  }, []);

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

  // Fetch assigned tasks once when component mounts and has incoming data
  useEffect(() => {
    if (incomingData && incomingData.length > 0) {
      fetchAssignedTasksForIncoming(incomingData);
    } else {
      setEnhancedIncomingData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  // Fetch assigned tasks once when component mounts and has sent data
  useEffect(() => {
    if (sentData && sentData.length > 0) {
      fetchAssignedTasksForSent(sentData);
    } else {
      setEnhancedSentData([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only run once on mount

  const tabContent = {
    counteroffers: (
      <Table
        headerData={isOwner ? ownerNegotiatingCounterofferTableHeader : chartererNegotiatingCounterofferTableHeader}
        rows={counteroffersTabDataByRole({
          data: enhancedSentData.length > 0 ? enhancedSentData : sentData,
          role,
          parentId: data.id,
        })}
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
        rows={offerTabDataByRole({ data: enhancedIncomingData, role, parentId: data.id })}
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
