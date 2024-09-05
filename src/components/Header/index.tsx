import React from 'react'
import { Link } from 'react-router-dom'
const index = () => {
  return (
    <div>
      <header>
                <div className="container">
                    <div className="top-area flex space-bw al-center">
                        <div>
                            <a href="#">Wholesale Journal</a>
                        </div>
                        <div className="tagline">
                            <p>Bulk Journals- journals and notebooks- custom diaries</p>
                        </div>
                        <div>
                            <a href="#" className="nmbr">PH: (800) 310 - 2723</a>
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
                            <Link to='/journal'>Journal Books</Link>
                            </li>
                            <li>
                                <a href="#">Writing Journal</a>
                            </li>
                            <li>
                                <a href="#">Shop</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </header>
    </div>
  )
}

export default index
