import React, { useContext } from 'react'
import { MDBBtn, MDBIcon, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit'
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

function ConfirmEmail() {
    const { api_host, Logout } = useContext(AuthContext)
    const Params = new URLSearchParams(window.location.search)
    const verify = async () => {
        const res = await fetch(`${api_host}/Accounts/confirmemail/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                code: Params.get('code'),
                id: Params.get('id')
            })
        })
        if (res.status === 200) {
            Logout()
            toast.success("Email Verified", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            toast.error("Error", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }
    const ResendCode = async () => {
        const res = await fetch(`${api_host}/Accounts/sendemail/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id: Params.get('id')
            })
        })
        if (res.status === 200) {
            toast.success("Email Sent", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            toast.error("Error", {
                position: toast.POSITION.TOP_CENTER
            });
        }
    }
    return (
        <>
            <MDBContainer>
                <MDBRow className='m-4'>
                    <h2>Check your Email</h2>
                </MDBRow>
                <MDBRow>
                    <MDBIcon fas icon="check-circle" size='10x' />
                </MDBRow>
                {Params.get('code') && (
                    <MDBRow className='m-4 d-flex justify-content-center'>
                        <MDBBtn onClick={verify} className='w-25 me-4'>verify</MDBBtn>
                        <MDBBtn onClick={ResendCode} className='w-25'>Resend code</MDBBtn>
                    </MDBRow>
                )}
            </MDBContainer>
        </>
    )
}

export default ConfirmEmail