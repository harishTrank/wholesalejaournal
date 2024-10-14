import React, { useEffect, useState } from "react";
import "./Style.css";
import slide1 from "../../assests/slide1.png";
import slide2 from "../../assests/slide2.png";
import new1 from "../../assests/new1.png";
import new2 from "../../assests/new2.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Cate1 from "../../assests/cate1.png";
import Cate2 from "../../assests/cate2.png";
import Cate3 from "../../assests/cate3.png";
import Footer from "../../components/Footer";
import { homeProducts } from "../../store/Services/Product";
import Discount from "../../components/Discount Card";
import { DiscountList } from "../../store/Services/Product";
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

  const [dasboardProducts, setDasboardProducts]: any = useState([]);
  const [discountcoupons, setDiscountCoupons]: any = useState([]);

  useEffect(() => {
    homeProducts()
      .then((res: any) => {
        setDasboardProducts(res.data);
      })
      .catch((err) => console.log("err", err));

    DiscountList()
      .then((res: any) => {
        setDiscountCoupons(res.Data);
      })
      .catch((err) => console.log("err", err));
  }, []);

  const navigation: any = useNavigate();
  const addtocardHandler = (product: any) => {
    console.log("product", product);
    navigation(`/customise/${product?.id}`);
  };

  return (
    <div>
      <Header />
      <section className="banner-area">
        <div className="container">
          <div className="flex space-bw">
            <div className="col-50 no-show"></div>
            <div className="col-50 banner-text">
              <h3>New Arrival</h3>
              <h1>Find your dream journal now</h1>
              <p>
                Wholesale journals and notebooks can be purchases with blank,
                personalized or custom covers, Leather, recycled and faux
                leather journal and notebook covers can be imprinted with your
                organizations name, logo, mascots or seals. Give custom
                journals, notebooks and diaries as gifts to your employees and
                clients at company events. Customized journals or notebooks can
                be used as field journals, laboratory notebooks, office to do
                lists- the possibilities are endless when your personalizing
                your journal covers.
              </p>
              <Link to="/journal">Buy Now</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pad-top">
        <div className="container">
          <div className="flex space-bw product-detail">
            <div className="col-33_2">
              <img src={Cate1} alt="" />
              <div className="product-text">
                <h4>Cork Diaries</h4>
              </div>
            </div>
            <div className="col-33_2">
              <img src={Cate2} alt="" />
              <div className="product-text">
                <h4>Custom Hardbound Diaries with Smooth Covers</h4>
              </div>
            </div>
            <div className="col-33_2">
              <img src={Cate3} alt="" />
              <div className="product-text">
                <h4>Bound Bulk Journals with Soft-Textured Covers</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="gap">
        <div className="container">
          <div className="common-text text-center">
            <h2>Our Discount</h2>
          </div>
          <div>
            <Discount discountCoupons={discountcoupons} />
          </div>
        </div>
      </section>

      <section className="gap">
        <div className="container">
          <div className="common-text text-center">
            <h2>Our Products</h2>
          </div>

          <div className="flex space-bw product-detail">
            {dasboardProducts?.map((product: any, index: any) => (
              <div className="col-25 product-box" key={index}>
                <img
                  style={{ objectFit: "contain" }}
                  src={product?.product_image}
                  alt=""
                />
                <div className="product-text">
                  <h3>{product.title}</h3>
                  <p>${product.price}</p>
                  <p>{product.disc}</p>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => addtocardHandler(product)}
                  >
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gap prod-slides">
        <div className="container">
          <div className="flex al-center">
            <div className="col-40">
              <h2>Discover 50+ stylish journals</h2>
              <p>
                "Discover our curated collection of inspiring journal
                prototypes!"
              </p>
              <Link to="/journal">Explore More</Link>
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
            <p>
              Dive into our latest collection of exquisitely designed journals.
              Crafted with care and attention to detail, each piece promises to
              inspire your creativity and enhance your writing experience. Don't
              miss out on our new arrivals—your perfect journal awaits!
            </p>
            <Link to="/writing">View More</Link>
          </div>
          <div className="col-33">
            <img src={new2} alt="" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Dashboard;
