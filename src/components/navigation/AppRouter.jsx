import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuth } from '../../context/authContext'
import { adminRoutes, employeeRoutes } from '../../constants/appRoutes'

const AppRouter = () => {
    const { session } = useAuth()
    const route = session?.usuario?.rol === 'Administrador' ? adminRoutes : employeeRoutes
    return (
        <Routes>
            <Route exact path="*" element={<Navigate replace to="/acceso" />} />
            {
                route.map((route, i) => <Route key={"ROUTE_" + i} path={route.path} element={route.element} />)
            }
        </Routes>
    )
}

export default AppRouter