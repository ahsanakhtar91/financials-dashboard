import { useMemo, useState } from 'react'
import Header from './components/Header'
import StatCard, { type StatCardProps } from './components/StatCard'
import data from './data/data.json'
import {
  recordsWithStats,
  getCompanySymbols,
  getMostRecentRecord,
  getRecordsForCompany,
  toCompactCurrencyLocale,
  toCurrencyLocale
} from './data/dataUtils'

const companySymbols = getCompanySymbols(data)

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(companySymbols[0])

  const companyRecords = useMemo(
    () => getRecordsForCompany(recordsWithStats, selectedSymbol),
    [selectedSymbol]
  )

  const mostRecentRecord = useMemo(
    () => getMostRecentRecord(companyRecords),
    [companyRecords]
  )

  const statCardsData: StatCardProps[] = useMemo(
    () => [
      {
        title: 'Total Assets',
        value: mostRecentRecord?.total_assets
          ? toCompactCurrencyLocale(mostRecentRecord?.total_assets ?? 0)
          : '--',
        subtitle: mostRecentRecord?.total_assets
          ? toCurrencyLocale(mostRecentRecord?.total_assets ?? 0)
          : '-'
      },
      {
        title: 'Total Equity',
        value: mostRecentRecord?.total_equity
          ? toCompactCurrencyLocale(mostRecentRecord?.total_equity ?? 0)
          : '--',
        subtitle: mostRecentRecord?.total_equity
          ? toCurrencyLocale(mostRecentRecord?.total_equity ?? 0)
          : '—'
      },
      {
        title: 'Total Liabilities',
        value: mostRecentRecord?.total_liabilities
          ? toCompactCurrencyLocale(mostRecentRecord?.total_liabilities ?? 0)
          : '--',
        subtitle: mostRecentRecord?.total_liabilities
          ? toCurrencyLocale(mostRecentRecord?.total_liabilities ?? 0)
          : '—'
      },
      {
        title: 'Cash & Equivalents',
        value: mostRecentRecord?.cash_and_short_term_equivalents
          ? toCompactCurrencyLocale(
              mostRecentRecord?.cash_and_short_term_equivalents ?? 0
            )
          : '--',
        subtitle: mostRecentRecord?.cash_and_short_term_equivalents
          ? toCurrencyLocale(
              mostRecentRecord?.cash_and_short_term_equivalents ?? 0
            )
          : '—'
      }
    ],
    [mostRecentRecord]
  )

  return (
    <div className='flex flex-col flex-1 items-center justify-center gap-6'>
      <Header
        companySymbols={companySymbols}
        selectedSymbol={selectedSymbol}
        onSymbolChange={setSelectedSymbol}
      />
      {mostRecentRecord && (
        <div className='pl-6 text-sm self-start text-stone-600 font-mono'>
          <span>
            Showing data for company:{' '}
            <span className='font-semibold'>{selectedSymbol}</span>
          </span>
          <span className='mx-2'>|</span>
          <span>
            Most recent quarter:{' '}
            <span className='font-semibold'>
              Q{mostRecentRecord.fiscal_quarter} {mostRecentRecord.fiscal_year}
            </span>
          </span>
        </div>
      )}
      <div className='w-full px-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {statCardsData.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

export default App
