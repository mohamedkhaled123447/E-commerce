import React from 'react';
import { MDBCard, MDBCardImage, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn } from 'mdb-react-ui-kit';

function ProductCard({ product }) {
    return (
        <MDBCard style={{ maxWidth: '22rem'}}>
            <MDBCardImage src={product.image} alt={product.name} position='top' style={{ maxHeight: '200px'}} />
            <MDBCardBody>
                <MDBCardTitle>{product.name}</MDBCardTitle>
                <MDBCardText>
                    {product.description}
                </MDBCardText>
                <MDBCardText>
                    Price: ${product.price}
                </MDBCardText>
                <MDBBtn>Add to Cart</MDBBtn>
            </MDBCardBody>
        </MDBCard>
    );
}

export default ProductCard;
