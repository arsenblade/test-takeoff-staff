import { Route, Routes } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { privateRoutes, publicRoutes } from './Routes'

const AppRouter = () => {
  const {user} = useAuth()
  return (
    <Routes>
      {publicRoutes.map(({Component, path}) => <Route key={path} path={path} element={<Component />} />)}
      {user && privateRoutes.map(({Component, path}) => <Route key={path} path={path} element={<Component />} />)}
    </Routes>
  )
}

export default AppRouter