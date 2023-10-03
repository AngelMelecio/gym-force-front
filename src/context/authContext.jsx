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
        const auth = localStorage.getItem('auth')
        return auth ? JSON.parse(auth) : {
            "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjk2MDI2NzAzLCJpYXQiOjE2OTYwMjU4MDMsImp0aSI6IjMwNGQwZTU1NWIyYzRjMzlhZDFhYjIzYmYyZTFiNDA3IiwidXNlcl9pZCI6MX0.8WvzvRtcEwdlY8WDfLfo2mcTSiQpFErb8q9DVhhrtbo",
            "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5NjExMjIwMywiaWF0IjoxNjk2MDI1ODAzLCJqdGkiOiI5NzBmMTg0NGY2OGM0MTI1YWY4MDJiYjdhNWZjOTdlNCIsInVzZXJfaWQiOjF9.531Tb219YH_mpRrc9Ep4YoMdF5PNgFm9oVZ0v3Qj1DM",
            "usuario": {
                "id": 1,
                "usuario": "developerAdmin",
                "correo": "cesaaar26@gmail.com",
                "nombre": "Cesar Antonio",
                "apellidos": "Navarro Sosa",
                "is_active": true,
                "is_staff": true,
                "rol": "Administrador"
            },
            "message": "Inicio de Sesion Existoso"
        }
    });

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let fourMinutes = 1000 * 60 * 4
        let interval = setInterval(() => {
            if (session)
                refreshToken()
        }, fourMinutes)
        return () => clearInterval(interval)

    }, [session, loading])

    const signIn = async (values) => {
        //console.log(values)
        const response = await fetch(`http://127.0.0.1:8000/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })
        console.log("resp ",response)
        let data = await response.json()
        //console.log(data)
        if (!response.ok) {
            throw new Error(data.error)
        }
        setSession(data)
        localStorage.setItem('auth', JSON.stringify(data))
    }

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
        console.log('Successfully token refreshed')
        let newSession = { ...session, access: data.access, refresh: data.refresh }
        setSession(newSession)
        localStorage.setItem('auth', JSON.stringify(newSession))
    }

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
