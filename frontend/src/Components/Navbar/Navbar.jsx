import React, { useContext, useState } from "react"
import "./Navbar.css"
import logo from "../Assets/logo.png"
import cart_icon from "../Assets/cart_icon.png"
import { Link } from "react-router-dom"
import { ShopContext } from "../../Context/ShopContext"
const Navbar = () => {
    const [menu, setMenu] = useState("shop")
    const [menuToggler, setMenuToggler] = useState(false)
    const { getTotalCartAmount } = useContext(ShopContext)
    const {totalCartItems} = getTotalCartAmount();

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
                <li onClick={() => setMenu("shop")}>
                    <Link to="/" style={{ textDecoration: "none", color: "#626262" }}>
                        Shop{location.pathname === "/" ? <hr /> : <></>}
                    </Link>
                </li>
                <li onClick={() => setMenu("men")}>
                    <Link to="/men" style={{ textDecoration: "none", color: "#626262" }}>
                        Men{location.pathname === "/men" ? <hr /> : <></>}
                    </Link>
                </li>
                <li onClick={() => setMenu("women")}>
                    <Link to="women" style={{ textDecoration: "none", color: "#626262" }}>
                        Women{location.pathname === "/women" ? <hr /> : <></>}
                    </Link>
                </li>
                <li onClick={() => setMenu("kids")}>
                    <Link to="kid" style={{ textDecoration: "none", color: "#626262" }}>
                        Kids{location.pathname === "/kid" ? <hr /> : <></>}
                    </Link>
                </li>
            </ul>
            <div className="nav-login-cart">
                <Link to="/login" style={{ textDecoration: "none", color: "#626262" }}>
                    {localStorage.getItem("auth-token") ? <button onClick={(e) => { localStorage.removeItem("auth-token");e.preventDefault(); window.location.replace("/") }}>Logout</button> :<button>Login</button>}
                </Link>
                <Link to="/cart" style={{ textDecoration: "none", color: "#626262" }}>
                    <img src={cart_icon} alt="" className="nav-cart-image" />
                </Link>
                <div className="nav-cart-count">{totalCartItems}</div>
            </div>
            <span className="material-symbols-outlined" onClick={handleMenuToggle}>
                menu
            </span>
            {/* MENU TOGGLER DIV */}
            {menuToggler && (
                <ul className="nav-menu-toggle-div">
                    <li onClick={() => setMenu("shop")}>
                        <Link
                            to="/"
                            style={{ textDecoration: "none", color: "white" }}
                            className={`${menu === "shop" ? "nav-item-active" : ""}`}
                        >
                            Shop
                        </Link>
                    </li>
                    <li onClick={() => setMenu("men")}>
                        <Link
                            to="/men"
                            style={{ textDecoration: "none", color: "white" }}
                            className={`${menu === "men" ? "nav-item-active" : ""}`}
                        >
                            Men
                        </Link>
                    </li>
                    <li onClick={() => setMenu("women")}>
                        <Link
                            to="women"
                            style={{ textDecoration: "none", color: "white" }}
                            className={`${menu === "women" ? "nav-item-active" : ""}`}
                        >
                            Women
                        </Link>
                    </li>
                    <li onClick={() => setMenu("kids")}>
                        <Link
                            to="kid"
                            style={{ textDecoration: "none", color: "white" }}
                            className={`${menu === "kid" ? "nav-item-active" : ""}`}
                        >
                            Kids
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Navbar
