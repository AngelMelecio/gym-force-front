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
  const { session } = useAuth()
  const { register } = useAcceso()

  const [status, setStatus] = useState(null)

  const handleShowStatus = async (data) => {
    setStatus(data)
    await sleep(5000)
    setStatus(null)
  }

  const handleRegister = async (value) => {
    try {
      setLoading(true)

      let { image, message, info, background, color } = await register({
        pin: value,
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
          message: message,
          background: "bg-red-500",
          color: "text-red-500"
        })
      }
      else {
        console.log(e)
      }
    }
    finally {
      setLoading(false)
      pinRef.current.value = ""
      await sleep(120)
      pinRef.current?.focus()
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
      <div className={`flex flex-col w-full h-screen relative`}>
        <div className='flex flex-col w-full total-center'>
          {/*
          <img style={{ width: '70%', maxWidth: '250px' }} src={GymLogoShadow} alt="" />
          */}
          <Reloj />
        </div>


        {status ? <div className={`total-center appear absolute ${status.background} w-full h-full shadow-[inset_0px_0px_54px_-3px_rgba(0,0,0,0.75)]`}>
          <div className="relative leading-[1.2] bg-white h-[80vh] w-[80vw] rounded-lg shadow-lg emerge flex flex-col items-center justify-center">
            <div className='total-center'>
              {status.image &&
                <img className='object-cover w-40 h-40 rounded-full shadow-lg' src={status.image} alt="" />}
            </div>
            <p className={`font-[robotoCondensed] text-[5vw] font-extrabold ${status.color}`}>
              {status.message}
            </p>
            <p className='font-[robotoCondensed] text-[3vw] font-semibold text-gray-700'>
              {status.info && status.info}
            </p>
            {/* Timer */}
            <div className={`absolute bottom-0 left-0 h-2 ${status.background} grow`}>
            </div>
          </div>
        </div> :
          <div className='relative flex-1 w-full total-center'>
            <input
              ref={pinRef}
              disabled={loading}
              autoFocus={true}
              onBlur={e => e.target.focus()}
              onChange={handlePinChange}
              type="password"
              placeholder="Ingresa tu PIN"
              className='text-center pin emerge drop-shadow-lg' />
          </div>
        }

        {/* status ?
          <div className='absolute w-full h-full appear'>
            <div className={`absolute w-full h-full opacity-75 ${status && status.color}`}>
            </div>
            <div className=' absolute w-full h-full font-[robotoCondensed] text-center font-semibold total-center'>
              <div className='w-2/3 bg-white rounded-lg shadow-lg h-4/5 '>
                <div className='total-center'>
                  {status.image &&
                    <img className='object-cover w-40 h-40 rounded-full shadow-lg' src={status.image} alt="" />}
                </div>
                <p className='text-[4rem] drop-shadow-lg'>
                  {status.message}
                </p>
                <p className='text-[2.2rem] drop-shadow-lg'>
                  {status.info && status.info}
                </p>
              </div>
            </div>
          </div>
          :
          <div className='relative flex-1 w-full total-center'>
            <input
              ref={pinRef}
              disabled={loading}
              autoFocus={true}
              onBlur={e => e.target.focus()}
              onChange={handlePinChange}
              type="password"
              placeholder="Ingresa tu PIN"
              className='text-center pin emerge drop-shadow-lg' />

            
          </div>
        */}

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