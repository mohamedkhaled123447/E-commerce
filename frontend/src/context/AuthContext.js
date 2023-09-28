import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
const AuthContext = createContext()
export default AuthContext
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [AccessToken, setAccessToken] = useState(() => localStorage.getItem('AccessToken') ? localStorage.getItem('AccessToken') : null)
    const [RefreshToken, setRefreshToken] = useState(() => localStorage.getItem('RefreshToken') ? localStorage.getItem('RefreshToken') : null)
    const [User, setUser] = useState(() => localStorage.getItem('AccessToken') ? jwt_decode(localStorage.getItem('AccessToken')) : null)
    const Login = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/Accounts/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAccessToken(data.access)
            setRefreshToken(data.refresh)
            setUser(jwt_decode(data.access))
            localStorage.setItem('AccessToken', JSON.stringify(data.access))
            localStorage.setItem('RefreshToken', JSON.stringify(data.refresh))
            navigate('/')
        } else {
            alert('Error')
        }

    }
    const Logout = () => {
        setUser(null)
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')
        navigate('/login')
    }
    const UpdateToken = async () => {
        const response = await fetch('http://localhost:8000/Accounts/api/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': RefreshToken })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAccessToken(data.access)
            setUser(jwt_decode(data.access))
            localStorage.setItem('AccessToken', JSON.stringify(data.access))
        } else {
            Logout()
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (User)
                UpdateToken()
        }, 10000);
        return () => clearInterval(interval);

    }, [User])
    const ContextData = {
        Login: Login,
        Logout: Logout,
        User: User
    }
    return (
        <AuthContext.Provider value={ContextData}>
            {children}
        </AuthContext.Provider>
    );
};
