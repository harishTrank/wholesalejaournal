import React, { useState, useEffect } from "react";
import { Layer, Stage, Image as KonvaImage } from "react-konva";
import "./HomeComp.css";
import LinedImageSrc from "../../../assests/lined.jpg";
import NonLinedImageSrc from "../../../assests/non-lined.jpg";

const CustomInnerCanvas = ({ innerPageOption, innerRef }: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgProps, setImgProps] = useState({ width: 0, height: 0 });
  const [currentBackImg, setCurrentBackImg] = useState<HTMLImageElement | null>(
    null
  );

  const canvasWidth = window.innerWidth * 0.3;
  const canvasHeight = window.innerHeight;

  const handleDeselect = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  //   const handleTransform = (e: any) => {
  //     // Handle transformation changes, if needed
  //   };

  // Load the correct image based on innerPageOption
  useEffect(() => {
    const img = new window.Image();
    if (innerPageOption === "Lined") {
      img.src = LinedImageSrc;
    } else if (innerPageOption === "Non Lined") {
      img.src = NonLinedImageSrc;
    }

    // Wait for the image to load before using it
    img.onload = () => {
      setCurrentBackImg(img);

      const aspectRatio = img.width / img.height;
      let width, height;

      if (canvasWidth / aspectRatio <= canvasHeight) {
        width = canvasWidth;
        height = canvasWidth / aspectRatio;
      } else {
        height = canvasHeight;
        width = canvasHeight * aspectRatio;
      }

      setImgProps({ width, height });
    };
  }, [innerPageOption, canvasHeight, canvasWidth]);

  return (
    <div>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleDeselect}
        onTouchStart={handleDeselect}
        ref={innerRef}
      >
        <Layer>
          {currentBackImg && (
            <KonvaImage
              image={currentBackImg}
              x={10}
              y={10}
              width={imgProps.width}
              height={imgProps.height}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default CustomInnerCanvas;
