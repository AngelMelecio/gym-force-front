import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';
import { useAuth } from '../../../context/authContext';
import { HOST } from '../../../constants/ENVs';

const ClientesContext = createContext();

export const useClientes = () => {
    return useContext(ClientesContext);
};

function formatClientes(clientes) {
    return clientes.map(cliente => ({
        ...cliente,
        fotografia: cliente.fotografia !== null ? HOST + cliente.fotografia : cliente.fotografia
    }))
}

export const ClientesProvider = ({ children }) => {

    const { session, notify } = useAuth()
    const { myAxios } = useAxios()
    const [allClientes, setAllClientes] = useState([])
    const API_CLIENTES_URL = 'api/clientes/'

    async function getCliente(id) {
        try {
            const cliente = await myAxios.get(API_CLIENTES_URL + id)
            return formatClientes([cliente.data])[0]
        } catch (err) {
            console.log(err)
            notify("Ocurrió un error al tratar de obtener el cliente", true);
        }
    }

    async function getAll() {
        const clientes = await myAxios.get(API_CLIENTES_URL)
        return formatClientes(clientes.data)

    }

    async function refreshAllClientes() {
        try {
            const clientes = await myAxios.get(API_CLIENTES_URL)
            setAllClientes(formatClientes(clientes.data))
        } catch (err) {
            console.log(err)
            notify("Ocurrió un error al tratar de obtener los registros", true);
        }
    }

    async function createCliente(cliente) {
        let formData = new FormData()
        Object.keys(cliente).forEach(key => {
            formData.append(key, cliente[key])
        })
        try {
            const resp = await myAxios.post(API_CLIENTES_URL, formData)
            notify(resp.data.message)
            notify("PIN de acceso: " + resp.data.pin)
        } catch (err) {
            notify("No fue posible registrar el cliente", true);
        }
    }

    async function deleteCliente(id) {
        try {
            const resp = await myAxios.delete(API_CLIENTES_URL + id);
            notify(resp.data.message)
        } catch (err) {
            notify("No fue posible eliminar el cliente", true);
        }
    }
    async function updateCliente(cliente) {
        let formData = new FormData()
        Object.keys(cliente).forEach(key => {
            if (key === 'fotografia' && !(cliente[key] instanceof File)) return
            if (cliente[key] !== null && cliente[key] !== '') formData.append(key, cliente[key])
        })

        try {
            const response = await myAxios.put(API_CLIENTES_URL + cliente.idCliente, formData);
            notify(response.data.message);
        } catch (error) {
            notify("No fue posible actualizar el cliente", true);
        }
    }

    return (
        <ClientesContext.Provider value={{
            getCliente, getAll,
            allClientes,
            refreshAllClientes,
            createCliente,
            deleteCliente,
            updateCliente

        }}>
            {children}
        </ClientesContext.Provider>
    );
};
