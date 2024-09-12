import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="gap">
        <div className="container">
          <div className="flex space-bw">
            <div className="col-25">
              <h3>USA Custom Pad</h3>
              <ul>
                <li>
                  <a href="">
                    Sidney Industrial Park <br />
                    16 Winkler Road – Sidney, New York 13838
                  </a>
                </li>
                <li>
                  <a href="">Ph: (800) 310-2723</a>
                </li>
                <li>
                  <a href="">E-Mail: sales@usapad.com</a>
                </li>
                <li>
                  <a href="">Fax: (607) 563-9553</a>
                </li>
              </ul>
            </div>
            <div className="col-25 lpad">
              <h3>Links</h3>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/shop">Shop</Link>
                </li>
                <li>
                  <a href="">About</a>
                </li>
                <li>
                  <a href="">Contact</a>
                </li>
              </ul>
            </div>
            <div className="col-25">
              <h3>Help</h3>
              <ul>
                <li>
                  <a href="">Payment Options</a>
                </li>
                <li>
                  <a href="">Returns</a>
                </li>
                <li>
                  <a href="">Privacy Policy</a>
                </li>
              </ul>
            </div>
            <div className="col-25">
              <h3>Newsletter</h3>
              <form action="">
                <input type="text" />
                <input type="button" value="Subscribe" />
              </form>
            </div>
          </div>
          <div className="copyright">
            <p>Wholesalejournals.com copyright ©2024. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
