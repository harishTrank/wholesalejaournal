import React, { useState, useEffect, useRef } from "react";
import "./HomeScreen.css";
import CoverOption from "../HomeComp/CoverOption";
import BackgroundShape from "../HomeComp/BackgroundShape";
import CustomCanvas from "../HomeComp/CustomCoverCanvas";
import ColorSelector from "../HomeComp/ColorSelector";
import { Link } from "react-router-dom";
import Header from "../../../components/Header";
import FontsComponents from "../HomeComp/FontsComponents";

const HomeScreen = ({ curimage }: any) => {
  const [image, setImage]: any = useState(null);
  const [coverCurrentOption, setCoverCurrentOption] = useState("Phrase");
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
  const [innercustomised, setInnerCustomised]: any = useState("Text");
  const [innerPageText, setInnerPageText]: any = useState("");
  const [innerTextColor, setInnerTextColor]: any = useState("#333333");
  const [currentFont, setCurrentFont]: any = useState("Roboto");
  const [currentInnerFont, setCurrentInnerFont]: any = useState("Roboto");

  useEffect(() => {
    const loadImage: any = new window.Image();
    loadImage.src = curimage;
    loadImage.onload = () => {
      setImage(loadImage);
    };
  }, [curimage]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
    if (event.target.value === "Yes") {
      setCurrentBkgShape("rect");
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
      setUploadInnerLogo(null);
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
                  <h3>Personalise Cover</h3>
                </div>
                <div style={{ display: isCanvasVisible ? "block" : "none" }}>
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
                      <div className="more-cust">
                        <h4>Select font style</h4>
                        <FontsComponents
                          currentFont={currentFont}
                          setCurrentFont={setCurrentFont}
                        />
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
                        <Link to="/more-customization">More-customization</Link>
                      </button>
                    </div>
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
                      onChange={(e: any) => setInnerPageOption(e.target.value)}
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
                        <option value="Logo">Upload a logo</option>
                        <option value="Text">Write some text</option>
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
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          <div className="customisecart flex">
            <div className="qty-box">
              <input type="text" />
            </div>
            <div className="addbtn">
              <button onClick={preViewButtonHandler}>Preview</button>
            </div>
            <div className="addbtn">
              <button>Add to cart</button>
            </div>
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
    </div>
  );
};

export default HomeScreen;
