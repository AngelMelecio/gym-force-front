import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';
import { useAuth } from '../../../context/authContext';

const ProductosContext = createContext();

export const useProductos = () => {
    return useContext(ProductosContext);
};

function formatProductos(productos) {
    return productos.map(p => ({
        ...p,
        id: `producto_${p.idProducto}`,
        type: 'producto',
        cantidad: 0,
    }))
}

export const ProductosProvider = ({ children }) => {

    const { session, notify } = useAuth()
    const { myAxios } = useAxios()
    const [allProductos, setAllProductos] = useState([])
    const API_PRODUCTOS_URL = 'api/productos/'

    async function getProducto(id) {
        const resp = await myAxios.get(API_PRODUCTOS_URL + id)
        return formatProductos([resp.data])[0]
    }

    async function getAll() {
        const resp = await myAxios.get(API_PRODUCTOS_URL)
        return formatProductos(resp.data)

    }

    async function refreshAllProductos() {
        try {
            const resp = await myAxios.get(API_PRODUCTOS_URL)
            setAllProductos(formatProductos(resp.data))
        } catch (err) {
            notify("No fue posible obtener los registros", true);
        }
    }

    async function createProducto(producto) {
        let formData = new FormData()
        Object.keys(producto).forEach(key => {
            formData.append(key, producto[key])
        })
        try {
            const resp = await myAxios.post(API_PRODUCTOS_URL, formData)
            notify(resp.data.message)
        } catch (err) {
            console.log(err)
            notify(err.response.data.message, true);
        }
    }

    async function deleteProducto(list) {
        for (let i = 0; i < list.length; i++) {
            try {
                const resp = await myAxios.delete(API_PRODUCTOS_URL + list[i])
                notify(resp.data.message)
            } catch (err) {
                console.log(err)
                notify('No fue posible eliminar el producto', true)
            }
        }
    }

    async function updateProducto(producto) {
        let formData = new FormData()
        Object.keys(producto).forEach(key => {
            if (producto[key] !== null && producto[key] !== '') formData.append(key, producto[key])
        })
        try {
            const response = await myAxios.put(API_PRODUCTOS_URL + producto.idProducto, formData);
            notify(response.data.message);
        } catch (error) {
            notify("No fue posible actualizar el producto", true);
        }
    }


    return (
        <ProductosContext.Provider value={{
            getProducto, getAll,
            allProductos,
            refreshAllProductos,
            createProducto,
            deleteProducto,
            updateProducto,
        }}>
            {children}
        </ProductosContext.Provider>
    );
};
