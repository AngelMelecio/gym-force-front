import React, { useEffect, useRef } from 'react'
import AbsScroll from '../../components/AbsScroll'
import { sleep } from '../../utils/global'
import { useState } from 'react'
import SwitchBtn from '../../components/Card/SwitchBtn'
import SpinBtn from '../../components/Card/SpinBtn'
import Card from '../../components/Card/Card'
import { MyIcons } from '../../constants/Icons'
import SearchBar from '../../components/SearchBar'

const dumyP = [
  { id: 1, nombre: 'Gym Regular', duracion: 30, precio: 350, tipo: 'paquete', isSelected: false },
  { id: 2, nombre: 'Spin Regular', duracion: 30, precio: 390, tipo: 'paquete', isSelected: false },
  { id: 3, nombre: 'Gym + Spin', duracion: 30, precio: 535, tipo: 'paquete', isSelected: false },
  { id: 4, nombre: 'Gym + Spin + Fun', duracion: 30, precio: 635, tipo: 'paquete', isSelected: false },
  { id: 5, nombre: 'Gym Visita', duracion: 1, precio: 50, tipo: 'paquete', isSelected: false },
  { id: 6, nombre: 'Spin Visita', duracion: 1, precio: 40, tipo: 'paquete', isSelected: false },

  { id: 7, nombre: 'Agua Ciel 1L', precio: 15, tipo: 'producto', cantidad: 0 },
  { id: 8, nombre: 'Proteina BirdMan 750g', precio: 1350, tipo: 'producto', cantidad: 0 },
  { id: 9, nombre: 'Barra Vainilla', precio: 55, tipo: 'producto', cantidad: 0 },
]

const CarritoPage = () => {

  const [productos, setProductos] = useState([])
  const [selectedType, setSelectedType] = useState('paquete')
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    async function fetch() {
      await sleep(2000)
      setProductos(dumyP)
    }
    fetch()
  }, [])

  const handleSelect = (id) => {
    setProductos(prev =>
      prev.map(p =>
        p.id === id ?
          { ...p, isSelected: !p.isSelected }
          : { ...p, isSelected: false }
      )
    )
  }
  const handleAdd = (id) => {
    setProductos(productos.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
  }
  const handleSubstract = (id) => {
    if (productos.find(p => p.id === id).cantidad === 0) return
    setProductos(productos.map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
  }

  return (
    <div className='flex flex-col w-full h-screen p-3'>
      <div className='bg-gray-300'>
        <div className='flex'>
          {[{ option: 'paquete', label: 'Paquetes' },
          { option: 'producto', label: 'Productos' }].map((c, i) =>
            <button
              key={"CAT_" + i}
              type='button'
              onClick={() => setSelectedType(c.option)}
              className={`px-5 py-2 border-b-2  ${selectedType === c.option ? 'border-b-blue-500 text-blue-600' : 'border-b-transparent text-gray-600'}`} >
              {c.label}
            </button>)}
        </div>
      </div>
      <div className='flex w-full h-full '>
        {/* Productos */}
        <div className='flex-grow sm:flex-[0.65] '>
          <AbsScroll vertical loading={!productos.length}>
            <div className="flex flex-wrap w-full pt-2 pl-2">
              <div className='flex justify-end w-full py-2 pr-2'>
                <SearchBar text={searchText} setText={setSearchText} />
              </div>
              {productos
                .filter(p => p.tipo === selectedType)
                .filter(p => p.nombre.toLowerCase().includes(searchText.toLowerCase()))
                .map((p, i) =>
                  <div key={i} className='w-1/2 p-2'>
                    <Card
                      title={p.nombre}
                      subtitle={`$${p.precio} ${p.tipo === 'paquete' ? ' / ' + p.duracion + ' días' : ''}`}
                      controls={
                        p.tipo === 'paquete' ?
                          <SwitchBtn
                            isSelected={p.isSelected}
                            onSelect={() => handleSelect(p.id)} />
                          :
                          <SpinBtn
                            cantidad={p.cantidad}
                            onAdd={() => handleAdd(p.id)}
                            onSubstract={() => handleSubstract(p.id)}
                          />
                      }
                    />
                  </div>
                )
              }
            </div>
          </AbsScroll>
        </div>
        {/* Carrito */}
        <div className='flex-[0.35] flex-col hidden sm:flex py-4'>
          <div className='flex flex-col h-full bg-white rounded-lg shadow-lg'>
            <AbsScroll vertical >
              <h1 className='p-4 text-lg text-blue-900'>Carrito</h1>
              <table className='w-full'>
                <tbody>
                  {productos.filter(p => p.tipo === 'paquete' && p.isSelected).map((p, i) =>
                    <tr className='h-10 ' >
                      <td className='text-sm text-start'>
                        <div className='relative flex flex-col py-2 pl-4'>
                          <p data-tooltip={p.nombre} className='text-base text-blue-900 ellipsis'> {p.nombre} </p>
                          <p className='text-sm font-[200]'> $ {p.precio}.00 </p>
                        </div>
                      </td>
                      <td >
                        <div className='flex items-center justify-end'>
                          <button
                            onClick={() => handleSelect(p.id)}
                            className='w-8 h-8 text-gray-800 duration-200 rounded-full total-center hover:text-white hover:bg-red-500 full active:opacity-70 active:duration-0'>
                            <MyIcons.Trash />
                          </button>
                        </div>
                      </td>
                    </tr>)
                  }
                  {productos.filter(p => p.tipo === 'producto' && p.cantidad).map((p, i) =>
                    <tr className='h-10 '>
                      <td className='text-sm text-start'>
                        <div className='relative flex flex-col py-2 pl-4'>
                          <p data-tooltip={p.nombre} className='text-base text-blue-900 ellipsis'>{p.nombre}</p>
                          <p className='text-sm font-[200]'>$ {p.precio * p.cantidad}.00</p>
                        </div>

                      </td>
                      <td >
                        <div className="flex items-center justify-end">
                          <SpinBtn
                            small
                            cantidad={p.cantidad}
                            onAdd={() => handleAdd(p.id)}
                            onSubstract={() => handleSubstract(p.id)}
                          />
                        </div>
                      </td>
                    </tr>)
                  }
                </tbody>
              </table>
            </AbsScroll >
            {productos.some(p => {
              if (p.tipo === 'producto')
                return p.cantidad > 0
              return p.isSelected
            }) &&

              <div className='flex flex-col p-4'>
                <p className='text-[1rem] text-orange-400'>
                  Total :
                </p>
                <p className='text-[1.5rem] text-orange-400 pb-5'>
                   ${productos.reduce((acum, p) => {
                    if (p.tipo === 'paquete') return acum + p.isSelected * p.precio
                    return acum + p.cantidad * p.precio
                  }, 0).toFixed(2) }
                </p>
                <button className='h-10 rounded-full btn-naranja'>
                  Realizar Venta
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default CarritoPage