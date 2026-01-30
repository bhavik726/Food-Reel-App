import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import UserRegister from '../components/auth/UserRegister'
import UserLogin from '../components/auth/UserLogin'
import FoodPartnerRegister from '../components/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../components/auth/FoodPartnerLogin'
import Home from '../components/general/Home'
import CreateFoodPartner from '../pages/foodpartner/CreateFood'


const approutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path="/" element={<Home />} /> 
        <Route path="/create-food" element={<div>Create Food</div>} />
      </Routes>
    </Router>
  )
}

export default approutes
