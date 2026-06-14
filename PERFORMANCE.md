# Performance Optimization Report

## 1. Baseline Measurements (Unoptimized)

### Interaction A: Sort countries

- **Commit duration**: ~4 s
- **Render duration**: 501.9 ms
- **Screenshot**: ![Sort countries baseline](screenshots/baseline/interactionA/sort_countires_by_population_flamegraphs.png)

### Interaction B: Search countries

- **Commit duration**: ~3 s
- **Render duration**: 224.9 ms
- **Screenshot**: ![Baseline Search](screenshots/baseline/interactionB/united_flamegraphs.png)

### Interaction C: Change year

- **Commit duration**: ~4.4 s
- **Render duration**: 561 ms
- **Screenshot**: ![Baseline Change Year](screenshots/baseline/interactionC/year_flamegraphs.png)

### Interaction D: Toggle column

- **Commit duration**: ~2.1 s
- **Render duration**: 578.2 ms
- **Screenshot**: ![Baseline Toggle Column](screenshots/baseline/interactionD/column_flamegraphs.png)

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
