import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext'
import ProductCard from '../components/ProductCard'
function LandingPage() {
    const { User, Logout } = useContext(AuthContext)
    const [Products, setProducts] = useState([])
    useEffect(() => {
        GetProducts()
    }, [])
    const GetProducts = async () => {
        const response = await fetch('http://localhost:8000/Products/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const data = await response.json()
        if (response.status === 200) {
            setProducts(data)
        }
        else if (response.statusText === 'Unauthorized')
            Logout()
    }

    return (
        <MDBContainer className="text-center mt-5">
            <MDBRow className='mb-3'>
                <MDBCol>
                    <h1>Welcome to Our E-commerce Store</h1>
                    <p>Discover the best deals and save money on your favorite products!</p>
                </MDBCol>
            </MDBRow>
            <MDBRow className='g-3'>
                {Products.map(product => (
                    <div className="col-md-4" key={product.id}>
                        <ProductCard product={product} />
                    </div>
                ))}
            </MDBRow>
        </MDBContainer>
    );
}

export default LandingPage;
