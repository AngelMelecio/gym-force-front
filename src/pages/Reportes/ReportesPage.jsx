import React, { useEffect, useRef, useState } from 'react'
import AbsScroll from '../../components/AbsScroll'
import { useFormik } from 'formik'
import Report from '../../components/Report'
import 'react-calendar/dist/Calendar.css'
import Inpt from '../../components/inputs/Inpt'
import Opts from '../../components/inputs/Opts'

const ReportesPage = () => {

    const windowRef = useRef(null)
    const [windowHeight, setWindowHeight] = useState(windowRef.current?.clientHeight)
    const [isWindowBottom, setIsWindowBottom] = useState(false)
    const [loading, setLoading] = useState(false)
    const [ready, setReady] = useState(false)
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
                console.log(values)

            } catch (e) {
                //console.log('Error al guardar', e)
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
                        onBottomReached={() => console.log('bottom')}
                        setBottom={isWindowBottom}
                        loading={loading}
                        vertical>
                        {/* Encabezado */}
                        <div className='flex p-4 bg-white border-b-2 rounded-t-lg pt-7' >
                            <div className='flex flex-col w-full h-28'>
                                <form className='flex flex-row ' onSubmit={userFormik.handleSubmit}>
                                    <div className="flex flex-wrap">
                                        <div className='flex flex-row justify-between w-full px-2 mb-8'>
                                            <h2 className='text-xl font-bold text-blue-900 '>
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
                            {ready &&
                                <Report
                                    className='appear'
                                    columns={[
                                        { label: "Suscripción", attribute: "nombre_suscripcion" },
                                        { label: "Fecha de inicio", attribute: "fecha_inicio", render: (item) => new Date(item.fecha_inicio).toLocaleDateString('es-ES') },
                                        { label: "Fecha de término", attribute: "fecha_fin", render: (item) => new Date(item.fecha_fin).toLocaleDateString('es-ES') }
                                    ]}
                                    data={[
                                        { id: 1, nombre_suscripcion: 'Suscripción 1', fecha_inicio: '2021-05-01', fecha_fin: '2021-05-30' },
                                        { id: 2, nombre_suscripcion: 'Suscripción 2', fecha_inicio: '2021-05-01', fecha_fin: '2021-05-30' },
                                        { id: 3, nombre_suscripcion: 'Suscripción 3', fecha_inicio: '2021-05-01', fecha_fin: '2021-05-30' },
                                        { id: 4, nombre_suscripcion: 'Suscripción 4', fecha_inicio: '2021-05-01', fecha_fin: '2021-05-30' }
                                    ]}
                                />
                            }

                        </div>
                    </AbsScroll>
                </div>
            </div>

        </>

    )
}

export default ReportesPage