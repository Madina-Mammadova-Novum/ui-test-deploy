// import example from '@/store/entities/example/slice';

import { combineReducers } from '@reduxjs/toolkit';

import { fleets, user, search } from '@/store/entities';

export const reducer = combineReducers({
  user,
  fleets,
  search
});
