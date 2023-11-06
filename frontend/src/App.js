import './App.css';
import LandingPage from './pages/LandingPage'
import Login from './pages/Login'
import AddProduct from './pages/AddProduct';
import Register from './pages/Register'
import Header from './components/Header'
import PrivateRoute from './utils/PrivateRoute'
import { AuthProvider } from './context/AuthContext'
import { Route, Routes, BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            {/* <Route element={<PrivateRoute />}>
            </Route> */}
            <Route element={<LandingPage />} path='/' />
            <Route element={<Login />} path='/login' />
            <Route element={<Register />} path='/register' />
            <Route element={<AddProduct />} path='/addproduct' />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
