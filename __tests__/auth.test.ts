import {
    loginErrorResponse,
    loginResponse,
    logoutResponse,
    registerErrorResponse,
    registerResponse,
    userResponse,
    userUpdateErrorResponse, userUpdateResponse
} from '../__jest__/constants';
import {
  authUser,
  loginUser,
  logoutUser,
  registerUser,
  updateUser
} from '../src/services/thunks/authThunks';
import authSlice, { initialState } from '../src/services/slices/authSlice';
import * as cookie from '../src/utils/cookie';
import { afterEach } from '@jest/globals';

describe('authSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('При ожидании аутентификации', () => {
    const { isLoading, userData } = authSlice.reducer(initialState, {
      type: authUser.pending.type
    });
    expect(isLoading).toBe(true);
    expect(userData).toBe(null);
  });
  test('При ошибке в аутентификации', () => {
    const { isLoading, isAuthChecked } = authSlice.reducer(initialState, {
      type: authUser.rejected.type
    });
    expect(isLoading).toBe(false);
    expect(isAuthChecked).toBe(true);
  });
  test('При успешной аутентификации', () => {
    const { isLoading, userData } = authSlice.reducer(initialState, {
      type: authUser.fulfilled.type,
      payload: userResponse
    });
    expect(userData).toEqual(userResponse.user);
    expect(isLoading).toBe(false);
  });

  test('При ожидании регистрации', () => {
    const { isLoading, userData, registerError } = authSlice.reducer(
      initialState,
      {
        type: registerUser.pending.type
      }
    );
    expect(isLoading).toBe(true);
    expect(userData).toBe(null);
    expect(registerError).toEqual('');
  });
  test('При ошибке в регистрации', () => {
    const { isLoading, registerError } = authSlice.reducer(initialState, {
      type: registerUser.rejected.type,
      error: registerErrorResponse
    });
    expect(isLoading).toBe(false);
    expect(registerError).toEqual(registerErrorResponse.message);
  });
  test('При успешной регистрации', () => {
    const setCookieMock = jest.spyOn(cookie, 'setCookie').mockImplementation();
    Storage.prototype.setItem = jest.fn();
    const { isLoading, userData, isAuthChecked } = authSlice.reducer(
      initialState,
      {
        type: registerUser.fulfilled.type,
        payload: registerResponse
      }
    );

    expect(userData).toEqual(registerResponse.user);
    expect(isLoading).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(setCookieMock).toHaveBeenCalledWith(
      'accessToken',
      registerResponse.accessToken
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      registerResponse.refreshToken
    );
  });

  test('При ожидании logout', () => {
    const { isLoading } = authSlice.reducer(initialState, {
      type: logoutUser.pending.type
    });
    expect(isLoading).toBe(true);
  });
  test('При ошибке logout', () => {
    const { isLoading } = authSlice.reducer(initialState, {
      type: logoutUser.rejected.type
    });
    expect(isLoading).toBe(false);
  });
  test('При успешном logout', () => {
    const setCookieMock = jest.spyOn(cookie, 'setCookie').mockImplementation();
    Storage.prototype.removeItem = jest.fn();
    const { isLoading, userData } = authSlice.reducer(initialState, {
      type: logoutUser.fulfilled.type,
      payload: logoutResponse
    });
    expect(userData).toBe(null);
    expect(isLoading).toBe(false);
    expect(setCookieMock).toHaveBeenCalledWith('accessToken', '');
    expect(localStorage.removeItem).toHaveBeenCalledWith('refreshToken');
  });

  test('При ожидании login', () => {
    const { isLoading, userData, loginError } = authSlice.reducer(
      initialState,
      {
        type: loginUser.pending.type
      }
    );
    expect(isLoading).toBe(true);
    expect(userData).toBe(null);
    expect(loginError).toEqual('');
  });
  test('При ошибке login', () => {
    const { isLoading, loginError } = authSlice.reducer(initialState, {
      type: loginUser.rejected.type,
      error: loginErrorResponse
    });
    expect(isLoading).toBe(false);
    expect(loginError).toEqual(loginErrorResponse.message);
  });
  test('При успешном login', () => {
    const setCookieMock = jest.spyOn(cookie, 'setCookie').mockImplementation();
    Storage.prototype.setItem = jest.fn();
    const { isLoading, userData, isAuthChecked } = authSlice.reducer(
      initialState,
      {
        type: loginUser.fulfilled.type,
        payload: loginResponse
      }
    );
    expect(userData).toBe(loginResponse.user);
    expect(isLoading).toBe(false);
    expect(isAuthChecked).toBe(true);
    expect(setCookieMock).toHaveBeenCalledWith(
      'accessToken',
      loginResponse.accessToken
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'refreshToken',
      loginResponse.refreshToken
    );
  });

  test('При ожидании обновления профиля пользователя', () => {
    const { isLoading, updateError } = authSlice.reducer(initialState, {
      type: updateUser.pending.type
    });
    expect(isLoading).toBe(true);
    expect(updateError).toEqual('');
  });
  test('При ошибке обновления профиля пользователя', () => {
    const { isLoading, updateError } = authSlice.reducer(initialState, {
      type: updateUser.rejected.type,
      error: userUpdateErrorResponse
    });
    expect(isLoading).toBe(false);
    expect(updateError).toEqual(userUpdateErrorResponse.message);
  });
  test('При успешном обновлении профиля пользователя', () => {
    const { isLoading, userData } = authSlice.reducer(initialState, {
      type: updateUser.fulfilled.type,
      payload: userUpdateResponse
    });
    expect(userData).toEqual(userUpdateResponse.user);
    expect(isLoading).toBe(false);
  });
});
