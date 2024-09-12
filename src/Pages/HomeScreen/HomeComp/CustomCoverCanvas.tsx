import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Transformer,
} from "react-konva";
import ShapeSelector from "./ShapeSelector";
import "./HomeComp.css";
import CustomInnerCanvas from "./CustomInnerCanvas";

const CustomCanvas = ({
  image,
  currentBkgShape,
  backgroundColor,
  canvasText,
  textColor,
  uploadLogo,
  currentFont,
  coverRef,
  innerPageOption,
  innerRef,
  selectedId,
  setSelectedId,
  innerPageText,
  innerTextColor,
  currentInnerFont,
  uploadInnerLogo,
}: any) => {
  const [imgProps, setImgProps] = useState({ width: 0, height: 0 });
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);

  // State for shape, text, and logo positions
  const [shapeProps, setShapeProps] = useState({
    width: currentBkgShape === "circle" ? 200 : 220,
    height: currentBkgShape === "circle" ? 200 : 120,
    fill: backgroundColor,
    shadowBlur: 1,
    stroke: "white",
    id: "shape",
    x: (window.innerWidth * 0.35) / 2 - 130, // Initial position
    y: 100,
    draggable: true,
  });

  const [logoProps, setLogoProps] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    draggable: true,
  });

  const [textProps, setTextProps] = useState({
    text: Array.isArray(canvasText) ? canvasText.join("\n") : canvasText,
    fontFamily: currentFont,
    fontStyle: currentFont?.includes("italic") ? "italic" : "normal",
    x: (window.innerWidth * 0.35) / 2 - 130, // Initial position
    y: 100,
    draggable: true,
  });

  // Refs for transformer nodes
  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const logoRef = useRef<any>(null);

  const canvasWidth = window.innerWidth * 0.3;
  const canvasHeight = window.innerHeight * 0.8;

  const handleSelect = (e: any) => {
    setSelectedId(e.target.id());
  };

  const handleDeselect = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const handleTransform = (e: any) => {
    // Optional: Handle transformations such as rotation, scale, etc.
  };

  // Set image background with proper scaling to fit the canvas
  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
        const imageAspectRatio = img.width / img.height;

        let newWidth = canvasWidth;
        let newHeight = canvasHeight;

        // Check if the width or height exceeds the canvas and scale accordingly
        if (canvasWidth / imageAspectRatio <= canvasHeight) {
          newWidth = canvasWidth;
          newHeight = canvasWidth / imageAspectRatio;
        } else {
          newHeight = canvasHeight;
          newWidth = canvasHeight * imageAspectRatio;
        }

        setImgProps({ width: newWidth, height: newHeight });
      };
    }
  }, [image, canvasHeight, canvasWidth, setImgProps]);

  // Handle uploadLogo update to display and center the logo on canvas
  useEffect(() => {
    if (uploadLogo && uploadLogo !== "") {
      const logo = new window.Image();
      logo.src = URL.createObjectURL(uploadLogo);
      logo.onload = () => {
        const logoAspectRatio = logo.width / logo.height;

        // Maximum width and height the logo can occupy (e.g., 50% of canvas)
        const maxLogoWidth = canvasWidth * 0.5;
        const maxLogoHeight = canvasHeight * 0.5;

        let logoWidth, logoHeight;

        // Scale logo while keeping the aspect ratio
        if (maxLogoWidth / logoAspectRatio <= maxLogoHeight) {
          logoWidth = maxLogoWidth;
          logoHeight = maxLogoWidth / logoAspectRatio;
        } else {
          logoHeight = maxLogoHeight;
          logoWidth = maxLogoHeight * logoAspectRatio;
        }

        // Center the logo on the canvas
        const logoX = (canvasWidth - logoWidth) / 2;
        const logoY = (canvasHeight - logoHeight) / 2;

        setLogoImage(logo);
        setLogoProps({
          width: logoWidth,
          height: logoHeight,
          x: logoX,
          y: logoY,
          draggable: true,
        });
      };

      return () => URL.revokeObjectURL(logo.src); // Cleanup URL
    }

    if (uploadLogo === "") {
      setLogoImage(null);
    }
  }, [uploadLogo, canvasHeight, canvasWidth]);

  // Re-render the text when font family or canvas text changes
  useEffect(() => {
    setTextProps((oldValue: any) => {
      return {
        ...oldValue,
        text: Array.isArray(canvasText) ? canvasText.join("\n") : canvasText,
        fontFamily: currentFont,
        fontStyle: currentFont?.includes("italic") ? "italic" : "normal",
      };
    });

    if (textRef.current) {
      textRef.current.fontFamily(currentFont); // Explicitly update the font family
      textRef.current.fontStyle(
        currentFont?.includes("italic") ? "italic" : "normal"
      );
      textRef.current.getLayer().batchDraw(); // Force re-render
    }
  }, [canvasText, currentFont]);

  return (
    <div>
      <div style={{ display: innerPageOption === "Cover" ? "block" : "none" }}>
        <Stage
          width={imgProps.width}
          height={imgProps.height}
          onMouseDown={handleDeselect}
          onTouchStart={handleDeselect}
          ref={coverRef}
        >
          <Layer>
            {image && (
              <KonvaImage
                image={image}
                width={imgProps.width}
                height={imgProps.height}
                x={(canvasWidth - imgProps.width) / 2}
                y={(canvasHeight - imgProps.height) / 2}
              />
            )}
          </Layer>
          <Layer>
            <ShapeSelector
              backgroundColor={backgroundColor}
              currentBkgShape={currentBkgShape}
              shapeProps={shapeProps}
              isSelected={selectedId === "shape"}
              onSelect={handleSelect}
              onTransform={handleTransform}
              onDragEnd={(e: any) =>
                setShapeProps({
                  ...shapeProps,
                  x: e.target.x(),
                  y: e.target.y(),
                })
              } // Save position when drag ends
            />
            <Text
              text={textProps.text}
              fontSize={20}
              fill={textColor}
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
          <Layer>
            {logoImage && (
              <KonvaImage
                image={logoImage}
                x={logoProps.x}
                y={logoProps.y}
                width={logoProps.width}
                height={logoProps.height}
                draggable
                ref={logoRef}
                onClick={handleSelect}
                onTap={handleSelect}
                onDragEnd={(e) =>
                  setLogoProps({
                    ...logoProps,
                    x: e.target.x(),
                    y: e.target.y(),
                  })
                } // Save position when drag ends
                onTransformEnd={handleTransform}
                id="logo"
              />
            )}
            {selectedId === "logo" && logoRef.current && (
              <Transformer ref={trRef} nodes={[logoRef.current]} />
            )}
          </Layer>
        </Stage>
      </div>
      <div style={{ display: innerPageOption === "Cover" ? "none" : "block" }}>
        <CustomInnerCanvas
          innerPageOption={innerPageOption}
          innerRef={innerRef}
          innerPageText={innerPageText}
          innerTextColor={innerTextColor}
          currentInnerFont={currentInnerFont}
          uploadInnerLogo={uploadInnerLogo}
          selectedId={selectedId}
          setSelectedId={setSelectedId}
        />
      </div>
    </div>
  );
};

export default CustomCanvas;
