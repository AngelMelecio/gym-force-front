import { Navigate, Route, Routes } from 'react-router-dom'
import Grid from './components/Grid'
import AppBar from './components/navigation/AppBar'
import AppRouter from './components/navigation/AppRouter'
import { useAuth } from './context/authContext'
import LoginPage from './pages/LoginPage'
function App() {

  const { session } = useAuth()

  return (
    session ? (
      <div className='relative flex flex-row'>
        <AppBar />
        <AppRouter />
      </div>
    ) : (
      <Routes>
        <Route exact path="*" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    )
  )
}

export default App
