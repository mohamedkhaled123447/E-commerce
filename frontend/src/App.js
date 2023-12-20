import './App.css';
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct';
import Register from './pages/Register'
import Header from './components/Header'
import Profile from './pages/Profile'
import Payment from './pages/Payment';
import PrivateRoute from './utils/PrivateRoute'
import AuthContext from './context/AuthContext';
import { Route, Routes } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [Products, setProducts] = useState([])
  const [CartProducts, setCartProducts] = useState([])
  const [query, setQuery] = useState('')
  const { Logout ,api_host} = useContext(AuthContext)
  useEffect(() => {
    GetProducts('', '', 0)
  }, [])
  const GetProducts = async (...parameters) => {
    const [nameQuery, categoryQuery, priceQuery] = parameters
    const response = await fetch(`${api_host}/Products/?name=${nameQuery}&price=${priceQuery}&category=${categoryQuery}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    const data = await response.json()
    if (response.status === 200) {
      setProducts(data)
    } else if (response.statusText === 'Unauthorized') {
      Logout()
    }
  }
  return (
    <div className="App">
      <Header GetProducts={GetProducts} query={query} setQuery={setQuery} CartProducts={CartProducts} setCartProducts={setCartProducts} />
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route element={<Payment CartProducts={CartProducts} setCartProducts={setCartProducts} />} path='/payment' />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<AddProduct setProducts={setProducts} />} path='/addproduct' />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Profile Products={Products} />} path='/profile' />
        </Route>
        <Route element={<LandingPage Products={Products} GetProducts={GetProducts} query={query}
          setCartProducts={setCartProducts} CartProducts={CartProducts}
        />} path='/' />
        <Route element={<Login />} path='/login' />
        <Route element={<Register />} path='/register' />
      </Routes>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
