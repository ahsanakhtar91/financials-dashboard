import { useMemo, useState } from 'react'
import type {
  FinancialRecord,
  SortDirection,
  SortableTableKey
} from '../data/dataTypes'
import { liabilitiesExceedAssets, toCurrencyLocale } from '../data/dataUtils'

type FilingsTableProps = {
  records: FinancialRecord[]
}

const tableColumns = [
  { key: 'fiscal_year', title: 'Fiscal Year', alignRight: false },
  { key: 'fiscal_quarter', title: 'Quarter', alignRight: false },
  { key: 'total_assets', title: 'Total Assets', alignRight: true },
  { key: 'total_liabilities', title: 'Total Liabilities', alignRight: true },
  { key: 'total_equity', title: 'Total Equity', alignRight: true },
  {
    key: 'cash_and_short_term_equivalents',
    title: 'Cash & Equivalents',
    alignRight: true
  },
  {
    key: 'long_term_debt_obligations',
    title: 'Long-Term Debt',
    alignRight: true
  }
] satisfies {
  key: SortableTableKey
  title: string
  alignRight: boolean
}[]

export function FilingsTable({ records }: FilingsTableProps) {
  const [sortBy, setSortBy] = useState<SortableTableKey>('fiscal_year')
  const [direction, setDirection] = useState<SortDirection>('desc')

  const sortedRecords = useMemo(() => {
    const sorted = [...records]

    sorted.sort((a, b) => {
      const aValue = a[sortBy] ?? 0
      const bValue = b[sortBy] ?? 0

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue
      }

      return direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue))
    })

    return sorted
  }, [records, sortBy, direction])

  function changeSort(column: SortableTableKey) {
    if (column === sortBy) {
      setDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortBy(column)
    setDirection('desc')
  }

  return (
    <div className='overflow-hidden rounded-xl border border-stone-300 bg-white shadow-sm transition hover:shadow-md'>
      <div className='border-b border-stone-100 px-4 py-3'>
        <div className='text-base font-bold text-stone-900'>Filing History</div>

        <div className='text-xs text-stone-400 mt-1'>
          {records.length} {records.length === 1 ? 'filing' : 'filings'} found
        </div>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-stone-100'>
              {tableColumns.map((column) => {
                const active = column.key === sortBy

                return (
                  <th
                    key={column.key}
                    onClick={() => changeSort(column.key)}
                    className={`cursor-pointer px-4 py-3 text-sm font-mono font-medium uppercase tracking-wide transition-colors hover:bg-stone-100 ${
                      column.alignRight ? 'text-right' : 'text-left'
                    } 
                    ${active ? 'text-shadow-black bg-stone-100' : 'text-stone-500 bg-stone-50/50'}`}
                  >
                    <div
                      className={`flex items-center gap-1.5 ${
                        column.alignRight ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {column.title}
                      {active && (
                        <span className='text-shadow-black'>
                          {direction === 'asc' ? '▲' : '▼'}
                        </span>
                      )}
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>

          <tbody>
            {sortedRecords.map((record, index) => {
              const warning = liabilitiesExceedAssets(record)

              return (
                <tr
                  key={`${record.fiscal_year}-${record.fiscal_quarter}-${index}`}
                  // When liabilities exceed assets, highlight the row in red to indicate a warning
                  className={`border-b border-stone-50 transition-colors ${
                    warning
                      ? 'bg-red-600/20 hover:bg-red-600/30'
                      : 'hover:bg-stone-50'
                  }`}
                >
                  <td className='px-4 py-3 text-sm font-medium text-stone-700'>
                    {record.fiscal_year}
                  </td>

                  <td className='px-4 py-3 text-sm text-stone-700'>
                    Q{record.fiscal_quarter}
                  </td>

                  <td className='px-4 py-3 text-right text-sm font-medium text-stone-700'>
                    {toCurrencyLocale(record.total_assets)}
                  </td>

                  <td className='px-4 py-3 text-right text-sm text-stone-700'>
                    <div className='flex items-center justify-end gap-1.5'>
                      {/* When liabilities exceed assets, display red warning icon next to the total liabilities value */}
                      {warning && <span className='text-red-600'>⚠</span>}
                      {toCurrencyLocale(record.total_liabilities)}
                    </div>
                  </td>

                  <td className='px-4 py-3 text-right text-sm font-medium text-stone-700'>
                    {toCurrencyLocale(record.total_equity)}
                  </td>

                  <td className='px-4 py-3 text-right text-sm text-stone-700'>
                    {toCurrencyLocale(record.cash_and_short_term_equivalents)}
                  </td>

                  <td className='px-4 py-3 text-right text-sm text-stone-700'>
                    {record.long_term_debt_obligations === null
                      ? '--'
                      : toCurrencyLocale(record.long_term_debt_obligations)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
