import React, { useState } from "react";

const CartObject = ({
  currentItem,
  currentIndex,
  setIsLoading,
  setCartDetails,
}: any) => {
  const [quantity, setQuantity]: any = useState(currentItem?.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    if (!localStorage.getItem("accessToken")) {
      setIsLoading(true);
      let currentData: any = localStorage.getItem("cartData");
      currentData = JSON.parse(currentData);

      const finalData: any = currentData.map((item: any, index: any) => {
        return index === currentIndex
          ? {
              ...item,
              quantity: quantity + 1,
            }
          : item;
      });
      localStorage.setItem("cartData", JSON.stringify(finalData));
      setIsLoading(false);
      setCartDetails(finalData);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setIsLoading(true);
      setQuantity(quantity - 1);
      if (!localStorage.getItem("accessToken")) {
        let currentData: any = localStorage.getItem("cartData");
        currentData = JSON.parse(currentData);

        const finalData: any = currentData.map((item: any, index: any) => {
          return currentIndex === index
            ? {
                ...item,
                quantity: quantity - 1,
              }
            : item;
        });
        localStorage.setItem("cartData", JSON.stringify(finalData));
        setIsLoading(false);
        setCartDetails(finalData);
      }
    }
  };

  const removeItemHandler = () => {
    setIsLoading(true);
    if (!localStorage.getItem("accessToken")) {
      const currentData: any = localStorage.getItem("cartData");
      const finalData: any = JSON.parse(currentData)?.filter(
        (item: any, index: any) => currentIndex !== index
      );
      localStorage.setItem("cartData", JSON.stringify(finalData));
      setIsLoading(false);
      setCartDetails(finalData);
    }
  };

  return (
    <div className="product-down flex space-bw">
      <div className="product-image">
        <img src={currentItem?.cover} alt="" />
        <img src={currentItem?.inner} alt="" />
      </div>
      <div className="product-description">
        <p>
          <u>{currentItem?.heading}</u>
        </p>
        <p>{currentItem?.description}</p>
        <div className="quantity-box">
          <button onClick={handleDecrement} className="minus-btn">
            -
          </button>
          <input type="text" value={quantity} readOnly />
          <button onClick={handleIncrement} className="plus-btn">
            +
          </button>
        </div>
        <p className="remove-item">
          <span
            style={{ color: "red", fontSize: "14px" }}
            onClick={removeItemHandler}
          >
            Remove Item
          </span>
        </p>
      </div>
      <div className="product-price">
        <p>${Math.round(currentItem?.price * quantity).toFixed(2)}</p>
      </div>
    </div>
  );
};

export default CartObject;
