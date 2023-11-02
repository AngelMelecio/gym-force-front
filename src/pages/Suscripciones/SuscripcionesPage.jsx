import React, { useEffect, useState } from 'react'
import Crud from '../../components/Crud/Crud'
import { useSuscripciones } from './hooks/useSuscripciones'
import Modal from '../../components/Modal'
import { MyIcons } from '../../constants/Icons';

const SuscripcionesPage = () => {
  const [loading, setLoading] = useState(true)
  const [lista, setLista] = useState([])
  const { refreshAllSuscripciones, allSuscripciones, deleteSuscripcion } = useSuscripciones()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedItemsToDelete, setSelectedItemsToDelete] = useState([])


  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        await refreshAllSuscripciones()
        setLoading(false)
      } catch (e) {
        console.error("Error al cargar datos", e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    setLista(allSuscripciones)
  }, [allSuscripciones])

  const onConfirm = async () => {
    setDeleteModalVisible(false)
    setLoading(true)
    await deleteSuscripcion(selectedItemsToDelete)
    refreshAllSuscripciones()
    setLoading(false)
  }

  return (
    <>
      <Crud
        title="Suscripciones"
        path="suscripciones"
        idName="idSuscripcion"
        loading={loading}
        columns={[
          { label: "ID", atribute: "idSuscripcion" },
          { label: "Tipo", atribute: "tipo" },
          { label: "Descripción", atribute: "descripcion" },
          { label: "Modalidad", atribute: "modalidad" },
          { label: "Duración (días)", atribute: "duracion" },
          { label: "Precio (MXN)", atribute: "precio" },
        ]}
        data={lista}
        setData={setLista}
        onDelete={(items) => {
          setDeleteModalVisible(true)
          setSelectedItemsToDelete(items)
        }}
      />
      {deleteModalVisible &&
        <Modal
          image={<MyIcons.Warning size="40px" className='text-yellow-300' />}
          title="Eliminar Suscripciones"
          info="¿Estás seguro de eliminar las suscripciones seleccionadas?"
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={() => onConfirm()}
          onClose={() => setDeleteModalVisible(false)}
        />

      }
    </>
  )
}

export default SuscripcionesPage