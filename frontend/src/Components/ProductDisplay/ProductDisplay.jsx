import React from "react"
import "./ProductDisplay.css"
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"

const ProductDisplay = (props) => {
    const { product } = props
    return (
        <div className="productdisplay">
            <div className="productdisplay-left">
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                    <img src={product.image} alt="" />
                <div className="productdisplay-img">
                    <img src={product.image} className="productdisplay-main-img" alt="" />
                </div>
            </div>
            <div className="productdisplay-right">
                <h1>{product.name}</h1>
                <div className="productdisplay-right-star">
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_icon} alt="" />
                    <img src={star_dull_icon} alt="" />
                    <p>(122)</p>
                </div>
                <div className="productdisplay-right-prices">
                    <div className="productdisplay-right-price-old">${product.old_price}</div>
                    <div className="productdisplay-right-price-new">${product.new_price}</div>
                </div>
                <div className="productdisplay-right-description">
                    Blue Spirulina Face Masque, a superfood-infused mask to lift and tone up your skin for a younger-looking                    
                </div>
                <div className="productdisplay-right-size">
                    <h1>Select Size</h1>
                    <div className="productdisplay-right-size-variants">
                        <div>S</div>
                        <div>M</div>
                        <div>L</div>
                        <div>XL</div>
                        <div>XXL</div>
                    </div>
                </div>
                <button>ADD TO CART</button>
                <div className="productdisplay-right-category-div">
                    <p className="productdisplay-right-category"><span>Category :</span> Women , T-Shirt , Crop Top</p>
                    <p className="productdisplay-right-category"><span>Tags :</span> Modern , Latest</p>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay
