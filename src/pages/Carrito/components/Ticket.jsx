import React from 'react'

const Ticket = ({ title, data, onConfirm }) => {
  return (
    <div className='absolute z-20 w-full h-screen appear gray-trans total-center'>
      <div className='w-full mx-5 bg-white rounded-lg shadow-md sm:mx-28 md:mx-48 emerge'>
        <div className='p-5'>
          <h3 className='text-2xl font-extrabold text-center text-blue-950'>{title}</h3>
          <p className='text-center text-gray-700 text-md'>
            {new Date(data.fecha).toLocaleString()}
          </p>
          <div className='px-2 py-4'>
            <div className='flex flex-row justify-between'>
              <p className="text-lg text-gray-700 text-start">Te atendió:</p>
              <p className="text-lg text-gray-700 text-end ">{data.usuario}</p>
            </div>
            <div className='flex flex-row justify-between'>
              <p className="text-lg text-gray-700 text-start">ID de la venta:</p>
              <p className="text-lg text-gray-700 text-end ">{data.idVenta}</p>
            </div>
          </div>
          <table className='w-full text-center'>
            <thead>
              <tr className='text-sm font-semibold text-gray-700'>
                <th>Cantidad</th>
                <th>Descripción</th>
                <th>P. Unit.</th>
                <th>Importe</th>
              </tr>
            </thead>
            <tbody className='text-lg font-semibold text-gray-700'>
              {data.detallesSuscripcion?.map((dtll, i) => <tr key={`DTLL_S_${i}`}>
                <td> 1 </td>
                <td> {dtll.nombreSuscripcion} </td>
                <td> ${(Number(dtll.precio)).toFixed(2)} </td>
                <td> ${(Number(dtll.precio)).toFixed(2)} </td>
              </tr>)}
              {data.detallesVenta?.map((dtll, i) => <tr key={`DTLL_${i}`}>
                <td> {dtll.cantidad} </td>
                <td> {dtll.nombreProducto} </td>
                <td> {dtll.precioVenta} </td>
                <td> ${(Number(dtll.cantidad) * Number(dtll.precioVenta)).toFixed(2)} </td>
              </tr>)}
            </tbody>
          </table>
        </div>
        <div className='flex'>
          <button
            onClick={onConfirm}
            className={`flex-grow rounded-br-lg h-14 total-center btn-naranja`}>
            {"Confirmar"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Ticket