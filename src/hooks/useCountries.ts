import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCountries,
  setCountriesError,
  setCountriesLoading,
} from '../store/formsSlice';
import type { AppDispatch, RootState } from '../store';

interface CountryApiItem {
  name: {
    common: string;
  };
}

const countriesUrl = 'https://restcountries.com/v3.1/all?fields=name';

export const useCountries = () => {
  const dispatch = useDispatch<AppDispatch>();
  const countries = useSelector((state: RootState) => state.forms.countries);
  const countriesError = useSelector(
    (state: RootState) => state.forms.countriesError
  );
  const isLoadingCountries = useSelector(
    (state: RootState) => state.forms.isLoadingCountries
  );

  useEffect(() => {
    let isActive = true;

    const loadCountries = async () => {
      if (countries.length > 0) {
        return;
      }

      dispatch(setCountriesLoading(true));
      dispatch(setCountriesError(''));

      try {
        const response = await fetch(countriesUrl);

        if (!response.ok) {
          throw new Error('Countries request failed.');
        }

        const data = (await response.json()) as CountryApiItem[];
        const countryNames = data
          .map((country) => country.name.common)
          .sort((firstCountry, secondCountry) =>
            firstCountry.localeCompare(secondCountry)
          );

        if (isActive) {
          dispatch(setCountries(countryNames));
        }
      } catch {
        if (isActive) {
          dispatch(setCountriesError('Unable to load countries.'));
        }
      } finally {
        if (isActive) {
          dispatch(setCountriesLoading(false));
        }
      }
    };

    loadCountries();

    return () => {
      isActive = false;
    };
  }, [countries.length, dispatch]);

  return {
    countries,
    countriesError,
    isLoadingCountries,
  };
};
