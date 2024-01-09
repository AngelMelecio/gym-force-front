import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import Inpt from '../../components/inputs/Inpt'
import Opts from '../../components/inputs/Opts'
import AbsScroll from '../../components/AbsScroll'
import { useNavigate, useParams } from 'react-router-dom'
import { useSuscripciones } from './hooks/useSuscripciones'
import { MyIcons } from '../../constants/Icons'

const DetailSuscripcionPage = () => {

  const navigate = useNavigate()
  let { id } = useParams()
  const { getSuscripcion, updateSuscripcion } = useSuscripciones()

  const [loading, setLoading] = useState(false)
  const [fieldChanged, setFieldChanged] = useState(false)

  const userFormik = useFormik({
    initialValues: {},
    validate: (values) => {
      const errors = {}
      if(!values.tipo) {
        errors.tipo = 'Selecciona un tipo';
      } else if (values.tipo === null) {
        errors.tipo = 'Selecciona un tipo';
      }

      if (!values.modalidad) {
        errors.modalidad = 'Selecciona una modalidad';
      } else if (values.modalidad === null) {
        errors.modalidad = 'Selecciona una modalidad';
      }

      if (!values.precio) {
        errors.precio = 'Ingresa el precio';
      } else if (values.precio < 0) {
        errors.precio = 'El precio debe ser mayor a 0';
      }

      if (!values.duracion) {
        errors.duracion = 'Ingresa la duración';
      } else if (values.duracion < 0) {
        errors.duracion = 'La duración debe ser mayor a 0';
      } else if (values.duracion % 1 !== 0) {
        errors.duracion = 'La duración debe ser un número entero';
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        await updateSuscripcion(values)
        navigate('/suscripciones')
      } catch (e) {
        //console.log(e)
      } finally {
        setLoading(false)
      }
    }
  })

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true)
        const suscripcion = await getSuscripcion(id)
        userFormik.setValues(suscripcion)
      } catch (e) {
        console.error('Error al cargar detalles', e)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  return (
    <form className='flex flex-col w-full h-screen p-3' onSubmit={userFormik.handleSubmit}>
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
          disabled={!fieldChanged}
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
              <Opts name="tipo" formik={userFormik} label="Tipo" options={[
                { label: "Seleccione", value: null },
                { label: "Visita", value: 'Visita' },
                { label: "Semana", value: 'Semana' },
                { label: "Mensualidad", value: 'Mensualidad' },
                { label: "Trimestre", value: 'Trimestre' },
                { label: "Semestre", value: 'Semestre' },
                { label: "Anualidad", value: 'Anualidad' },
              ]}
                selecting={setFieldChanged} />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Opts name="modalidad" formik={userFormik} label="Modalidad" options={[
                { label: "Seleccione", value: null },
                { label: "Gym", value: 'Gym' },
                { label: "Spin", value: 'Spin' },
                { label: "Yoga", value: 'Yoga' },
                { label: "Gym + Spin", value: 'Gym + Spin' },
                { label: "Gym + Yoga", value: 'Gym + Yoga' },
                { label: "Gym + Spin + Yoga", value: 'Gym + Spin + Yoga' },
              ]}
                selecting={setFieldChanged}
              />
            </div>
            <div className="flex-grow w-full px-4 sm:w-full">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                name="descripcion" formik={userFormik} label="Descripción" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                name="precio" formik={userFormik}
                type="number" step={0.1}
                label="Precio (MXN)" />
            </div>
            <div className="flex-grow w-full px-4 sm:w-1/2">
              <Inpt
                onKeyDown={() => setFieldChanged(true)}
                name="duracion" formik={userFormik}
                type="number" step={1}
                label="Duración (días)" />
            </div>

          </div>
        </AbsScroll>
      </div>
    </form>
  )
}

export default DetailSuscripcionPage