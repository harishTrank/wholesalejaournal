import React from 'react'
import Diary from '../../../images/Diary Final.png'
import './style.css'
const Card = ({product, index}:any) => {
  return (
    <div className='card-container' key={index}>
        <div className="card-content ">
            <div className="card-image">
                <img src={product.product_image} alt="" />
            </div>
            <div className="card-name">
                <p>{product.title}</p>
            </div>
            <div className="card-price">
                <p>${product.price}</p>
            </div>
            <div className="card-btn">
                <button>Add to cart</button>
            </div>
        </div>
      
    </div>
  )
}

export default Card
