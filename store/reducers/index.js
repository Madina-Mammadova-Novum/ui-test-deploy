// import example from '@/store/entities/example/slice';

import { combineReducers } from '@reduxjs/toolkit';

import { fleets, offer, positions, search, user } from '@/store/entities';

export const reducer = combineReducers({
  user,
  positions,
  fleets,
  search,
  offer,
});
