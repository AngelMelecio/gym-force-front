import React, { useEffect, useRef } from 'react'
import AbsScroll from '../../components/AbsScroll'
import { sleep } from '../../utils/global'
import { useState } from 'react'
import SwitchBtn from '../../components/Card/SwitchBtn'
import SpinBtn from '../../components/Card/SpinBtn'
import Card from '../../components/Card/Card'
import { MyIcons } from '../../constants/Icons'
import SearchBar from '../../components/SearchBar'
import { useSuscripciones } from '../Suscripciones/hooks/useSuscripciones'
import { useProductos } from '../Productos/hooks/useProductos'
import ClientSelector from '../../components/inputs/ClientSelector'
import { useClientes } from '../Clientes/hooks/useClientes'
import Modal from '../../components/Modal'
import { useAuth } from '../../context/authContext'
import { useCarrito } from './hooks/CarritoContext'

const CarritoPage = () => {

  const { notify } = useAuth()
  const { purchase } = useCarrito()
  const { session } = useAuth()

  const { getAll: getSubs } = useSuscripciones()
  const { getAll: getProductos } = useProductos()
  const { getAll: getClientes } = useClientes()

  const [client, setClient] = useState(null)
  const [clients, setClients] = useState([])
  const [articulos, setArticulos] = useState([])
  const [selectedType, setSelectedType] = useState('paquete')
  const [searchText, setSearchText] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    fetchArticles()
    fetchClients()
  }, [])

  async function fetchArticles() {
    try {
      setLoading(p => ({ ...p, articles: true }))
      let subs = await getSubs()
      let prodcuts = await getProductos()
      setArticulos([...prodcuts, ...subs])
    } catch (e) {
      console.log('Error al cargar Articulos:', e)
    } finally {
      setLoading(p => ({ ...p, articles: false }))
    }
  }

  async function fetchClients() {
    try {
      setLoading(p => ({ ...p, clientes: true }))
      let clientes = await getClientes()
      setClients(clientes)
    } catch (e) {
      console.log('Error al cargar clientes:', e)
    } finally {
      setLoading(p => ({ ...p, clientes: false }))
    }
  }

  const handleSelect = (id) => {
    setArticulos(prev =>
      prev.map(p =>
        p.id === id ?
          { ...p, isSelected: !p.isSelected }
          : { ...p, isSelected: false }
      )
    )
  }
  const handleAdd = (id) => {
    setArticulos(articulos.map(p => p.id === id ? { ...p, cantidad: p.cantidad + 1 } : p))
  }
  const handleSubstract = (id) => {
    if (articulos.find(p => p.id === id).cantidad === 0) return
    setArticulos(articulos.map(p => p.id === id ? { ...p, cantidad: p.cantidad - 1 } : p))
  }

  const handleRealizarVenta = async () => {
    try {
      setLoading(p => ({ ...p, venta: true }))
      let prdcs = articulos.filter(a => a.tipo === 'producto' && a.cantidad)
        .map(p => ({ idProducto: p.idProducto, cantidad: p.cantidad }))
      let scrpt = articulos.filter(a => a.tipo === 'paquete' && a.isSelected)
        .map(s => ({ idSuscripcion: s.idSuscripcion }))[0]

      purchase({ productos: prdcs || [], suscripcion: scrpt || null })

    } catch (e) {
      notify(e.message, true)
    } finally {
      setLoading(p => ({ ...p, venta: false }))
      setShowModal(false)
    }
  }

  const getTotal = () => {
    return articulos.reduce((acum, p) => {
      if (p.tipo === 'paquete') return acum + (p.isSelected * p.precio || 0)
      return acum + p.cantidad * p.precio
    }, 0).toFixed(2)
  }

  return (
    <>
      <div className='flex flex-col w-full h-screen p-3 bg-neutral-100'>
        {/* Header */}
        <div className='flex items-center justify-between '>
          <div className='flex w-2/3 border-b-2 border-b-slate-300'>
            { // Tabs
              [{ option: 'paquete', label: 'Paquetes' },
              { option: 'producto', label: 'Productos' }].map((c, i) =>
                <button
                  key={"CAT_" + i}
                  type='button'
                  onClick={() => setSelectedType(c.option)}
                  className={`px-5 py-2 border-b-2 font-bold duration-100 ${selectedType === c.option ? 'border-b-blue-500 text-blue-600' : 'border-b-transparent text-gray-500'}`} >
                  {c.label}
                </button>)}
          </div>
          <div>
            <ClientSelector
              name="cliente"
              client={client}
              setClient={setClient}
              placeholder="Seleccione Cliente"
              options={clients?.map(c => (
                { label: c.nombre, value: c.idCliente }
              ))}
            />
          </div>
        </div>
        <div className='flex w-full h-full '>
          {/* Productos */}
          <div className='flex-grow sm:flex-[0.65] '>
            <AbsScroll vertical loading={loading.articles}>
              <div className="flex flex-wrap w-full pt-2">
                <div className='flex justify-end w-full py-2 pr-2'>
                  <SearchBar text={searchText} setText={setSearchText} />
                </div>
                {articulos
                  .filter(p => p.tipo === selectedType)
                  .filter(p => p.nombre.toLowerCase().includes(searchText.toLowerCase()))
                  .map((p, i) =>
                    <div key={`ART_${i}`} className='w-1/2 p-2'>
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
                    {// Paquete Seleccionado 
                      articulos.filter(p => p.tipo === 'paquete' && p.isSelected).map((p, i) =>
                        <tr key={`CARR_${i}`} className='h-10 ' >
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
                    {// Productos Seleccionados
                      articulos.filter(p => p.tipo === 'producto' && p.cantidad).map((p, i) =>
                        <tr
                          key={`PROD_${i}`}
                          className='h-10 '>
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
              {articulos.some(p => {
                if (p.tipo === 'producto')
                  return p.cantidad > 0
                return p.isSelected
              }) &&
                <div className='flex flex-col p-4'>
                  <p className='pl-1 text-[1.4rem] text-orange-400'>
                    Total :
                  </p>
                  <p className='pl-1 text-[2rem] font-bold text-orange-400 pb-3'>
                    ${getTotal()}
                  </p>
                  <button
                    onClick={() => setShowModal(true)}
                    className='h-10 rounded-full btn-naranja'>
                    Realizar Venta
                  </button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
      {showModal &&
        <Modal
          image={<MyIcons.CartCheck size="37px" className='text-emerald-500' />}
          isDelete={false}
          title="Confirmar Venta"
          info={`Haz clic en "confirmar" para realizar la venta`}
          onClose={() => setShowModal(false)}
          onCancel={() => setShowModal(false)}
          onConfirm={handleRealizarVenta}
          loading={loading.venta}
        />

      }
    </>
  )
}

export default CarritoPage