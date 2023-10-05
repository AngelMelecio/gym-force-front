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
  const [newPassword, setNewPassword] = useState(false)

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

      if (!values.correo) {
        errors.correo = 'Ingresa el correo';
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.correo)) {
        errors.correo = 'Correo invalido';
      }

      if (!values.usuario) {
        errors.usuario = 'Ingresa un usuario';
      } else if ((values.usuario.length < 4 || values.usuario.length > 20)) {
        errors.usuario = 'El usuario debe tener una longitud entre 4 y 20 caracteres';
      }

      if (!values.rol) {
        errors.rol = 'Selecciona un rol';
      } else if (values.rol === 'Seleccione') {
        errors.rol = 'Selecciona un rol';
      }

      if (!values.password && newPassword) {
        errors.password = 'Ingresa una contraseña';
      } else if (values.password?.length < 8 && newPassword) {
        errors.password = '8 caracteres o más';
      }

      if (!values.password2 && newPassword) {
        errors.password2 = 'Confirme la contraseña';
      } else if (values.password !== values.password2 && newPassword) {
        errors.password2 = 'La constraseña no coincide';
      }

      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)

        if(!newPassword){
          values.password = null
          values.password2 = null
          delete values.password
          delete values.password2
        }

        console.log(values)

      } catch (e) {
        console.log('Error al guardar', e)

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
                name="rol" formik={userFormik} label="Rol" options={[
                  { label: "Administrador", value: "Administrador" },
                  { label: "Encargado", value: "Encargado" },
                ]} />
            </div>
            <div className='flex flex-row flex-grow w-full px-5 mb-6'>
              <h2 className='text-lg font-bold text-blue-900 '>
                Nueva contraseña
              </h2>
              <div className='w-10 h-10 total-center bg-slate-500'
                onClick={() => { setNewPassword(!newPassword) }}></div>
            </div>
            {
              newPassword &&
              <>
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
              </>
            }
          </div>
        </AbsScroll>
      </div>
    </form>
  )
}

export default DetailUsuarioPage