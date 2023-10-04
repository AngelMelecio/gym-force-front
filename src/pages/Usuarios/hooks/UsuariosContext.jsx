import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { fetchAPI } from '../../../utils/fetchApiService';
import { useAxios } from '../../../context/axiosContext';

const UsuariosContext = createContext();

export const useUsuarios = () => {
    return useContext(UsuariosContext);
};

export const UsuariosProvider = ({ children }) => {
    
    const { session } = useAuth()
    const { myAxios } = useAxios()
    const [allUsers, setAllUsers] = useState([])

    async function getUser(id) {
        const resp = await myAxios.get(`users/${id}`)
        return resp.data
    }
    /*
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
     */

    async function refreshAllUsers(){
        let options = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + session?.access
            }
        }
        const newUsuarios = await fetchAPI('users/', options)
        setAllUsers(newUsuarios)
    }

    return (
        <UsuariosContext.Provider value={{
            getUser,
            allUsers,
            refreshAllUsers,
        }}>
            {children}
        </UsuariosContext.Provider>
    );
};