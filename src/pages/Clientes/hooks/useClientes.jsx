import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';

const ClientesContext = createContext();

export const useClientes = () => {
    return useContext(ClientesContext);
};

export const ClientesProvider = ({ children }) => {

    const { myAxios } = useAxios()
    async function getAll() {
        const response = await myAxios.get('api/clientes')
        return response.data
    }

    return (
        <ClientesContext.Provider value={{ 
            getAll,
         }}>
            {children}
        </ClientesContext.Provider>
    );
};
