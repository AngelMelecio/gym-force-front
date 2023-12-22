import React from 'react';

const SuscripcionesList = ({ columns, data, renderFunctionColumn }) => {
    return (

        <div className='flex flex-col items-center w-full h-full px-6'>
            {/* Encabezado de la tabla */}
            <div className='flex flex-row justify-between w-full border-b-2'>
                {columns.map((column, i) => (
                    <div key={`header_${i}`} className='w-full mx-1 my-2 text-base font-semibold text-center text-blue-900'>
                        {column.label}
                    </div>
                ))}
                {renderFunctionColumn && <div className='w-full mx-1 my-2 text-base font-semibold text-center text-blue-900'>{'Opciones'}</div>}
            </div>

            {/* Filas de datos */}
            {data.map((item, i) => (
                <div key={`row_${i}`} className='flex flex-row items-center justify-between w-full h-12 border-b-2 cursor-pointer hover:bg-slate-100'>
                    {columns.map((column, j) => (
                        <div key={`data_${i}_${j}`} className='w-full mx-1 text-lg font-semibold text-center text-gray-600'>
                            {column.render ? column.render(item) : item[column.attribute]}
                        </div>
                    ))}
                    {renderFunctionColumn && renderFunctionColumn(item, i)}
                </div>
            ))}
        </div>
    );
};

export default SuscripcionesList;
