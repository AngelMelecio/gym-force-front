import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';

const ReportesContext = createContext();

export const useReportes = () => {
    return useContext(ReportesContext);
};

export const ReportesProvider = ({ children }) => {

    const { myAxios } = useAxios()
    
    

    return (
        <ReportesContext.Provider value={{
            
        }}>
            {children}
        </ReportesContext.Provider>
    );
};
