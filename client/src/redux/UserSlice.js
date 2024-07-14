import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  user: JSON.parse(window?.localStorage.getItem('user')) ?? {},
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      console.log(action.payload);
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage?.removeItem('token');
      localStorage?.removeItem('user');
    },
  },
});
export default userSlice.reducer;

export function SetUser(user) {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.setUser(user));
  };
}
export function Logout() {
  return (dispatch, getState) => {
    dispatch(userSlice.actions.logout());
  };
}
