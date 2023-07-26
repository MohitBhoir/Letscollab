import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/navbar'
import AdDash from './pages/adDash'
import Home from './pages/home'
import LoginAdmin from './pages/loginAdmin'
import RegisterAdmin from './pages/registerAdmin'
import Login from './pages/routes/login'
import Register from './pages/routes/register'
import Details from './pages/details'
import LoginUser from './pages/loginUser'
import RegisterUser from './pages/registerUser'
import Interest from './pages/interest'
import List from './pages/list'

const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path='/register' element={<Register/>} />
            <Route path='/loginAdmin' element={<LoginAdmin/>} />
            <Route path="/registerAdmin" element={<RegisterAdmin/>} />
            <Route path='/loginUser' element={<LoginUser/>} />
            <Route path="/registerUser" element={<RegisterUser/>} />
            <Route path="/adDash" element={<AdDash/>} />
            <Route path="/details" element={<Details/>} />
            <Route path="/interest" element={<Interest/>} />
            <Route path="/list" element={<List/>} />
        </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App