import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import CartProduct from './CartProduct';
import { toast } from 'react-toastify';
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBBtn
} from 'mdb-react-ui-kit';

export default function Cart({ CartProducts, setCartProducts }) {
    const { User, Logout, api_host } = useContext(AuthContext)
    return (
        <>
            <MDBContainer className='mt-4'>
                <MDBRow>
                    <MDBCol>
                        <h3>Products in the cart</h3>
                        <div className="d-flex flex-row mb-3 flex-wrap">
                            {
                                CartProducts.map(product => (
                                    <CartProduct key={product.id} product={product} setCartProducts={setCartProducts}
                                    />
                                ))
                            }
                        </div>
                    </MDBCol>
                </MDBRow>
                <MDBBtn outline color='info' href='/payment'>
                    make order
                </MDBBtn>
            </MDBContainer>
        </>
    );
}