import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardFooter,
    MDBCardHeader,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBProgress,
    MDBProgressBar,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import React, { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function OrderDetails3({ CartProducts, setCartProducts }) {
    const { User } = useContext(AuthContext)
    const total_price = CartProducts.reduce((total, product) => total + product.quantity * product.product.price, 0)
    const MakePaymentSession = async () => {
        const response = await fetch('http://localhost:8000/Order/create-checkout-session/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
            },
            body: JSON.stringify({ 'total_price': total_price })
        })
        const data = await response.json()
        if (response.status === 200) {
            window.location.href = data
        }
    }
    return (
        <>
            <section
                className="h-100 gradient-custom"
            >
                <MDBContainer className="py-5 h-100">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol lg="10" xl="8">
                            <MDBCard style={{ borderRadius: "10px", backgroundColor: "#eee" }}>
                                <MDBCardHeader className="px-4 py-5">
                                    <MDBTypography tag="h5" className="text-muted mb-0">
                                        Thanks for your Order,{" "}
                                        <span style={{ color: "#a8729a" }}>{User.username}</span>!
                                    </MDBTypography>
                                </MDBCardHeader>
                                <MDBCardBody className="p-4">
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <p
                                            className="lead fw-normal mb-0"
                                            style={{ color: "#a8729a" }}
                                        >
                                            Receipt
                                        </p>
                                    </div>

                                    {CartProducts.map((product) => (
                                        <MDBCard key={product.id} className="shadow-0 border mb-4">
                                            <MDBCardBody>
                                                <MDBRow>
                                                    <MDBCol md="2">
                                                        <MDBCardImage
                                                            src={product.product.image}
                                                            fluid
                                                            alt="Phone"
                                                        />
                                                    </MDBCol>
                                                    <MDBCol
                                                        md="2"
                                                        className="text-center d-flex justify-content-center align-items-center"
                                                    >
                                                        <p className="text-muted mb-0">{product.product.name}</p>
                                                    </MDBCol>
                                                    <MDBCol
                                                        md="2"
                                                        className="text-center d-flex justify-content-center align-items-center"
                                                    >
                                                        <p className="text-muted mb-0 small">Qty: {product.quantity}</p>
                                                    </MDBCol>
                                                    <MDBCol
                                                        md="2"
                                                        className="text-center d-flex justify-content-center align-items-center"
                                                    >
                                                        <p className="text-muted mb-0 small">${product.product.price}</p>
                                                    </MDBCol>
                                                </MDBRow>
                                                <hr
                                                    className="mb-4"
                                                    style={{ backgroundColor: "#e0e0e0", opacity: 1 }}
                                                />
                                                <MDBRow className="align-items-center">
                                                    <MDBCol md="2">
                                                        <p className="text-muted mb-0 small">Track Order</p>
                                                    </MDBCol>
                                                    <MDBCol md="10">
                                                        <MDBProgress
                                                            style={{ height: "6px", borderRadius: "16px" }}
                                                        >
                                                            <MDBProgressBar
                                                                style={{
                                                                    borderRadius: "16px",
                                                                    backgroundColor: "#a8729a",
                                                                }}
                                                                width={65}
                                                                valuemin={0}
                                                                valuemax={100}
                                                            />
                                                        </MDBProgress>
                                                        <div className="d-flex justify-content-around mb-1">
                                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                                Out for delivary
                                                            </p>
                                                            <p className="text-muted mt-1 mb-0 small ms-xl-5">
                                                                Delivered
                                                            </p>
                                                        </div>
                                                    </MDBCol>
                                                </MDBRow>
                                            </MDBCardBody>
                                        </MDBCard>

                                    ))}
                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="fw-bold mb-0">Order Details</p>

                                    </div>

                                    <div className="d-flex justify-content-between pt-2">
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Total</span> ${total_price}
                                        </p>
                                    </div>

                                    <div className="d-flex justify-content-between">
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Discount</span> $0.00
                                        </p>

                                    </div>

                                    <div className="d-flex justify-content-between mb-5">
                                        <p className="text-muted mb-0">
                                            <span className="fw-bold me-4">Delivery Charges</span>{" "}
                                            Free
                                        </p>
                                    </div>
                                </MDBCardBody>
                                <MDBCardFooter
                                    className="border-0 px-4 py-5"
                                    style={{
                                        backgroundColor: "#a8729a",
                                        borderBottomLeftRadius: "10px",
                                        borderBottomRightRadius: "10px",
                                    }}
                                >
                                    <MDBTypography
                                        tag="h5"
                                        className="d-flex align-items-center justify-content-end text-white text-uppercase mb-0"
                                    >
                                        Total paid: <span className="h2 mb-0 ms-2">${total_price}</span>
                                    </MDBTypography>
                                </MDBCardFooter>
                            </MDBCard>
                            <MDBBtn color="dark" className="mt-4" onClick={MakePaymentSession}>PAY</MDBBtn>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
}