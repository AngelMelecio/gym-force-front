import React, { useEffect, useState } from 'react'
import Crud from '../../components/Crud/Crud'
import { useSuscripciones } from './hooks/useSuscripciones'
import Modal  from '../../components/Modal'
import { MyIcons } from '../../constants/Icons';

const SuscripcionesPage = () => {

  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)

  const { getAll } = useSuscripciones()

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true)
        let data = await getAll()
        setLista(data)
      } catch (e) {
        console.error("Error al cargar datos", e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])



  return (
    <>
      <Crud
        title="Suscripciones"
        path="suscripciones"
        idName="idSuscripcion"
        loading={loading}
        columns={[
          { label: "ID", atribute: "idSuscripcion" },
          { label: "Nombre", atribute: "nombre" },
          { label: "Descripción", atribute: "descripcion" },
          { label: "Categoria", atribute: "categoria" },
          { label: "Duración (días)", atribute: "duracion" },
          { label: "Precio", atribute: "precio" },
        ]}
        data={lista}
        setData={setLista}
        onDelete={() => setDeleteModalVisible(true)}
      />
      {deleteModalVisible &&
        <Modal
          image={<MyIcons.Warning size="40px" className='text-yellow-300'/>}
          title="Eliminar Suscripciones"
          info="¿Estás seguro de eliminar las suscripciones seleccionadas?"
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={() => setDeleteModalVisible(false)}
          onClose={() => setDeleteModalVisible(false)}
        />

      }
    </>
  )
}

export default SuscripcionesPage