// src/routes.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import GuestLayout from '../layout/GuestLayout';
import HomePage from '../Compenents/global/Homepage/HomePage';
import LoginPage from '../Compenents/Pages/auth/Login';
import Blog from '../Compenents/Pages/Blog/Blog';
import About from '../Compenents/Pages/About/About'
import Signup from '../Compenents/Pages/auth/login/signup';
import Contact from '../Compenents/Pages/Contact/Contact'
import CarList from '../Compenents/Pages/Car/CarList';
import DetailCard from '../Compenents/Pages/Car/DetailCard';
import Search from "../Compenents/Pages/Search/Search";
import Panier from '../Compenents/Pages/Car/Panier';


export default function AppRoutes() {
  return (
    <Routes>
      {/* Toutes les routes dans le layout global GuestLayout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/search" element={<Search />} />
        <Route path="/panier" element={<Panier />} />
        {/* <Route path="/car/:id" element={<DetailCard />} /> */}
        {/* <Route path="/car" element={<CarList />} /> */}
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route element={<GuestLayout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path='/about' element={<About/>}/>
        <Route path="/blog" element={<Blog/>}/>
        <Route path="/car" element={<CarList/>}/>
        <Route path="/car/:id" element={<DetailCard/>}/> {/* Nouvelle route */}
        <Route path="/contact" element={<Contact/>}/>
        <Route path="*" element={<HomePage />} />

      </Route>
    </Routes>
  );
}
