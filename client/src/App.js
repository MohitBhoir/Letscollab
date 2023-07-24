import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/login'
import Register from './pages/register'
import Navbar from './components/navbar'
import AdDash from './pages/adDash'
import Home from './pages/home'

const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/adDash" element={<AdDash/>} />
        </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App