import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';

const ProductosContext = createContext();

export const useProductos = () => {
    return useContext(ProductosContext);
};

export const ProductosProvider = ({ children }) => {

    const { myAxios } = useAxios()

    async function getAll() {
        let productos = await myAxios.get('api/productos')
        return productos.data.map(p => ({
            ...p,
            id: `producto_${p.idProducto}`,
            tipo: 'producto',
            cantidad:0,
        }))
    }

    return (
        <ProductosContext.Provider value={{
            getAll
        }}>
            {children}
        </ProductosContext.Provider>
    );
};
