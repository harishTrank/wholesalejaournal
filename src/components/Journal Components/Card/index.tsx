import React from 'react'
import Diary from '../../../images/Diary Final.png'
import './style.css'
const index = () => {
  return (
    <div className='card-container'>
        <div className="card-content ">
            <div className="card-image">
                <img src={Diary} alt="" />
            </div>
            <div className="card-name">
                <p>Eco friendly Rectangular Journal</p>
            </div>
            <div className="card-price">
                <p>$10.00</p>
            </div>
            <div className="card-btn">
                <button>Add to cart</button>
            </div>
        </div>
      
    </div>
  )
}

export default index
