import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import Inpt from '../../components/inputs/Inpt'
import { useFormik } from 'formik'
import AbsScroll from '../../components/AbsScroll'
import { useProductos } from './hooks/useProductos';
import { MyIcons } from '../../constants/Icons'

const NewProductoPage = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { createProducto } = useProductos()

  const userFormik = useFormik({
    initialValues: {},
    validate: (values) => {
      const errors = {}

      if (!values.nombre) {
        errors.nombre = 'Ingresa el nombre';
      } else if (values.nombre.length > 100) {
        errors.nombre = '100 caracteres o menos';
      }

      if (!values.precio) {
        errors.precio = 'Ingresa el precio';
      } else if (values.precio < 0) {
        errors.precio = 'El precio debe ser mayor a 0';
      } 

      if (!values.inventario) {
        errors.inventario = 'Ingresa el inventario';
      } else if (values.inventario < 0) {
        errors.inventario = 'El inventario debe ser mayor a 0'; 
      } else if (values.inventario % 1 !== 0) {
        errors.inventario = 'El inventario debe ser un número entero';
      } 

      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        await createProducto(values)
        navigate('/productos')

      } catch (e) {
        console.log(e)
      } finally {
        setLoading(false)
      }
    }
  })
  return (
    <form className='flex flex-col w-full h-screen p-3' onSubmit={userFormik.handleSubmit}>
      <div className='flex items-end justify-between pb-3'>
        <div className='flex flex-row'>
          <button
            onClick={() => navigate('/productos')}
            className="w-10 h-10 rounded-full btn-neutral total-center"> <MyIcons.Left size="30px" color='#1e3a8a' /> </button>
          <h1 className='pl-3 text-3xl text-blue-900 '>Nuevo Producto</h1>
        </div>
        <input className='px-10 py-1.5 rounded-lg btn-naranja' value="Guardar" type='submit' />
      </div>
      <div className='w-full h-full bg-white rounded-lg shadow-md'>
        <AbsScroll vertical loading={userFormik.values === null}>
          <div className="flex flex-wrap px-2 pt-6 sm:px-9">
            <div className='flex-grow w-full px-5 mb-6'>
              <h2 className='text-lg font-bold text-blue-900 '>
                Datos del Producto
              </h2>
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="nombre" formik={userFormik} label="Nombre" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="descripcion" formik={userFormik} label="Descripción" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="precio" formik={userFormik}
                label="Precio (MXN)" type="number" step={0.1} />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="inventario" formik={userFormik}
                label="Inventario (unidades)" type="number" step={1} />
            </div>
          </div>
        </AbsScroll>
      </div>
    </form>
  )
}

export default NewProductoPage