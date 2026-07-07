import type { FinancialRecord } from './dataTypes'
import data from './data.json'

// Filter records to only include those having valid total_assets
export const recordsWithStats: FinancialRecord[] = data.filter(
  (r) =>
    typeof r === 'object' &&
    r !== null &&
    'total_assets' in r &&
    typeof r.total_assets === 'number'
)

export function getCompanySymbols(records: FinancialRecord[]): string[] {
  // Using a Set to collect unique symbols
  const symbols = new Set<string>()
  records.forEach((r) => {
    if (Array.isArray(r.symbols)) {
      r.symbols.forEach((s) => symbols.add(s))
    }
  })
  return Array.from(symbols).sort()
}

// This helper returns all of the company records to be displayed in the data table
export function getRecordsForCompany(
  records: FinancialRecord[],
  symbol: string
): FinancialRecord[] {
  return records
    .filter((r) => Array.isArray(r.symbols) && r.symbols.includes(symbol))
    .sort((a, b) => {
      // Sort by fiscal year first, then by fiscal quarter
      if (a.fiscal_year !== b.fiscal_year) return a.fiscal_year - b.fiscal_year
      return a.fiscal_quarter - b.fiscal_quarter
    })
}

// This helper returns the most recent record to be displayed in the stat cards
export function getMostRecentRecord(
  records: FinancialRecord[]
): FinancialRecord | null {
  if (records.length === 0) return null
  // Already sorted above, so the last record will be the most recent
  return records[records.length - 1]
}

// Return value with commas and $ sign as $1,200,000
export function toCurrencyLocale(value?: number): string {
  return (
    value?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }) ?? '—'
  )
}

// Return value as $1.2M instead of $1,200,000
export function toCompactCurrencyLocale(value?: number): string {
  return (
    value?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 2,
      notation: 'compact'
    }) ?? '—'
  )
}

// Bonus task: used to highlight rows in the table where total liabilities exceed total assets
export function liabilitiesExceedAssets(record: FinancialRecord): boolean {
  if (!record.total_liabilities) return false
  return record.total_liabilities > (record.total_assets || 0)
}
