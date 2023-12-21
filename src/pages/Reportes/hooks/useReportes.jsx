import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';

const ReportesContext = createContext();

export const useReportes = () => {
    return useContext(ReportesContext);
};

export const ReportesProvider = ({ children }) => {

    const { myAxios } = useAxios()
    const API_REPORTES_VENTAS_URL = 'api/reporte_ventas/'
    const API_REPORTE_ASISTENCIA_URL = 'api/registros/'
    

    async function getVentas(restrictions) {
        let fecha_inicio = restrictions.fecha_inicio
        let fecha_fin = restrictions.fecha_final
        const resp = await myAxios.get(API_REPORTES_VENTAS_URL+fecha_inicio+"/"+fecha_fin+"/")
        return (resp.data)
    }

    async function getAsistencia(restrictions) {
        let fecha_inicio = restrictions.fecha_inicio
        let fecha_fin = restrictions.fecha_final
        const resp = await myAxios.get(API_REPORTE_ASISTENCIA_URL+fecha_inicio+"/"+fecha_fin+"/")
        return (resp.data)
    }
    

    return (
        <ReportesContext.Provider value={{
            getVentas,
            getAsistencia
        }}>
            {children}
        </ReportesContext.Provider>
    );
};
