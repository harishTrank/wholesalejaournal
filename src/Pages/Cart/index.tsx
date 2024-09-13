import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Cart.css";
import CartObject from "./Components/CartObject";
import { Link, useNavigate } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader";
import toast from "react-hot-toast";
import { currentCartListAPI } from "../../store/Services/Product";

const CartScreen = () => {
  const [cartDetails, setCartDetails]: any = useState([]);
  const [isLoading, setIsLoading]: any = useState(false);
  const [cartTotal, setCartTotal]: any = useState(0);
  const navigation: any = useNavigate();
  const [hitAgainAPI, setHitAgainAPI]: any = useState(0);

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem("accessToken")) {
      const currentData: any = localStorage.getItem("cartData");
      if (currentData && currentData !== "undefined") {
        setCartDetails(JSON.parse(currentData));
      }
    } else {
      currentCartListAPI()
        .then((res: any) => {
          setCartDetails(res.data);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          toast.error("Something went wrong from server side.");
        });
    }
  }, [hitAgainAPI]);

  useEffect(() => {
    setCartTotal(
      Math.floor(
        cartDetails.reduce((sum: any, item: any) => {
          return sum + item.price * item.quantity;
        }, 0)
      ).toFixed(2) || "0.00"
    );
  }, [cartDetails]);

  const checkOutButtonHandler = () => {
    if (!localStorage.getItem("accessToken")) {
      navigation("/account");
      toast.error("Please login before proceeding.");
    }
  };

  return (
    <div className="cart-section">
      <Header />
      {isLoading && <FullScreenLoader />}
      <div className="container">
        <section className="gap">
          <div className="cart-section">
            {!cartDetails ||
            cartDetails === null ||
            cartDetails.length === 0 ? (
              <div className="empty-cart">
                <i className="fa-solid fa-face-sad-tear"></i>
                <p>Your Cart is empty</p>
                <Link className="button" to="/">
                  Add Items
                </Link>
              </div>
            ) : (
              <>
                <h2>Cart</h2>
                <div className="details-section flex space-bw">
                  <div className="product">
                    <div className="product-content">
                      <div className="product-upper flex space-bw">
                        <p>Product</p>
                        <p>TOTAL</p>
                      </div>
                      {cartDetails.map((currentItem: any, index: any) => (
                        <CartObject
                          key={index}
                          currentIndex={index}
                          currentItem={currentItem}
                          setIsLoading={setIsLoading}
                          setCartDetails={setCartDetails}
                          setHitAgainAPI={setHitAgainAPI}
                        />
                      ))}
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
                        <p>${cartTotal}</p>
                      </div>
                      <div className="free-shipping flex space-bw">
                        <p>Shipping</p>
                        <p>FREE</p>
                      </div>

                      <div className="total flex space-bw">
                        <p>Total</p>
                        <p>${cartTotal}</p>
                      </div>
                      <div className="checkout-btn">
                      <button onClick={checkOutButtonHandler}>Checkout</button>
                      </div>
                      
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default CartScreen;
