# Performance Optimization Report

## 1. Baseline Measurements (Unoptimized)

### Interaction A: Sort countries

- **Commit duration**: 4 ms
- **Render duration**: 501.9 ms
- **Screenshot**: ![Sort countries baseline](screenshots/baseline/sort_countries_by_population_ranked.png)

### Interaction B: Search countries

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **Screenshot**: ![Search countries baseline](./screenshots/baseline/search-countries.png)

### Interaction C: Change year

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **Screenshot**: ![Change year baseline](./screenshots/baseline/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **Screenshot**: ![Toggle column baseline](./screenshots/baseline/toggle-column.png)

---

## 2. Optimization Changes

Describe here **what** you optimized and **why**.  
Example:

- Added `useMemo` for filtered and sorted country list
- Wrapped `CountryRow` component with `React.memo`
- Used `useCallback` for event handlers (`handleSort`, `handleSearch`, etc.)
- Added proper `key` props to all list items
- Implemented virtualization using `react-window` for the countries table

---

## 3. Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **Screenshot**: ![Sort countries optimized](./screenshots/optimized/sort-countries.png)

### Interaction B: Search countries

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **Screenshot**: ![Search countries optimized](./screenshots/optimized/search-countries.png)

### Interaction C: Change year

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **Screenshot**: ![Change year optimized](./screenshots/optimized/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **Screenshot**: ![Toggle column optimized](./screenshots/optimized/toggle-column.png)

---

## 4. Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   |               |                |             |
| Search countries |               |                |             |
| Change year      |               |                |             |
| Toggle column    |               |                |             |
| **Average**      | \*\* \*\*     | \*\* \*\*      | ** %**      |
