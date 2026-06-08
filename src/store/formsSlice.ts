import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BasicFormValues, FormSubmission, FormType } from '../types/forms';

interface FormsState {
  countries: string[];
  countriesError: string;
  isLoadingCountries: boolean;
  recentSubmissionId: string;
  submissions: FormSubmission[];
}

const initialState: FormsState = {
  countries: [],
  countriesError: '',
  isLoadingCountries: false,
  recentSubmissionId: '',
  submissions: [],
};

export const formsSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addFormSubmission: (
      state,
      action: PayloadAction<{ formType: FormType; values: BasicFormValues }>
    ) => {
      const newSubmission: FormSubmission = {
        id: crypto.randomUUID(),
        formType: action.payload.formType,
        createdAt: new Date().toISOString(),
        ...action.payload.values,
      };

      state.submissions = [newSubmission, ...state.submissions];
      state.recentSubmissionId = newSubmission.id;
    },
    clearRecentSubmission: (state) => {
      state.recentSubmissionId = '';
    },
    setCountries: (state, action: PayloadAction<string[]>) => {
      state.countries = action.payload;
    },
    setCountriesError: (state, action: PayloadAction<string>) => {
      state.countriesError = action.payload;
    },
    setCountriesLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoadingCountries = action.payload;
    },
  },
});

export const {
  addFormSubmission,
  clearRecentSubmission,
  setCountries,
  setCountriesError,
  setCountriesLoading,
} = formsSlice.actions;

export const formsReducer = formsSlice.reducer;
