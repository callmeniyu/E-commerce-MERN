import React, { useEffect, useState } from 'react'
import "./Popular.css"
import Item from '../Item/Item'
import axios from "axios"

const localhost = "http://localhost:4000"
const url = "https://e-commerce-mern-frontend-five.vercel.app"

const Popular = () => {
    const [popular_women, setPopular_Women] = useState([])
    
    useEffect(() => {
        const popularWomen = async() => {
            const response = await axios.get(`${url}/popularinwomen`)
            const data = response.data
            setPopular_Women(data)
        }
        popularWomen()
    },[])
  return (
      <div className='popular'>
          <h1>POPULAR IN WOMEN</h1>
          <hr />
          <div className="popular-item">
              {popular_women.map((item, i) => {
                  return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price}
                      old_price={ item.old_price} />
              })}
          </div>
      </div>
  )
}

export default Popular