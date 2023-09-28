import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
const Header = () => {
    const { User, Logout } = useContext(AuthContext)
    return (
        <div>
            <Link to="/">Home</Link>
            <span> | </span>
            {!User && <Link to="/login">Login</Link>}
            {User && <p>Welcome {User.name}</p>}
            {User && <p onClick={Logout}>Logout</p>}
        </div>
    )
}

export default Header