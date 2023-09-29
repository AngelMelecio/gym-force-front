import React, { useEffect } from 'react'
import { useUsuarios } from './hooks/UsuariosContext'

const DetailUsuarioPage = () => {
  
  const {getUser} = useUsuarios()

  useEffect(()=>{

    async function load(){
      const usuario = await getUser(1)
      console.log(usuario)
    }
    load()
  },[])

  return (
    <div>DetailUsuarioPage</div>
  )
}

export default DetailUsuarioPage