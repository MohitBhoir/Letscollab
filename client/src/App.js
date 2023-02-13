import React from 'react'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Dashboard from './pages/dashboard'
import Login from './pages/login'
import Register from './pages/register'
import Navbar from './components/navbar'

const App = () => {
  return (
    <>
    <Router>
      <Navbar/>
        <Routes>
            <Route path='/' element={<Dashboard/>} />
            <Route path='/login' element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Routes>
    </Router>
    <ToastContainer/>
    </>
  )
}

export default App