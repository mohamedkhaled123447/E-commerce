import './App.css';
import Home from './pages/Home'
import Login from './pages/Login'
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
            <Route element={<PrivateRoute />}>
              <Route element={<Home />} path='/' exact />
            </Route>
            <Route element={<Login />} path='/login' />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
