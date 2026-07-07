import type { FinancialRecord } from './dataTypes'

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
