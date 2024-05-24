import React from 'react'
import { MyIcons } from '../constants/Icons'

const Vigencia = ({ prop }) => {
    let colorClass;
    let message;

    if (prop >= 8) {
        colorClass = "text-green-500";
        message = "Vigente, " + prop + " días restantes"
    } else if (prop >= 5 && prop <= 7) {
        colorClass = "text-yellow-400";
        message = "Por vencer, " + prop + " días restantes"
    } else if (prop >= 2 && prop <= 4) {
        colorClass = "text-orange-400";
        message = "Por vencer, " + prop + " días restantes"
    } else if (prop === 1) {
        colorClass = "text-red-500";
        message = "Vence mañana"
    } else if (prop === 0) {
        message = "Vence hoy"
        colorClass = "text-red-500";
    } else if (prop < 0) {
        message = "Venció hace " + Math.abs(prop) + " días"
        colorClass = "text-red-500";
    } else if (prop === null) {
        message = "No hay suscripciones activas"
        colorClass = "text-gray-500";
    }

    return (
        <div className='flex flex-row items-center'>
            <MyIcons.Clock className={`h-5 w-5 ${colorClass}`} />
            <p className='px-1 font-semibold text-gray-700 text-clip'>{message}</p>
        </div>
    )
}

export default Vigencia;
