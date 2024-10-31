import React , { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart';
import PlaceOrder from './pages/PlaceOrder/PlaceOrder';
import Footer from './components/Footer/Footer';
import LoginPopup from './components/LoginPopup/LoginPopup';
import Verify from './pages/Verify/Verify';
import './App.css'
import MyOrders from './pages/MyOrders/MyOrders';
import toast from "react-hot-toast";
import picture from "./assets/kv.jpg";


const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [toastStatus, settoastStatus] = useState(true)

  if (toastStatus) {
    toast.custom((t) => (
      <div className={`${t.visible ? 'animate-enter' : 'animate-leave'} toast-container`}>
        <div className="toast-content">
          <div className="toast-flex">
            <div className="toast-img-container">
              <img
                className="toast-img"
                src={picture}
                alt=""
              />
            </div>
            <div className="toast-text">
              <p className="toast-title">
                Kumar Vrchsav
              </p>
              <p className="toast-message">
                Backend server is using free hosting service which may require 8-10 sec to warm-up initially,
                sorry for the inconvenience.
              </p>
            </div>
          </div>
        </div>
        {/* <div className="toast-border">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="toast-close-button"
            >
              Close
            </button>
        </div> */}
      </div>
    ), {
      duration: 4000,
    });
    settoastStatus(false);
  }
  

  return (
    <>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
      <div className="app"  >
        <Navbar  setShowLogin={setShowLogin}></Navbar>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
