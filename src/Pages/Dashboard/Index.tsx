import React from 'react'
import "./Style.css"
// import cate1 from '../../assests/cate1.png'
// import cate2 from '../../assests/cate2.png'
// import cate3 from '../../assests/cate3.png'
import product1 from '../../assests/product1.png'
import product2 from '../../assests/product2.png'
import product3 from '../../assests/product3.png'
import product4 from '../../assests/product4.png'
import slide1 from '../../assests/slide1.png'
import slide2 from '../../assests/slide2.png'
import new1 from '../../assests/new1.png'
import new2 from '../../assests/new2.png'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

const Dashboard = () => {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: true,
    };

    return (

        <div>
            <Header/>

            <section className="banner-area">
                <div className="container">
                    <div className="flex space-bw">
                        <div className="col-50 no-show"></div>
                        <div className="col-50 banner-text">
                            <h3>New Arrival</h3>
                            <h1>Find your dream journal now</h1>
                            <p>Wholesale journals and notebooks can be purchases with blank, personalized or custom covers,
                                Leather,
                                recycled and faux leather journal and notebook covers can be imprinted with your organizations
                                name,
                                logo, mascots or seals. Give custom journals, notebooks and diaries as gifts to your employees
                                and
                                clients at company events. Customized journals or notebooks can be used as field journals,
                                laboratory
                                notebooks, office to do lists- the possibilities are endless when your personalizing your
                                journal
                                covers.</p>
                            <a href="#">Buy Now</a>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pad-top">
                <div className="container">
                    <div className="flex space-bw product-detail">
                        <div className="col-33_2">
                            {/* <img src={cate1} alt="" /> */}
                            <div className="product-text">
                                <h3>Cork Diaries</h3>
                            </div>
                        </div>
                        <div className="col-33_2">
                            {/* <img src={cate2} alt="" /> */}
                            <div className="product-text">
                                <h3>Custom Hardbound Diaries with Smooth Covers</h3>
                            </div>
                        </div>
                        <div className="col-33_2">
                            {/* <img src={cate3} alt="" /> */}
                            <div className="product-text">
                                <h3>Bound Bulk Journals with Soft-Textured Covers</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="gap">
                <div className="container">
                    <div className="common-text text-center">
                        <h2>Our Products</h2>
                    </div>
                    <div className="flex space-bw product-detail">
                        <div className="col-25">
                            <img src={product1} alt="" />
                            <div className="product-text">
                                <h3>Wholesale Recycled Paper Notebooks</h3>
                                <p>Product # WHJS1209-9</p>
                                <a href="#">Buy Now</a>
                            </div>
                        </div>
                        <div className="col-25">
                            <img src={product2} alt="" />
                            <div className="product-text">
                                <h3>Eco Saddle Stitched Notebooks</h3>
                                <p>Product # WHJS1209-9</p>
                                <a href="#">Buy Now</a>
                            </div>
                        </div>
                        <div className="col-25">
                            <img src={product3} alt="" />
                            <div className="product-text">
                                <h3>Wholesale Recycled Paper Notebooks</h3>
                                <p>Product # WHJS1209-9</p>
                                <a href="#">Buy Now</a>
                            </div>
                        </div>
                        <div className="col-25">
                            <img src={product4} alt="" />
                            <div className="product-text">
                                <h3>Bulk Recycled Spiral Journals</h3>
                                <p>Product # WHJS1209-9</p>
                                <a href="#">Buy Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="gap prod-slides">
                <div className="container">
                    <div className="flex al-center">
                        <div className="col-40">
                            <h2>Discover 50+ stylish journals</h2>
                            <p>"Discover our curated collection of inspiring journal prototypes!"</p>
                            <a href="#">Explore More</a>
                        </div>
                        <div className="col-60">
                            <div className="slider">
                                <Slider {...settings}>
                                    <div>
                                        <img src={slide1} alt="" />
                                    </div>
                                    <div>
                                        <img src={slide2} alt="" />
                                    </div>
                                    <div>
                                        <img src={slide1} alt="" />
                                    </div>
                                    <div>
                                        <img src={slide2} alt="" />
                                    </div>
                                </Slider>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pad-top">
                <div className="flex space-bw new-journal">
                    <div className="col-33">
                        <img src={new1} alt="" />
                    </div>
                    <div className="col-33 new-text">
                        <h3>New Journal Designs Inside</h3>
                        <p>Dive into our latest collection of exquisitely designed journals. Crafted with care and attention to
                            detail, each piece promises to inspire your creativity and enhance your writing experience. Don't
                            miss out on our new arrivals—your perfect journal awaits!</p>
                        <a href="#">View More</a>
                    </div>
                    <div className="col-33">
                        <img src={new2} alt="" />
                    </div>
                </div>
            </section>

            <footer className="gap">
                <div className="container">
                    <div className="flex space-bw">
                        <div className="col-25">
                            <h3>USA Custom Pad</h3>
                            <ul>
                                <li>
                                    <a href="#">
                                        Sidney Industrial Park <br />16 Winkler Road – Sidney, New York 13838
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Ph: (800) 310-2723
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        E-Mail: sales@usapad.com
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        Fax: (607) 563-9553
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-25 lpad">
                            <h3>Links</h3>
                            <ul>
                                <li>
                                    <a href="#">Home</a>
                                </li>
                                <li>
                                    <a href="#">Shop</a>
                                </li>
                                <li>
                                    <a href="#">About</a>
                                </li>
                                <li>
                                    <a href="#">Contact</a>
                                </li>
                            </ul>
                        </div>
                        <div className="col-25">
                            <h3>Help</h3>
                            <ul>
                                <li>
                                    <a href="#">Payment Options</a>
                                </li>
                                <li>
                                    <a href="#">Returns</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Policy</a>
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
    )
}

export default Dashboard