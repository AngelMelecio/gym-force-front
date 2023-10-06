import React, { createContext, useContext, useState } from 'react';
import { useAuth } from '../../../context/authContext';
import { fetchAPI } from '../../../utils/fetchApiService';
import { useAxios } from '../../../context/axiosContext';
import { HOST } from '../../../constants/ENVs';

const UsuariosContext = createContext();

export const useUsuarios = () => {
    return useContext(UsuariosContext);
};

function formatUsers(users) {
    return users.map(user => ({
        ...user,
        fotografia: HOST + user.fotografia
    }))
}

export const UsuariosProvider = ({ children }) => {

    const { session } = useAuth()
    const { myAxios } = useAxios()
    const [allUsers, setAllUsers] = useState([])

    async function getUser(id) {
        const resp = await myAxios.get(`users/${id}`)
        return resp.data
    }

    async function refreshAllUsers() {
        try {
            const resp = await myAxios.get('users/')
            setAllUsers(formatUsers(resp.data))
        } catch (err) {
            console.log(err)
        }
    }

    async function createUsuario(user) {

        let formData = new FormData()
        Object.keys(user).forEach(key => {
            formData.append(key, user[key])
        })

        try {
            const resp = await myAxios.post('users/', formData)
            return resp.data
        } catch (err) {
            console.log(err)
        }
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
    return (
        <UsuariosContext.Provider value={{
            getUser,
            allUsers,
            refreshAllUsers,
            createUsuario,
        }}>
            {children}
        </UsuariosContext.Provider>
    );
};
