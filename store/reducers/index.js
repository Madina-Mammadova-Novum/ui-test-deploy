// import example from '@/store/entities/example/slice';

import { combineReducers } from '@reduxjs/toolkit';

import {
  chat,
  fleets,
  general,
  negotiating,
  notifications,
  offer,
  positions,
  preFixture,
  search,
  user,
} from '@/store/entities';

export const reducer = combineReducers({
  general,
  user,
  positions,
  fleets,
  search,
  offer,
  negotiating,
  notifications,
  preFixture,
  chat,
});
