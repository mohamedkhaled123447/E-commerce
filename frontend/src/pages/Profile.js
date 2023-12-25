import React, { useContext, useState, useEffect } from 'react';
import AuthContext from '../context/AuthContext';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBadge,
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBBtn,
  MDBIcon,
} from 'mdb-react-ui-kit';
import UpdateProfilePage from '../components/UpdateProfilePage';
import { useNavigate } from 'react-router-dom';

export default function ProfilePage({ Products }) {
  const navigate = useNavigate()
  const { User, api_host } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const UserProducts = Products.filter((product) => product.seller === User.id)
  useEffect(() => {
    GetOrders()
  }, [])
  const GetOrders = async () => {
    const response = await fetch(`${api_host}/Order/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${JSON.parse(localStorage.getItem('AccessToken'))}`
      }
    })
    const data = await response.json();
    if (response.status === 200) {
      setOrders(data)
      console.log(data)
    }
  }
  return (
    <section >
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol lg="5" className='me-4'>
            <MDBRow>
              <MDBCard className="mb-4">
                <MDBCardBody className="text-center">
                  <MDBCardImage
                    src={User.image}
                    alt="avatar"
                    className="rounded-circle"
                    style={{ width: '150px', height: '150px' }}
                    fluid />
                  <h2 className="text-muted mb-1">{User.username}</h2>
                  <div className="d-flex justify-content-center mb-2">
                    <UpdateProfilePage />
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
            <MDBRow>
              <MDBCard className="mb-4">
                <MDBCardBody>
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Full Name</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{User.username}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Email</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{User.email}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Mobile</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{User.phone}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Address</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{User.address}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                  <hr />
                  <MDBRow>
                    <MDBCol sm="3">
                      <MDBCardText>Role</MDBCardText>
                    </MDBCol>
                    <MDBCol sm="9">
                      <MDBCardText className="text-muted">{User.role}</MDBCardText>
                    </MDBCol>
                  </MDBRow>
                </MDBCardBody>
              </MDBCard>
            </MDBRow>
          </MDBCol>
          <MDBCol lg="6">
            <MDBRow>
              <h1>Products</h1>
              <MDBTable align='middle'>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>price</th>
                    <th scope='col'>description</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {UserProducts.map((product) => (
                    <tr key={product.id}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <img
                            src={product.image}
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                          />
                          <div className='ms-3'>
                            <p className='fw-bold mb-1'>{product.name}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='text-muted mb-0'>{product.price}</p>
                      </td>
                      <td>
                        <p className='text-muted mb-0'>{product.description}</p>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
              <MDBBtn className='mb-4' onClick={() => navigate('/addproduct')}>
                Add product
                <MDBIcon fas icon="plus" size='lg' />
              </MDBBtn>

            </MDBRow>
            <MDBRow>
              <h1>Orders</h1>
              <MDBTable align='middle'>
                <MDBTableHead>
                  <tr>
                    <th scope='col'>Name</th>
                    <th scope='col'>total_price</th>
                    <th scope='col'>Status</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <img
                            src={User.image}
                            alt=''
                            style={{ width: '45px', height: '45px' }}
                            className='rounded-circle'
                          />
                          <div className='ms-3'>
                            <p className='fw-bold mb-1'>{User.username}</p>
                            <p className='text-muted mb-0'>{User.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className='text-muted mb-0'>{order.total_price}</p>
                      </td>
                      <td>
                        <MDBBadge color='success' pill>
                          {order.status}
                        </MDBBadge>
                      </td>
                    </tr>
                  ))}
                </MDBTableBody>
              </MDBTable>
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}