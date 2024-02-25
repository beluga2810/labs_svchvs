import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  schedule: [],
  isAdding: false,
  editedMember: null,
  userData: {
    username: '',
  },
};

const slice = createSlice({
  name: 'ingeneer',
  initialState,
  reducers: {
    addSchedule: (state, action) => {
      state.schedule.push(action.payload);
    },
    setAdding: (state, action) => {
      state.isAdding = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    clearUserData: (state) => {
      state.userData = initialState.userData;
    },
  },
});

export const { addSchedule, setAdding, setUserData, clearUserData } = slice.actions;
export default slice.reducer;