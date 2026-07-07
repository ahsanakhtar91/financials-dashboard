import { useState } from 'react'
import Header from './components/Header'
import StatCard, { type StatCardProps } from './components/StatCard'
import data from './data/data.json'
import { getCompanySymbols } from './data/dataUtils'

const companySymbols = getCompanySymbols(data)

function App() {
  const [selectedSymbol, setSelectedSymbol] = useState(companySymbols[0])

  const statCardsData: StatCardProps[] = [
    {
      title: 'Total Assets',
      value: '$1,000,000',
      trend: '+10%',
      trendType: 'increase'
    },
    {
      title: 'Total Equity',
      value: '$500,000',
      trend: '-5%',
      trendType: 'decrease'
    },
    {
      title: 'Total Liabilities',
      value: '$200,000',
      trend: '+15%',
      trendType: 'increase'
    },
    {
      title: 'Cash & Equivalents',
      value: '$200,000',
      trend: '+15%',
      trendType: 'increase'
    }
  ]

  return (
    <div className='flex flex-col flex-1 items-center justify-center'>
      <Header
        companySymbols={companySymbols}
        selectedSymbol={selectedSymbol}
        onSymbolChange={setSelectedSymbol}
      />
      <div className='mt-8 w-full px-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
        {statCardsData.map((card, index) => (
          <StatCard key={index} {...card} />
        ))}
      </div>
    </div>
  )
}

export default App
