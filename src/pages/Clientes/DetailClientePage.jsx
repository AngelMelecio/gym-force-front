import React, { useEffect, useRef, useState } from 'react'
import AbsScroll from '../../components/AbsScroll'
import { useParams } from 'react-router-dom'
import { useClientes } from './hooks/useClientes'
import { useSuscripciones } from '../Suscripciones/hooks/useSuscripciones'
import { useNavigate } from 'react-router-dom'
import { MyIcons } from '../../constants/Icons'
import { useFormik } from 'formik'
import ImgInpt from '../../components/inputs/ImgInpt'
import FrmClienteUP from './FrmClientesUP'
import Vigencia from '../../components/Vigencia'
import Report from '../../components/Report'
import Actividad from './components/Actividad'
import CalendarToModal from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Modal from '../../components/Modal'
import { nuevaFecha } from '../../constants/nuevaFecha'

const DetailClientePage = () => {
  {/* Logic to new end date */ }

  const [initialDate, setInitialDate] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [objHistory, setObjHistory] = useState(null)
  const { aplazarDetalleSuscripcion } = useSuscripciones()

  const onConfirm = async () => {
    setShowModal(false)
    try {
      setLoading(true)
      await aplazarDetalleSuscripcion(objHistory.id_detalle_suscripcion, selectedDate.toISOString().slice(0, 10));
      setObjHistory(null)
      setInitialDate(null)
      setSelectedDate(null)
      load()
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleclickAplazar = async (objHistory) => {
    setInitialDate(new Date(objHistory.fecha_fin))
    setSelectedDate(new Date(objHistory.fecha_fin))
    setShowModal(true)
    setObjHistory(objHistory)
    console.log(objHistory)
  }

  const [objActividad, setObjActividad] = useState(null)
  const [showActividadModal, setShowActividadModal] = useState(false)
  const handleShowActividad = (item) => {
    console.log(item)
    setObjActividad(item)
    setShowActividadModal(true)
  }

  useEffect(() => {
    console.log('render')
  }, [])

  const windowRef = useRef(null)
  const [windowHeight, setWindowHeight] = useState(windowRef.current?.clientHeight)
  const [isWindowBottom, setIsWindowBottom] = useState(false)

  {/* Tabs y lógica */ }
  const [selectedTab, setSelectedTab] = useState('informacion')
  const [loading, setLoading] = useState(true)

  {/* Datos y formik */ }
  const { getCliente, updateCliente } = useClientes()
  const [fieldChanged, setFieldChanged] = useState(false)
  const navigate = useNavigate()
  const formikRef = useRef();
  let { id } = useParams()
  async function load() {
    try {
      setLoading(true)
      const cliente = await getCliente(id)
      userFormik.setValues(cliente)
    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }
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
        await updateCliente(values)
        load()
      } catch (e) {

      } finally {
        setLoading(false)
        setFieldChanged(false)
      }
    }
  })

  {/* Effects */ }
  useEffect(() => { load() }, [])
  useEffect(() => {
    setWindowHeight(windowRef.current?.clientHeight)
  }, [windowRef])
  useEffect(() => {
    formikRef.current = userFormik;
  }, [userFormik]);


  return (
    <>
      <div className='relative flex flex-col w-full h-screen m-3'>
        <div className='flex items-end justify-between pb-3'>
          <div className='flex flex-row'>
            <button
              onClick={() => navigate('/clientes')}
              className="w-10 h-10 rounded-full btn-neutral total-center"> <MyIcons.Left size="30px" color='#1e3a8a' /> </button>
            <h1 className="pl-3 text-3xl font-bold text-blue-900">
              Detalle de Cliente
            </h1>
          </div>
          <div className='pb-4'>
            <input
              className={!fieldChanged ? 'hidden' : 'px-10 py-1.5 rounded-lg btn-naranja'}
              value="Guardar" type='submit'
              onClick={() => formikRef.current.submitForm()} />
          </div>
        </div>
        <div
          ref={windowRef}
          className='relative w-full h-full bg-white rounded-lg shadow-lg'>

          <AbsScroll
            onBottomReached={() => console.log('bottom')}
            setBottom={isWindowBottom}
            loading={loading}
            vertical>
            {/* Encabezado */}
            <div className='flex p-10 bg-white border-b rounded-t-lg pt-7' >
              <div className='flex flex-row w-full h-full'>

                <div className='flex w-[123px] h-full'>
                  <ImgInpt name="fotografia"
                    selecting={setFieldChanged}
                    formik={userFormik} />
                </div>
                <div className='flex flex-col justify-center w-full ml-10'>
                  <p className='pb-1 text-3xl font-extrabold text-blue-900'>
                    {userFormik.values?.nombre + ' ' + userFormik.values?.apellidos}
                  </p>
                  <p className='pb-1 text-xl font-semibold text-gray-700'>
                    {userFormik.values?.suscripcion}
                  </p >
                  <div className='flex w-full'>
                    <Vigencia prop={userFormik.values?.diferencia_dias} />
                  </div>
                </div>
              </div>
            </div>
            {/* Contenido */}
            <div className='flex flex-col' style={{ height: windowHeight }}>
              {/* Tabs */}
              <div className='flex flex-row h-12 border-b-2'>
                {[{ option: 'informacion', label: 'Información' },
                { option: 'subscripciones', label: 'Subscripciones' }]
                  .map((c, i) =>
                    <button
                      key={`tb_${i}`}
                      type='button'
                      onClick={() => setSelectedTab(c.option)}
                      className={`px-5 py-2 border-b-2 font-bold  ${selectedTab === c.option ? 'border-b-blue-500 text-blue-600 bg-blue-50' : 'border-b-transparent text-gray-600'} duration-150`} >
                      {c.label}
                    </button>)}
              </div>
              {/* Selected Tab */}
              <div className='w-full h-full '>
                {/* Formulario de la cuenta */}
                {
                  selectedTab === 'informacion' && <div className='appear'>
                    <h2 className='px-6 py-5 mt-4 text-xl text-blue-900'>Datos de la cuenta</h2>
                    <FrmClienteUP userFormik={userFormik} setFieldChanged={setFieldChanged} />
                  </div>
                }
                {/* Historial de suscripciones */}
                {
                  selectedTab === 'subscripciones' && <div className='appear'>
                    <div className='flex flex-row justify-between w-full px-6 py-5 my-4'>
                      <h2 className='text-xl text-blue-900'>Historial de suscripciones</h2>
                      {
                        userFormik.values?.diferencia_dias < 5 &&
                        <button
                          onClick={() => navigate('/carrito/' + userFormik.values?.idCliente + '/' + userFormik.values?.historico_suscripciones?.[0]?.id_suscripcion)}
                          className='px-4 py-2 text-white rounded-lg btn-naranja'>
                          {'Vender y asignar suscripción'}
                        </button>
                      }
                    </div>
                    {/* Component to list subscriptions*/}
                    <Report
                      className='appear'
                      columns={[
                        { label: "Suscripción", attribute: "nombre_suscripcion", onclick: (item) => navigate('/carrito/' + userFormik.values?.idCliente + '/' + item.id_suscripcion) },
                        { label: "Fecha de inicio", attribute: "fecha_inicio", render: (item) => new Date(item.fecha_inicio).toLocaleDateString('es-ES') },
                        { label: "Fecha de término", attribute: "fecha_fin", render: (item) => new Date(item.fecha_fin).toLocaleDateString('es-ES') }
                      ]}
                      data={userFormik.values?.historico_suscripciones}
                      renderFunctionColumn={(item, i) => (
                        <div className='relative flex flex-row justify-center w-full text-lg font-semibold text-gray-500'>
                          {
                            (i === 0) ? (userFormik.values?.diferencia_dias > 0) ?
                              <button className='px-4 py-1 m-1 text-white rounded-lg btn-naranja '
                                onClick={() => handleclickAplazar(item)} >
                                Aplazar
                              </button>
                              : null : null
                          }
                          <button className='px-4 py-1 m-1 text-white rounded-lg btn-naranja'
                            onClick={() => handleShowActividad(item)}>
                            Historial
                          </button>
                        </div>
                      )}
                    />
                  </div>
                }


              </div>
            </div>
          </AbsScroll>
        </div>
      </div>
      {
        showModal &&
        <Modal
          onCancel={() => setShowModal(false)}
          onClose={() => setShowModal(false)}
          onConfirm={() => onConfirm()}
          title="Aplazar Suscripción"
          info={`La fecha actual de vencimiento es ${initialDate.toLocaleDateString('es-ES')} \n selecciona la nueva fecha de vencimiento para esta suscripción`}
          functionalComponent={() =>
            <CalendarToModal
              minDate={initialDate}
              onChange={setSelectedDate}
              locale='es-ES'
              className='w-full mt-5 border-2 border-gray-300 rounded-lg shadow-md bg-slate-50'
              value={selectedDate}
            />
          }
        />

      }
      {
        showActividadModal &&
        <Modal
          onClose={() => setShowActividadModal(false)}
          onConfirm={() => setShowActividadModal(false)}
          title="Historial de asistencia"
          info={`${objActividad?.nombre_suscripcion}`}
          functionalComponent={() =>
            <Actividad
              cliente={id}
              suscripcion={objActividad?.id_detalle_suscripcion}
              fechaInicio={objActividad?.fecha_inicio}
              fechaFin={objActividad?.fecha_fin}
            />}
        />
      }
    </>
  )
}

export default DetailClientePage