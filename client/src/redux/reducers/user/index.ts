// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  user: ""
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    postUser(state, action) {
      state.user = action.payload.openItem;
    },
    getUser(state, action) {
      state.user = action.payload.openItem;
    },
  }
});

export default user.reducer;

export const { postUser } = user.actions;
