import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Diary from "../../images/Diary-removebg-preview.png";
import "./Cart.css";
const Index = () => {
  const [quantity, setQuantity]: any = useState(1); // Default value is 1

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  return (
    <div className="cart-section">
      <Header />
      <div className="container">
        <section className="gap">
          <div className="cart-section">
            <p>Home/Cart</p>
            <h2>Cart</h2>
            <div className="details-section flex space-bw">
              <div className="product">
                <div className="product-content">
                  <div className="product-upper flex space-bw">
                    <p>Product</p>
                    <p>TOTAL</p>
                  </div>
                  <div className="product-down flex space-bw">
                    <div className="product-image">
                      <img src={Diary} alt="" />
                    </div>
                    <div className="product-description">
                      <p>
                        <u>Eco Saddle Stiched Notebooks</u>
                      </p>
                      <p>$10.00</p>
                      <p>
                        Our Wholsale recycled journals are eco-friendly,stylish,
                        and sustainable. Made from high
                        <br />
                        quality recycled matrials
                      </p>
                      <div className="quantity-box">
                        <button onClick={handleDecrement} className="minus-btn">
                          -
                        </button>
                        <input type="text" value={quantity} readOnly />
                        <button onClick={handleIncrement} className="plus-btn">
                          +
                        </button>
                       
                      </div>
                      <p>
                        <span>Remove Item</span>
                      </p>
                     
                    </div>
                    <div className="product-price">
                        <p>$10.00</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="cart-total">
                <div className="cart-heading">
                <h3>Cart Totals</h3>
                </div>
               
                <div className="addcoupon">
                  <div className="addcoupon-heading">
                  <p>Add a coupon</p>
                  </div>
                  
                  <div className="entercode flex space-bw">
                    <input type="text" placeholder="Enter Code" />
                    <button>Apply</button>
                  </div>
                  <div className="subtotal flex space-bw">
                    <p>Subtotal</p>
                    <p>$10.00</p>
                  </div>
                  <div className="free-shipping flex space-bw">
                    <p>Shipping</p>
                    <p>FREE</p>
                  </div>
                  
                  <div className="total flex space-bw">
                    <p>Total</p>
                    <p>$10.00</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
