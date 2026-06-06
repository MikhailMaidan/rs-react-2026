import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { BasicFormValues, FormSubmission, FormType } from '../types/forms';

interface FormsState {
  submissions: FormSubmission[];
}

const initialState: FormsState = {
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
    },
  },
});

export const { addFormSubmission } = formsSlice.actions;

export const formsReducer = formsSlice.reducer;
