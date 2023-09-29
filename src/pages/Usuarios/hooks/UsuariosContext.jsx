import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { fetchAPI } from '../../../utils/fetchApiService';

const UsuariosContext = createContext();

export const useUsuarios = () => {
    return useContext(UsuariosContext);
};

export const UsuariosProvider = ({ children }) => {
    

    const { session } = useAuth()

    async function getUser(id) {
        let options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + session?.access
            }
        }
        const usuario = await fetchAPI(`users/${id}/`, options)
        return usuario
    }

    return (
        <UsuariosContext.Provider value={{
            getUser
        }}>
            {children}
        </UsuariosContext.Provider>
    );
};
