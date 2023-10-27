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
    const mes = fecha.getMonth() + 1;
    const año = fecha.getFullYear();

    return (
        <div className='flex-col mt-6 total-center'>
            <p className='translate-y-[0.5rem] tracking-widest text-[1.5rem] text-gray-600'>
                {dia} / {mes} / {año}
            </p>
            <h1 className='display text-[4rem] tracking-[0.3rem] text-gray-600'>{horaActual}</h1>
        </div>
    );
}

export default Reloj;