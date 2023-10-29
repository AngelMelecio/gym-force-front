import React, { createContext, useContext, useState } from 'react';
import { useAxios } from '../../../context/axiosContext';

const CarritoContext = createContext();

export const useCarrito = () => {
    return useContext(CarritoContext);
};

export const CarritoProvider = ({ children }) => {

    const { myAxios } = useAxios()

    async function purchase(values) {
        try{
            console.log(values)
            myAxios.post('api/ventas/', values)
        }catch(e){
            if( e.respose )
            {
                throw new Error(e.response.status)
            }
        }
    }

    return (
        <CarritoContext.Provider
            value={{
                purchase

            }}>
            {children}
        </CarritoContext.Provider>
    );
};
