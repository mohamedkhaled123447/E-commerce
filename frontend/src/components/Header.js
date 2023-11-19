import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import {
  MDBContainer,
  MDBNavbar,
  MDBInputGroup,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Header({ GetProducts, query, setQuery }) {
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
          <div>
            <span>Welcom {User.name}</span>
            <MDBBtn className="ms-2" onClick={() => Logout()}>Logout</MDBBtn>
          </div>
        )}
      </MDBContainer>
    </MDBNavbar>
  );
}