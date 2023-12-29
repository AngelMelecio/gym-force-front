import React from 'react'
import { useUsuarios } from '../Usuarios/hooks/UsuariosContext'
import { useEffect, useState } from 'react'
import Table from '../../components/Table'
import UserStatus from '../../components/UserStatus'
import Modal from '../../components/Modal'

const UsuariosPage = () => {
  const [loading, setLoading] = useState( true )
  const [listaUsuarios, setListaUsuarios] = useState([])
  const { refreshAllUsers, allUsers, deleteUser} = useUsuarios()
  const [showModal, setShowModal] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true)
      await refreshAllUsers()
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    setListaUsuarios(allUsers)
  }, [allUsers])

  const onConfirm = async () => {
    setLoading(true)
    await deleteUser(selectedItemId)
    await refreshAllUsers()
    setLoading(false)
    setShowModal(false)
  }

  return (
    <>
      <Table
        title="Usuarios"
        path="usuarios"
        idName="id"
        titleAttrs={['nombre', 'apellidos']}
        subTitleAtrrs={['rol', 'correo']}
        photoAttr='fotografia'
        Info={UserStatus}
        infoAttr={'is_active'}
        data={listaUsuarios}
        setData={setListaUsuarios}
        onDelete={(lista, element) => {
          setSelectedUser(element); 
          setSelectedItemId(lista);
          setShowModal(true)
        }}
        loading={loading}
      />
      {
        showModal &&
        <Modal
          onCancel={() => setShowModal(false)}
          onClose={() => setShowModal(false)}
          onConfirm={onConfirm}
          title='Eliminar usuario'
          info={`¿Estás seguro que deseas eliminar a ${selectedUser}?`}
        />
      }
    </>

  )
}

export default UsuariosPage