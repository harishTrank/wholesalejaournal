import React, { useState, useEffect, useRef } from "react";
import {
  Layer,
  Stage,
  Image as KonvaImage,
  Text,
  Transformer,
} from "react-konva";
import "./HomeComp.css";
import LinedImageSrc from "../../../assests/lined.jpg";
import NonLinedImageSrc from "../../../assests/non-lined.jpg";

const CustomInnerCanvas = ({
  innerPageOption,
  innerRef,
  innerPageText,
  innerTextColor,
  currentInnerFont,
}: any) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imgProps, setImgProps] = useState({ width: 0, height: 0 });
  const [currentBackImg, setCurrentBackImg] = useState<HTMLImageElement | null>(
    null
  );
  const [textProps, setTextProps] = useState({
    text: innerPageText,
    fontFamily: currentInnerFont,
    fontStyle: currentInnerFont?.includes("italic") ? "italic" : "normal",
    x: (window.innerWidth * 0.35) / 2 - 130, // Initial position
    y: 100,
    draggable: true,
  });
  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const logoRef = useRef<any>(null);

  const canvasWidth = window.innerWidth * 0.3;
  const canvasHeight = window.innerHeight;

  const handleDeselect = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const handleSelect = (e: any) => {
    setSelectedId(e.target.id());
  };

  const handleTransform = (e: any) => {
    // Handle transformation changes, if needed
  };

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

  useEffect(() => {
    setTextProps((oldValue: any) => {
      return {
        ...oldValue,
        text: innerPageText,
        fontFamily: currentInnerFont,
        fontStyle: currentInnerFont?.includes("italic") ? "italic" : "normal",
      };
    });

    if (textRef.current) {
      textRef.current.fontFamily(currentInnerFont); // Explicitly update the font family
      textRef.current.fontStyle(
        currentInnerFont?.includes("italic") ? "italic" : "normal"
      );
      textRef.current.getLayer().batchDraw(); // Force re-render
    }
  }, [innerPageText, currentInnerFont]);

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
        <Layer>
          <Text
            text={textProps.text}
            fontSize={20}
            fill={innerTextColor}
            x={textProps.x}
            y={textProps.y}
            width={220}
            align="center"
            draggable
            onClick={handleSelect}
            onTap={handleSelect}
            onDragEnd={(e) =>
              setTextProps({
                ...textProps,
                x: e.target.x(),
                y: e.target.y(),
              })
            } // Save position when drag ends
            onTransformEnd={handleTransform}
            id="text"
            ref={textRef}
            fontFamily={textProps.fontFamily}
            fontStyle={textProps.fontStyle}
          />
          {selectedId === "text" && (
            <Transformer
              ref={trRef}
              nodes={[textRef.current]}
              keepRatio={true}
            />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default CustomInnerCanvas;
