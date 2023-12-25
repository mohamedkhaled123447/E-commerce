import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import GoogleLogoutButton from './GoogleLogoutButton'
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBBtn,
  MDBCollapse,
} from 'mdb-react-ui-kit';

export default function Header({ GetProducts, query, setQuery, CartProducts, setCartProducts }) {
  const [openBasic, setOpenBasic] = useState(false);
  const navigate = useNavigate()
  const { User, Logout } = useContext(AuthContext)
  const handleSubmit = (e) => {
    e.preventDefault()
    GetProducts(query, '', 0)
  }
  return (
    <MDBNavbar expand='lg' light bgColor='light' >
      <MDBContainer fluid>
        <MDBNavbarBrand href='/'>E-commerce</MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setOpenBasic(!openBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={openBasic}>
          <form onSubmit={handleSubmit} className='d-flex w-100 '>
            <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' value={query} onChange={(e) => setQuery(e.target.value)} />
            <MDBBtn type='submit' outline>Search</MDBBtn>
          </form>
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0'>
            {!User && (
              <MDBNavbarItem className='m-1'>
                <MDBBtn onClick={() => navigate('/login')}>Login</MDBBtn>
              </MDBNavbarItem>
            )}
            {!User && (
              <MDBNavbarItem className='m-1'>
                <MDBBtn className="ms-2" onClick={() => navigate('/register')}>signup</MDBBtn>
              </MDBNavbarItem>
            )}
            {User && (
              <MDBNavbarItem className='m-1'>
                <a href='/profile'>{User.username}</a>
              </MDBNavbarItem>
            )}
            {User && (
              <MDBNavbarItem className='m-1'>
                <MDBIcon fas icon="shopping-cart" size='2x' className="ms-2" onClick={() => navigate('/cart')} />
              </MDBNavbarItem>
            )}
            {User && (
              <MDBNavbarItem className='m-1'>
                <GoogleLogoutButton />
              </MDBNavbarItem>
            )}

          </MDBNavbarNav>
        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}