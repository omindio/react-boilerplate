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
  success: string | null;
  initialAuthCheck: boolean;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  success: null,
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
      state.error = null;
    },
    loginFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.error = action.payload.message;
      state.success = null;
    },
    logoutRequest: (state) => {
      state.loading = true;
    },
    logoutSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.success = action.payload.message;
    },
    logoutFailure: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.error = action.payload.message;
      state.success = null;
    },
    checkAuthStatusRequest: (state) => {
      state.loading = true;
    },
    checkAuthStatusSuccess: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
      state.initialAuthCheck = false;
    },
    checkAuthStatusFailure: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = action.payload.message;
      state.initialAuthCheck = false;
    },
    clearInitialAuthCheck: (state) => {
      state.initialAuthCheck = true;
    },
    clearStatus: (state) => {
      state.error = null;
      state.success = null;
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
  clearStatus,
  clearInitialAuthCheck,
} = authSlice.actions;

export default authSlice.reducer;
