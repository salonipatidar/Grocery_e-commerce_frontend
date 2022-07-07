import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../hooks/http-hook'
import classes from './Categories.module.css'
import Category from './Category';



const Categories = () => {

    const {sendRequest , loading , error} = useHttpClient();
    const [categoryList , setCategoryList] = useState([]);

    useEffect(() => {
        const getCategories= async() => {
            const categories = await sendRequest("category/list" )
            setCategoryList(categories)
           
        }
        getCategories()
    },[])
    
  return (
    <div className={classes.categories}>
    {!loading ? 
       <> {categoryList.map(category => (<Category key={category.id} item = {category}/> ))}</>
     :<div>loading</div>}
    </div>
  ) 
}

export default Categories