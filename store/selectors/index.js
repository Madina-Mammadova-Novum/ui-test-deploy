import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { userDetailsAdapter } from '@/adapters/user';

export const sidebarSelector = ({ user }) => user?.params;
export const userSelector = ({ user }) => user;
export const vesselsSelector = ({ positions }) => positions;
export const fleetsSelector = ({ fleets }) => fleets;
export const searchSelector = ({ search }) => search;
export const offerSelector = ({ offer }) => offer;

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

export const getUserVesselsSelector = createDraftSafeSelector(vesselsSelector, (state) => {
  return {
    loading: state?.loading,
    error: state?.error,
    vessels: state?.data?.vessels,
  };
});
