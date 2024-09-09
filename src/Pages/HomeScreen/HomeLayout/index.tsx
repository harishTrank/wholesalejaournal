import React, { useState, useEffect, useRef } from "react";
import "./HomeScreen.css";
import CoverOption from "../HomeComp/CoverOption";
import BackgroundShape from "../HomeComp/BackgroundShape";
import CustomCanvas from "../HomeComp/CustomCanvas";
import ColorSelector from "../HomeComp/ColorSelector";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import Diary from "../../../images/Diary-removebg-preview.png";
import Lined from "../../../assests/lined.jpg";
import NonLined from "../../../assests/non-lined.jpg";

const HomeScreen = ({ curimage }: any) => {
  const [image, setImage]: any = useState(null);
  const [coverCurrentOption, setCoverCurrentOption] = useState("Phrase");
  const [currentBkgShape, setCurrentBkgShape]: any = useState("");
  const [backgroundColor, setBackGroundColor]: any = useState("#F5E6D9");
  const [textColor, setTextColor]: any = useState("#333333");
  const [canvasText, setCanvasText]: any = useState(["", "", ""]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [isCanvasVisible, setIsCanvasVisible] = useState<boolean>(true);
  const [lowerVisible, setLowerVisible]: any = useState(true);
  const [uploadLogo, setUploadLogo]: any = useState(null);
  const [backGroundImage, setBackgroundImage]: any = useState(curimage);
  const [innerPageOption, setInnerPageOption]: any = useState("Cover");
  const coverRef = useRef<any>(null);
  const [isContentVisible, setIsContentVisible]: any = useState(false);

  useEffect(() => {
    if (innerPageOption === "Cover") {
      setBackgroundImage(curimage);
    } else if (innerPageOption === "Lined") {
      setBackgroundImage(Lined);
    } else if (innerPageOption === "Non Lined") {
      setBackgroundImage(NonLined);
    }
  }, [innerPageOption, curimage]);

  useEffect(() => {
    const loadImage: any = new window.Image();
    loadImage.src = backGroundImage;
    loadImage.onload = () => {
      setImage(loadImage);
    };
  }, [backGroundImage]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    setIsCanvasVisible(true);
  };
  const toggleCanvasVisibility = () => {
    setIsCanvasVisible(!isCanvasVisible);
  };
  const toggleContentVisibility = () => {
    setIsContentVisible(!isContentVisible); // Toggle the content visibility
  };

  return (
    <div className="container">
      <Header />
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
          />
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
              <option value="Yes">Yes</option>
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
                  <h3>Personalise</h3>
                </div>
                {isCanvasVisible && (
                  <div>
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
                      />
                    </div>
                    {lowerVisible && (
                      <div>
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
                          <div className="more-cust">
                            <h4>Select font style</h4>
                            <div className="swatch-container">
                              {/* Repeatable Font Style Items */}
                              <div className="swatch customily-swatch">
                                <input
                                  id="font1"
                                  type="radio"
                                  name="fontStyle"
                                  className="needsclick needsfocus"
                                />
                                <label
                                  htmlFor="font1"
                                  className="needsclick needsfocus"
                                >
                                  <img
                                    src="https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/2/15fb2438-ceed-4cef-85e0-5d05506f687e.png"
                                    loading="lazy"
                                    width="40"
                                    height="40"
                                    alt="font1"
                                  />
                                </label>
                              </div>
                              <div className="swatch customily-swatch">
                                <input
                                  id="font2"
                                  type="radio"
                                  name="fontStyle"
                                  className="needsclick needsfocus"
                                />
                                <label
                                  htmlFor="font2"
                                  className="needsclick needsfocus"
                                >
                                  <img
                                    src="https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/2/28092ff8-3da0-4fd4-b47b-d15c65cb2daf.png"
                                    loading="lazy"
                                    width="40"
                                    height="40"
                                    alt="font1"
                                  />
                                </label>
                              </div>
                              <div className="swatch customily-swatch">
                                <input
                                  id="font3"
                                  type="radio"
                                  name="fontStyle"
                                  className="needsclick needsfocus"
                                />
                                <label
                                  htmlFor="font3"
                                  className="needsclick needsfocus"
                                >
                                  <img
                                    src="https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/2/5481ad74-5b5a-4b1e-9aa1-5d9dab975abc.png"
                                    loading="lazy"
                                    width="40"
                                    height="40"
                                    alt="font1"
                                  />
                                </label>
                              </div>
                              <div className="swatch customily-swatch">
                                <input
                                  id="font4"
                                  type="radio"
                                  name="fontStyle"
                                  className="needsclick needsfocus"
                                />
                                <label
                                  htmlFor="font4"
                                  className="needsclick needsfocus"
                                >
                                  <img
                                    src="https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/2/3accc091-642e-4e90-b8d1-310b2333f3af.png"
                                    loading="lazy"
                                    width="40"
                                    height="40"
                                    alt="font1"
                                  />
                                </label>
                              </div>
                              <div className="swatch customily-swatch">
                                <input
                                  id="font5"
                                  type="radio"
                                  name="fontStyle"
                                  className="needsclick needsfocus"
                                />
                                <label
                                  htmlFor="font5"
                                  className="needsclick needsfocus"
                                >
                                  <img
                                    src="https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/2/51bba9cb-2e8b-45f9-ab39-b2f87e3e0a3c.png"
                                    loading="lazy"
                                    width="40"
                                    height="40"
                                    alt="font1"
                                  />
                                </label>
                              </div>

                              {/* Add similar font style items */}
                            </div>
                          </div>
                          <div className="more-cust-1">
                            <h4>Select background color</h4>
                            <ColorSelector
                              backgroundColor={backgroundColor}
                              setBackGroundColor={setBackGroundColor}
                            />
                          </div>
                          <div className="more-cust-2">
                            <h4>Select text color</h4>
                            <ColorSelector
                              backgroundColor={textColor}
                              setBackGroundColor={setTextColor}
                            />
                          </div>
                        </div>
                        <div className="more-btn">
                          <button>
                            <Link to="/more-customization">
                              More-customization
                            </Link>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
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
                      onChange={(e: any) => setInnerPageOption(e.target.value)}
                      value={innerPageOption}
                    >
                      <option value="Cover">Cover</option>
                      <option value="Lined">Lined</option>
                      <option value="Non Lined">Non Lined</option>
                    </select>
                  </div>
                )}
              </div>
            </>
          )}
          <div className="diaryimage flex">
            <div className="coverimage">
              <img src={Diary} alt="Canvas Preview" />
            </div>
            <div className="coverimage1">
              <img src={Diary} alt="" />
            </div>
          </div>
          <div className="customisecart flex">
            <div className="qty-box">
              <input type="text" />
            </div>
            <div className="addbtn">
              <button>Add to cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
