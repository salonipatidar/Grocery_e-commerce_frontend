import React from 'react';
import { Routes , Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Products from '../pages/Products';

const Paths = () => {
  return (
    <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/category/:categoryId" element={<Products/>}/>
    </Routes>
  )
}

export default Paths