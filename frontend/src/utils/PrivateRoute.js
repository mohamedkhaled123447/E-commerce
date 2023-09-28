import { Outlet, Navigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
const PrivateRoute = () => {
    const { User } = useContext(AuthContext)
    return (
        User ? <Outlet /> : <Navigate to='/login' />
    )
}
export default PrivateRoute