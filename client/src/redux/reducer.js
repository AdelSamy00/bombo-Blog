import { combineReducers } from '@reduxjs/toolkit';
import UserSlice from './UserSlice.js';

const rootReducer = combineReducers({
  user: UserSlice,
});

export { rootReducer };
