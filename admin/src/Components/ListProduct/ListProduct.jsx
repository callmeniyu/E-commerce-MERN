import React, { useEffect, useState } from 'react'
import axios from "axios"
import "./ListProduct.css"
import cross_icon from "../assets/cross_icon.png"

const ListProduct = () => {

  const [allProducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    try {
      const response = await axios.get("http://localhost:4000/allproducts")
      const data = response.data;
      setAllProducts(data);
    } catch (error) {
      console.log(error)
    }

  }

  const removeProduct = async (id) => {
    try {
      const response = await axios.post("http://localhost:4000/removeproduct", { id: id });
      fetchInfo();
    } catch (error) {
      console.log(error)
    }

  }

  useEffect(() => {
    fetchInfo()
  }, [])
  

  return (
    <div className='listproduct'>
      <h1>All Products List</h1>
      <div className="listproduct-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>
      <div className="listproduct-allproducts">
        <hr />
        {allProducts.map((product, index) => {
          return <div className='listproduct-format-main listproduct-format'>
            <img src={product.image} alt="" className='listproduct-product-image' />
            <p>{product.name}</p>
            <p>${product.old_price }</p>
            <p>${product.new_price }</p>
            <p>{product.category }</p>
            <img src={cross_icon} onClick={()=>{removeProduct(product.id)}} alt="" className="listproduct-remove-icon" />
          </div>
        })}
      </div>
    </div>
  )
}

export default ListProduct