import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdb-react-ui-kit';
import FilterSection from '../components/FilterSection';
import ProductCard from '../components/ProductCard'
import ReactPaginate from 'react-paginate'
import { useState } from 'react';
function LandingPage({ Products, GetProducts, query, CartProducts, setCartProducts }) {
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
            <div className="p-4">
                <MDBRow className='mb-3'>
                    <MDBCol>
                        <h1>Welcome to Our E-commerce Store</h1>
                        <p>Discover the best deals and save money on your favorite products!</p>
                    </MDBCol>
                </MDBRow>
                <MDBRow>
                    <MDBCol size='2'>
                        <div style={{ maxWidth: '15rem' }}>
                            <FilterSection GetProducts={GetProducts} query={query} />
                        </div>
                    </MDBCol>
                    <MDBCol>
                        <div className="d-flex flex-row mb-3 flex-wrap">

                            {currentItems.map(product => (
                                <ProductCard key={product.id} product={product} CartProducts={CartProducts} setCartProducts={setCartProducts} />
                            ))}
                        </div>
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
            </div>
        </>
    );
}

export default LandingPage;
