import { combineReducers } from '@reduxjs/toolkit';

// import example from '@/store/entities/example/slice';
import signup from '@/store/entities/signup/slice';
import system from '@/store/entities/system/slice';

export default combineReducers({ system, signup });
