import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
const Home = () => {
  const { User, Logout } = useContext(AuthContext)
  const [Users, setUsers] = useState([])
  useEffect(() => {
    GetUsers()
  }, [])
  const GetUsers = async () => {
    const response = await fetch('http://localhost:8000/Accounts/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('AccessToken'))
      }
    })
    const data = await response.json()
    if (response.status === 200)
      setUsers(data)
    else if (response.statusText === 'Unauthorized')
      Logout()
  }
  return (
    <div>
      <h1>Welcome Home {User.name}</h1>
      {Users.map(user => (<p key={user.id}>{user.username}</p>))}
    </div>

  )
}

export default Home