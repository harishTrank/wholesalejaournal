import React, { useState, useEffect } from "react";
import "./HomeScreen.css";
import CoverOption from "../HomeComp/CoverOption";
import BackgroundShape from "../HomeComp/BackgroundShape";
import CustomCanvas from "../HomeComp/CustomCanvas";
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
  const [uploadLogo, setUploadLogo]: any = useState("");
  const [currentFont, setCurrentFont]: any = useState("Roboto");

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
      // setIsCanvasVisible(true);
    } else {
      setCurrentBkgShape("");
      setCanvasText(["", "", ""]);
    }
  };
  const toggleCanvasVisibility = () => {
    setIsCanvasVisible(!isCanvasVisible);
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
            currentFont={currentFont}
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
            <div className="personalisecover">
              <div
                className="accordion-header"
                onClick={toggleCanvasVisibility}
                style={{ cursor: "pointer" }}
              >
                <h3>Personalise cover</h3>
              </div>
              {isCanvasVisible && (
                <div>
                  <div className="cover-option">
                    <CoverOption
                      coverCurrentOption={coverCurrentOption}
                      setCoverCurrentOption={setCoverCurrentOption}
                      canvasText={canvasText}
                      setCanvasText={setCanvasText}
                      lowerVisible={lowerVisible}
                      setLowerVisible={setLowerVisible}
                      uploadLogo={uploadLogo}
                      setUploadLogo={setUploadLogo}
                      setCurrentBkgShape={setCurrentBkgShape}
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
                          <Link to="/morecustomization">
                            More-customization
                          </Link>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
