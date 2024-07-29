import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  authUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../thunks/authThunks';
import { setCookie } from '../../utils/cookie';

interface TAuthState {
  isLoading: boolean;
  isAuthChecked: boolean;
  userData: TUser | null;
  loginError?: string;
  registerError?: string;
  updateError?: string;
}

export const initialState: TAuthState = {
  isLoading: false,
  isAuthChecked: false,
  userData: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  selectors: {
    isLoading: (state) => state.isLoading,
    isAuthChecked: (state) => state.isAuthChecked,
    user: (state) => state.userData,
    loginError: (state) => state.loginError,
    registerError: (state) => state.registerError,
    updateError: (state) => state.updateError
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
        state.userData = null;
      })
      .addCase(authUser.rejected, (state) => {
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = true;
        state.userData = action.payload.user;
      })
      .addCase(registerUser.pending, (state) => {
        state.userData = null;
        state.isLoading = true;
        state.registerError = '';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.error.message;
        state.isLoading = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = null;
        setCookie('accessToken', '');
        localStorage.removeItem('refreshToken');
      })
      .addCase(loginUser.pending, (state) => {
        state.userData = null;
        state.isLoading = true;
        state.loginError = '';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginError = action.error.message;
        state.isLoading = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
        setCookie('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.updateError = '';
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.updateError = action.error.message;
        state.isLoading = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.userData = action.payload.user;
        state.isLoading = false;
      });
  }
});

export const {
  isLoading,
  isAuthChecked,
  loginError,
  updateError,
  registerError,
  user
} = authSlice.selectors;

export default authSlice;
