import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { notificationsDataAdapter } from '@/adapters/notifications';
import { userDetailsAdapter } from '@/adapters/user';

export const sidebarSelector = ({ user }) => user?.params;
export const userSelector = ({ user }) => user;
export const vesselsSelector = ({ positions }) => positions;
export const fleetsSelector = ({ fleets }) => fleets;
export const searchSelector = ({ search }) => search;
export const negotiatingSelector = ({ negotiating }) => negotiating;
export const generalSelector = ({ general }) => general;
export const notificationsSelector = ({ notifications }) => notifications;
export const offerSelector = ({ offer }) => offer;
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
    totalPages: state?.data?.totalPages,
  };
});

export const getChatSelector = createDraftSafeSelector(chatSelector, (state) => {
  return {
    loading: state.loading,
    search: state.filterParams.searchValue,
    tab: state.filterParams.tabValue,
    limit: state.filterParams.limit,
    chats: state.data,
    totalActive: state.data.active.length,
    totalArchived: state.data.archived.length,
  };
});
