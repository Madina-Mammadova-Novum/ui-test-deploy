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
export const negotiatingSelector = ({ negotiating, user }) => ({ ...negotiating, role: user.role });
export const generalSelector = ({ general }) => general;
export const notificationsSelector = ({ notifications }) => notifications;
export const offerSelector = ({ offer }) => offer;
export const preFixtureSelector = ({ preFixture, user }) => ({ ...preFixture, role: user.role });
export const onSubsSelector = ({ onSubs, user }) => ({ ...onSubs, role: user.role });
export const fixtureSelector = ({ fixture, user }) => ({ ...fixture, role: user.role });
export const postFixtureSelector = ({ postFixture, user }) => ({ ...postFixture, role: user.role });
export const chatSelector = ({ chat, user }) => ({ ...chat, role: user.role });

export const getSidebarSelector = createDraftSafeSelector(sidebarSelector, (state) => {
  return {
    collapsed: state?.sidebarCollapsed,
    opened: state?.sidebarSubMenuOpened,
  };
});

export const getUserDataSelector = createDraftSafeSelector(userSelector, (state) => {
  return {
    ...state,
    data: userDetailsAdapter({ data: state.data, role: state.role }),
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
    toggle: state.toggle,
    vessels: state?.data?.vessels,
    unassignedVessel: state?.data?.unassigned,
    totalPages: state?.data?.totalPages,
  };
});

export const getChatSelector = createDraftSafeSelector(chatSelector, (state) => {
  const messagesCounter = state?.data?.active.reduce((count, chat) => count + (chat.messageCount > 0 ? 1 : 0), 0);
  const newMessages = state?.data?.support?.[0]?.messageCount > 0 ? messagesCounter + 1 : messagesCounter;

  return {
    newMessages,
    role: state.role,
    chats: state.data,
    opened: state.opened,
    loading: state.loading,
    updating: state.updating,
    search: state.filterParams?.searchValue,
    tab: state.filterParams?.tabValue,
    limit: state.filterParams?.limit,
    totalActive: state.data?.active?.length,
    totalArchived: state.data?.archived?.length,
    isActive: state.isActiveSession,
  };
});

export const getFixtureSelector = createDraftSafeSelector(fixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    role: state.role,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoeId: offer?.searchedCargo?.id })),
  };
});

export const getPostFixtureDataSelector = createDraftSafeSelector(postFixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    filters: state.data?.filters,
    sorting: state.data?.sorting,
    role: state.role,
    perPage: state?.data?.perPage,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoeId: offer?.searchedCargo?.id })),
  };
});

export const getPreFixtureDataSelector = createDraftSafeSelector(preFixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    role: state.role,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoeId: offer?.searchedCargo?.id })),
  };
});

export const getFixtureDataSelector = createDraftSafeSelector(fixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    role: state.role,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoeId: offer?.searchedCargo?.id })),
  };
});

export const getNegotiatingDataSelector = createDraftSafeSelector(negotiatingSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    offers: state.data.offers,
    offerById: state.data.offerById,
    role: state.role,
  };
});

export const getOnSubsDataSelector = createDraftSafeSelector(onSubsSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoeId: offer?.searchedCargo?.id })) || [],
    offerById: state.data.offerById,
    role: state.role,
  };
});

export const getFleetsSelector = createDraftSafeSelector(fleetsSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    data: state.data?.vessels,
    refetch: state.refetch,
  };
});
