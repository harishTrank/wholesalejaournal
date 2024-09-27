import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

import './Header.css'
import { cartTotal } from "../../store/Services/Product";
import { useAtom } from "jotai";
import { cartLengthApiHit } from "../../JotaiStore";

const Header = () => {
  const { pathname } = useLocation();
  const [cartQty,setCartQty]:any=useState(0);
  const [apiHitAgain] : any = useAtom(cartLengthApiHit);
  
  useEffect(() => {
    cartTotal().then((res:any)=>{
      setCartQty(res.count)
    })
  }, [apiHitAgain])


  useEffect(() => {
    window.scrollTo(0, 0);

  }, [pathname]);



  const navigate=useNavigate()
  return (
    <div>
      <header>
        <div className="container">
          <div className="top-area flex space-bw al-center">
            <div>
              <Link to="/">Wholesale Journal</Link>
            </div>
            <div className="tagline">
              <p>Bulk Journals- journals and notebooks- custom diaries</p>
            </div>
            <div className="cart-header flex space-bw  al-center">
             
              <div className="icon-1" onClick={()=>navigate('/account')}>
                <FaRegUserCircle size={22}/>
                </div>
              
              
              <div className="flex space-bw al-center icon-2" onClick={()=>navigate('/cart')}>
                <p><IoCart size={22}/></p>
                <p>({cartQty})</p>
                </div>
            
            </div>
            <div className="toggle">
              <i className="fa-solid fa-bars"></i>
            </div>
          </div>
        </div>
        <nav>
          <div className="container">
            <ul className="flex justify-center">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/journal">Journal Books</Link>
              </li>
              <li>
                <Link to="/writing">Writing Journal</Link>
              </li>
              <li>
                <Link to="/shop">Shop</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
