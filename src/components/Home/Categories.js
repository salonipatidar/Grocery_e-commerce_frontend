import React, { useEffect, useState } from 'react'
import { useHttpClient } from '../../hooks/http-hook'
import classes from './Categories.module.css'

const Categories = () => {

    const {sendRequest , loading , error} = useHttpClient();
    const [categoryList , setCategoryList] = useState([]);

    useEffect(() => {
        const getCategories= async() => {
            const categories = await sendRequest("category/list" )
            console.log(error);
            setCategoryList(categories)
           
        }
        getCategories()
    },[])
    
  return (
    <div>
    {loading && (<div className={classes.categories}>
        {
            categoryList.map(category => {
                <div>
                    {category.categoryName}
                </div>
            })
        }
    </div>)}
    </div>
  )
}

export default Categories