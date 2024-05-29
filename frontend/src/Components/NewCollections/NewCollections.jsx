import React, { useEffect, useState } from "react"
import "./NewCollections.css"
import Item from "../Item/Item"
import axios from "axios"

const localhost = "http://localhost:4000"
const url = "https://e-commerce-mern-frontend-five.vercel.app"

const NewCollections = () => {
    const [new_collections, setNew_Collections] = useState([])

    useEffect(() => {
        const fetchNewCollections = async() => {
            const response = await axios.get(`${url}/newcollections`)
            const data = response.data
            setNew_Collections(data)
        }
        fetchNewCollections()
    },[])
    return (
        <div className="new-collections">
            <h1>NEW COLLECTIONS</h1>
            <hr />
            <div className="collections">
                {new_collections.map((item, i) => (
                    <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        old_price={item.old_price}
                    />
                ))}
            </div>
        </div>
    )
}

export default NewCollections
