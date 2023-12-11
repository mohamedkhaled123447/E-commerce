import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Cart from './Cart';
import AuthContext from '../context/AuthContext';
import GoogleLogoutButton from './GoogleLogoutButton'
import {
  MDBContainer,
  MDBNavbar,
  MDBIcon,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Header({ GetProducts, query, setQuery, CartProducts, setCartProducts }) {
  const navigate = useNavigate()
  const { User, Logout } = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    GetProducts(query, '', 0)
  }
  return (
    <MDBNavbar light bgColor='light' className='mb-4'>
      <MDBContainer fluid>
        <a
          className='navbar-brand'
          href='/'
          style={{ fontFamily: 'fantasy', fontSize: '1.5rem' }}
        >E-commerce</a>
        <form onSubmit={handleSubmit} className='d-flex w-auto'>
          <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' value={query} onChange={(e) => setQuery(e.target.value)} />
          <MDBBtn type='submit' outline>Search</MDBBtn>
        </form>
        {!User && (
          <div>
            <MDBBtn onClick={() => navigate('/login')}>Login</MDBBtn>
            <MDBBtn className="ms-2" onClick={() => navigate('/register')}>signup</MDBBtn>
          </div>
        )}
        {User && (
          <div className='d-flex flex-row mb-3 align-items-center'>
            <span className='me-3'>Welcom </span>
            <a className='me-4' href='http://localhost:3001/profile'>{User.username}</a>
            <GoogleLogoutButton />
            <Cart
              CartProducts={CartProducts}
              setCartProducts={setCartProducts}
            />
          </div>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
}