import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { gapi } from 'gapi-script';
const AuthContext = createContext()
export default AuthContext
export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [AccessToken, setAccessToken] = useState(() => localStorage.getItem('AccessToken') ? localStorage.getItem('AccessToken') : null)
    const [RefreshToken, setRefreshToken] = useState(() => localStorage.getItem('RefreshToken') ? localStorage.getItem('RefreshToken') : null)
    const [User, setUser] = useState(() => localStorage.getItem('AccessToken') ? jwt_decode(localStorage.getItem('AccessToken')).user : null)
    const [error, setError] = useState('')
    const api_host = process.env.REACT_APP_API_ROOT_URL || "http://localhost:8000"
    const Login = async (e) => {
        let response = null
        if (e.type === "submit") {
            e.preventDefault()
            response = await fetch(`${api_host}/Accounts/api/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': e.target.username.value, 'password': e.target.password.value })
            })
        } else {
            response = await fetch(`${api_host}/Accounts/api/token/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': e.profileObj.givenName, 'password': '123456789' })
            })
        }
        const data = await response.json()
        if (response.status === 200) {
            setAccessToken(data.access)
            setRefreshToken(data.refresh)
            setUser(jwt_decode(data.access).user)
            localStorage.setItem('AccessToken', JSON.stringify(data.access))
            localStorage.setItem('RefreshToken', JSON.stringify(data.refresh))
            if (jwt_decode(data.access).user.verified == true)
                navigate('/')
            else
                navigate('/confirmemail')
        } else {
            if (e.type === "submit") {
                setError('Invalid username or password')
            } else {
                const response = await fetch(`${api_host}/Accounts/register/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 'username': e.profileObj.givenName, 'email': e.profileObj.email, 'password': "123456789" })
                })
                const data = await response.json()
                if (response.status === 201) {
                    Login(e)
                } else {
                    setError('Error')
                    console.log(response)
                }
            }
        }

    }
    const Logout = () => {
        gapi.auth2.getAuthInstance().signOut().then(() => {
            gapi.auth2.getAuthInstance().disconnect()
        })
        setUser(null)
        localStorage.removeItem('AccessToken')
        localStorage.removeItem('RefreshToken')
        navigate('/login')
    }
    const UpdateToken = async () => {
        const response = await fetch(`${api_host}/Accounts/api/token/refresh/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'refresh': RefreshToken })
        })
        const data = await response.json()
        if (response.status === 200) {
            setAccessToken(data.access)
            setUser(jwt_decode(data.access).user)
            localStorage.setItem('AccessToken', JSON.stringify(data.access))
        } else {
            Logout()
        }
    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (User)
                UpdateToken()
        }, 4 * 1000 * 60);
        return () => clearInterval(interval);

    }, [User])
    const ContextData = {
        Login: Login,
        Logout: Logout,
        User: User,
        error: error,
        api_host: api_host,
    }
    return (
        <AuthContext.Provider value={ContextData}>
            {children}
        </AuthContext.Provider>
    );
};
