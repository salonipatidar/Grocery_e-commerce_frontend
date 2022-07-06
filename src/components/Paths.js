import React from 'react';
import { Routes , Route} from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProductDetail from '../pages/ProductDetail';
import Products from '../pages/Products';

const Paths = () => {
  return (
    <Routes>
         <Route path="/" element={<Home/>} />
         <Route path="/login" element={<Login/>} />
         <Route path="/category/:categoryId" element={<Products/>}/>
         <Route path='/product/:productId' element={<ProductDetail />}/>
    </Routes>
  )
}

export default Paths