import React, { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBBtn,
    MDBCardImage
} from 'mdb-react-ui-kit';

export default function CartProduct({ product, setCartProducts }) {
    const { api_host } = useContext(AuthContext)
    const [quantity, setQuantity] = useState(product.quantity)
    const IncreaseQuantity = async () => {
        const response = await fetch(`${api_host}/Cart/${product.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            },
            body: JSON.stringify({ 'quantity': quantity + 1 })
        });
        if (response.status === 200) {
            setQuantity(quantity + 1);
            product.quantity++
        }
    };
    const DecreaseQuantity = async () => {
        const response = await fetch(`${api_host}/Cart/${product.id}/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            },
            body: JSON.stringify({ 'quantity': quantity - 1 })
        });
        if (response.status === 200) {
            if (quantity > 0) {
                if (quantity === 1) {
                    RemoveProductFromCart()
                }
                setQuantity(quantity - 1);
                product.quantity--

            }

        }
    };
    const RemoveProductFromCart = async () => {
        const response = await fetch(`${api_host}/Cart/${product.id}/`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            }
        })
        if (response.status === 204)
            setCartProducts((pre) => pre.filter((item) => item.id !== product.id))

    }
    return (
        <MDBCard className='mt-4' border="secondary" >
            <MDBCardImage src={product.product.image} position='top' alt='...' />
            <MDBCardBody>
                <MDBCardTitle>{product.product.name}</MDBCardTitle>
                <MDBCardText>
                    quantity:{quantity}
                    <i className="fas fa-plus ms-4" onClick={IncreaseQuantity}></i>
                    <i className="fas fa-minus ms-4" onClick={DecreaseQuantity}></i>
                </MDBCardText>
                <MDBCardText>
                    price: <span className='ms-4'>{product.product.price}</span>
                </MDBCardText>
                <MDBBtn onClick={RemoveProductFromCart}>Remove</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
}