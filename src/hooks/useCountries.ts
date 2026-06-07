import { useEffect, useState } from 'react';

interface CountryApiItem {
  name: {
    common: string;
  };
}

const countriesUrl = 'https://restcountries.com/v3.1/all?fields=name';

export const useCountries = () => {
  const [countries, setCountries] = useState<string[]>([]);
  const [isLoadingCountries, setIsLoadingCountries] = useState(false);
  const [countriesError, setCountriesError] = useState('');

  useEffect(() => {
    let isActive = true;

    const loadCountries = async () => {
      setIsLoadingCountries(true);
      setCountriesError('');

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
          setCountries(countryNames);
        }
      } catch {
        if (isActive) {
          setCountriesError('Unable to load countries.');
        }
      } finally {
        if (isActive) {
          setIsLoadingCountries(false);
        }
      }
    };

    loadCountries();

    return () => {
      isActive = false;
    };
  }, []);

  return {
    countries,
    countriesError,
    isLoadingCountries,
  };
};
