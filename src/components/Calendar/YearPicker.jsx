import React, { useState } from 'react'

const YearPicker = ({ year, setYear }) => {

  const [showYears, setShowYears] = useState(false)
  const [years, setYears] = useState(() => {
    let years = []
    let currentYear = new Date().getFullYear()
    for (let i = 7; i >= -1; i--) {
      years.push(currentYear - i)
    }
    return years
  })

  return (
    <div className='relative h-full'>
      <div className='flex w-16 h-full'>
        <input
          readOnly
          onBlur={() => setShowYears(false)}
          value={year}
          onClick={() => setShowYears(p => !p)}
          className='flex w-full h-full font-bold text-center text-blue-800 outline-none cursor-pointer bg-slate-100 text-md focus:border focus:border-orange-400 minimal-button' />
      </div>
      {showYears &&
        <div className='absolute left-0 z-10 flex flex-wrap p-1 bg-white rounded-md shadow-md w-44'>
          {years.map((yr, i) =>
            <button
              key={`yr_${i}`}
              onMouseDown={() => { setYear(yr); }}
              className={`w-1/3 py-1 px-2 text-sm text-gray-700 font-medium duration-150 rounded-md hover:bg-gray-100 total-center active:opacity-70 active:duration-0 ${yr === year ? 'border border-orange-400' : ''}`}>
              {yr}
            </button>)}
        </div>}
    </div>
  )
}

export default YearPicker