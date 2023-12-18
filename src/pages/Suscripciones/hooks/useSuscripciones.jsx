import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';
import { useAuth } from '../../../context/authContext';

const SuscripcionesContext = createContext();

export const useSuscripciones = () => {
    return useContext(SuscripcionesContext);
};

function formatSuscripciones(suscripciones) {
    return suscripciones.map(s => ({
        ...s,
        id: `paquete_${s.idSuscripcion}`,
        type: 'paquete'
    }))
}

export const SuscripcionesProvider = ({ children }) => {

    const { session, notify } = useAuth()
    const { myAxios } = useAxios()
    const [allSuscripciones, setAllSuscripciones] = useState([])
    const API_SUSCRIPCIONES_URL = 'api/suscripciones/'


    async function getSuscripcion(id) {
        const resp = await myAxios.get(API_SUSCRIPCIONES_URL + id)
        return formatSuscripciones([resp.data])[0]
    }

    async function getAll() {
        const resp = await myAxios.get(API_SUSCRIPCIONES_URL)
        return formatSuscripciones(resp.data)
    }

    async function refreshAllSuscripciones() {
        try {
            const resp = await myAxios.get(API_SUSCRIPCIONES_URL)
            setAllSuscripciones(formatSuscripciones(resp.data))
        } catch (err) {
            notify("No fue posible obtener los registros", true);
        }
    }

    async function createSuscripcion(suscripcion) {
        let formData = new FormData()
        Object.keys(suscripcion).forEach(key => {
            formData.append(key, suscripcion[key])
        })
        try {
            const resp = await myAxios.post(API_SUSCRIPCIONES_URL, formData)
            notify(resp.data.message)
        } catch (err) {
            console.log(err)
            notify(err.response.data.message, true);
        }
    }

    async function deleteSuscripcion(list) {
        for (let i = 0; i < list.length; i++) {
            try {
                const resp = await myAxios.delete(API_SUSCRIPCIONES_URL + list[i])
                notify(resp.data.message)
            } catch (err) {
                console.log(err)
                notify('No fue posible eliminar la suscripcion', true)
            }
        }
    }

    async function updateSuscripcion(suscripcion) {
        let formData = new FormData()
        Object.keys(suscripcion).forEach(key => {
            if (suscripcion[key] !== null && suscripcion[key] !== '') formData.append(key, suscripcion[key])
        })
        try {
            const resp = await myAxios.put(API_SUSCRIPCIONES_URL + suscripcion.idSuscripcion, formData)
            notify(resp.data.message)
        } catch (err) {
            console.log(err)
            notify("No fue posible actualizar la suscripcion", true);
        }
    }

    async function aplazarDetalleSuscripcion(id, ff) {
        let formData = new FormData();
        formData.append('fechaFin', ff);
    
        try {
            const resp = await myAxios.put('api/detalleSuscripcionNft/' + id, formData);
            notify(resp.data.message);
        } catch (err) {
            console.log(err);
            notify("No fue posible actualizar la suscripcion", true);
        }
    }
    

    

    return (
        <SuscripcionesContext.Provider
            value={{
                getSuscripcion, getAll,
                allSuscripciones,
                refreshAllSuscripciones,
                createSuscripcion,
                deleteSuscripcion,
                updateSuscripcion,
                aplazarDetalleSuscripcion,
            }}>
            {children}
        </SuscripcionesContext.Provider>
    );
};
