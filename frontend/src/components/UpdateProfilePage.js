import React, { useState, useContext } from 'react';
import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBFile,
    MDBRow,
    MDBSpinner
} from 'mdb-react-ui-kit';
import AuthContext from '../context/AuthContext';
export default function UpdateProfilePage() {
    const { User, api_host, Logout } = useContext(AuthContext)
    const [basicModal, setBasicModal] = useState(false);
    const [image, setImage] = useState(null);
    const [Loading, setLoading] = useState(false);
    const toggleOpen = () => setBasicModal(!basicModal);
    const UploadImage = async () => {
        setLoading(true)
        const formData = new FormData();
        formData.append('image', image);
        const res = await fetch(`http://localhost:8000/Accounts/update_profile_image/`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            },
            body: formData
        })
        const data = await res.json()
        if (res.status === 200) {
            setLoading(false)
            Logout()
        }
    }
    return (
        <>
            <MDBBtn onClick={toggleOpen}>update</MDBBtn>
            <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>UpdateProfilePage</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpen}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBFile label='Upload photo' size='lg' id='formFileLg' onChange={(e) => setImage(e.target.files[0])} />
                            {Loading && (
                                <MDBRow center className='mb-3'>
                                    <MDBSpinner role='status'>
                                        <span className='visually-hidden'>Loading...</span>
                                    </MDBSpinner>
                                </MDBRow>
                            )}
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={UploadImage}>Save changes</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}