import React from "react"
import "./Item.css"
import { Link, useNavigate } from "react-router-dom"
const Item = (props) => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate(`/product/${props.id}`)
        window.scrollTo(0,0)
    }
    return (
        <div className="item" onClick={handleNavigate}>
            <img src={props.image} alt="" />
            <p>{props.name}</p>
            <div className="item-prices">
                <div className="item-price-new">${props.new_price}</div>
                <div className="item-price-old">${props.old_price}</div>
            </div>
        </div>
    )
}

export default Item
