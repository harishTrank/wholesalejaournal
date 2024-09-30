import React from 'react'
import './Discount.css'
const index = ({discountCoupons}:any) => {
  return (
    <div className='flex space-bw al-center'>
     
   
      {discountCoupons.map((coupon:any, index:any) => (
        <div className="coupon-card" key={index}>
          <img src="https://i.postimg.cc/KvTqpZq9/uber.png" className="logo" alt="Coupon Logo" />
          <h3>
            {coupon.disc ? coupon.disc : `${coupon.persent}% discount available for purchasing ${coupon.min_qty} to ${coupon.max_qty} products.`}
          </h3>
          <div className="coupon-row">
            <span id="cpnCode">Minimum Product Quantity:</span>
            <span id="cpnBtn">{coupon.min_qty}</span>
          </div>
          <div className="coupon-row">
            <span id="cpnCode">Maximum Product Quantity:</span>
            <span id="cpnBtn">{coupon.max_qty}</span>
          </div>
          <div className="circle1"></div>
          <div className="circle2"></div>
        </div>
      ))}
   
</div>
  )
}

export default index
