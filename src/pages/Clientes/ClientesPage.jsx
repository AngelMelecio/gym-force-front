import React, { useEffect, useState} from 'react'
import { useClientes } from './hooks/useClientes'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import Vigencia from '../../components/Vigencia'


const ClientesPage = () => {
  const [loading, setLoading] = useState(true)
  const [listaClientes, setListaClientes] = useState([])
  const {refreshAllClientes, allClientes, deleteCliente } = useClientes()
  const [showModal, setShowModal] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true)
      await refreshAllClientes()
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    setListaClientes(allClientes)
  }, [allClientes])

  const onConfirm = async () => {
    setLoading(true)
    await deleteCliente(selectedItemId)
    await refreshAllClientes()
    setLoading(false)
    setShowModal(false)
  }

  return (
    <>
      <Table
        title="Clientes"
        path="clientes"
        idName="idCliente"
        titleAttrs={['nombre', 'apellidos']}
        subTitleAtrrs={['telefono', 'facebook']}
        photoAttr='fotografia'
        data={listaClientes}
        setData={setListaClientes}
        onDelete={(lista, element) => {
          setSelectedCliente(element); 
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
          title="Eliminar Cliente"
          info={`¿Está seguro que desea eliminar a: ${selectedCliente}?`}
        />
      }
    </>
  )
}

export default ClientesPage