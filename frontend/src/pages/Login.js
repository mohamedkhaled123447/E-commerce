import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const Login = () => {
    const { Login } = useContext(AuthContext)
    return (
        <div>
            <form onSubmit={Login}>
                <input type='text' name='username' placeholder='Enter username' />
                <input type='password' name='password' placeholder='Enter password' />
                <input type='submit' />
            </form>
        </div>
    )
}

export default Login