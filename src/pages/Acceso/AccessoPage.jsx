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

const AccessoPage = () => {

  const pinRef = useRef()

  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const { session, notify } = useAuth()
  const { register } = useAcceso()

  const handleRegister = async (value) => {
    try {
      setLoading(true)
      
      let { message } = await register({
        pin: value,
        idUser: session.usuario.id
      })
      notify(message)
    } catch (e) {
      notify(e.message, true)
    }
    finally {
      setLoading(false)
      pinRef.current.value = ""
      await sleep(120)
      pinRef.current.focus()
    }
  }

  const handlePinChange = (e) => {
    let value = e.target.value
    if (value.length === 3) {
      handleRegister(value)
    }
  }

  return (
    <>
      <div className='flex flex-col w-full h-screen bg-neutral-100'>
        <div className='flex flex-col w-full h-1/2 total-center'>
          {/*
          <img style={{ width: '70%', maxWidth: '250px' }} src={GymLogoShadow} alt="" />
          */}
          <Reloj />
        </div>
        <div className='relative w-full h-1/2'>

          <div className="absolute z-50 flex justify-center w-full h-full">
            <input
              ref={pinRef}
              disabled={loading}
              autoFocus={true}
              onBlur={e => e.target.focus()}
              onChange={handlePinChange}
              type="password"
              placeholder="Ingresa tu PIN"
              className='text-center pin emerge' />
          </div>
          {/*
          <div className="absolute z-50 w-full h-full total-center">
            <Fp_logo />
          </div>
          <div className="absolute z-50 w-full h-full total-center">
            <Rayas_g1 />
          </div>
           */}


        </div>
      </div>

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

    </>
  )
}

export default AccessoPage