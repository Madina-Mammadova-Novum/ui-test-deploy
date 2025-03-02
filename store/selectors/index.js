import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { getPrefilledFormDataAdapter } from '@/adapters/offer';
import { userDetailsAdapter } from '@/adapters/user';

export const authSelector = ({ auth }) => auth;
export const sidebarSelector = ({ general, auth }) => ({ ...general, role: auth?.session?.role });
export const userSelector = ({ user, auth }) => ({ ...user, role: auth?.session?.role });
export const vesselsSelector = ({ positions }) => positions;
export const fleetsSelector = ({ fleets }) => fleets;
export const searchSelector = ({ search }) => search;
export const negotiatingSelector = ({ negotiating, auth }) => ({ ...negotiating, role: auth?.session?.role });
export const generalSelector = ({ general }) => general;
export const notificationsSelector = ({ notifications }) => notifications;
export const offerSelector = ({ offer, search }) => ({
  ...offer,
  cargoType: search?.searchParams?.cargoType,
  products: getPrefilledFormDataAdapter({ data: search?.searchParams?.products }),
});
export const preFixtureSelector = ({ preFixture, notifications, auth }) => ({
  ...preFixture,
  role: auth?.session?.role,
  deal: notifications?.dealData,
});
export const onSubsSelector = ({ onSubs, notifications, auth }) => ({
  ...onSubs,
  role: auth?.session?.role,
  deal: notifications.dealData,
});
export const fixtureSelector = ({ fixture, notifications, auth }) => ({
  ...fixture,
  role: auth?.session?.role,
  deal: notifications?.dealData,
});
export const postFixtureSelector = ({ postFixture, notifications, auth }) => ({
  ...postFixture,
  role: auth?.session?.role,
  deal: notifications?.dealData,
});
export const chatSelector = ({ chat, auth }) => ({ ...chat, role: auth?.session?.role });

export const failedOffersSelector = ({ failedOffers, notifications, auth }) => ({
  ...failedOffers,
  role: auth?.session?.role,
  deal: notifications?.dealData,
});

export const getAuthSelector = createDraftSafeSelector(authSelector, (state) => ({
  error: state.error,
  loading: state.loading,
  session: state.session,
  authorized: state.authorized,
}));

export const getSidebarSelector = createDraftSafeSelector(sidebarSelector, (state) => {
  return {
    collapsed: state.data.params.sidebarCollapsed,
    opened: state.data.params.sidebarSubMenuOpened,
    role: state.role,
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
    watchedData: state?.watchedData,
    unwatchedData: state?.unwatchedData,
    unreadCounter: state.unread,
    noUnreadMessages: state.unread === '0',
    deal: state.dealData,
    generating: state.dealFetching,
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

export const getAuthChatSelector = createDraftSafeSelector(chatSelector, (state) => {
  const activeCounter = state?.data?.active?.reduce((count, chat) => count + (chat.messageCount > 0 ? 1 : 0), 0);
  const archivedCounter = state?.data?.archived?.reduce((count, chat) => count + (chat.messageCount > 0 ? 1 : 0), 0);

  const totalMessagesCounter = activeCounter + archivedCounter;
  const newMessages = state?.data?.support?.[0]?.messageCount > 0 ? totalMessagesCounter + 1 : totalMessagesCounter;

  return {
    messageCount: newMessages,
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
    status: state.status,
  };
});

export const getAnonChatSelector = createDraftSafeSelector(chatSelector, (state) => {
  return {
    messageCount: state.data?.user?.data?.messageCount || 0,
    chat: state.data.user,
    opened: state.opened,
    isActive: state.isActiveSession,
    data: state.data.anonymous,
  };
});

export const getFixtureSelector = createDraftSafeSelector(fixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    role: state.role,
    deal: state.deal,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoId: offer?.searchedCargo?.id })),
  };
});

export const getPostFixtureDataSelector = createDraftSafeSelector(postFixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    searchParams: state.data?.searchParams,
    sorting: state.data?.sorting,
    role: state.role,
    deal: state.deal,
    perPage: state?.data?.perPage,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoId: offer?.searchedCargo?.id })),
  };
});

export const getPreFixtureDataSelector = createDraftSafeSelector(preFixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    role: state.role,
    deal: state.deal,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoId: offer?.searchedCargo?.id })),
    isDetails: state.isDetails,
  };
});

export const getFixtureDataSelector = createDraftSafeSelector(fixtureSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    role: state.role,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoId: offer?.searchedCargo?.id })),
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
    initialTab: state.tab,
  };
});

export const getOnSubsDataSelector = createDraftSafeSelector(onSubsSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoId: offer?.searchedCargo?.id })) || [],
    offerById: state.data.offerById,
    role: state.role,
    deal: state.deal,
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
    unassignedData: state.unassignedFleetData,
  };
});

export const getOfferSelector = createDraftSafeSelector(offerSelector, (state) => {
  return {
    data: state.data,
    ranges: state.data.ranges,
    loading: state.loading,
    validating: state.validating,
    valid: state.valid,
    error: state.error,
    message: state.data.message,
    formState: {
      cargoType: state?.cargoType,
      ...state?.products,
    },
  };
});

export const getSearchSelector = createDraftSafeSelector(searchSelector, (state) => {
  return {
    data: state.searchData,
    error: state.error,
    searchParams: state.searchParams,
    toggle: state.toggle,
    loading: state.loading,
    sorting: state.sortingData,
    request: state.request,
  };
});

/* Cargo Vessel Selectors */
export const getCargoVesselSelector = (state) => state.cargoVessel;

export const getCargoVesselDataSelector = createDraftSafeSelector(getCargoVesselSelector, (state) => {
  return {
    loading: state.loading,
    error: state.error,
    cargoTypes: state.cargoTypes,
    cargoCodes: state.cargoCodes,
    vesselNames: state.vesselNames,
  };
});

// Specific data selectors that use the main selector
export const getCargoTypesSelector = (state) => getCargoVesselDataSelector(state).cargoTypes;
export const getCargoCodesSelector = (state) => getCargoVesselDataSelector(state).cargoCodes;
export const getVesselNamesSelector = (state) => getCargoVesselDataSelector(state).vesselNames;

export const getCargoVesselLoadingSelector = (state) => getCargoVesselSelector(state).loading;
export const getCargoVesselErrorSelector = (state) => getCargoVesselSelector(state).error;

export const getFailedOffersDataSelector = createDraftSafeSelector(failedOffersSelector, (state) => {
  return {
    error: state.error,
    loading: state.loading,
    toggle: state.toggle,
    totalPages: state.data?.totalPages,
    searchParams: state.data?.searchParams,
    sorting: state.data?.sorting,
    role: state.role,
    deal: state.deal,
    perPage: state?.data?.perPage,
    offers: state.data?.offers?.map((offer) => ({ ...offer, cargoId: offer?.searchedCargo?.id })),
  };
});
