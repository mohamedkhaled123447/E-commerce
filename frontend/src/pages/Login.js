import React, { useContext, useEffect, useState } from 'react';
import { gapi } from 'gapi-script'
import GoogleLoginButton from '../components/GoogleLoginButton';
import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBCheckbox,
    MDBBtn,
    MDBIcon,
    MDBContainer
} from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';
const clientId = "522256695532-lu3rvkar7si1vi0pc2vr32h4mpc4iise.apps.googleusercontent.com"
export default function App() {
    const { Login, error } = useContext(AuthContext)
    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        }
        gapi.load("client:auth2", start)
    }, [])
    return (
        <MDBContainer className='mt-4'>
            <form onSubmit={Login}>
                <MDBInput className='mb-4' type='text' id='form2Example1' label='Username' name='username' />
                <MDBInput className='mb-4' type='password' id='form2Example2' label='Password' name='password' />

                <MDBRow className='mb-4'>
                    <MDBCol className='d-flex justify-content-center'>
                        <MDBCheckbox id='form2Example3' label='Remember me' defaultChecked />
                    </MDBCol>
                    <MDBCol>
                        <a href='#!'>Forgot password?</a>
                    </MDBCol>
                </MDBRow>
                <p>{error}</p>
                <MDBBtn type='submit' className='mb-4' block>
                    Sign in
                </MDBBtn>
                <div className='text-center m-4'>
                <GoogleLoginButton />
                </div>
                <div className='text-center'>
                    <p>
                        Not a member? <a href='/register'>Register</a>
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