import React, { useEffect, useRef, useState } from 'react'
import AbsScroll from '../../components/AbsScroll'
import { useFormik } from 'formik'
import Report from '../../components/Report'
import 'react-calendar/dist/Calendar.css'
import Inpt from '../../components/inputs/Inpt'
import Opts from '../../components/inputs/Opts'
import Modal from '../../components/Modal'
import { useReportes } from './hooks/useReportes'
import TicketToPrint from '../Carrito/components/TicketToPrint'
import ReportToPrint from '../Carrito/components/ReportToPrint'

const ReportesPage = () => {

    const windowRef = useRef(null)
    const [windowHeight, setWindowHeight] = useState(windowRef.current?.clientHeight)
    const [isWindowBottom, setIsWindowBottom] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)
    const [ventas, setVentas] = useState(false)
    const [data, setData] = useState([])
    const { getVentas, getAsistencia } = useReportes()
    const [showTicket, setShowTicket] = useState(false)
    const [ticket, setTicket] = useState(null)
    const [showReporteImpreso, setShowReporteImpreso] = useState(false)
    const [datosReporte, setDatosReporte] = useState(null)

    {/* Datos y formik */ }
    const [fieldChanged, setFieldChanged] = useState(false)
    const formikRef = useRef();

    const userFormik = useFormik({
        initialValues: {},
        validate: (values) => {
            const errors = {}

            if (!values.tipo) {
                errors.tipo = 'Selecciona un tipo';
            } else if (values.tipo === 'Seleccione') {
                errors.tipo = 'Selecciona un tipo';
            }

            if (!values.fechaInicio) {
                errors.fechaInicio = 'Selecciona una fecha';
            }
            if (!values.fechaFin) {
                errors.fechaFin = 'Selecciona una fecha';
            }

            return errors
        },
        onSubmit: async (values) => {
            try {
                setLoading(true)
                if (values.tipo === 'Ventas') {
                    const ventas = await getVentas({ fecha_inicio: values.fechaInicio, fecha_final: values.fechaFin })
                    setData(ventas)
                    setVentas(true)
                    setDatosReporte(values)
                } else {
                    const asistencia = await getAsistencia({ fecha_inicio: values.fechaInicio, fecha_final: values.fechaFin })
                    setData(asistencia)
                    setVentas(false)
                }

                setReady(true)

            } catch (e) {
              
            } finally {
                setLoading(false)
            }
        }
    })

    {/* Effects */ }
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
                    <h1 className="pl-3 text-3xl font-bold text-blue-900">
                        Reportes
                    </h1>
                </div>
                <div
                    ref={windowRef}
                    className='relative w-full h-full bg-white rounded-lg shadow-lg'>

                    <AbsScroll
                        onBottomReached={() => { }}
                        setBottom={isWindowBottom}
                        loading={loading}
                        vertical>
                        {/* Encabezado */}
                        <div className='flex p-4 bg-white border-b-2 rounded-t-lg pt-7' >
                            <div className='flex flex-col w-full h-28'>
                                <form className='flex flex-row ' onSubmit={userFormik.handleSubmit}>
                                    <div className="flex flex-wrap w-full">
                                        <div className='flex flex-row justify-between w-full px-2 mb-8'>
                                            <h2 className='text-2xl font-bold text-blue-900 '>
                                                Datos del reporte
                                            </h2>

                                            <input
                                                className='px-10 py-1.5 rounded-lg btn-naranja'
                                                value="Generar" type='submit'
                                                disabled={!fieldChanged}
                                                onClick={() => formikRef.current.submitForm()} />
                                        </div>
                                        <div className="flex-grow w-full px-2 sm:w-1/3">
                                            <Opts
                                                name="tipo" formik={userFormik} label="Tipo de reporte" options={[
                                                    { label: "Ventas", value: "Ventas" },
                                                    { label: "Asistencia", value: "Asistencia" },
                                                ]}
                                                selecting={setFieldChanged} />
                                        </div>
                                        <div className="flex-grow w-full px-2 sm:w-1/3">
                                            <Inpt
                                                type='date'
                                                onKeyDown={() => setFieldChanged(true)}
                                                name="fechaInicio" formik={userFormik} label="Fecha de inicio" />
                                        </div>
                                        <div className="flex-grow w-full px-2 sm:w-1/3">
                                            <Inpt
                                                type='date'
                                                onKeyDown={() => setFieldChanged(true)}
                                                name="fechaFin" formik={userFormik} label="Fecha de final" />
                                        </div>
                                    </div>

                                </form>
                            </div>
                        </div>
                        {/* Contenido */}
                        <div className='flex flex-col w-full h-full' style={{ height: windowHeight }}>
                            <h1 className='my-4 text-2xl font-bold text-center text-blue-900'>
                                {ready ? userFormik.values.tipo === 'Ventas' ? 'Reporte de ventas' : 'Reporte de asistencia' : null}
                            </h1>
                            {ready && ventas &&
                                <>
                                    <div className='flex flex-row justify-between mx-6'>
                                        <div className='flex flex-col content-start'>
                                            <h1 className='mb-2 text-xl font-bold text-blue-900'>
                                                {ready ? 'Monto total: $' + data.map((item) => Number(item.total)).reduce((a, b) => a + b, 0) : null}
                                            </h1>
                                            <h1 className='mb-2 text-xl font-bold text-blue-900'>
                                                {ready ? 'Cantidad de ventas: ' + data.length : null}
                                            </h1>
                                        </div>


                                        <button className='px-10 py-1.5 rounded-lg text-white  btn-naranja h-10 w-1/5'
                                            onClick={(e) => { e.preventDefault(); setShowReporteImpreso(true); }}> Imprimir
                                        </button>


                                    </div>
                                 
                                    <Report
                                        className='appear'
                                        columns={[
                                            { label: "ID de venta", attribute: "idVenta" },
                                            { label: "Fecha de venta", attribute: "fecha", render: (item) => new Date(item.fecha).toLocaleDateString() + ' ' + new Date(item.fecha).toLocaleTimeString() },
                                            { label: "Total", attribute: "total" },
                                            { label: "Cliente", attribute: "cliente", render: (item) => (item.cliente ? item.cliente : 'No especificado') },
                                        ]}
                                        data={data}
                                        renderFunctionColumn={(item, i) => (
                                            <div className='relative flex flex-row justify-center w-full text-lg font-semibold text-gray-500'>
                                                <button className='px-4 py-1 m-1 text-white rounded-lg btn-naranja '
                                                    onClick={(e) => { e.preventDefault(); setTicket(item); setShowTicket(true) }}> Detalles
                                                </button>
                                            </div>
                                        )}
                                    />
                                </>
                            }
                            {ready && !ventas &&
                                <>
                                    <div className='flex flex-row justify-between mx-6'>
                                        <h1 className='mb-2 text-2xl font-bold text-center text-blue-900'>
                                            {ready ? 'Total de asistencias registradas: ' + data.length : null}
                                        </h1>
                                    </div>
                                    <Report
                                        className='appear'
                                        columns={[
                                            { label: "Mostrador", attribute: "nombre_usuario" },
                                            { label: "Cliente", attribute: "nombre_cliente" },
                                            { label: "Fecha y hora de entrada", attribute: "fecha", render: (item) => new Date(item.fecha).toLocaleDateString() + ' ' + new Date(item.fecha).toLocaleTimeString() }
                                        ]}
                                        data={data}
                                    />
                                </>
                            }

                        </div>
                    </AbsScroll>
                </div>
            </div>
            {
                showTicket &&
                <TicketToPrint
                    tittle='Reimpresión de ticket'
                    data={ticket}
                    onCloseModal={() => setShowTicket(false)}
                />
            }
            {
                showReporteImpreso &&
                <ReportToPrint
                    tittle='Reporte de ventas'
                    data={{
                        frmData:datosReporte,
                        reportData:data
                    }}
                    onCloseModal={() => setShowReporteImpreso(false)}
                />

            }


        </>

    )
}

export default ReportesPage