import axios from 'axios';
import React, { createContext, useContext } from 'react';
import { useAuth } from './authContext';

const AxiosContext = createContext();

export const useAxios = () => {
    return useContext(AxiosContext);
};

export const AxiosProvider = ({ children }) => {

    /**
     * This could be a way to avoid unnecessary refresh token calls
     * when multiple requests are made at the same time
   
    let isRefreshing = false;
    let failedQueue = [];

    const addToQueue = (request) => {
        failedQueue.push(request);
    }
    
    const processQueue = (error, token = null) => {
        failedQueue.forEach(prom => {
            if (error) {
                prom.reject(error);
            } else {
                prom.resolve(token);
            }
        });
        
        failedQueue = [];
    }   
    */

    const { signOut } = useAuth()

    const myAxios = axios.create({
        baseURL: "http://localhost:8080/",
        headers: {
            "Content-type": "application/json",
        },
    })

    /**
     * Try to get the token from the local storage
     * and set it as the default header
     */
    myAxios.interceptors.request.use(
        async (config) => {
            const session = localStorage.getItem('auth')
            if (session) {
                let acces_token = JSON.parse(session).access
                config.headers["Authorization"] =
                    `Bearer ${acces_token}`;
            }
            return config;
        },
        (error) => {

            return Promise.reject(error);
        }
    )

    /**
     * This interceptor refreshes the token if it is expired
     */
    myAxios.interceptors.response.use(
        (response) => {
            return response;
        },
        async function (error) {
            const originalRequest = error.config;
            if (
                error.response.status === 401
                && !originalRequest._retry
                && originalRequest.url !== 'token/refresh/'
            ) {
                originalRequest._retry = true;

                try {
                    const { access, refresh } = await refreshToken();
                    let session = JSON.parse(localStorage.getItem('auth'))
                    localStorage.setItem('auth', JSON.stringify({ ...session, access, refresh }));

                    myAxios.defaults.headers.common[
                        "Authorization"
                    ] = `Bearer ${access}`;

                    return myAxios(originalRequest);

                } catch (refreshTokenError) {
                    signOut()
                    return Promise.reject(refreshTokenError);
                }
            }
            return Promise.reject(error);
        }
    );

    const refreshToken = async () => {
        let session = JSON.parse(localStorage.getItem('auth'))
        const resp = await myAxios.post(
            'token/refresh/',
            { refresh: session.refresh }
        )
        return resp.data
    }

    return (
        <AxiosContext.Provider value={{ myAxios }}>
            {children}
        </AxiosContext.Provider>
    );
};
