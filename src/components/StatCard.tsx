import React from 'react'

export type StatCardProps = {
  title: string
  value: string | number
  subtitle?: string
}

const StatCard: React.FC<StatCardProps> = ({ title, value, subtitle }) => (
  <div className='rounded-2xl border border-stone-300 bg-white p-4 shadow-sm transition hover:shadow-md'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm font-mono uppercase text-stone-500'>{title}</p>
        <p className='mt-2 text-lg md:text-2xl font-bold text-stone-700'>
          {value}
        </p>
      </div>
    </div>
    {subtitle ? (
      <p className='mt-2 text-xs font-mono text-stone-400'>{subtitle}</p>
    ) : null}
  </div>
)

export default StatCard
