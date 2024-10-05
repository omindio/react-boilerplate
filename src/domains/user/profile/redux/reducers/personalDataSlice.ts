import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalDataState {
  name: string;
  loading: boolean;
  error: string | null;
  success: string | null;
}

const initialState: PersonalDataState = {
  name: '',
  loading: false,
  error: null,
  success: null,
};

const personalDataSlice = createSlice({
  name: 'personalData',
  initialState,
  reducers: {
    fetchPersonalDataRequest(state) {
      state.loading = true;
      state.success = null;
    },
    fetchPersonalDataSuccess(state, action: PayloadAction<{ name: string }>) {
      state.loading = false;
      state.name = action.payload.name;
    },
    fetchPersonalDataFailure(
      state,
      action: PayloadAction<{ message: string }>
    ) {
      state.loading = false;
      state.error = action.payload.message;
    },
    updatePersonalDataRequest(state, action: PayloadAction<{ name: string }>) {
      state.loading = true;
      state.success = null;
    },
    updatePersonalDataSuccess(
      state,
      action: PayloadAction<{ message: string; data: { name: string } }>
    ) {
      state.loading = false;
      state.name = action.payload.data.name;
      state.success = action.payload.message;
    },
    updatePersonalDataFailure(
      state,
      action: PayloadAction<{ message: string }>
    ) {
      state.loading = false;
      state.error = action.payload.message;
      state.success = null;
    },
  },
});

export const {
  fetchPersonalDataRequest,
  fetchPersonalDataSuccess,
  fetchPersonalDataFailure,
  updatePersonalDataRequest,
  updatePersonalDataSuccess,
  updatePersonalDataFailure,
} = personalDataSlice.actions;

export default personalDataSlice.reducer;
