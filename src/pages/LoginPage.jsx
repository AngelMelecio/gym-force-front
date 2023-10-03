import React, { useState } from 'react'
import Inpt from '../components/inputs/Inpt'
import { useFormik } from 'formik'
import { useAuth } from '../context/authContext'
import GymLogo from '../assets/GymLogoShadow.svg'

const LoginPage = () => {

  const { signIn } = useAuth()

  const [loading, setLoading] = useState(false)

  const authFormik = useFormik({
    initialValues: {
      usuario: '',
      password: ''
    },
    validate: (values) => {
      const errors = {}
      if (!values.usuario) errors.usuario = "Campo Obligatorio"
      return errors
    },
    onSubmit: async (values) => {
      try {
        setLoading(true)
        await signIn(values)
      } catch (e) {
        console.log("Catched: ", e)
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-slate-200'>
      <div className='total-center z-20 relative appear w-[230px] h-[150px]'>
        <img className='absolute w-full h-full -bottom-14' src={GymLogo} alt="" />
      </div>
      <div className="p-10 bg-white rounded-lg shadow-md emerge">
        <form onSubmit={authFormik.handleSubmit}>
          <h1 className='text-2xl font-extrabold tracking-wider text-center text-blue-800 pb-7 '>Inicia Sesión</h1>
          <Inpt
            name="usuario"
            formik={authFormik}
            label="Usuario" />
          <Inpt
            name="password"
            formik={authFormik}
            label="Contraseña"
            type="password" />
          <input
            disabled={loading}
            type='submit'
            value={loading ? "Ingresando..." : "Ingresar"}
            className={`w-full text-lg py-2 mt-2 btn-naranja rounded-lg`} />
        </form>
      </div>
    </div>
  )
}

export default LoginPage