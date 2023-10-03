import React, { useState } from 'react'
import Modal from '../components/Modal'
import { MyIcons } from '../constants/Icons'

const AccessoPage = () => {

  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div >
        <h1>Accesso</h1>
        <button onClick={() => setShowModal(p => !p)}>
          Show
        </button>
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