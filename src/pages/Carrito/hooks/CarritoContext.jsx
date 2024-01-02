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
            let response = await myAxios.post('api/ventas/', values)
            return response.data

        }catch(e){
            console.log('cachado',e )
            if( e.response )
            {
                throw new Error(e.response.data.error)
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
