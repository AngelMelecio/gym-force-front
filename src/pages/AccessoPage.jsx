import React, { useState } from 'react'
import Modal from '../components/Modal'
import { MyIcons } from '../constants/Icons'
import Rayas_g1 from '../assets/rayas_g1'
import Fp_logo from '../assets/fp-logo'
import GymLogoShadow from '../assets/GymLogoShadow.svg'
import Reloj from '../components/Reloj'
import Rayas_g2 from '../assets/rayas_g2'

const AccessoPage = () => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className='flex flex-col w-full h-screen'>
        <div className='flex flex-col w-full h-1/2 total-center'>
          <img style={{width:'70%', maxWidth:'320px'}} src={GymLogoShadow} alt="" />
          <Reloj/>
        </div>
        <div className='relative w-full h-1/2'>
          <div className="absolute z-50 w-full h-full total-center">
            <Fp_logo />
          </div>
          {/*
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