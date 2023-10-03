import { useState } from 'react'
import Table from '../components/Table'
import { MyIcons } from '../constants/Icons'


const PerfilPage = () => {
  const [usuarios, setUsuarios] = useState([{
    "id": 1,
    "usuario": "developerAdmin",
    "correo": "cesaaar26@gmail.com",
    "nombre": "Cesar Antonio",
    "apellidos": "Navarro Sosa",
    "is_active": true,
    "is_staff": true,
    "rol": "Administrador"
  }, {
    "id": 2,
    "usuario": "malusefi.05",
    "correo": "malusefi.05@gmail.com",
    "nombre": "Maria Trinidad",
    "apellidos": "Madrigal Quintana",
    "is_active": false,
    "is_staff": true,
    "rol": "Encargado"
  },
  {
    "id": 3,
    "usuario": "malusefi.06",
    "correo": "madrigalquintana@gmail.com",
    "nombre": "Guadalupe Angelica",
    "apellidos": "Madrigal Quintana",
    "is_active": false,
    "is_staff": true,
    "rol": "Encargado"
  },
  {
    "id": 4,
    "usuario": "malusefi.05",
    "correo": "malusefi.05@gmail.com",
    "nombre": "Maria Trinidad",
    "apellidos": "Madrigal Quintana",
    "is_active": false,
    "is_staff": true,
    "rol": "Encargado"
  },
  {
    "id": 5,
    "usuario": "malusefi.06",
    "correo": "madrigalquintana@gmail.com",
    "nombre": "Guadalupe Angelica",
    "apellidos": "Madrigal Quintana",
    "is_active": false,
    "is_staff": true,
    "rol": "Encargado"
  },{
    "id": 6,
    "usuario": "malusefi.05",
    "correo": "malusefi.05@gmail.com",
    "nombre": "Maria Trinidad",
    "apellidos": "Madrigal Quintana",
    "is_active": false,
    "is_staff": true,
    "rol": "Encargado"
  },
  {
    "id": 7,
    "usuario": "malusefi.06",
    "correo": "madrigalquintana@gmail.com",
    "nombre": "Guadalupe Angelica",
    "apellidos": "Madrigal Quintana",
    "is_active": false,
    "is_staff": true,
    "rol": "Encargado"
  },{
    "id": 8,
    "usuario": "malusefi.06",
    "correo": "madrigalquintana@gmail.com",
    "nombre": "Guadalupe Angelica",
    "apellidos": "Madrigal Quintana",
    "is_active": true,
    "is_staff": true,
    "rol": "Encargado"
  }])

  return (
    <Table
      title="Usuarios"
      path="usuarios"
      idName="id"
      titleAttrs={['nombre', 'apellidos']}
      subTitleAtrrs={['rol', 'correo']}
      photoAttr={'foto'}
      Info={(state) => {
        return state ?
          <div className='flex flex-row items-center'>
            <MyIcons.Active className="ml-2 text-sm text-emerald-500" />
            <p className='px-1 font-semibold text-clip'>Activo</p>
          </div> :
          <div className='flex flex-row items-center'>
            <MyIcons.Ghost className="ml-2 text-lg text-gray-500" />
            <p className='px-1 font-semibold text-clip'>Inactivo</p>
          </div>
      }}
      infoAttr={'is_active'}
      data={usuarios}
      setData={setUsuarios}
      onDelete={(id,element)=>{console.log(id,element)}}

    />
  )
}

export default PerfilPage