import React, { useState } from "react"
import "./AddProduct.css"
import upload_area from "../assets/upload_area.svg"
import axios from "axios"

const AddProduct = () => {
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name: "",
        image: "",
        category: "",
        old_price: "",
        new_price: ""
    });

    const handleImage = (e) => {
        setImage(e.target.files[0])
    }

    const handleChange = (e) => {
        setProductDetails((prev) => {
            return {...prev,[e.target.name]:e.target.value}
        })
    }

    const AddProduct = async () => {
        let formData = new FormData();
        formData.append("product", image)
        
        // await fetch("http://localhost:4000/upload", {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json"
        //     },
        //     body: formData
        // }).then((resp) => resp.json()).then((data) => response=data);

        const response = await axios.post("http://localhost:4000/upload", formData, {
            headers: {
                Accept: "application/json"
            }
        });
        const data = response.data;
        if (data.success) {
            productDetails.image = data.image_url
            const response = await axios.post("http://localhost:4000/addproduct", productDetails, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json"
                }
            })
            console.log(response.data);
            response.data.success ? alert("Product added") : alert("Product couldn't add")

        }
        // window.location.reload();

    }
    return(
    <div className="addproduct">
        <div className="addproduct-itemfield">
            <p>Product title</p>
            <input type="text" name="name" onChange={handleChange} value={productDetails.name} placeholder="Type here" />
        </div>
        <div className="addproduct-price">
            <div className="addproduct-itemfield">
                <p>Price</p>
                <input type="text" name="old_price" onChange={handleChange} value={productDetails.old_price} placeholder="Type here" />
            </div>
            <div className="addproduct-itemfield">
                <p>Offer Price</p>
                <input type="text" name="new_price" onChange={handleChange} value={productDetails.new_price} placeholder="Type here" />
            </div>
        </div>
        <div className="addproduct-itemfield">
            <p>Product Catgegory</p>
            <select name="category" onChange={handleChange} value={productDetails.category} className="addproduct-selector">
                <option value="women">Women</option>
                <option value="men">Men</option>
                <option value="kid">Kid</option>
            </select>
            </div>
            <div className="addproduct-itemfield">
                <label htmlFor="file-input">
                <img src={image ? URL.createObjectURL(image) : upload_area} className="addproduct-thumbnail-img" alt="" />
                </label>
                <input type="file" onChange={handleImage} name="image" id="file-input" hidden/>
            </div>
            <button className="addproduct-btn" onClick={AddProduct}>ADD</button>
    </div>
)}

export default AddProduct
