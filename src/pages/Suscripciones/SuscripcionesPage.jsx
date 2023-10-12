import React, { useState } from 'react'
import Table from '../../components/Table';

const SuscripcionesPage = () => {

  const [listaSuscripciones, setListaSuscripciones] = useState([])
  const [loading, setLoading] = useState(false)

  return (
    <>
      <Table
        title="Suscripciones"
        path="suscripciones"
        idName="id"
        titleAttrs={['nombre']}
        subTitleAtrrs={['duracion', 'precio']}
        //photoAttr='fotografia'
        //Info={UserStatus}
        //infoAttr={'is_active'}
        data={listaSuscripciones}
        setData={setListaSuscripciones}
        onDelete={(lista, element) => {
          console.log('delete', lista, element)
        }}
        loading={loading}
      />
    </>
  )
}

export default SuscripcionesPage