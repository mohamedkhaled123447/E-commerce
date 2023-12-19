import React, { useContext, useState, useEffect } from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';
import { Rating } from 'react-simple-star-rating'
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';
function ProductCard({ product, CartProducts, setCartProducts }) {
    const { User, Logout } = useContext(AuthContext)
    const [rating, setRating] = useState(0)
    const temp = 4
    useEffect(() => {
        GetRatings()
    }, [])
    const GetRatings = async () => {
        const response = await fetch(`http://localhost:8000/Products/ratings/?product=${product.id}`, {
            method: 'GET',
        })
        const data = await response.json()
        if (response.status === 200) {
            const sum = data.reduce((a, b) => a + b.value, 0)
            setRating(sum / data.length)
        }

    }
    const AddToCart = async () => {
        const foundElement = CartProducts.find((element) => element.product.id === product.id);
        if (foundElement) {
            toast.error("Product already exists in cart !", {
                position: toast.POSITION.TOP_CENTER
            });
            return
        }
        const response = await fetch('http://localhost:8000/Cart/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            },
            body: JSON.stringify({ 'product': product.id, 'user': User.id, 'quantity': 1 })
        });
        const responseData = await response.json();
        if (response.status === 201) {
            responseData.product = {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image
            }
            setCartProducts((pre) => [...pre, responseData]);
            toast.success("Added successfully !", {
                position: toast.POSITION.TOP_CENTER
            });
        } else {
            Logout()
        }

    }
    const handleRating = async (rate) => {
        const response = await fetch('http://localhost:8000/Products/ratings/create/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            },
            body: JSON.stringify({ 'product': product.id, 'user': User.id, 'value': rate })
        })
        const data = await response.json()
        if (response.status === 201) {
            setRating(rate)
        }
    }
    return (
        <MDBCard style={{ maxWidth: '22rem', minWidth: "200px" }}>
            <MDBCardImage src={product.image} alt={product.name} position='top' style={{ height: "150px" }} />
            <MDBCardBody>
                <MDBCardTitle>{product.name}</MDBCardTitle>
                <MDBCardText>
                    {product.description}
                </MDBCardText>
                <MDBCardText>
                    Price: ${product.price}
                </MDBCardText>
                <MDBCardText >
                    <Rating onClick={handleRating} initialValue={rating} />
                </MDBCardText>
                <MDBBtn onClick={AddToCart}>Add to Cart</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
}

export default ProductCard;
