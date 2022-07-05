import classes from "./Products.module.css"
import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import Product from '../components/Products/Product';
import { useHttpClient } from '../hooks/http-hook';


const Products = () => {

    const {sendRequest , loading , error} = useHttpClient();
    const [productList , setProductList] = useState([]);
    let params = useParams();

    useEffect(() => {
        const getProducts= async() => {
            const products = await sendRequest(`product/${params.categoryId}` )
            console.log(products);
            setProductList(products)
           
        }
        getProducts()
    },[])


  return (
    <div className={classes.container}>
    {!loading ? 
       <>{productList.map(product => (<Product key={product.id} item={product}/>) )}</>
     :<div>loading</div>}
    </div>
  ) 
  
}

export default Products