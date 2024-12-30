import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

import "./Header.css";
import { cartTotal } from "../../store/Services/Product";
import { useAtom } from "jotai";
import { cartLengthApiHit } from "../../JotaiStore";
import Logo from '../../images/wholesale-logo.png'
import { CiUser } from "react-icons/ci";


const Header = () => {
  const { pathname } = useLocation();
  const [cartQty, setCartQty]: any = useState(0);
  const [apiHitAgain]: any = useAtom(cartLengthApiHit);

  useEffect(() => {
    if (!localStorage.getItem("accessToken")) {
      const currentData: any = localStorage.getItem("cartData");
      const count = JSON.parse(currentData);
      setCartQty(count?.length || 0);
    } else {
      cartTotal()
        .then((res: any) => {
          setCartQty(res.count);
        })
        .catch((err: any) => console.log("err", err));
    }
  }, [apiHitAgain]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const navigate = useNavigate();
  return (
    <div>
      <header>
        <div className="container">
          <div className="top-area flex space-bw al-center">
            <div className="flex al-center wholesale-heading">
            <img src={Logo} alt="" />&nbsp;&nbsp;
             <p onClick={()=>navigate('/')}>Wholesale Journal</p>
            </div>
            <div className="nav-pages">
            <ul className="flex  space-bw al-center ">
              <li onClick={()=>navigate('/')}>
              
                Home
              </li>
              <li  onClick={()=>navigate('/journal')}>
               
                Journal Books
              </li>
              <li  onClick={()=>navigate('/writing')}>
               
                Writing Journal
              </li>
            
            </ul>
            </div>
            
            <div className="cart-header flex space-bw  al-center">
              <div className="icon-access" onClick={() => navigate("/account")}>
               <p className="flex al-center"> <CiUser size={22} />&nbsp; Account Access</p>
              </div>

              <div
                className="flex space-bw al-center icon-2"
                onClick={() => navigate("/cart")}
              >
                <p>
                  <IoCart size={25} />
                </p>
                <p>{cartQty !== 0 ? `(${cartQty})` : ""}</p>
              </div>
            </div>
            <div className="toggle">
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
       
      </header>
    </div>
  );
};

export default Header;
