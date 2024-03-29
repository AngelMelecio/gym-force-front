import AccessoPage from "../pages/Acceso/AccessoPage";
import CarritoPage from "../pages/Carrito/CarritoPage";
import PerfilPage from "../pages/PerfilPage";
import DetailUsuarioPage from "../pages/Usuarios/DetailUsuarioPage";
import NewUsuarioPage from "../pages/Usuarios/NewUsuarioPage";
import UsuariosPage from "../pages/Usuarios/UsuariosPage";
import DetailClientePage from "../pages/Clientes/DetailClientePage";
import NewClientePage from "../pages/Clientes/NewClientePage";
import ClientesPage from "../pages/Clientes/ClientesPage";
import DetailSuscripcionPage from "../pages/Suscripciones/DetailSuscripcionPage";
import NewSuscripcionPage from "../pages/Suscripciones/NewSuscripcionPage";
import SuscripcionesPage from "../pages/Suscripciones/SuscripcionesPage";
import { MyIcons } from "./Icons";
import ProductosPage from "../pages/Productos/ProductosPage";
import NewProductoPage from "../pages/Productos/NewProductoPage";
import DetailProductoPage from "../pages/Productos/DetailProductoPage";
import ReportesPage from "../pages/Reportes/ReportesPage";
import ReportToPrint from "../pages/Carrito/components/ReportToPrint";

export const adminRoutes = [
    { path: '/acceso', element: <AccessoPage /> },
    { path: '/perfil', element: <PerfilPage /> },
    //Usuarios
    { path: '/usuarios', element: <UsuariosPage /> },
    { path: '/usuarios/0', element: <NewUsuarioPage /> },
    { path: '/usuarios/:id', element: <DetailUsuarioPage /> },
    //Clientes
    { path: '/clientes', element: <ClientesPage /> },
    { path: '/clientes/0', element: <NewClientePage /> },
    { path: '/clientes/:id', element: <DetailClientePage /> },
    { path: '/clientes/created/:idCliente', element: <ClientesPage /> },
    //Productos
    { path: '/productos/', element: <ProductosPage /> },
    { path: '/productos/0', element: <NewProductoPage /> },
    { path: '/productos/:id', element: <DetailProductoPage /> },
    //Suscripcions
    { path: '/suscripciones', element: <SuscripcionesPage /> },
    { path: '/suscripciones/0', element: <NewSuscripcionPage /> },
    { path: '/suscripciones/:id', element: <DetailSuscripcionPage /> },
    //Carrito
    { path: '/carrito', element: <CarritoPage /> },
    { path: '/carrito/:idCliente', element: <CarritoPage /> }, //nueva suscripcion
    { path: '/carrito/:idCliente/:idSuscripcion', element: <CarritoPage /> }, //renovar o pagar suscripcion
    //Rerportes
    { path: '/reportes', element: <ReportesPage /> },
    //Tests
    { path: '/report', element: <ReportToPrint /> },
]

export const employeeRoutes = [
    { path: '/acceso', element: <AccessoPage /> },
    { path: '/perfil', element: <PerfilPage /> },
    //Clientes
    { path: '/clientes', element: <ClientesPage /> },
    { path: '/clientes/0', element: <NewClientePage /> },
    { path: '/clientes/:id', element: <DetailClientePage /> },
    { path: '/clientes/created/:idCliente', element: <ClientesPage /> },,
    //Carrito
    { path: '/carrito', element: <CarritoPage /> },
    { path: '/carrito/:idCliente', element: <CarritoPage /> }, //nueva suscripcion
    { path: '/carrito/:idCliente/:idSuscripcion', element: <CarritoPage /> }, //renovar o pagar suscripcion
]



export const employeeTabs = [
    { to: '/acceso', content: 'Acceso', icon: <MyIcons.FingerPrint size={"20px"} /> },
    { to: '/carrito', content: 'Ventas', icon: <MyIcons.Cart size={"21px"} /> },
    { to: '/clientes', content: 'Clientes', icon: <MyIcons.People size={"18px"} /> },
]

export const adminTabs = [
    { to: '/suscripciones', content: 'Suscripciones', icon: <MyIcons.Calendar size={"16px"} /> },
    { to: '/productos', content: 'Productos', icon: <MyIcons.Tag size={"20px"} /> },
    { to: '/usuarios', content: 'Usuarios', icon: <MyIcons.Key size={"20px"} /> },
    { to: '/reportes', content: 'Reportes', icon: <MyIcons.Report size={"24px"} /> },
]

export const baseTabs = [
    { to: '/perfil', content: 'Perfil', icon: <MyIcons.Profile size={"18px"} /> },
    { to: '/exit', content: 'Cerrar Sesión', icon: <MyIcons.Exit size={"17px"} /> }
]
