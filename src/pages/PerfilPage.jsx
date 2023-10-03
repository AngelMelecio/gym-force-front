import React from 'react'
import { useEffect } from 'react'
import { useUsuarios } from './Usuarios/hooks/UsuariosContext'

const PerfilPage = () => {

  const { refreshAllUsers, allUsers } = useUsuarios()

  useEffect(() => {
    async function load() {
      console.log('Effect Perfil')
      await refreshAllUsers()
    }
    load()
  }, [])

  return (
    <div>{
      JSON.stringify(allUsers)
    }</div>
  )
}

export default PerfilPage