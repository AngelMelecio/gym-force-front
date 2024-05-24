import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';
import { HOST } from '../../../constants/ENVs';
import { getColor } from '../../../constants/getColors';
import { nuevaFecha } from '../../../constants/nuevaFecha';

const AccesoContext = createContext();

export const useAcceso = () => {
  return useContext(AccesoContext);
};

export const AccesoProvider = ({ children }) => {

  const { myAxios } = useAxios()

  function formatAccessResponse(data) {
    let {tipo} = data.idSuscripcion;
    let {frase} = data;
    let { nombre, apellidos, fotografia } = data.idVenta.idCliente;
    let { fechaFin } = data;
    // Parse fechaFin to a Date object
    fechaFin = nuevaFecha(fechaFin);
    // Calculate the difference in days, rounding up to include the current day
    let diferenciaMs = fechaFin - (new Date().setHours(0, 0, 0, 0));
    let diasRestantes = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));
    let { background, info, message, colorMessage, colorInfo} = getColor(diasRestantes,tipo,frase);
    let obj = {
      image: HOST + fotografia,
      message: message+=` ${nombre} ${apellidos}`,
      info,
      background,
      colorMessage,
      colorInfo
    }
    return obj;
  }

  async function register(values) {
    try {
      let response = await myAxios.post('api/registros/', values)
      return formatAccessResponse(response.data.registro)

    } catch (e) {
      throw e
    }
  }

  return (
    <AccesoContext.Provider value={{ register, formatAccessResponse }}>
      {children}
    </AccesoContext.Provider>
  );
};
