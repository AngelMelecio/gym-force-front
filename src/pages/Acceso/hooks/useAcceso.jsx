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

  async function register(values) {
    try {
      let response = await myAxios.post('api/registros/', values)
      let { nombre, apellidos, fotografia } = response.data.registro.idVenta.idCliente
      let { fechaFin } = response.data.registro

      // Parse fechaFin to a Date object
      fechaFin = new Date(fechaFin);
       // Calculate the difference in days, rounding up to include the current day
       let diferenciaMs = fechaFin - new Date();
       let diasRestantes = Math.floor(diferenciaMs / (1000 * 60 * 60 * 24));

      let { color, background, info } = getColor(diasRestantes)
      return ({
        image: HOST + fotografia,
        message: `Bienvenido ${nombre} ${apellidos}`,
        info,
        background,
        color
      })

    } catch (e) {
      throw e
    }
  }

  return (
    <AccesoContext.Provider value={{ register }}>
      {children}
    </AccesoContext.Provider>
  );
};
