import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import {
  MDBContainer,
  MDBNavbar,
  MDBInputGroup,
  MDBNavbarBrand,
  MDBBtn
} from 'mdb-react-ui-kit';

export default function Header() {
  const navigate = useNavigate()
  const { User, Logout } = useContext(AuthContext)
  return (
    <MDBNavbar light bgColor='light' className='mb-4'>
      <MDBContainer fluid>
        <MDBNavbarBrand>Navbar</MDBNavbarBrand>
        <MDBInputGroup tag="form" className='d-flex w-auto'>
          <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
          <MDBBtn outline>Search</MDBBtn>
        </MDBInputGroup>
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