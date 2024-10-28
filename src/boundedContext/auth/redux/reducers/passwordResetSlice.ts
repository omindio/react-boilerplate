import { PasswordReset } from '@boundedContext/auth/interfaces/passwordReset';
import { RequestPasswordReset } from '@boundedContext/auth/interfaces/requestPasswordReset';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordResetState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: PasswordResetState = {
  loading: false,
  error: null,
  success: null,
};

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    passwordResetRequest: (
      state,
      action: PayloadAction<RequestPasswordReset>
    ) => {
      state.loading = true;
    },
    passwordResetSuccess: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.loading = false;
      state.success = action.payload.message;
      state.error = null;
    },
    passwordResetFailure: (
      state,
      action: PayloadAction<{ message: string }>
    ) => {
      state.error = action.payload.message;
      state.loading = false;
      state.success = null;
    },
    resetPasswordRequest: (state, action: PayloadAction<PasswordReset>) => {
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
  passwordResetRequest,
  passwordResetSuccess,
  passwordResetFailure,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailure,
  clearStatus,
} = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
