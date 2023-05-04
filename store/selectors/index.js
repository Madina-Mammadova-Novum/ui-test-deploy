import { createDraftSafeSelector } from '@reduxjs/toolkit';

export const sidebarSelector = ({ user }) => user?.params;

export const getSidebarSelector = createDraftSafeSelector(sidebarSelector, (state) => ({
  collapsed: state?.sidebarCollapsed,
  opened: state?.sidebarSubMenuOpened,
}));
