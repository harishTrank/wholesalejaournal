import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import "./Cart.css";
import CartObject from "./Components/CartObject";
import { Link, useNavigate } from "react-router-dom";
import FullScreenLoader from "../../components/FullScreenLoader";
import toast from "react-hot-toast";
import {
  ApplyCoupon,
  CouponList,
  currentCartListAPI,
} from "../../store/Services/Product";
import { RiCoupon5Line } from "react-icons/ri";

const CartScreen = () => {
  const [cartDetails, setCartDetails]: any = useState([]);
  const [isLoading, setIsLoading]: any = useState(false);
  const [cartTotal, setCartTotal]: any = useState(0);
  const navigation: any = useNavigate();
  const [hitAgainAPI, setHitAgainAPI]: any = useState(0);
  const [couponPopup, setCouponPopup]: any = useState(false);
  const [couponDetails, setCouponDetails]: any = useState("");
  const [selectedCouponCode, setSelectedCouponCode]: any = useState("");
  const [finalAmount, setFinalAmount]: any = useState({
    original_price: 0,
    discount_amount: 0,
    discount_price: 0,
  });
  const [system, setSystem]: any = useState(false);
  const handleApplyClick = () => {
    setCouponPopup(true);
  };

  const closePopup = () => {
    setCouponPopup(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (!localStorage.getItem("accessToken")) {
      const currentData: any = localStorage.getItem("cartData");
      if (currentData && currentData !== "undefined") {
        const jsondata: any = JSON.parse(currentData);
        setCartDetails(jsondata);
        setCartTotal(
          jsondata.reduce((a: any, b: any) => a.total_price + b.total_price) ||
            0
        );
      }
      setIsLoading(false);
    } else {
      setTimeout(() => {
        currentCartListAPI()
          .then((res: any) => {
            setCartDetails(res.data);
            setIsLoading(false);
            setCartTotal(res.total_price_sum);
          })
          .catch(() => {
            setIsLoading(false);
            toast.error("Something went wrong from server side.");
          });
      }, 1000);
    }
  }, [hitAgainAPI]);

  const checkOutButtonHandler = () => {
    if (!localStorage.getItem("accessToken")) {
      navigation("/account");
      toast.error("Please login before proceeding.");
    }
  };

  useEffect(() => {
    CouponList()
      .then((res: any) => {
        setCouponDetails(res.data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const applyCouponHandler = () => {
    ApplyCoupon({
      body: {
        coupon_code: selectedCouponCode,
      },
    })
      .then((res: any) => {
        setFinalAmount({
          original_price: res.original_price,
          discount_amount: res.discount_amount,
          discount_price: res.discount_price,
        });
        setSystem(true);
      })
      .catch((err: any) => {
        console.error("Error applying coupon:", err);
      });
  };

  const applyCoupon = (couponCode: any) => {
    setSelectedCouponCode(couponCode);
    setCouponPopup(false);
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
                        <input
                          type="text"
                          placeholder="Enter Code"
                          value={selectedCouponCode}
                          onChange={(e) =>
                            setSelectedCouponCode(e.target.value)
                          }
                        />
                        <button onClick={applyCouponHandler}>Apply</button>
                      </div>
                      <div className="check-coupon ">
                        <button
                          onClick={handleApplyClick}
                          className="flex al-center justify-center"
                        >
                          Check Available Coupons&nbsp; <RiCoupon5Line />
                        </button>
                      </div>
                      {couponPopup && couponDetails.length > 0 && (
                        <div className="popup-overlay">
                          <div className="popup">
                            <h2>Coupons</h2>
                            <span onClick={closePopup} className="close-button">
                              x
                            </span>

                            {couponDetails.map((coupon: any, index: any) => (
                              <div
                                key={index}
                                className="cartcoupon flex space-bw al-center"
                              >
                                <div className="coupon-left">
                                  <p> Flat {coupon.discount_amount}% OFF</p>
                                </div>
                                <div className="coupon-right">
                                  <h3>{coupon.coupon_code}</h3>
                                  <div className="cartcoupon-row">
                                    <p>{coupon.disc}</p>
                                  </div>
                                  <div className="cartcoupon-row">
                                    <p>
                                      Minimum Order value should be{" "}
                                      {coupon.min_amount}
                                    </p>
                                    <button
                                      onClick={() =>
                                        applyCoupon(coupon.coupon_code)
                                      }
                                    >
                                      Apply
                                    </button>
                                  </div>
                                </div>

                                <div className="cartcircle-1"></div>
                                <div className="cartcircle-2"></div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="subtotal flex space-bw">
                        <p>Subtotal</p>
                        <p>
                          $
                          {system && finalAmount.original_price
                            ? finalAmount.original_price
                            : cartTotal}
                        </p>
                      </div>
                      <div className="free-shipping flex space-bw">
                        <p>Shipping</p>
                        <p>FREE</p>
                      </div>
                      <div className="free-shipping flex space-bw">
                        <p>Discount Amount</p>
                        <p style={{ color: "red" }}>
                          {system && finalAmount.discount_amount
                            ? `-$${finalAmount.discount_amount}`
                            : `$0`}
                        </p>
                      </div>

                      <div className="total flex space-bw">
                        <p>Total</p>
                        <p>
                          $
                          {system && finalAmount.discount_price
                            ? finalAmount.discount_price
                            : cartTotal}
                        </p>
                      </div>
                      <div className="checkout-btn">
                        <button onClick={checkOutButtonHandler}>
                          Checkout
                        </button>
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
