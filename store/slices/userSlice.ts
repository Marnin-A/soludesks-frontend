import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/types';

interface UserState {
  user: User | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    login: (state, action: PayloadAction<User>) => {
      state.user = { ...action.payload, isAuthenticated: true };
    },
    logout: state => {
      state.user = null;
    },
  },
});

export const { setUser, login, logout } = userSlice.actions;
export default userSlice.reducer;
