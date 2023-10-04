import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { notificationsDataAdapter } from '@/adapters/notifications';
import { userDetailsAdapter } from '@/adapters/user';
import { userTankersDetailsAdapter } from '@/adapters/vessel';

export const sidebarSelector = ({ user }) => user?.params;
export const userSelector = ({ user }) => user;
export const vesselsSelector = ({ positions, fleets }) => {
  return {
    ...positions,
    data: {
      ...positions.data,
      unassigned: {
        title: 'Unassigned Fleet',
        activeTankers: fleets.unassignedFleetData?.filter((fleet) => fleet.appearsInSearch === true).length,
        inActiveTankers: fleets.unassignedFleetData?.filter((fleet) => fleet.appearsInSearch !== true).length,
        type: 'unassigned',
        tankers: userTankersDetailsAdapter({ data: fleets.unassignedFleetData }),
      },
    },
  };
};
export const fleetsSelector = ({ fleets }) => fleets;
export const searchSelector = ({ search }) => search;
export const negotiatingSelector = ({ negotiating }) => negotiating;
export const generalSelector = ({ general }) => general;
export const notificationsSelector = ({ notifications }) => notifications;
export const offerSelector = ({ offer }) => offer;
export const preFixtureSelector = ({ preFixture }) => preFixture;
export const onSubsSelector = ({ onSubs }) => onSubs;
export const chatSelector = ({ chat }) => chat;

export const getSidebarSelector = createDraftSafeSelector(sidebarSelector, (state) => {
  return {
    collapsed: state?.sidebarCollapsed,
    opened: state?.sidebarSubMenuOpened,
  };
});

export const getUserDataSelector = createDraftSafeSelector(userSelector, (state) => {
  return {
    ...state,
    data: userDetailsAdapter({ data: state.data }),
  };
});

export const getGeneralDataSelector = createDraftSafeSelector(generalSelector, (state) => {
  return {
    loading: state?.loading,
    error: state?.error,
    countries: state?.data?.countries,
    ports: state?.data?.ports,
  };
});

export const getNotificationsDataSelector = createDraftSafeSelector(notificationsSelector, (state) => {
  return {
    ...state,
    watchedData: notificationsDataAdapter({ data: state?.watchedData }),
    unwatchedData: notificationsDataAdapter({ data: state?.unwatchedData }),
    readedCounter: state.readed,
    unreadCounter: state.unread,
    noReadedMessages: state.readed === 0,
    noUnreadedMessages: state.unread === 0,
  };
});

export const getUserVesselsSelector = createDraftSafeSelector(vesselsSelector, (state) => {
  return {
    loading: state?.loading,
    error: state?.error,
    vessels: state?.data?.vessels,
    unassignedVessel: state?.data?.unassigned,
    totalPages: state?.data?.totalPages,
  };
});

export const getChatSelector = createDraftSafeSelector(chatSelector, (state) => {
  return {
    opened: state.opened,
    loading: state.loading,
    search: state.filterParams.searchValue,
    tab: state.filterParams.tabValue,
    limit: state.filterParams.limit,
    chats: state.data,
    support: {
      chatId: state?.data?.support?.chatId,
      vessel: state?.data?.support?.broker,
    },
    collapsedChats: {
      counter: state.data.collapsed.length,
      data: state.data.collapsed,
    },
    totalActive: state.data?.active?.length,
    totalArchived: state.data?.archived?.length,
    isActive: state.isActiveSession,
    isDeactivated: state.isDeactivatedSession,
  };
});

export const getPreFixtureDataSelector = createDraftSafeSelector(preFixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    totalPages: state.data?.totalPages,
    data: state.data?.offers?.map((offer) => ({ ...offer, cargoeId: offer?.searchedCargo?.id })),
  };
});
