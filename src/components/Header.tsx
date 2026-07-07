import React from 'react'
import CompanySelector from './CompanySelector'

type HeaderProps = {
  companySymbols: string[]
  selectedSymbol: string
  onSymbolChange: (symbol: string) => void
}

const Header: React.FC<HeaderProps> = ({
  companySymbols,
  selectedSymbol,
  onSymbolChange
}) => {
  return (
    <div className='flex flex-row w-full items-center justify-between border-b border-stone-400 bg-white px-20 py-2'>
      <div className='md:text-lg lg:text-xl font-mono text-stone-800'>
        Financials Dashboard
      </div>
      <CompanySelector
        companySymbols={companySymbols}
        selectedSymbol={selectedSymbol}
        onSymbolChange={onSymbolChange}
      />
    </div>
  )
}

export default Header
