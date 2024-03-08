import { useState } from "react"
import Navbar from "./Components/Navbar/Navbar"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import {Shop, ShopCategory, LoginSignup, Product, Cart } from "./Pages/pages";
import Footer from "./Components/Footer/Footer";
 import men_banner from "./Components/Assets/banner_mens.png"
import women_banner from "./Components/Assets/banner_women.png"
import kids_banner from "./Components/Assets/banner_kids.png"
function App() {
    const [count, setCount] = useState(0);
    
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Shop />} />
                    <Route path="/men" element={<ShopCategory category="men" banner={men_banner} />} />
                    <Route path="/women" element={<ShopCategory category="women" banner={ women_banner} />} />
                    <Route path="/kid" element={<ShopCategory category="kid" banner={ kids_banner} />} />
                    <Route path="/product" element={<Product />}>
                        <Route path=":productId" element={<Product />} />
                    </Route>
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/login" element={<LoginSignup />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    )
}

export default App
