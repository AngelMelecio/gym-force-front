import React, { useState } from 'react'


const MonthPicker = ({ MONTHS, month, setMonth }) => {

  const [showMonths, setShowMonths] = useState(false)

  return (
    <div className='relative h-full'>
      <div className='flex h-full w-28'>
        <input
          readOnly
          onBlur={() => setShowMonths(false)}
          value={MONTHS[month]?.name}
          onClick={() => setShowMonths(p => !p)}
          className='flex w-full h-full font-bold text-center text-blue-800 outline-none cursor-pointer bg-slate-100 text-md focus:border focus:border-orange-400 minimal-button' />
      </div>
      {showMonths &&
        <div className='absolute left-0 z-10 flex flex-wrap w-40 p-1 bg-white rounded-md shadow-md'>
          {MONTHS.map((mth, i) =>
            <button
              key={`mth_${i}`}
              onMouseDown={() => { setMonth(mth.id); }}
              className={`w-1/4 p-1 text-sm font-medium duration-150 rounded-md hover:bg-gray-100 total-center active:opacity-70 active:duration-0 ${mth.id === month ? 'border border-orange-400' : ''}`}>
              {mth.label}
            </button>)}
        </div>}
    </div>
  )
}

export default MonthPicker