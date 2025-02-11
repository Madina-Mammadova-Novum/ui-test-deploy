// import example from '@/store/entities/example/slice';

import { combineReducers } from '@reduxjs/toolkit';

import {
  auth,
  cargoVessel,
  chat,
  fixture,
  fleets,
  general,
  negotiating,
  notifications,
  offer,
  onSubs,
  positions,
  postFixture,
  preFixture,
  search,
  user,
} from '@/store/entities';

export const reducer = combineReducers({
  general,
  auth,
  user,
  positions,
  fleets,
  search,
  offer,
  negotiating,
  notifications,
  preFixture,
  chat,
  onSubs,
  postFixture,
  fixture,
  cargoVessel,
});
