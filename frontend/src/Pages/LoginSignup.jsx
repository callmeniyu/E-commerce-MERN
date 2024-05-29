import React, { useState } from "react"
import "./CSS/LoginSignup.css"
import axios from "axios"

const localhost = "http://localhost:4000"
const url = "https://e-commerce-mern-frontend-five.vercel.app"

const LoginSignup = () => {
    const [state, setState] = useState("Login")
    const [checked, setChecked] = useState(true)
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const login = async() => {
        try {
            console.log("Login details updated", formData)
            const response = await axios.post(`${url}/login`, formData)
            console.log(response)
            const data = response.data;
            if (data.success) {
                localStorage.setItem("auth-token", data.token)
                window.location.replace("/")
            } else {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("An error occurred. Please try again.");
                }
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                console.log(error);
                alert("An errrrr occurred. Please try again.");
            }
        }

    }

    const signup = async () => {
        try {
            console.log("Signup details updated", formData)
            const response = await axios.post("`${url}/signup`", formData)
            console.log(response)
            const data = response.data;
            if (data.success) {
                localStorage.setItem("auth-token", data.token)
                window.location.replace("/")
            } else {
                if (data.error) {
                    alert(data.error);
                } else {
                    alert("An error occurred. Please try again.");
                }
            }
        } catch (error) {
            if (error.response) {
                alert(error.response.data.error);
            } else {
                console.log(error);
                alert("An errrrr occurred. Please try again.");
            }
        }
    }
    return (
        <div className="loginsignup">
            <div className="loginsignup-container">
                <h1>{state}</h1>
                <div className="loginsignup-fields">
                    {state === "Signup" && (
                        <input
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            type="text"
                            placeholder="Your Name"
                        />
                    )}
                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button disabled={checked} onClick={() => (state === "Login" ? login() : signup())}>
                    Continue
                </button>
                {state === "Signup" ? (
                    <p className="loginsignup-login" onClick={() => setState("Login")}>
                        Already have an account? <span>Login here</span>
                    </p>
                ) : (
                    <p className="loginsignup-login" onClick={() => setState("Signup")}>
                        Create new account? <span>Click here</span>
                    </p>
                )}
                <div className="loginsignup-agree">
                    <input type="checkbox" onChange={() => setChecked((prev) => !prev)} />
                    <p>By continuing, i agree to the terms of use & privacy policy.</p>
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
