import React from "react";
import "./style.css";
import { productCategoriesWise } from "../../../store/Services/Product";
import { useNavigate } from "react-router-dom";

const Card = ({ product, index }: any) => {
  console.log("product", product);
  const navigation: any = useNavigate();
  const productClickHandler = () => {
    navigation(`/customise/${product?.id || product?.first_product_id}`);
  };
  return (
    <div className="card-container" key={index} onClick={productClickHandler}>
      <div className="card-content ">
        <div className="card-image">
          <img src={product?.product_image || product?.image} alt="" />
        </div>
        <div className="card-name">
          <p>{product?.title}</p>
        </div>
        <div className="card-price">
          <p>${product?.price || product?.first_product_price}</p>
        </div>
        <div className="card-btn">
          <button>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Card;
