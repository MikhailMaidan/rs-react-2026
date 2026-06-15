import { memo, useCallback, useMemo, useState, type UIEvent } from 'react';
import type { Country } from '../../types';
import { CountryCard } from '../country-card/country-card';
import { getPopulationForYear, createYearDataMap } from '../../utils/data-transformers';

import styles from './country-list.module.css';

const VIEWPORT_HEIGHT = 720;
const OVERSCAN_COUNT = 2;
const CARD_BASE_HEIGHT = 146;
const TABLE_ROW_HEIGHT = 38;

type CountryListProps = {
  countries: Country[];
  searchQuery: string;
  selectedColumns: string[];
  selectedRegion: string;
  selectedYear: number;
  sortField: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onYearChange: (year: number) => void;
};

export const CountryList = memo(function CountryList({
  countries,
  searchQuery,
  selectedColumns,
  selectedRegion,
  selectedYear,
  sortField,
  sortOrder,
}: CountryListProps) {
  const [scrollTop, setScrollTop] = useState(0);

  const filteredCountries = useMemo(() => {
    const normalizedSearchQuery = searchQuery.toLowerCase();

    return countries
      .filter((country) => {
        const matchesSearch = country.id.toLowerCase().includes(normalizedSearchQuery);
        const matchesRegion =
          !selectedRegion || country.data.some((yearData) => yearData.region === selectedRegion);
        return matchesSearch && matchesRegion;
      })
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' ? a.id.localeCompare(b.id) : b.id.localeCompare(a.id);
        }

        const popA = getPopulationForYear(createYearDataMap(a.data), selectedYear) || 0;
        const popB = getPopulationForYear(createYearDataMap(b.data), selectedYear) || 0;
        return sortOrder === 'asc' ? popA - popB : popB - popA;
      });
  }, [countries, searchQuery, selectedRegion, selectedYear, sortField, sortOrder]);

  const rowHeight = CARD_BASE_HEIGHT + selectedColumns.length * TABLE_ROW_HEIGHT;
  const totalHeight = filteredCountries.length * rowHeight;
  const viewportHeight = Math.min(VIEWPORT_HEIGHT, totalHeight);
  const maximumScrollTop = Math.max(totalHeight - viewportHeight, 0);
  const effectiveScrollTop = Math.min(scrollTop, maximumScrollTop);
  const startIndex = Math.max(0, Math.floor(effectiveScrollTop / rowHeight) - OVERSCAN_COUNT);
  const endIndex = Math.min(
    filteredCountries.length,
    Math.ceil((effectiveScrollTop + viewportHeight) / rowHeight) + OVERSCAN_COUNT
  );

  const visibleCountries = useMemo(
    () => filteredCountries.slice(startIndex, endIndex),
    [endIndex, filteredCountries, startIndex]
  );

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    setScrollTop(event.currentTarget.scrollTop);
  }, []);

  return (
    <div
      className={styles.countryList}
      style={{ height: viewportHeight }}
      onScroll={handleScroll}
      role="list"
      aria-label="Countries"
    >
      <div className={styles.virtualContent} style={{ height: totalHeight }}>
        {visibleCountries.map((country, visibleIndex) => {
          const countryIndex = startIndex + visibleIndex;

          return (
            <div
              key={country.id}
              className={styles.virtualRow}
              style={{
                height: rowHeight,
                transform: `translateY(${countryIndex * rowHeight}px)`,
              }}
              role="listitem"
              aria-posinset={countryIndex + 1}
              aria-setsize={filteredCountries.length}
            >
              <CountryCard
                country={country}
                selectedYear={selectedYear}
                selectedColumns={selectedColumns}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
});
