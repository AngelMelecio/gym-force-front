import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';

const AccesoContext = createContext();

export const useAcceso = () => {
  return useContext(AccesoContext);
};

export const AccesoProvider = ({ children }) => {

  const { myAxios } = useAxios()

  async function register(values) {
    try {
      let response = await myAxios.post('api/registros/', values)
      let { nombre, apellidos } = response.data.registro.idVenta.idCliente
      let { fechaFin } = response.data.registro
      return ({message:`Bienvenido ${nombre} ${apellidos}, tu paquete vence: ${fechaFin}`})

    } catch (e) {
      if (e.response) {
        switch (e.response.status) {
          case 400:
            throw new Error("Formato de PIN incorrecto");
          case 404:
            throw new Error("Cliente no encontrado");
          case 409:
            throw new Error("Suscripción Vencida");
          default:
            throw new Error("Algo salió mal");
        }
      }
      else {
        console.log(e)
        throw new Error("Error de conexión");
      }
    }
  }

  return (
    <AccesoContext.Provider value={{ register }}>
      {children}
    </AccesoContext.Provider>
  );
};
