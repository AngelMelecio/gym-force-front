import React from 'react';
import { useState } from 'react';
import Calendar from 'react-calendar';
import { MyIcons } from '../constants/Icons';
import 'react-calendar/dist/Calendar.css';

const CalendarModal = ({
    initialDate,
    onDateSelect,
    onCancel,
    onConfirm,
    onClose,
    loading
}) => {
    

return (
    <div className='absolute z-20 w-full h-screen appear gray-trans total-center'>
        <div className='w-1/2 mx-5 bg-white rounded-lg shadow-md sm:mx-28 md:mx-48 emerge'>
            <button
                disabled={loading}
                onClick={onClose}
                className='w-10 h-10 rounded-tl-lg rounded-br-lg total-center btn-neutral'>
                <MyIcons.Close size="25px" className='text-gray-500' />
            </button>
            <div className='px-5 pb-10'>
                <h3 className='pb-5 text-2xl font-extrabold text-center text-blue-950'>{'Selecciona la nueva fecha de vencimiento'}</h3>
                <div className='flex flex-row justify-center h-full'>
                    <Calendar
                        minDate={new Date(initialDate)}
                        onChange={(date) => console.log(date)}
                        locale='es-ES'
                        className='w-3/4 m-2 border-2 border-gray-300 rounded-lg shadow-md bg-slate-50'
                    />

                </div>

            </div>

            <div className='flex'>
                <button
                    disabled={loading}
                    onClick={onCancel}
                    className='flex-grow font-semibold border-t rounded-bl-lg h-14 total-center btn-neutral '>
                    Cancelar
                </button>
                <button
                    disabled={loading}
                    onClick={onConfirm}
                    className={`flex-grow rounded-br-lg h-14 total-center btn-naranja`}>
                    {loading ? "Confirmando..." : "Confirmar"}
                </button>
            </div>
        </div>
    </div>
)
}
export default CalendarModal;
