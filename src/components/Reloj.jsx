import React, { useState, useEffect } from 'react';

const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const Reloj = () => {
    const [horaActual, setHoraActual] = useState(new Date().toLocaleTimeString());

    useEffect(() => {
        const intervalo = setInterval(() => {
            setHoraActual(new Date().toLocaleTimeString());
        }, 1000);

        return () => {
            clearInterval(intervalo);
        };
    }, []);
    
    const fecha = new Date();

    const dia = fecha.getDate();
    const mes = meses[fecha.getMonth()];
    const año = fecha.getFullYear();

    return (
        <div className='flex-col total-center'>
            <h1 className='text-[3rem] tracking-[0.3rem] text-gray-600'>{horaActual}</h1>
            <p className='text-[1.7rem] text-gray-600'>
             {dia} - {mes} - {año}   
            </p>
        </div>
    );
}

export default Reloj;