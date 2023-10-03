import React, { createContext, useContext, useEffect, useState } from 'react';
import { HOST } from '../constants/ENVs';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate()
    
    const [session, setSession] = useState(() => {
        let auth = localStorage.getItem('auth')
        return auth ? JSON.parse(auth) : null
    });


    const signIn = async (values) => {
        const response = await fetch(`${HOST}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        let data = await response.json()
        if (!response.ok) {
            throw new Error(data.error)
        }
        setSession(data)
        localStorage.setItem('auth', JSON.stringify(data))
    }
    
    /*
    const refreshToken = async () => {
        const response = await fetch(HOST + '/token/refresh/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh: session.refresh })
        })
        let data = await response.json()
        if (!response.ok) {
            signOut()
            throw new Error(data.error)
        }
        let newSession = { ...session, access: data.access, refresh: data.refresh }
        setSession(newSession)
        localStorage.setItem('auth', JSON.stringify(newSession))
        if (loading) setLoading(false)
    }
    */

    const signOut = () => {
        setSession(null)
        localStorage.removeItem('auth')
        navigate('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                session,
                setSession,
                signIn,
                signOut
            }}>
            {children}
        </AuthContext.Provider>
    );
};
