import React from 'react'

export type StatCardProps = {
  title: string
  value: string | number
  trend?: string
  trendType?: 'increase' | 'decrease'
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  trend,
  trendType = 'increase'
}) => (
  <div className='rounded-2xl border border-stone-300 bg-white p-4 shadow-sm transition hover:shadow-lg'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='text-sm font-mono uppercase text-stone-500'>{title}</p>
        <p className='mt-2 text-2xl font-semibold text-stone-700'>{value}</p>
      </div>
      {trend ? (
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
            trendType === 'increase'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-rose-100 text-rose-700'
          }`}
        >
          {trend}
        </span>
      ) : null}
    </div>
  </div>
)

export default StatCard
