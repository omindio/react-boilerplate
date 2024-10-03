import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PersonalDataState {
  name: string;
  loading: boolean;
  error: string | null;
}

const initialState: PersonalDataState = {
  name: '',
  loading: false,
  error: null,
};

const personalDataSlice = createSlice({
  name: 'personalData',
  initialState,
  reducers: {
    fetchPersonalDataRequest(state) {
      state.loading = true;
    },
    fetchPersonalDataSuccess(state, action: PayloadAction<{ name: string }>) {
      state.loading = false;
      state.name = action.payload.name;
    },
    fetchPersonalDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePersonalDataRequest(state, action: PayloadAction<{ name: string }>) {
      state.loading = true;
    },
    updatePersonalDataSuccess(state, action: PayloadAction<{ name: string }>) {
      state.loading = false;
      state.name = action.payload.name;
    },
    updatePersonalDataFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
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
