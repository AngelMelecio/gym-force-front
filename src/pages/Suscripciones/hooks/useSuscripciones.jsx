import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';

const SuscripcionesContext = createContext();

export const useSuscripciones = () => {
    return useContext(SuscripcionesContext);
};

export const SuscripcionesProvider = ({ children }) => {

    const { myAxios } = useAxios()

    async function getAll() {
        const Suscripciones = await myAxios.get('api/suscripciones')
        return Suscripciones.data.map(s => ({
            ...s,
            id: `paquete_${s.idSuscripcion}`,
            tipo: 'paquete'
        }))
    }

    async function getOne(id) {
        const res = await myAxios.get(`api/suscripciones/${id}`)
        return res.data
    }

    return (
        <SuscripcionesContext.Provider
            value={{
                getAll,
                getOne
            }}>
            {children}
        </SuscripcionesContext.Provider>
    );
};
