import { describe, expect, it } from 'vitest';
import {
  addFormSubmission,
  clearRecentSubmission,
  formsReducer,
  setCountries,
  setCountriesError,
  setCountriesLoading,
} from './formsSlice';

const values = {
  name: 'Michael',
  age: 30,
  email: 'michael@test.com',
  gender: 'male',
  country: 'Serbia',
  password: 'Password1!',
  passwordConfirm: 'Password1!',
  avatar: 'data:image/png;base64,test',
  acceptedTerms: true,
};

describe('formsSlice', () => {
  it('adds form submission and remembers new card id', () => {
    const state = formsReducer(
      undefined,
      addFormSubmission({ formType: 'Uncontrolled', values })
    );

    expect(state.submissions).toHaveLength(1);
    expect(state.submissions[0].name).toBe('Michael');
    expect(state.recentSubmissionId).toBe(state.submissions[0].id);
  });

  it('clears recent submission id', () => {
    const stateWithSubmission = formsReducer(
      undefined,
      addFormSubmission({ formType: 'React Hook Form', values })
    );
    const state = formsReducer(stateWithSubmission, clearRecentSubmission());

    expect(state.recentSubmissionId).toBe('');
  });

  it('stores countries request state', () => {
    const loadingState = formsReducer(undefined, setCountriesLoading(true));
    const countriesState = formsReducer(
      loadingState,
      setCountries(['Germany', 'Serbia'])
    );
    const errorState = formsReducer(
      countriesState,
      setCountriesError('Unable to load countries.')
    );

    expect(loadingState.isLoadingCountries).toBe(true);
    expect(countriesState.countries).toEqual(['Germany', 'Serbia']);
    expect(errorState.countriesError).toBe('Unable to load countries.');
  });
});
