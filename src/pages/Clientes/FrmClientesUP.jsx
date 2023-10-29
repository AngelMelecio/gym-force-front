import React, { useEffect, useState } from 'react'
import Inpt from '../../components/inputs/Inpt'


const FrmClienteUP = ({ userFormik, setFieldChanged }) => {

    return (
        <form className='flex flex-col w-full ' onSubmit={userFormik.handleSubmit}>

            <div className="flex flex-wrap pt-6 sm:px-9">
                <div className="flex-grow w-full px-4 sm:w-1/2">
                    <Inpt name="nombre" onKeyDown={() => setFieldChanged(true)}
                        formik={userFormik} label="Nombre" />
                </div>
                <div className="flex-grow w-full px-4 sm:w-1/2">
                    <Inpt name="apellidos" onKeyDown={() => setFieldChanged(true)}
                        formik={userFormik} label="Apellidos" />
                </div>
                <div className="flex-grow w-full px-4 sm:w-1/3">
                    <Inpt name="telefono" onKeyDown={() => setFieldChanged(true)}
                        formik={userFormik} label="Teléfono" />
                </div>
                <div className="flex-grow w-full px-4 sm:w-1/3">
                    <Inpt name="facebook" onKeyDown={() => setFieldChanged(true)}
                        formik={userFormik} label="Facebook" />
                </div>
                <div className="flex-grow w-full px-4 sm:w-1/3">
                    <Inpt name="instagram" onKeyDown={() => setFieldChanged(true)}
                        formik={userFormik} label="Instagram" />
                </div>
                <div className="flex-grow w-full px-4 sm:w-1/2">
                    <Inpt name="notas" onKeyDown={() => setFieldChanged(true)}
                        formik={userFormik} label="Notas" />
                </div>
                <div className="flex-grow w-full px-4 sm:w-1/2">
                    <Inpt name="pin" formik={userFormik} label="PIN" readOnly={true} />
                </div>
            </div>
        </form>
    )
}

export default FrmClienteUP