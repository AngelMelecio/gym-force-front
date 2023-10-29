import React, { useEffect, useState } from 'react'
import Crud from '../../components/Crud/Crud'
import { useProductos } from './hooks/useProductos'
import Modal from '../../components/Modal'
import { MyIcons } from '../../constants/Icons';

const ProductosPage = () => {
  const [loading, setLoading] = useState(true)
  const [listaProductos, setListaProductos] = useState([])
  const { refreshAllProductos, allProductos, deleteProducto } = useProductos()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [selectedItemsToDelete, setSelectedItemsToDelete] = useState([])

  useEffect(() => {
    async function load() {
      setLoading(true)
      refreshAllProductos()
      setLoading(false)
    }
    load()
  }, [])

  useEffect(() => {
    setListaProductos(allProductos)
  }, [allProductos])

  const onConfirm = async () => {
    setDeleteModalVisible(false)
    setLoading(true)
    await deleteProducto(selectedItemsToDelete)
    refreshAllProductos()
    setLoading(false)
  }

  return (
    <>
      <Crud
        title="Productos"
        path="productos"
        idName="idProducto"
        loading={loading}
        columns={[
          { label: "ID", atribute: "idProducto" },
          { label: "Nombre", atribute: "nombre" },
          { label: "Descripción", atribute: "descripcion" },
          { label: "Precio", atribute: "precio" },
          { label: "Invetario", atribute: "inventario" },
        ]}
        data={listaProductos}
        setData={setListaProductos}
        onDelete={(items) => {
          setDeleteModalVisible(true)
          setSelectedItemsToDelete(items)
        }}
      />
      {deleteModalVisible &&
        <Modal
          image={<MyIcons.Warning size="40px" className='text-yellow-300' />}
          title="Eliminar Productos"
          info="¿Estás seguro de eliminar los productos seleccionados?"
          onCancel={() => setDeleteModalVisible(false)}
          onConfirm={() => onConfirm()}
          onClose={() => setDeleteModalVisible(false)}
        />

      }
    </>
  )
}

export default ProductosPage