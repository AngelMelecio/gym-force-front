import React from 'react'


const DAYS = [
  { label: 'do.' },
  { label: 'lu.' },
  { label: 'ma.' },
  { label: 'mi.' },
  { label: 'ju.' },
  { label: 'vi.' },
  { label: 'sá.' },

]

const Calendar = ({ month, year, monthName, registros }) => {

  const mapDays = (mth, yr) => {

    if (mth === 13) mth = 1, yr++


    let firstDay = new Date(yr, mth).getDay()
    let daysInMonth = (new Date(yr, mth + 1).getTime()
      - new Date(yr, mth).getTime()) / (1000 * 60 * 60 * 24)

    let days = []
    let row = []
    let passFirst = false
    let count = 1;

    for (let i = 0; i < 42; i++) {
      if (firstDay === i)
        passFirst = true
      if (!passFirst)
        row.push("")
      else if (count > daysInMonth)
        row.push("")
      else
        row.push(count++)

      if ((i + 1) % 7 === 0) {
        days.push(row)
        row = []
      }
    }
    return days
  }


  return (
    <div className='relative calendar'>
      <table className=''>
        <caption>{monthName} {year}</caption>
        <thead>
          <tr>
            {DAYS.map((d, i) => <th key={`head1_${i}`}>{d.label}</th>)}
          </tr>
        </thead>
        <tbody>
          {mapDays(month, year).map((row, i) =>
            <tr key={`row1_${i}`}>
              {row.map((day, j) =>
                <td
                  className={`relative rounded-md cursor-default
                    ${registros[day] ? 'bg-orange-200 ' : ''}
                  `}
                  key={`day1_${j}`}
                >
                  <p data-tooltip={registros[day]}
                    className={`h-full total-center w-full
                      ${registros[day] ? 'ellipsis ' : ''}
                    `}
                  >
                    {day}
                  </p>
                </td>)}
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default Calendar