import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { IoCart } from "react-icons/io5";

const Header = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
            <div className="cart-header">
              <Link to="/account">
                <FaRegUserCircle />
              </Link>
              <Link to="/cart">
                <IoCart />
              </Link>
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
