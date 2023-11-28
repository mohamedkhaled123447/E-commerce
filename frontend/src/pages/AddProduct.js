// src/components/AddProduct.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { MDBInput, MDBBtn, MDBContainer, MDBSpinner, MDBRow } from 'mdb-react-ui-kit';

function AddProduct({ setProducts }) {
    const navigate = useNavigate();
    const { User } = useContext(AuthContext)
    const [name, setName] = useState('');
    const [Loading, setLoading] = useState(false);
    const [description, setDescription] = useState('');
    const [stock_quantity, setStock_quantity] = useState();
    const [price, setPrice] = useState();
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', parseFloat(price));
        formData.append('category', category);
        formData.append('seller', User.id);
        formData.append('stock_quantity', parseInt(stock_quantity));
        formData.append('image', file);

        const response = await fetch('http://localhost:8000/Products/create/', {
            method: 'POST',
            body: formData,
        });
        const data = await response.json();
        if (response.status == 201) {
            setProducts((pre) => [...pre, data])
            setLoading(false)
            navigate("/")
        }
    };

    return (
        <MDBContainer>
            <form onSubmit={handleSubmit}>
                <MDBInput
                    required
                    type="text"
                    id="productName"
                    label="Product Name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mb-3"
                />
                <MDBInput
                    required
                    type="text"
                    id="description"
                    label="Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mb-3"
                />
                <MDBInput
                    required
                    type="number"
                    id="price"
                    label="Price"
                    name="price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="mb-3"
                />
                <MDBInput
                    required
                    type="number"
                    id="stock_quantity"
                    label="stock_quantity"
                    name="stock_quantity"
                    value={stock_quantity}
                    onChange={(e) => setStock_quantity(e.target.value)}
                    className="mb-3"
                />
                <MDBInput
                    required
                    type="file"
                    id="imageFile"
                    label="Upload Image"
                    name="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="mb-3"
                />
                <MDBInput
                    required
                    type="text"
                    id="category"
                    label="Category"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mb-3"
                />
                {Loading && (
                    <MDBRow center className='mb-3'>
                        <MDBSpinner role='status'>
                            <span className='visually-hidden'>Loading...</span>
                        </MDBSpinner>
                    </MDBRow>
                )}
                <MDBBtn type="submit">Add Product</MDBBtn>
            </form>

        </MDBContainer>
    );
}

export default AddProduct;
