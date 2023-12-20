import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from "../context/AuthContext";
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBContainer
} from 'mdb-react-ui-kit';

export default function App() {
    const { api_host } = useContext(AuthContext)
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');

    const Register = async (e) => {
        e.preventDefault()
        if (username === '') setError('Please enter username')
        else if (email === '') setError('Please enter email')
        else if (password === '') setError('Please enter password')
        else {
            const response = await fetch(`${api_host}/Accounts/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': username, 'email': email, 'password': password })
            })
            const data = await response.json()
            if (response.status === 200) {
                navigate('/login')
            } else {
                setError('Error')
            }
        }
    }
    return (
        <MDBContainer mt-4>
            <form onSubmit={Register}>
                <MDBInput className='mb-4' type='username' label='Username' onChange={(e) => setUsername(e.target.value)} />
                <MDBInput className='mb-4' type='email' label='Email address' onChange={(e) => setEmail(e.target.value)} />
                <MDBInput className='mb-4' type='password' label='Password' onChange={(e) => setPassword(e.target.value)} />
                <p>{error}</p>
                <MDBBtn type='submit' className='mb-4' block>
                    Register
                </MDBBtn>
                <div className='text-center'>
                    <p>
                        Is a member? <a href='/login'>Login</a>
                    </p>
                    <p>or sign up with:</p>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='facebook-f' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='google' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='twitter' />
                    </MDBBtn>

                    <MDBBtn floating color="secondary" className='mx-1'>
                        <MDBIcon fab icon='github' />
                    </MDBBtn>
                </div>
            </form>
        </MDBContainer>
    );
}