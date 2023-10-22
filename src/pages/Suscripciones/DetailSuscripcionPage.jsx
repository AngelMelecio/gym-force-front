import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import Inpt from '../../components/inputs/Inpt'
import AbsScroll from '../../components/AbsScroll'
import { useNavigate, useParams } from 'react-router-dom'
import { useSuscripciones } from './hooks/useSuscripciones'
import { MyIcons } from '../../constants/Icons'

const DetailSuscripcionPage = () => {

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  let { id } = useParams()
  const { getOne } = useSuscripciones()

  const [someChange, setSomeChange] = useState(false)

  const susFormik = useFormik({
    initialValues: {},
    validate: (values) => {
      const errors = {}
      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)

      } catch (e) {

      } finally {
        setLoading(false)
      }
    }
  })

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true)
        let suscripcion = await getOne(id)
        susFormik.setValues(suscripcion)
      } catch (e) {
        console.error('Error al cargar detalles', e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [id])

  return (
    <form className='flex flex-col w-full h-screen p-3' onSubmit={susFormik.handleSubmit}>
      <div className='flex items-end justify-between pb-3'>
        <div className='flex'>
          <button
            type="button" onClick={() => navigate('/suscripciones')}
            className='mr-3 rounded-full btn-neutral'>
            <MyIcons.Left size="35px" className='text-gray-600' />
          </button>
          <h1 className='pl-1 text-3xl text-blue-900 '>Detalles de la Suscripción</h1>
        </div>
        <input
          disabled={!someChange}
          className='px-10 py-1.5 rounded-lg btn-naranja'
          value="Guardar"
          type='submit' />
      </div>
      <div className='w-full h-full bg-white rounded-lg shadow-md'>
        <AbsScroll vertical loading={loading}>
          <div className="flex flex-wrap px-2 pt-6 sm:px-9">
            <div className='flex-grow w-full px-5 mb-6'>
              <h2 className='text-lg font-bold text-blue-900 '>
                Datos de la Suscripcion
              </h2>
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setSomeChange(true)}
                name="nombre" formik={susFormik} label="Nombre" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setSomeChange(true)}
                name="categoria" formik={susFormik} label="Categoria" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-full">
              <Inpt
                onKeyDown={() => setSomeChange(true)}
                name="descripcion" formik={susFormik} label="Descripción" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setSomeChange(true)}
                name="precio" formik={susFormik} label="Precio" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setSomeChange(true)}
                name="duracion" formik={susFormik} label="Duración" />
            </div>

          </div>
        </AbsScroll>
      </div>
    </form>
  )
}

export default DetailSuscripcionPage