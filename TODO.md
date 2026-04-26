# Fix Search and Filter System

## Issues
1. Filters and sort not synchronized with URL params
2. SearchBar doesn't update when URL query changes
3. Backend missing brands filter support
4. PriceRange triggers premature updates

## Steps
- [x] Step 1: Update `useSearch.ts` to read/write filters and sort from/to URL params
- [x] Step 2: Fix `SearchBar.tsx` to sync internal state with `initialValue` prop changes
- [x] Step 3: Improve `PriceRange.tsx` to avoid premature filter updates
- [x] Step 4: Add `brands` filter to backend DTO (`search-products.dto.ts`)
- [x] Step 5: Add brand filtering logic to backend service (`products.service.ts`)
- [x] Step 6: Test and verify all changes work correctly

