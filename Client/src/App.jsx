import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes ,useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginPopup from './components/LoginPopup/LoginPopup'
import Client from './pages/Client/Client'
import Project from './pages/Project/Project'
import Footer from './components/Footer/Footer'
import { handleLogin, handleSignup } from './utils/Authutils';


const App = () => {
  const location = useLocation();
   const isLoginPage = location.pathname === '/';
  return (
    <div className='app'>
      {!isLoginPage && <Navbar />}
      <div className="app-content">    
        <Routes>
           <Route path="/" element={<LoginPopup onLogin={handleLogin} onSignup={handleSignup} />} />
          <Route path="/client/dashboard" element={<Client />} />
          <Route path="/project" element={<Project/>}/>
           
              </Routes>
      </div> 
     {!isLoginPage && <Footer />}
    </div>
  )
}

export default App 