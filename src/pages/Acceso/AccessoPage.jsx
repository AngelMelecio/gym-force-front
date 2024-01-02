import React, { useRef, useState } from 'react'
import Modal from '../../components/Modal'
import { MyIcons } from '../../constants/Icons'
import Rayas_g1 from '../../assets/rayas_g1'
import Fp_logo from '../../assets/fp-logo'
import GymLogoShadow from '../../assets/GymLogoShadow.svg'
import Reloj from '../../components/Reloj'
import Rayas_g2 from '../../assets/rayas_g2'
import { sleep } from '../../utils/global'
import { useAcceso } from './hooks/useAcceso'
import { useAuth } from '../../context/authContext'
import StatusModal from './components/StatusModal'
import ClientSelector from '../../components/inputs/ClientSelector'


const AccessoPage = () => {

  const pinRef = useRef()

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState(null)
  const [cliente, setCliente] = useState(null)

  const { session } = useAuth()
  const { register } = useAcceso()

  const handleShowStatus = async (data) => {
    setStatus(data)
    await sleep(5000)
    setStatus(null)
  }

  const handleRegister = async ({ pin = null, idCliente = null }) => {
    try {
      setLoading(true)

      let {
        image,
        message,
        info,
        background,
        color
      } = await register({
        pin: pin,
        idCliente: idCliente,
        idUser: session.usuario.id
      })
      handleShowStatus({
        image,
        message,
        info,
        background,
        color
      })
    } catch (e) {
      if (e.response) {
        let { message } = e.response.data
        handleShowStatus({
          message,
          background: "bg-red-500/[0.92]",
          color: "text-red-500"
        })
      }
      else {
        console.log(e)
      }
    }
    finally {
      setLoading(false)
      setCliente(null)
      pinRef.current.value = ""
      await sleep(120)
      pinRef.current?.focus()
    }
  }

  const handlePinChange = (e) => {
    let value = e.target.value
    if (value.length === 3) {
      handleRegister({ pin: value })
    }
  }

  return (
    <>
      <div className={`total-center w-full h-screen relative`}>

        <div className='absolute flex flex-col w-full pointer-events-none total-center top-8'>
          <Reloj />
        </div>


        {status ?
          <StatusModal data={status} />
          :
          <>
            <input
              ref={pinRef}
              disabled={loading}
              autoFocus={true}
              //onBlur={e => e.target.focus()}
              onChange={handlePinChange}
              type="password"
              placeholder="Ingresa tu PIN"
              className='w-full h-full text-center placeholder-gray-300 pin focus:placeholder-gray-400' />
            <div className='absolute flex flex-col h-24 mt-4 bottom-36'>
              <ClientSelector
                client={cliente}
                setClient={setCliente}
                name="cliente"
                placeholder="Buscar cliente"
              />
              {cliente &&
                <button
                  type="button"
                  onClick={() => handleRegister({ idCliente: cliente })}
                  className='w-full h-10 mt-3 text-lg font-semibold rounded-full emerge btn-naranja'>Ingresar</button>}
            </div>
          </>
        }
        {
          showModal &&
          <Modal
            image={<MyIcons.Warning size="50px" style={{ color: '#fcd34d' }} />}
            title="Seguro de eliminar?"
            info="Se eliminará el registro de forma permanente"
            onCancel={() => setShowModal(false)}
            onConfirm={() => setShowModal(false)}
            onClose={() => setShowModal(false)}
          />
        }
      </div>
    </>
  )
}

export default AccessoPage