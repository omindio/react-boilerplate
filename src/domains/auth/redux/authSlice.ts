import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  roles: string[];
  permissions: string[];
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (
      state,
      action: PayloadAction<{ email: string; password: string }>
    ) => {
      state.loading = true;
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    checkAuthStatus: (state) => {
      state.loading = true;
    },
    checkAuthStatusSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    checkAuthStatusFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
    },
    passwordRecoveryRequest: (
      state,
      action: PayloadAction<{ email: string }>
    ) => {
      state.loading = true;
    },
    passwordRecoverySuccess: (state) => {
      state.loading = false;
    },
    passwordRecoveryFailure: (
      state,
      action: PayloadAction<{ error: string }>
    ) => {
      state.error = action.payload.error;
      state.loading = false;
    },
    passwordUpdateRequest: (
      state,
      action: PayloadAction<{ token: string; newPassword: string }>
    ) => {
      state.loading = true;
    },
    passwordUpdateSuccess: (state) => {
      state.loading = false;
    },
    passwordUpdateFailure: (
      state,
      action: PayloadAction<{ error: string }>
    ) => {
      state.error = action.payload.error;
      state.loading = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFailure,
  logoutRequest,
  logoutSuccess,
  logoutFailure,
  checkAuthStatus,
  checkAuthStatusFailure,
  checkAuthStatusSuccess,
  passwordRecoveryRequest,
  passwordRecoverySuccess,
  passwordRecoveryFailure,
  passwordUpdateRequest,
  passwordUpdateSuccess,
  passwordUpdateFailure,
} = authSlice.actions;

export default authSlice.reducer;
