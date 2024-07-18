import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';
import { getCookie } from '../../utils/cookie';

export const authUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    if (!getCookie('accessToken')) {
      return rejectWithValue(null);
    }

    const response = await getUserApi();

    if (!response.success) {
      return rejectWithValue(null);
    }

    return response;
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const response = await registerUserApi(userData);

    if (!response.success) {
      return rejectWithValue(null);
    }

    return response;
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { rejectWithValue }) => {
    const response = await logoutApi();

    if (!response.success) {
      return rejectWithValue(null);
    }

    return response;
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    const response = await loginUserApi(loginData);

    if (!response.success) {
      return rejectWithValue(null);
    }

    return response;
  }
);

export const updateUser = createAsyncThunk(
  'auth/updateUser',
  async (userData: TRegisterData, { rejectWithValue }) => {
    const response = await updateUserApi(userData);

    if (!response.success) {
      return rejectWithValue(null);
    }

    return response;
  }
);
