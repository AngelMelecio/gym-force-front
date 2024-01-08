import { useNavigate } from "react-router-dom"
import { HOST } from "../constants/ENVs"
import { MyIcons } from "../constants/Icons"
import { useAuth } from "../context/authContext"

const PerfilPage = () => {

  const { session } = useAuth()
  const navigate  = useNavigate()

  return (
    <div className="relative flex w-full h-screen bg-neutral-100">
      <div id="page" className="relative flex flex-col w-full h-full p-4 ">
        <h1 className="pb-4 text-3xl font-bold text-blue-900">Mi Perfil</h1>
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg ">
          <div className="flex items-center p-6">
            <div className="mr-5 overflow-hidden rounded-full w-36 h-36">
              <img className="object-cover" src={HOST + session.usuario.fotografia} alt="" />
            </div>
            <div>
              <div className="flex items-center">
                <h2 className="text-2xl font-bold text-blue-900">
                  {session.usuario.nombre} &nbsp;
                  {session.usuario.apellidos}
                </h2>
                {session.usuario.is_staff &&
                  <button
                    onClick={() => navigate('/usuarios/' + session.usuario.id)}
                    className="ml-2 text-gray-400 rounded-full w-7 h-7 total-center btn-neutral">
                    <MyIcons.Edit size="18px" />
                  </button>
                }
              </div>
              <h3 className="text-lg font-medium text-gray-600 ">{session.usuario.rol}</h3>
              <h4 className="pt-1 text-sm font-normal text-gray-600">
                {session.usuario.is_active ?
                  <div className="flex items-center">
                    <MyIcons.Active size="16px" className="mr-1 text-green-500" />
                    Activo
                  </div> :
                  <div className="flex items-center">
                    <MyIcons.Ghost size="18px" className="mr-1 text-gray-500" />
                    Inactivo
                  </div>}
              </h4>
            </div>
          </div>
          <div className="p-2 border-t border-b">
            {
              [{ label: "Usuario", value: session.usuario.usuario },
              { label: "Correo", value: session.usuario.correo },].map((v, i) =>
                <div className="flex items-center px-5 py-2" key={i}>
                  <p className="text-sm text-gray-500">
                    {v.label}: &nbsp;
                  </p>
                  <p className="text-base font-medium text-blue-900">
                    {v.value}
                  </p>
                </div>)
            }
          </div>
        </div>
      </div>
    </div>

  )
}

export default PerfilPage