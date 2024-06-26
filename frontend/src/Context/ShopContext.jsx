import React, { createContext, useEffect, useState } from "react"
// import all_product from "../Components/Assets/all_product"
import axios from "axios"

export const ShopContext = createContext(null)

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300 + 1; index++) {
        cart[index] = 0
    }
    return cart
}

let all_product = []

const ShopContextProvider = (props) => {
    const [cartItems, setCartItems] = useState(getDefaultCart())
    const [all_product, setAll_Product] = useState([])

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/allproducts")
            const data = response.data
            setAll_Product(data)
        } catch (error) {
            console.log(error)
        }
    }

    const fetchCartData = async () => {
        if(localStorage.getItem("auth-token"))
        try {
            const response = await axios.post("http://localhost:4000/getcartdata", "", {
                headers: {
                    Accept:'application/form-data',
                    "auth-token": `${localStorage.getItem("auth-token")}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',

                }
            })
            const data = response.data
            setCartItems(data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchData()
        fetchCartData()
    }, [])

    const addToCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
        if (localStorage.getItem("auth-token")) {
            const response = await axios.post("http://localhost:4000/addtocart", { itemId: itemId }, {
                headers: {
                    Accept:'application/form-data',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "auth-token":`${localStorage.getItem("auth-token")}`
                }
            });
        }
    }
    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
        if (localStorage.getItem("auth-token")) {
            const response = await axios.post("http://localhost:4000/removefromcart", { itemId: itemId }, {
                headers: {
                    Accept:'application/form-data',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    "auth-token":`${localStorage.getItem("auth-token")}`
                }
            });
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0
        let totalCartItems = 0
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                totalCartItems += cartItems[item]
                let itemInfo = all_product.find((product) => product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item]
            }
        }
        return { totalAmount, totalCartItems }
    }

    const contextValue = { getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart }

    return <ShopContext.Provider value={contextValue}>{props.children}</ShopContext.Provider>
}

export default ShopContextProvider
