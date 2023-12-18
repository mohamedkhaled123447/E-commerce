import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CartProduct from './CartProduct';
import { toast } from 'react-toastify';
import {
    MDBIcon,
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
} from 'mdb-react-ui-kit';

export default function Cart({ CartProducts, setCartProducts }) {
    const [topRightModal, setTopRightModal] = useState(false);
    const toggleOpen = () => setTopRightModal(!topRightModal);
    const { User, Logout } = useContext(AuthContext)
    useEffect(() => {
        GetCartProduct()
    }, [])
    const GetCartProduct = async () => {
        const response = await fetch('http://localhost:8000/Cart/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            }
        })
        const data = await response.json();
        if (response.status === 200) {
            setCartProducts(data)
            //console.log(data)
        } else if (response.statusText === 'Unauthorized') {
            Logout()

        }
    }
    return (
        <>
            <MDBIcon fas icon="shopping-cart" size='2x' className="ms-2" onClick={toggleOpen} />
            <MDBModal
                animationDirection='right'
                show={topRightModal}
                tabIndex='-1'
                setShow={setTopRightModal}
            >
                <MDBModalDialog position='top-right' side>
                    <MDBModalContent>
                        <MDBModalHeader className='bg-info text-white'>
                            <MDBModalTitle>Products in the cart</MDBModalTitle>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <div className='row'>
                                <div className='col-3 text-center'>
                                    <i className='fas fa-shopping-cart fa-4x text-info'></i>
                                </div>

                                <div className='col-9' style={{ "max-height": "300px", "overflow-y": "auto" }}>
                                    {
                                        CartProducts.map(product => (
                                            <CartProduct key={product.id} product={product} setCartProducts={setCartProducts}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn outline color='info' onClick={toggleOpen}>
                                Close
                            </MDBBtn>
                            <MDBBtn outline color='info' href='/payment/'>
                                make order
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </>
    );
}