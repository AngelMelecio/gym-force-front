import React, { useEffect, useState } from 'react'
import WhitePage from '../../components/WhitePage'
import Inpt from '../../components/inputs/Inpt'
import Opts from '../../components/inputs/Opts'
import { useFormik } from 'formik'
import ImgInpt from '../../components/inputs/ImgInpt'
import AbsScroll from '../../components/AbsScroll'
import { sleep } from '../../utils/global'

const NewUsuarioPage = () => {

  const [loading, setLoading] = useState(false)

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

    async function set() {
      await sleep(2000)
      userFormik.setValues({})
    }
    set()
    
  }, [])  

  return (
    <form className='flex flex-col w-full h-screen p-3' onSubmit={userFormik.handleSubmit}>
      <div className='flex items-end justify-between pb-3'>
        <h1 className='pl-1 text-3xl text-blue-900 '>Nuevo Usuario</h1>
        <input className='px-10 py-1.5 rounded-lg btn-naranja' value="Guardar" type='submit' />
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
              <Inpt name="nombre" formik={userFormik} label="Nombre" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="apellidos" formik={userFormik} label="Apellidos" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="correo" formik={userFormik} label="Correo" />
            </div>
            <div className='flex-grow w-full px-5 mb-6'>
              <h2 className='text-lg font-bold text-blue-900 '>
                Datos de la Cuenta
              </h2>
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt name="usuario" formik={userFormik} label="Usuario" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Opts name="is_staff" formik={userFormik} label="Rol" options={[
                { label: "Administrador", value: true },
                { label: "Encargado", value: false },
              ]} />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt type="password" name="password" formik={userFormik} label="Contraseña" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt type="password" name="password2" formik={userFormik} label="Confirmar Contraseña" />
            </div>
          </div>
        </AbsScroll>
      </div>
    </form>
  )
}

export default NewUsuarioPage