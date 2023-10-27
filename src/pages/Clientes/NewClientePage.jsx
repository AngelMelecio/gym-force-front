import React, { useEffect, useState } from 'react'
import WhitePage from '../../components/WhitePage'
import { useNavigate } from "react-router-dom";
import Inpt from '../../components/inputs/Inpt'
import Opts from '../../components/inputs/Opts'
import { useFormik } from 'formik'
import ImgInpt from '../../components/inputs/ImgInpt'
import AbsScroll from '../../components/AbsScroll'
import { sleep } from '../../utils/global'
import { useClientes } from './hooks/useClientes'
import { MyIcons } from '../../constants/Icons'

const NewClientePage = () => {

  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();
  const { createCliente } = useClientes()

  const userFormik = useFormik({
    initialValues: {},
    validate: (values) => {
      const errors = {}

      if (!values.nombre) {
        errors.nombre = 'Ingresa el nombre';
      } else if (values.nombre.length > 25) {
        errors.nombre = '25 caracteres o menos';
      }
      if (!values.apellidos) {
        errors.apellidos = 'Ingresa el apellido';
      } else if (values.apellidos.length > 50) {
        errors.apellidos = '50 caracteres o menos';
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        await createCliente(values)
        navigate('/clientes')

      } catch (e) {
        
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
            onClick={() => navigate('/clientes')}
            className="w-10 h-10 rounded-full btn-neutral total-center"> <MyIcons.Left size="30px" color='#1e3a8a' /> </button>
          <h1 className='pl-3 text-3xl text-blue-900 '>Nuevo Cliente</h1>
        </div>
        <input className='px-10 py-1.5 rounded-lg btn-naranja' value="Guardar" type='submit' />
      </div>
      <div className='w-full h-full bg-white rounded-lg shadow-md'>
        <AbsScroll vertical loading={userFormik.values === null}>
          <div className="flex flex-wrap px-2 pt-6 sm:px-9">

            <div className="flex-grow w-full px-4 total-center pb-9">
              <ImgInpt name="fotografia" formik={userFormik} />
            </div>
            <div className='flex-grow w-full px-5 mb-6'>
              <h2 className='text-lg font-bold text-blue-900 '>
                Datos Personales
              </h2>
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="nombre" formik={userFormik} label="Nombre" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="apellidos" formik={userFormik} label="Apellidos" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="telefono" formik={userFormik} label="Teléfono" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="facebook" formik={userFormik} label="Facebook" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="instagram" formik={userFormik} label="Instagram" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="notas" formik={userFormik} label="Notas" />
            </div>
          </div>
        </AbsScroll>
      </div>
    </form>
  )
}

export default NewClientePage