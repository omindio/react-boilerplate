import { Password } from '@boundedContext/user/profile/interfaces/password';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PasswordState {
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: PasswordState = {
  loading: false,
  error: null,
  success: null,
};

const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    passwordRequest: (state, action: PayloadAction<Password>) => {
      state.loading = true;
    },
    passwordSuccess: (state, action: PayloadAction<{ message: string }>) => {
      state.loading = false;
      state.success = action.payload.message;
      state.error = null;
    },
    passwordFailure: (state, action: PayloadAction<{ message: string }>) => {
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
  passwordRequest,
  passwordSuccess,
  passwordFailure,
  clearStatus,
} = passwordSlice.actions;

export default passwordSlice.reducer;
