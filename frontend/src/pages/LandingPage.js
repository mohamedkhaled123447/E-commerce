import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import FilterSection from '../components/FilterSection';
import ProductCard from '../components/ProductCard'
import ReactPaginate from 'react-paginate'
import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext';
function LandingPage({ Products, GetProducts, query, CartProducts, setCartProducts }) {
    const { User } = useContext(AuthContext)
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 4;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = Products.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(Products.length / itemsPerPage);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % Products.length;
        setItemOffset(newOffset);
    };
    return (
        <>
            {User.verified === false && (
                <h2>Check your Email</h2>
            )}
            {
                User.verified === true && (
                    <MDBContainer className="text-center mt-5">
                        <MDBRow className='mb-3'>
                            <MDBCol>
                                <h1>Welcome to Our E-commerce Store</h1>
                                <p>Discover the best deals and save money on your favorite products!</p>
                            </MDBCol>
                        </MDBRow>
                        <MDBRow>
                            <MDBCol size='2'>
                                <FilterSection GetProducts={GetProducts} query={query} />
                            </MDBCol>
                            <MDBCol>
                                <MDBRow className='g-3'>
                                    {currentItems.map(product => (
                                        <div className="col-md-4" key={product.id}>
                                            <ProductCard product={product} CartProducts={CartProducts} setCartProducts={setCartProducts} />
                                        </div>
                                    ))}
                                </MDBRow>
                                <MDBRow className='mt-3'>
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="next >"
                                        onPageChange={handlePageClick}
                                        pageRangeDisplayed={5}
                                        pageCount={pageCount}
                                        previousLabel="< previous"
                                        renderOnZeroPageCount={null}
                                        containerClassName='pagination justify-content-center'
                                        pageLinkClassName='m-2'
                                        previousLinkClassName='.me-3'
                                        nextLinkClassName='.me-3'
                                        activeLinkClassName='.me-3'
                                    />
                                </MDBRow>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                )
            }
        </>
    );
}

export default LandingPage;
