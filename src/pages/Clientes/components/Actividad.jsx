import React, { useEffect, useState } from 'react'
import { useClientes } from '../hooks/useClientes'
import MonthPicker from '../../../components/Calendar/MonthPicker'
import YearPicker from '../../../components/Calendar/YearPicker'
import Calendar from '../../../components/Calendar/Calendar'
import { MyIcons } from '../../../constants/Icons'
import AbsScroll from '../../../components/AbsScroll'
import { nuevaFecha } from '../../../constants/nuevaFecha'

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


const Actividad = ({
  cliente,
  suscripcion,
  fechaInicio,
  fechaFin,
}) => {

  const { getRegistros } = useClientes()

  const [registros, setRegistros] = useState([])
  const [currentMonthRegistros, setCurrentMonthRegistros] = useState([{}])
  const [nextMonthRegistros, setNextMonthRegistros] = useState([{}])
  const [currentMonthDays, setCurrentMonthDays] = useState([{}])
  const [nextMonthDays, setNextMonthDays] = useState([{}])
  const [year, setYear] = useState(new Date().getFullYear())
  const [month, setMonth] = useState(Number(new Date().getMonth()))

  const [loading, setLoading] = useState(false)


  async function fetchRegistros() {
    try {
      setLoading(true)
      const registros = await getRegistros({ cliente, suscripcion })

      setRegistros(registros)
    } catch (e) {
      console.log('Error al cargar registros:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRegistros()
  }, [cliente])

  useEffect(() => {

    // format registros of the current month and the next one

    let currentMonth = registros.filter(r => {
      let date = nuevaFecha(r.fecha);
      return date.getMonth() === month && date.getFullYear() === year
    }).reduce((acc, curr) => {
      let d = new Date(curr.fecha)
      let hour = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      return ({
        ...acc,
        [nuevaFecha(curr.fecha).getDate()]: hour
      })
    }, {})

    let nextMonth = registros.filter(r => {
      let date = nuevaFecha(r.fecha);
      return date.getMonth() === (month + 1) % 12 && date.getFullYear() === year + (month === 11 ? 1 : 0)
    }).reduce((acc, curr) => {
      let d = new Date(curr.fecha)
      let hour = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
      return ({
        ...acc,
        [nuevaFecha(curr.fecha).getDate()]: hour
      })
    }, {})

    setCurrentMonthRegistros(currentMonth)
    setNextMonthRegistros(nextMonth)

  }, [month, year, registros])

  useEffect(() => {
    //console.log(fechaInicio, fechaFin)
    let inicio = nuevaFecha(fechaInicio)
    let fin = nuevaFecha(fechaFin)

    let monthDays = {}
    let nextMonthDays = {}
    while (inicio < fin) {

      if (inicio.getMonth() === month && inicio.getFullYear() === year) {
        monthDays[inicio.getDate()] = true
      }
      if (inicio.getMonth() === (month + 1) % 12 && inicio.getFullYear() === year + (month === 11 ? 1 : 0)) {
        nextMonthDays[inicio.getDate()] = true
      }
      inicio.setDate(inicio.getDate() + 1)
    }
    setCurrentMonthDays(monthDays)
    setNextMonthDays(nextMonthDays)

  }, [fechaInicio, fechaFin, month, year])

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

        <Calendar
          monthName={MONTHS[month].name}
          month={month}
          year={year}
          registros={currentMonthRegistros}
          markedDays={currentMonthDays}
        />
        <Calendar
          monthName={MONTHS[(month + 1) % 12].name}
          month={month + 1}
          year={year}
          registros={nextMonthRegistros}
          markedDays={nextMonthDays}
        />

      </div>

    </div>

  )
}

export default Actividad