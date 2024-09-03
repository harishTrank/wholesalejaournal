import React, { useState, useEffect } from "react";
import "./HomeScreen.css";
import CoverOption from "./HomeComp/CoverOption";
import BackgroundShape from "./HomeComp/BackgroundShape";
import CustomCanvas from "./HomeComp/CustomCanvas";
import ColorSelector from "./HomeComp/ColorSelector";
import { Link } from "react-router-dom";

const HomeScreen = ({ curimage }: any) => {
  const [image, setImage]: any = useState(null);
  const [coverCurrentOption, setCoverCurrentOption] = useState("Phrase");
  const [currentBkgShape, setCurrentBkgShape]: any = useState("rect");
  const [backgroundColor, setBackGroundColor]: any = useState("#F5E6D9");
  const [textColor, setTextColor]: any = useState("#333333");
  const [canvasText, setCanvasText]: any = useState(["", "", ""]);

  useEffect(() => {
    const loadImage: any = new window.Image();
    loadImage.src = curimage;
    loadImage.onload = () => {
      setImage(loadImage);
    };
  }, [curimage]);

  return (
    <div className="mainContainer">
      <CustomCanvas
        image={image}
        currentBkgShape={currentBkgShape}
        backgroundColor={backgroundColor}
        canvasText={canvasText}
        textColor={textColor}
      />
      <div style={{ marginLeft: "2%" }} className="accordion-content">
        <CoverOption
          coverCurrentOption={coverCurrentOption}
          setCoverCurrentOption={setCoverCurrentOption}
          canvasText={canvasText}
          setCanvasText={setCanvasText}
        />
        <div className="controls">
          <div className="more-cust">
            <h4>Select background shape</h4>
            <BackgroundShape
              currentBkgShape={currentBkgShape}
              setCurrentBkgShape={setCurrentBkgShape}
            />
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
                <label htmlFor="font1" className="needsclick needsfocus">
                  <img
                    src="https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/2/15fb2438-ceed-4cef-85e0-5d05506f687e.png"
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
        <Link to="/more-customization">more-customization</Link>
      </div>
    </div>
  );
};

export default HomeScreen;
