import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ForgotPasswordState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: ForgotPasswordState = {
  loading: false,
  error: null,
  success: null,
};

const forgotPasswordSlice = createSlice({
  name: 'forgotPassword',
  initialState,
  reducers: {
    forgotPasswordRequest: (
      state,
      action: PayloadAction<{ email: string; captchaToken: string }>
    ) => {
      state.loading = true;
    },
    forgotPasswordSuccess: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.success = action.payload.message;
      state.error = null;
    },
    forgotPasswordFailure: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.error = action.payload.message;
      state.loading = false;
      state.success = null;
    },
    resetPasswordRequest: (
      state,
      action: PayloadAction<{
        token: string;
        newPassword: string;
        confirmPassword: string;
        email: string;
      }>
    ) => {
      state.loading = true;
    },
    resetPasswordSuccess: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.success = action.payload.message;
      state.error = null;
    },
    resetPasswordFailure: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.error = action.payload.message;
      state.loading = false;
      state.success = null;
    },
    clearStatus: (state) => {
      state.error = null;
      state.success = null;
      state.loading = false;
    },
  },
});

export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearStatus,
} = forgotPasswordSlice.actions;

export default forgotPasswordSlice.reducer;
