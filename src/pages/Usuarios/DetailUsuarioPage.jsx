import React, { useEffect } from 'react'
import { useUsuarios } from './hooks/UsuariosContext'
import { useState } from 'react'
import { useFormik } from 'formik'
import { useParams } from 'react-router-dom'
import AbsScroll from '../../components/AbsScroll'
import Inpt from '../../components/inputs/Inpt'
import Opts from '../../components/inputs/Opts'

const DetailUsuarioPage = () => {

  let { id } = useParams()
  const { getUser } = useUsuarios()

  const [loading, setLoading] = useState(true)
  const [fieldChanged, setFieldChanged] = useState(false)

  const userFormik = useFormik({
    initialValues: null,
    validate: (values) => {
      const errors = {}
      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        console.log(values)

      } catch (e) {

      } finally {
        setLoading(false)
      }
    }
  })



  useEffect(() => {
    async function load() {
      try {
        setLoading(true)
        const usuario = await getUser(id)
        userFormik.setValues(usuario)
      } catch (e) {
        console.log('Error al traer detalles', e)
      } finally {
        setLoading(false)
      }
    }
    load()

  }, [])

  return (
    <form className='flex flex-col w-full h-screen p-3' onSubmit={userFormik.handleSubmit}>
      <div className='flex items-end justify-between pb-3'>
        <h1 className='pl-1 text-2xl text-blue-900 '>Detalles del Usuario</h1>
        <input
          disabled={!fieldChanged}
          className='px-10 py-1.5 rounded-lg btn-naranja' value="Guardar" type='submit' />
      </div>
      <div className='w-full h-full bg-white rounded-lg shadow-md'>
        <AbsScroll vertical loading={userFormik.values === null}>
          <div className="flex flex-wrap px-2 pt-6 sm:px-9">

            <div className='flex-grow w-full px-5 mb-6'>
              <h2 className='text-lg font-bold text-blue-900 '>
                Datos Personales
              </h2>
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                name="nombre" formik={userFormik} label="Nombre" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                name="apellidos" formik={userFormik} label="Apellidos" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                name="correo" formik={userFormik} label="Correo" />
            </div>
            <div className='flex-grow w-full px-5 mb-6'>
              <h2 className='text-lg font-bold text-blue-900 '>
                Datos de la Cuenta
              </h2>
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                name="usuario" formik={userFormik} label="Usuario" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Opts
                onKeyDown={() => setFieldChanged(true)}
                name="is_staff" formik={userFormik} label="Rol" options={[
                  { label: "Administrador", value: true },
                  { label: "Encargado", value: false },
                ]} />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                type="password" name="password" formik={userFormik} label="Nueva Contraseña" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                type="password" name="password2" formik={userFormik} label="Confirmar Contraseña" />
            </div>
          </div>
        </AbsScroll>
      </div>
    </form>
  )
}

export default DetailUsuarioPage