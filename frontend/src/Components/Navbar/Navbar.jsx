import React, { useState } from "react"
import "./Navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const [menuToggler, setMenuToggler] = useState(false)
  const handleMenuToggle = () => {
        setMenuToggler((prev) => !prev)
    }
    return (
        <div className="navbar">
            <div className="nav-logo">
                <img src={logo} alt="" />
                <p>SHOPPER</p>
            </div>
            <ul className="nav-menu">
                <li onClick={() => setMenu("shop")}>Shop {menu === "shop" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("men")}>Men {menu === "men" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("women")}>Women {menu === "women" ? <hr /> : <></>}</li>
                <li onClick={() => setMenu("kids")}>Kids {menu === "kids" ? <hr /> : <></>}</li>
            </ul>
            <div className="nav-login-cart">
                <button>Login</button>
                <img src={cart_icon} alt="" className="nav-cart-image" />
                <div className="nav-cart-count">0</div>
            </div>
            <span className="material-symbols-outlined" onClick={handleMenuToggle}>
                menu
            </span>
            {/* MENU TOGGLER DIV */}
            {menuToggler && (
                <ul className="nav-menu-toggle-div">
                    <li onClick={() => setMenu("shop")} className={`${menu === "shop" ? "nav-item-active" : ""}`}>Shop</li>
                    <li onClick={() => setMenu("men")} className={`${menu === "men" ? "nav-item-active" : ""}`}>Men</li>
                    <li onClick={() => setMenu("women")} className={`${menu === "women" ? "nav-item-active" : ""}`}>Women</li>
                    <li onClick={() => setMenu("kids")} className={`${menu === "kids" ? "nav-item-active" : ""}`}>Kids</li>
                </ul>
            )}
        </div>
    )
}

export default Navbar
