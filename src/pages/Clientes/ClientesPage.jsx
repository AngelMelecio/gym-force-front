import React, { useEffect, useState } from 'react'
import { useClientes } from './hooks/useClientes'
import Table from '../../components/Table'
import Modal from '../../components/Modal'
import Vigencia from '../../components/Vigencia'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const ClientesPage = () => {
  const [loading, setLoading] = useState(true)
  const [listaClientes, setListaClientes] = useState([])
  const { refreshAllClientes, allClientes, deleteCliente, getCliente } = useClientes()
  const [showModal, setShowModal] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [showModalCliente, setShowModalCliente] = useState(false)


  const [objCliente, setObjCliente] = useState(null)
  const navigate = useNavigate();
  const { idCliente } = useParams();
  async function getDataCliente() {
    try {
      const cliente = await getCliente(idCliente)
      setObjCliente(cliente)
    } catch (e) {
      console.log(e)
    }
  }
  useEffect(() => {
    if (idCliente) {
      getDataCliente()
      setShowModalCliente(true)
    }
  }, [idCliente])

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

  const onConfirmCliente = async () => {
    setLoading(true)
    navigate('/carrito/' + objCliente.idCliente)
    setLoading(false)
    setShowModalCliente(false)
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
      {
        showModalCliente &&
        <Modal
          onCancel={() => setShowModalCliente(false)}
          onClose={() => setShowModalCliente(false)}
          onConfirm={onConfirmCliente}
          title="Vender y asignar Suscripción"
          info={`El PIN de acceso de: ${objCliente?.nombre} ${objCliente?.apellidos} es: ${objCliente?.pin}. ¿Deseas asignar una nueva suscripción?`}
        />
      }
    </>
  )
}

export default ClientesPage