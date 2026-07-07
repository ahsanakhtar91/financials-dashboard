import React from 'react'

type CompanySelectorProps = {
  companySymbols: string[]
  selectedSymbol?: string
  onSymbolChange: (symbol: string) => void
}

const CompanySelector: React.FC<CompanySelectorProps> = ({
  companySymbols,
  selectedSymbol,
  onSymbolChange
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSymbolChange(event.target.value)
  }

  return (
    <div className='flex gap-2 flex-col items-center border border-stone-300 rounded-lg p-2'>
      <div className='text-xs font-mono'>Company</div>
      <select
        value={selectedSymbol ?? companySymbols[0] ?? ''}
        onChange={handleChange}
        className='rounded-lg border border-stone-300 bg-white px-3 py-1 text-sm text-stone-700 shadow-sm hover:shadow-md focus:outline-none'
      >
        {companySymbols.map((symbol) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CompanySelector
