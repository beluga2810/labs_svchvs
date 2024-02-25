import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    schedule: [],
    isAdding: false,
    editedMember: null,
  };

  const slice = createSlice({
    name: 'ingeneer',
    initialState:{
        schedule: [],
        isAdding: false,
    },
    reducers: {
      addSchedule: (state, action) => {
        state.schedule.push(action.payload);
      },
      setAdding: (state, action) => {
        state.isAdding = action.payload;
      },

    },
  });

export const { addSchedule, setAdding} = slice.actions;
export default slice.reducer;