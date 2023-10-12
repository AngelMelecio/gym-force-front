import React, { useEffect, useState } from 'react'
import { MyIcons } from '../../constants/Icons'
import MonthPicker from './MonthPicker'
import YearPicker from './YearPicker'

const MONTHS = [
  { id: 0, label: 'Ene', name: 'Enero' },
  { id: 1, label: 'Feb', name: 'Febrero' },
  { id: 2, label: 'Mar', name: 'Marzo' },
  { id: 3, label: 'Abr', name: 'Abril' },
  { id: 4, label: 'May', name: 'Mayo' },
  { id: 5, label: 'Jun', name: 'Junio' },
  { id: 6, label: 'Jul', name: 'Julio' },
  { id: 7, label: 'Ago', name: 'Agosto' },
  { id: 8, label: 'Sep', name: 'Septiembre' },
  { id: 9, label: 'Oct', name: 'Octubre' },
  { id: 10, label: 'Nov', name: 'Noviembre' },
  { id: 11, label: 'Dic', name: 'Diciembre' },
]

const DAYS = [
  { label: 'do.' },
  { label: 'lu.' },
  { label: 'ma.' },
  { label: 'mi.' },
  { label: 'ju.' },
  { label: 'vi.' },
  { label: 'sá.' },

]

const Calendar = () => {

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

  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(Number(new Date().getMonth()))
  //const [days, setDays] = useState([])

  const handleBackMonth = () => {
    if (month === 0) {
      setMonth(11)
      setYear(p => p - 1)
      return
    }
    setMonth(p => p - 1)
  }

  const handleNextMonth = () => {
    if (month === 11) {
      setMonth(0)
      setYear(p => p + 1)
      return
    }
    setMonth(p => p + 1)
  }

  useEffect(() => {
    //setmapDays(month, year)
  }, [year, month])

  return (
    <div className='flex flex-col h-full'>
      {/* Calendar Header */}
      <div className='flex justify-between px-5 py-2 border-b border-gray-300'>
        <div className='flex'>
          <MonthPicker
            MONTHS={MONTHS}
            month={month}
            setMonth={setMonth}
          />
          <div className='pl-2'>

          <YearPicker
            year={year}
            setYear={setYear}
          />
          </div>
        </div>
        <div className='flex'>
          <button
            onClick={handleBackMonth}
            className='w-8 h-8 total-center minimal-button'>
            <MyIcons.Left size="22px" />
          </button>
          <button
            onClick={handleNextMonth}
            className='w-8 h-8 ml-2 total-center minimal-button'>
            <MyIcons.Right size="22px" />
          </button>
        </div>
      </div>

      <div className='flex w-full h-full total-center'>
        <div className='relative calendar'>
          <table className=''>
            <caption>{MONTHS[month].name} {year}</caption>
            <thead>
              <tr>
                {DAYS.map((d, i) => <th key={`head1_${i}`}>{d.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {mapDays(month, year).map((row, i) => <tr key={`row1_${i}`}>
                {row.map((day, j) => <td key={`day1_${j}`}>
                  {day}
                </td>)}
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className='relative calendar'>
          <table className=''>
            <caption>{MONTHS[(month + 1) % 12].name} {year + ((month + 1) === 12 ? 1 : 0)}</caption>
            <thead>
              <tr>
                {DAYS.map((d, i) => <th key={`head1_${i}`}>{d.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {mapDays(month + 1, year).map((row, i) => <tr key={`row1_${i}`}>
                {row.map((day, j) => <td key={`day1_${j}`}>
                  {day}
                </td>)}
              </tr>)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Calendar