import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { userDetailsAdapter } from '@/adapters/user';

export const sidebarSelector = ({ user }) => user?.params;

export const getSidebarSelector = createDraftSafeSelector(sidebarSelector, (state) => {
  return {
    collapsed: state?.sidebarCollapsed,
    opened: state?.sidebarSubMenuOpened,
  };
});

export const userSelector = ({ user }) => user;

export const getUserDataSelector = createDraftSafeSelector(userSelector, (state) => {
  return {
    ...state,
    data: userDetailsAdapter({ data: state.data }),
  };
});

export const fleetsSelector = ({ fleets }) => fleets;
