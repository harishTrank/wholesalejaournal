import React, { useState } from "react";
import {
  incrementDecrementCartItemAPI,
  removeCartItem,
} from "../../../store/Services/Product";
import toast from "react-hot-toast";
import {} from "../../../Utils";
import { cartLengthApiHit } from "../../../JotaiStore";
import { useAtom } from "jotai";

const CartObject = ({
  currentItem,
  currentIndex,
  setIsLoading,
  setCartDetails,
  setHitAgainAPI,
}: any) => {
  const [quantity, setQuantity]: any = useState(currentItem?.quantity);
  const [, setapiHitCartLength]: any = useAtom(cartLengthApiHit);

  const cartObjectQuantityHandler = (quantity: any, id: any) => {
    incrementDecrementCartItemAPI({
      body: {
        quantity,
        id,
      },
    })
      .then(() => {
        setIsLoading(false);
        setHitAgainAPI((oldValue: any) => oldValue + 1);
      })
      .catch(() => {
        setIsLoading(false);
        toast.error("Something went wrong from server side.");
      });
  };

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
              total_price: item.price * (quantity + 1),
            }
          : item;
      });
      localStorage.setItem("cartData", JSON.stringify(finalData));
      setHitAgainAPI((oldValue: any) => oldValue + 1);
      setIsLoading(false);
      setCartDetails(finalData);
    } else {
      setIsLoading(true);
      cartObjectQuantityHandler(quantity + 1, currentItem.id);
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
                total_price: item.price * (quantity - 1),
              }
            : item;
        });
        localStorage.setItem("cartData", JSON.stringify(finalData));
        setHitAgainAPI((oldValue: any) => oldValue + 1);
        setIsLoading(false);
        setCartDetails(finalData);
      } else {
        setIsLoading(true);
        cartObjectQuantityHandler(quantity - 1, currentItem.id);
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
      setapiHitCartLength((oldval: any) => oldval + 1);
      setCartDetails(finalData);
    } else {
      removeCartItem({
        body: {
          item_id: currentItem?.id,
        },
      })
        .then(() => {
          setapiHitCartLength((oldval: any) => oldval + 1);
          toast.success("Remove item successfully");
          setHitAgainAPI((oldValue: any) => oldValue + 1);
          setIsLoading(false);
        })
        .catch(() => {
          toast.error("Something went wrong from server side.");
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="product-down flex space-bw">
      <div className="product-image">
        <img style={{ objectFit: "contain" }} src={currentItem?.cover} alt="" />
        <img style={{ objectFit: "contain" }} src={currentItem?.inner} alt="" />
      </div>
      <div className="product-description">
        <p>
          <u>{currentItem?.heading || currentItem?.name}</u>
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
        <p>${currentItem?.total_price}</p>
      </div>
    </div>
  );
};

export default CartObject;
