// import example from '@/store/entities/example/slice';

import { combineReducers } from '@reduxjs/toolkit';

import { fleets, general, positions, search, user } from '@/store/entities';

export const reducer = combineReducers({
  general,
  user,
  positions,
  fleets,
  search,
});
