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
  success: boolean;
  initialAuthCheck: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: false,
  initialAuthCheck: true,
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
      state.success = true;
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.success = true;
    },
    logoutFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    checkAuthStatusRequest: (state) => {
      state.loading = true;
    },
    checkAuthStatusSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true;
      state.initialAuthCheck = false;
    },
    checkAuthStatusFailure: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload;
      state.success = false;
      state.initialAuthCheck = false;
    },
    forgotPasswordRequest: (
      state,
      action: PayloadAction<{ email: string; captchaToken: string }>
    ) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    forgotPasswordFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    resetPasswordRequest: (
      state,
      action: PayloadAction<{
        token: string;
        password: string;
        passwordConfirmation: string;
        email: string;
      }>
    ) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    resetPasswordFailure: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false;
    },
    clearInitialAuthCheck: (state) => {
      state.initialAuthCheck = true;
    },
    clearStatus: (state) => {
      state.error = null;
      state.success = false;
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
  checkAuthStatusRequest,
  checkAuthStatusFailure,
  checkAuthStatusSuccess,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearStatus,
  clearInitialAuthCheck,
} = authSlice.actions;

export default authSlice.reducer;
