import { combineReducers, configureStore } from '@reduxjs/toolkit';
import slice from './slice';

const rootReducer = combineReducers({
    ingeneer: slice
})
const store = configureStore({
  reducer: rootReducer,
});

export default store;