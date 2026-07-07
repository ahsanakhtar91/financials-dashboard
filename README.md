This app is deployed to **Vercel**. I have also recorded a **Loom video** where I walk through the core functionality of the app, along with some highlights of the codebase.

- 🚀 **Live App URL**: **https://financials-dashboard-react.vercel.app**

- 📹 **Loom Walk‑through video**: **https://www.loom.com/share/583c33491d304b86a9a660c07c87719a**

## Component structure

- `src/App.tsx`
  - app entry point, does the simulated async loading, the data selection, renders all components like `Header`, `StatCard`, and `FilingsTable`

- `src/components/Header.tsx`
  - layout wrapper for the page header
  - delegates company selection to `CompanySelector`

- `src/components/CompanySelector.tsx`
  - separate reusable dropdown component
  - responsible only for rendering the select input (showing all company symbols) and propagating symbol changes
  - can be improved by introduing filtering on top (an input field for the user to type and search for desired company symbol)

- `src/components/StatCard.tsx`
  - small reusable card component for displaying a single summary metric from the most recent filing record 
  - they are rendered using **css grid** (4-cols on laptop, 2-cols on tablet, mobile 1-col on mobile)
  - used for the dashboard key metrics: total assets, total equity, total liabilities, and cash

- `src/components/FilingsTable.tsx`
  - table component that displays the all filings of selected company
  - keeps the table logic isolated from the page layout (sorting, etc.)

- `src/data/dataUtils.ts`
  - contains helper functions for filtering records, getting most recent data, formatting currency, etc.

## Implementation summary

This is a small `React + TypeScript + Tailwind` dashboard built around the provided `src/data/data.json` data.

- `App.tsx` is the top-level shell. It keeps the selected company in state, simulates async loading with `setTimeout`, and renders the summary cards and filings table.
- The company dropdown (`CompanySelector`) is built from unique `symbols` in the dataset, so it only shows companies that actually exist in the data.
- When a company (symbol) is selected, the app filters the filings by symbol and picks the most recent filing record for the stat cards.
- The stat cards show the most recent filing record data as `total_assets`, `total_equity`, `total_liabilities`, and `cash_and_short_term_equivalents` values for the selected company.
- The `FilingsTable` is responsible to render all of the filing records found for the selected company.
- The `FilingsTable` supports sorting (asc/desc) on each of its columns (by tapping the headings).
- There is an empty state for both the stat cards and the table when a company has no records.
- The app is fully responsive and works on desktop, tablet, and mobile widths.
- Warning/alert logic for liabilities exceeding assets is implemented and highlights such filing record in the data table.
- Dataset types live in `src/types/financials.ts` with always-present keys on the top (used in the code) and optional ones below (un-used in the code).
- Utility helpers like `getCompanySymbols`, `getRecordsForCompany`, and `getMostRecentRecord` as well as currency related helpers live in `src/data/dataUtils.ts`.

I also explained the similar flow in my [Loom walkthrough video](https://www.loom.com/share/583c33491d304b86a9a660c07c87719a).