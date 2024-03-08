import React from "react"
import arrow_icon from "../Assets/breadcrum_arrow.png"
import "./BreadCrum.css"
import { Link } from "react-router-dom"
const BreadCrum = (props) => {
    const { product } = props
    return (
        <div className="breadcrum">
            <Link to="/">HOME</Link> <img src={arrow_icon} alt="" /> <Link to="/">SHOP</Link>{" "}
            <img src={arrow_icon} alt="" /> <Link to={`../${product.category}`}>{product.category}</Link>{" "}
            <img src={arrow_icon} alt="" /> <Link to={`product/${product.id}`}>{product.name} </Link>
        </div>
    )
}

export default BreadCrum
