import React, { useState, useEffect, useRef } from "react";
import "./HomeScreen.css";
import CoverOption from "../HomeComp/CoverOption";
import BackgroundShape from "../HomeComp/BackgroundShape";
import CustomCanvas from "../HomeComp/CustomCoverCanvas";
import ColorSelector from "../HomeComp/ColorSelector";
import Header from "../../../components/Header";
import FontsComponents from "../HomeComp/FontsComponents";
import Footer from "../../../components/Footer";
import Card from "../../../components/Journal Components/Card";
import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";
import { canvasType } from "../../../Utils";
import FullScreenLoader from "../../../components/FullScreenLoader";
import toast from "react-hot-toast";
import {
  addToCartDefault,
  productCategoriesWise,
  productSizeApi,
} from "../../../store/Services/Product";
import { useParams } from "react-router-dom";
import { useAtom } from "jotai";
import { cartLengthApiHit } from "../../../JotaiStore";

const HomeScreen = ({ curimage }: any) => {
  const [image, setImage]: any = useState(null);
  const [coverCurrentOption, setCoverCurrentOption] = useState("");
  const [currentBkgShape, setCurrentBkgShape]: any = useState("");
  const [backgroundColor, setBackGroundColor]: any = useState("#F5E6D9");
  const [textColor, setTextColor]: any = useState("#333333");
  const [canvasText, setCanvasText]: any = useState(["", "", ""]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCanvasVisible, setIsCanvasVisible] = useState<boolean>(false);
  const [lowerVisible, setLowerVisible]: any = useState(true);
  const [uploadLogo, setUploadLogo]: any = useState(null);
  const [uploadInnerLogo, setUploadInnerLogo]: any = useState(null);
  const [innerPageOption, setInnerPageOption]: any = useState("Cover");
  const coverRef = useRef<any>(null);
  const innerRef = useRef<any>(null);
  const [isContentVisible, setIsContentVisible]: any = useState(false);
  const [isModalOpen, setIsModalOpen]: any = useState(false);
  const [previewImage, setPreviewImage]: any = useState({
    cover: null,
    inner: null,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [innercustomised, setInnerCustomised]: any = useState("");
  const [innerPageText, setInnerPageText]: any = useState("");
  const [innerTextColor, setInnerTextColor]: any = useState("#333333");
  const [currentFont, setCurrentFont]: any = useState("Roboto");
  const [currentInnerFont, setCurrentInnerFont]: any = useState("Roboto");
  const [isOpen, setIsOpen]: any = useState(false);
  const [leatherOpen, setLeatherOpen]: any = useState(false);
  const [boardSelectedOption, setBoardSelectedOption]: any =
    useState("boardColor");
  const [currentSize, setCurrentSize]: any = useState(null);
  const [currentTheme, setCurrentTheme]: any = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiCategoryList, setApiCategoryList]: any = useState([]);
  const [sizeApiResponse, setSizeApiResponse]: any = useState([]);
  const [productQty, setProductQty]: any = useState(1);

  const parameters: any = useParams();
  const [selectedImage, setSelectedImage] = useState(null);
  const [,setapiHitCartLength] : any = useAtom(cartLengthApiHit);

  const showImagePopup = (image: any) => {
    setSelectedImage(image);
  };

  const hideImagePopup = () => {
    setSelectedImage(null);
  };

  const changeBackGroundHandler = () => {
    if (currentTheme && !parameters?.id) {
      const loadImage: any = new window.Image();
      loadImage.src = currentTheme[currentSize];
      loadImage.onload = () => {
        setImage(loadImage);
      };
      setLeatherOpen(false);
      setIsOpen(false);
    } else if (currentSize?.image) {
      const loadImage: any = new window.Image();
      loadImage.src = currentSize?.image;
      loadImage.crossOrigin = "Anonymous";
      loadImage.onload = () => {
        setImage(loadImage);
      };
    } else if (currentSize === "") {
      const loadImage: any = new window.Image();
      loadImage.src = currentTheme?.product_image;
      loadImage.crossOrigin = "Anonymous";
      loadImage.onload = () => {
        setImage(loadImage);
      };
    }
  };

  useEffect(() => {
    changeBackGroundHandler();
  }, [currentSize, currentTheme]);

  const handleBoardSelectChange = (e: any) => {
    setBoardSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (!parameters?.id) {
      const loadImage: any = new window.Image();
      loadImage.src = curimage;
      loadImage.onload = () => {
        setImage(loadImage);
      };
    }
  }, [curimage]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Yes") {
      // setCurrentBkgShape("rect");
      if (!parameters?.id) {
        setCurrentTheme(canvasType.boardColor[0]);
      }
      // ;v(true);
    } else {
      setCurrentBkgShape("");
      setCanvasText(["", "", ""]);
      setUploadLogo(null);
    }
  };

  const toggleCanvasVisibility = () => {
    setIsCanvasVisible(!isCanvasVisible);
  };
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible); // Toggle the content visibility
  };

  const preViewButtonHandler = () => {
    setSelectedId(null);
    setTimeout(() => {
      if (innerRef?.current) {
        const stage = innerRef.current.getStage();
        const dataUrl = stage.toDataURL();
        setPreviewImage((oldVal: any) => {
          return { ...oldVal, inner: dataUrl };
        });
      }
      if (coverRef?.current) {
        const stage = coverRef.current.getStage();
        const dataUrl = stage.toDataURL();
        setPreviewImage((oldVal: any) => {
          return { ...oldVal, cover: dataUrl };
        });
      }
      setIsModalOpen(true);
    }, 500);
  };

  useEffect(() => {
    if (innercustomised === "Logo") {
      setInnerPageText("");
    } else {
      setUploadInnerLogo("");
    }
  }, [innercustomised]);

  const handleInnerLogoUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setUploadInnerLogo(file);
    }
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };
  const [activeTab, setActiveTab]: any = useState("one");

  const handleTabClick = (tabId: any) => {
    setActiveTab(tabId);
  };
  const [selectedStar, setSelectedStar]: any = useState(0);

  const handleStarClick = (index: any) => {
    if (selectedStar === index) {
      setSelectedStar(0);
    } else {
      setSelectedStar(index);
    }
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const toggleLeather = () => {
    setLeatherOpen(!leatherOpen);
  };

  const addToCartHandler = () => {
    setSelectedId(null);
    setIsLoading(true);
    let dataUrlCover: any, dataUrlInner: any;

    setTimeout(() => {
      if (innerRef?.current) {
        const stage = innerRef.current.getStage();
        dataUrlInner = stage.toDataURL();
      }
      if (coverRef?.current) {
        const stage = coverRef.current.getStage();
        dataUrlCover = stage.toDataURL();
      }
      setTimeout(() => {
        if (!localStorage.getItem("accessToken")) {
          let currentData: any = localStorage.getItem("cartData");
          currentData =
            currentData && currentData !== "undefined"
              ? JSON.parse(currentData)
              : [];

          const newData: any = [
            {
              quantity: productQty,
              price:
                selectedOption === "Yes"
                  ? currentTheme?.price + currentTheme?.additional_price
                  : currentTheme?.price,
              customise_price: selectedOption,
              currentSize: currentSize?.id ? currentSize?.id : "default",
              boardSelectedOption,
              name: currentTheme?.title,
              cover: dataUrlCover,
              inner: dataUrlInner,
              description: currentTheme?.disc,
              product_id: parameters?.id,
              total_price:
                (selectedOption === "Yes"
                  ? currentTheme?.price + currentTheme?.additional_price
                  : currentTheme?.price) * productQty,
            },
            ...currentData,
          ];
          setapiHitCartLength((oldval: any) => oldval + 1);
          localStorage.setItem("cartData", JSON.stringify(newData));
          setIsLoading(false);
          toast.success("Item add to your cart successfully.");
        } else {
          let body: any = {
            quantity: productQty,
            currentSize: currentSize?.id ? currentSize?.id : "default",
            customise_price: selectedOption,
            boardSelectedOption,
            name: currentTheme?.title,
            heading: currentTheme?.heading,
            cover: dataUrlCover,
            inner: dataUrlInner,
            description: currentTheme?.disc,
          };
          if (parameters?.id) {
            body.product_id = parameters?.id;
          }
          addToCartDefault({
            body,
          })
            .then(() => {
              setapiHitCartLength((oldval: any) => oldval + 1);
              toast.success("Item add to your cart successfully.");
              setIsLoading(false);
            })
            .catch(() => {
              toast.error("Something went wrong from server side.");
              setIsLoading(false);
            });
        }
      }, 500);
    }, 500);
  };

  useEffect(() => {
    if (parameters?.id) {
      setIsLoading(true);
      productCategoriesWise({
        query: {
          product_id: parameters?.id,
        },
      }).then((res: any) => {
        setApiCategoryList(res?.related_products);
        const currentObj: any = res.related_products.find(
          (item: any) => item.id == parameters.id
        );
        setCurrentTheme(currentObj);
        const loadImage: any = new window.Image();
        loadImage.src = currentObj?.product_image;
        loadImage.crossOrigin = "Anonymous";
        loadImage.onload = () => {
          setImage(loadImage);
        };

        productSizeApi({
          query: {
            product_id: parameters?.id,
          },
        }).then((res: any) => {
          setSizeApiResponse(res.data);
          setIsLoading(false);
        });
      });
    }
  }, [parameters]);

  const selectBackGroundHandler = (obj: any) => {
    const loadImage: any = new window.Image();
    loadImage.src = obj?.product_image;
    loadImage.onload = () => {
      setImage(loadImage);
    };
    setCurrentTheme(obj);
    setLeatherOpen(false);
    setIsOpen(false);
  };

  return (
    <div className="customisation-page">
      <Header />
      {isLoading && <FullScreenLoader />}
      <div className="container parent-content">
        <div className="mainContainer">
          <div className="customcanvas">
            <CustomCanvas
              image={image}
              currentBkgShape={currentBkgShape}
              backgroundColor={backgroundColor}
              canvasText={canvasText}
              textColor={textColor}
              uploadLogo={uploadLogo}
              coverRef={coverRef}
              innerPageOption={innerPageOption}
              innerRef={innerRef}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              innerPageText={innerPageText}
              innerTextColor={innerTextColor}
              currentInnerFont={currentInnerFont}
              currentFont={currentFont}
              uploadInnerLogo={uploadInnerLogo}
            />

            <div className="flex space-bw">
              <div
                className="customise-img1"
                onClick={() => showImagePopup(currentTheme?.cover_img)}
              >
                <img src={currentTheme?.cover_img} alt="Cover Image" />
              </div>
              <div
                className="customise-img1"
                onClick={() => showImagePopup(currentTheme?.inner_img)}
              >
                <img src={currentTheme?.inner_img} alt="Inner Image" />
              </div>
              <div
                className="customise-img1"
                onClick={() =>
                  showImagePopup(currentTheme?.category_type__image)
                }
              >
                <img
                  src={currentTheme?.category_type__image}
                  alt="Category Image"
                />
              </div>
            </div>
            {selectedImage && (
              <div className="popup-overlay" onClick={hideImagePopup}>
                <div
                  className="popup-content"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img src={selectedImage} alt="Selected Image" />
                  <button className="popup-close-btn" onClick={hideImagePopup}>
                    X
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="accordion-content">
            <div className="personalisethisproductheading">
              <h2>Personalise this product</h2>
              <select
                name="optionSelect"
                id="optionSelect"
                onChange={handleOptionChange}
              >
                <option value="">Select an option</option>
                <option value="Yes">
                  Yes ${currentTheme?.additional_price}
                </option>
                <option value="No">No</option>
              </select>
            </div>
            {selectedOption === "Yes" && (
              <>
                <div className="personalisecover">
                  <div
                    className="accordion-header"
                    onClick={toggleCanvasVisibility}
                    style={{ cursor: "pointer" }}
                  >
                    <h3>Personalise Cover</h3>
                  </div>

                  <div
                    className="covertype"
                    style={{
                      display: isCanvasVisible ? "block" : "none",
                      background: "#f9f9f9",
                      padding: "10px",
                    }}
                  >
                    {parameters?.id ? (
                      <>
                        <div
                          className=" toggleclass flex space-bw"
                          onClick={toggleDropdown}
                        >
                          <h3>Select Board Color </h3>
                          <p>
                            {isOpen ? (
                              <FaChevronUp size={10} />
                            ) : (
                              <FaChevronDown size={10} />
                            )}
                          </p>
                        </div>
                        {isOpen && (
                          <div className="dropdown">
                            <ul>
                              {apiCategoryList?.map((item: any, index: any) => (
                                <li
                                  className="flex"
                                  key={index}
                                  onClick={() => selectBackGroundHandler(item)}
                                >
                                  <img
                                    style={{ objectFit: "contain" }}
                                    src={item?.product_image}
                                    alt=""
                                  />
                                  {item?.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <>
                        <label htmlFor="">Select Cover Type</label>
                        <select
                          value={boardSelectedOption}
                          onChange={handleBoardSelectChange}
                        >
                          <option value="">Select an option</option>
                          <option value="boardColor">Board Color</option>
                          <option value="leatheretteColor">
                            Leatherette Color
                          </option>
                        </select>
                        <div
                          className="boardcolorsection"
                          style={{
                            display:
                              boardSelectedOption === "boardColor"
                                ? "block"
                                : "none",
                          }}
                        >
                          <div
                            className=" toggleclass flex space-bw"
                            onClick={toggleDropdown}
                          >
                            <h3>Select Board Color </h3>
                            <p>
                              {isOpen ? (
                                <FaChevronUp size={10} />
                              ) : (
                                <FaChevronDown size={10} />
                              )}
                            </p>
                          </div>
                          {isOpen && (
                            <div className="dropdown">
                              <ul>
                                {canvasType.boardColor?.map(
                                  (item: any, index: any) => (
                                    <li
                                      className="flex"
                                      key={index}
                                      onClick={() => setCurrentTheme(item)}
                                    >
                                      <img src={item.fourByFour} alt="" />
                                      {item.name}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                        <div
                          className="leatherettesection"
                          style={{
                            display:
                              boardSelectedOption === "leatheretteColor"
                                ? "block"
                                : "none",
                          }}
                        >
                          <div
                            className="toggleclass flex space-bw"
                            onClick={toggleLeather}
                          >
                            <h3>Select Leatherette Color</h3>
                            <p>
                              {leatherOpen ? (
                                <FaChevronUp size={10} />
                              ) : (
                                <FaChevronDown size={10} />
                              )}
                            </p>
                          </div>
                          {leatherOpen && (
                            <div className="dropdown">
                              <ul>
                                {canvasType.leatheretteColor?.map(
                                  (item: any, index: any) => (
                                    <li
                                      className="flex"
                                      key={index}
                                      onClick={() => setCurrentTheme(item)}
                                    >
                                      <img src={item.fourByFour} alt="" />
                                      {item.name}
                                    </li>
                                  )
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </>
                    )}

                    {sizeApiResponse && sizeApiResponse.length > 0 && (
                      <>
                        <label htmlFor="">Select Size</label>
                        <select
                          onChange={(e: any) =>
                            setCurrentSize(
                              e.target.value === ""
                                ? ""
                                : JSON.parse(e.target.value)
                            )
                          }
                        >
                          <>
                            <option value="">Change Size</option>
                            {sizeApiResponse?.map((item: any, index: any) => (
                              <option key={index} value={JSON.stringify(item)}>
                                {item?.product_size}
                              </option>
                            ))}
                          </>
                        </select>
                      </>
                    )}

                    <div className="cover-option">
                      <CoverOption
                        coverCurrentOption={coverCurrentOption}
                        setCoverCurrentOption={setCoverCurrentOption}
                        canvasText={canvasText}
                        setCanvasText={setCanvasText}
                        setLowerVisible={setLowerVisible}
                        setCurrentBkgShape={setCurrentBkgShape}
                        setUploadLogo={setUploadLogo}
                        uploadLogo={uploadLogo}
                        innerPageOption={innerPageOption}
                        setInnerPageOption={setInnerPageOption}
                        currentTheme={currentTheme}
                        paramsid={parameters?.id}
                      />
                    </div>
                    <div style={{ display: lowerVisible ? "block" : "none" }}>
                      <div className="controls">
                        <div className="more-cust">
                          <h4>Select background shape</h4>
                          <div className="shapes">
                            <BackgroundShape
                              currentBkgShape={currentBkgShape}
                              setCurrentBkgShape={setCurrentBkgShape}
                            />
                          </div>
                        </div>
                        {(currentTheme?.phrase_flag ||
                          currentTheme?.initial_flag) && (
                          <div className="more-cust">
                            <h4>Select font style</h4>
                            <FontsComponents
                              currentFont={currentFont}
                              setCurrentFont={setCurrentFont}
                            />
                          </div>
                        )}
                        <div className="more-cust-1">
                          <h4>Select background color</h4>
                          <ColorSelector
                            backgroundColor={backgroundColor}
                            setBackGroundColor={setBackGroundColor}
                          />
                        </div>
                        {(currentTheme?.phrase_flag ||
                          currentTheme?.initial_flag) && (
                          <div className="more-cust-2">
                            <h4>Select text color</h4>
                            <ColorSelector
                              backgroundColor={textColor}
                              setBackGroundColor={setTextColor}
                            />
                          </div>
                        )}
                      </div>
                      {/* <div className="more-btn">
                      <button>
                        <Link to="/more-customization">More-customization</Link>
                      </button>
                    </div> */}
                    </div>
                  </div>
                </div>
                <div className="personaliseinnerimages">
                  <div
                    className="accordion-header"
                    onClick={toggleContentVisibility}
                  >
                    <h3>Personalise inner pages</h3>
                  </div>
                  {isContentVisible && (
                    <div className="inner-content">
                      <select
                        onChange={(e: any) =>
                          setInnerPageOption(e.target.value)
                        }
                        value={innerPageOption}
                      >
                        <option value="Cover">Cover</option>
                        <option value="Lined">Lined</option>
                        <option value="Non Lined">Non Lined</option>
                      </select>

                      <div
                        className="lined-content"
                        style={{
                          display:
                            innerPageOption === "Lined" ||
                            innerPageOption === "Non Lined"
                              ? "block"
                              : "none",
                        }}
                      >
                        <label htmlFor="">Select an option</label>
                        <select
                          onChange={(e: any) =>
                            setInnerCustomised(e.target.value)
                          }
                          value={innercustomised}
                        >
                          <option value="">Select Option</option>
                          {currentTheme?.inner_logo_flag && (
                            <option value="Logo">Upload a logo</option>
                          )}
                          {currentTheme?.inner_text_flag && (
                            <option value="Text">Write some text</option>
                          )}
                        </select>

                        <div
                          className="uploadlogo"
                          style={{
                            display:
                              innercustomised === "Logo" ? "block" : "none",
                          }}
                        >
                          <div className="file">
                            <label
                              htmlFor="logoUpload"
                              style={{ cursor: "pointer", marginTop: "10px" }}
                            >
                              Select a file
                            </label>

                            <input
                              type="file"
                              onChange={handleInnerLogoUpload}
                              id="logoUpload"
                              style={{ display: "none" }}
                            />
                          </div>
                        </div>

                        <div
                          style={{
                            display:
                              innercustomised === "Text" ? "block" : "none",
                          }}
                        >
                          <div className="input-text">
                            <input
                              type="text"
                              placeholder="Write some text here"
                              value={innerPageText}
                              onChange={(e: any) =>
                                setInnerPageText(e.target.value)
                              }
                            />
                          </div>
                          {currentTheme?.inner_text_flag && (
                            <>
                              <div className="more-cust">
                                <h4>Select font style</h4>
                                <FontsComponents
                                  currentFont={currentInnerFont}
                                  setCurrentFont={setCurrentInnerFont}
                                />
                              </div>
                              <div className="more-cust-1">
                                <h4>Select text color</h4>
                                <ColorSelector
                                  backgroundColor={innerTextColor}
                                  setBackGroundColor={setInnerTextColor}
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <div className="customisecart flex">
              {(selectedOption === "Yes" || parameters?.id) && (
                <>
                 <div className="qty-box">
                  <input type="number" value={productQty} onChange={(e: any) => {
                      const value = e.target.value;
     
                   if (value >= 0) {
                  setProductQty(value);}}}/>
                   </div>
                  <div className="addbtn">
                    <button onClick={preViewButtonHandler}>Preview</button>
                  </div>
                  <div className="addbtn">
                    <button onClick={addToCartHandler}>Add to cart</button>
                  </div>
                </>
              )}
              {isModalOpen && (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close-button" onClick={closeModalHandler}>
                      &times;
                    </span>
                    <div className="images-container">
                      <div className="cover-modal">
                        <img
                          src={previewImage?.cover}
                          alt=""
                          className="modal-image"
                        />
                        <p>Cover Image</p>
                      </div>
                      <div className="inner-modal">
                        <img
                          src={previewImage?.inner}
                          alt=""
                          className="modal-image"
                        />
                        <p>Inner Image</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="customise-tabs">
          <div className="tab-head">
            <li
              className={activeTab === "one" ? "active" : ""}
              onClick={() => handleTabClick("one")}
            >
              Description
            </li>
            <li
              className={activeTab === "two" ? "active" : ""}
              onClick={() => handleTabClick("two")}
            >
              Additional information
            </li>
            <li
              className={activeTab === "three" ? "active" : ""}
              onClick={() => handleTabClick("three")}
            >
              Reviews
            </li>
          </div>
          <div className="tab-wrapper">
            <div
              className="tab-content"
              style={{ display: activeTab === "one" ? "block" : "none" }}
            >
              <h3>Description</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
                facilis repudiandae cum id iusto, ratione voluptatibus tenetur
                enim, ipsam ab dolores. Quibusdam obcaecati quis unde,
                consequuntur beatae error sed recusandae.
              </p>
            </div>
            <div
              className="tab-content"
              style={{ display: activeTab === "two" ? "block" : "none" }}
            >
              <h3>Additional Information</h3>
              <p>This is dummy content Two</p>
            </div>
            <div
              className="tab-content"
              style={{ display: activeTab === "three" ? "block" : "none" }}
            >
              <h3>Reviews</h3>
              <p>There are no reviews yet</p>
              <p>Be the first to review Product</p>
              <p>Your email address will not be published.</p>
              <div className="rating-section">
                <p>Your rating</p>
                <div className="rating-container">
                  {[1, 2, 3, 4, 5].map((star, index) => (
                    <span
                      key={index}
                      className={
                        selectedStar >= star ? "star selected" : "star"
                      }
                      onClick={() => handleStarClick(star)}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <div className="review-form">
                  <label htmlFor="">Your Review</label>
                  <textarea id="comment" name="comment" rows={4}></textarea>
                </div>
                <div className="rating-email flex space-bw">
                  <div className="rating-name">
                    <label htmlFor="">Name</label>
                    <input type="text" />
                  </div>
                  <div className="rating-remaining">
                    <label htmlFor="">Email</label>
                    <input type="text" />
                  </div>
                </div>
                <div className="rating-save flex align-center">
                  <input type="checkbox" className="rating-check" />
                  &nbsp;
                  <p>
                    Save my name,email, and website in this browser for the next
                    time I comment
                  </p>
                </div>
                <div className="submitbtn">
                  <button>Submit</button>
                </div>
              </div>
            </div>
          </div>
          <div className="related-products">
            <div className="related-content">
              <h2>Related Products</h2>
              <div className="related-cards">
                <div className="related-card flex space-bw">
                  {apiCategoryList
                    .filter((item: any) => item.id != currentTheme?.id)
                    .map((object: any, index: any) => (
                      <Card product={object} index={index} key={index} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomeScreen;
