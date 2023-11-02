import React, { useEffect, useRef, useState } from 'react'
import { MyIcons } from '../../constants/Icons'
import { useClientes } from '../../pages/Clientes/hooks/useClientes'

const ClientSelector = ({ name, client, setClient, ...props }) => {

  const inptRef = useRef(null)

  const { getAll: getClientes } = useClientes()

  const [clientName, setClientName] = useState("")
  const [options, setOptions] = useState([])

  const [loading, setLoading] = useState(false)
  const [showOpts, setShowOpts] = useState(false)


  async function fetchClients() {
    try {
      setLoading(true)
      let clientes = await getClientes()
      setOptions(clientes.map(c => (
        { label: `${c.nombre} ${c.apellidos}`, value: c.idCliente }
      )))
    } catch (e) {
      console.log('Error al cargar clientes:', e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchClients()
  }, [])

  useEffect(() => {
    if (!client) setClientName("")
  }, [client])

  useEffect(() => {
    if (client) {
      let c = options.find(o => o.value === client)
      if (c)
        setClientName(c.label)
    }
  }, [options])

  const handleOptClick = (e, option) => {
    e.preventDefault()
    inptRef.current.blur()
    setClientName(option.label)
    setClient(option.value)
  }

  const handleBlur = e => {
    if (!client)
      setClientName("")
    setShowOpts(false)
  }

  const matchingOptions = () => {
    return options?.filter(o =>
      o.label?.trim().toLowerCase()
        .includes(clientName?.trim().toLowerCase()))
  }

  return (

    <div className="relative flex w-full">

      {/* Client Icon */}
      <div className={`absolute top-0 left-0 w-12 h-full rounded-l-full pointer-events-none total-center ${client ? "text-blue-500" : "text-gray-400"}`}>
        <MyIcons.Profile size="21px" className={`z-10 duration-200`} />
      </div>

      {/* Main Input */}
      <div className={`relative flex items-center flex-1 `}>
        <input
          autoComplete='off'
          ref={inptRef}
          id={name}
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onBlur={handleBlur}
          onFocus={(e) => { setShowOpts(true); e.target.select() }}
          className={`w-full cursor-pointer  pr-6 pl-11 h-10 text-lg border-2 rounded-l-full outline-none  duration-200 font-medium appearance-none focus:border-blue-500
                        ${client ? "border-blue-500 text-blue-500" : "border-gray-300 text-gray-500"}`}
          {...props}
        />
        {/* Arrow Icon */}
        <div className='absolute w-5 h-5 text-gray-500 pointer-events-none right-1 total-center'>
          {!showOpts ? <MyIcons.Down size="20px" /> : <MyIcons.Up size="20px" />}
        </div>
      </div>

      {/* Right Button */}
      <button
        type="button"
        onClick={() => {
          setClient(null)
          setClientName("")
        }}
        className={`w-10 h-10 ml-1 text-gray-400 duration-100 bg-white border-2 border-gray-300 rounded-r-full total-center active:opacity-70 active:duration-0
                    ${client ? "hover:border-red-500 hover:text-red-500" : "hover:border-orange-300 hover:text-orange-300"}`}>
        {client ?
          <MyIcons.Cancel size="19px" className='mr-1' /> :
          <MyIcons.FingerPrint size="21px" className='mr-1' />}
      </button>
      {/* Option List */}
      {showOpts &&
        <ul className="absolute z-10 w-full mt-1 duration-200 bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-md top-full">
          {matchingOptions().map((option, index) => (
            <li
              key={index}
              className="px-4 py-2 duration-200 cursor-pointer hover:bg-gray-200"
              onMouseDown={(e) => handleOptClick(e, option)}>
              {option.label}
            </li>
          ))}
        </ul>
      }
    </div>

  )
}

export default ClientSelector