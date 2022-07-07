
import classes from "./Products.module.css"
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Product from '../components/Products/Product';
import { useHttpClient } from '../hooks/http-hook';
import { useSelector } from 'react-redux';

const Wishlist = () => {
    const {sendRequest , loading , error} = useHttpClient();
    const [productList , setProductList] = useState([]);
    const token = useSelector((state) => state.auth.token)
    const [refresh , setRefresh ] = useState(false);


    useEffect(() => {
        const getProducts= async() => {
            const products = await sendRequest(`wishlist/${token}` )
            setProductList(products)
            setRefresh(false)
        }
        getProducts()
    },[])

    const updateRefresh = () => {
        setRefresh(true);
        alert("refersh called");
      }

  return (
    <div className={classes.container}>
    {!loading ? 
       <>{productList.map(product => (<Product key={product.id} item={product} refresh={updateRefresh}/>) )}</>
     :<div>loading</div>}
    </div>
  ) 
}

export default Wishlist