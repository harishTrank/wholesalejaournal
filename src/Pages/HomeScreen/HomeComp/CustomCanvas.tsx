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

const CustomCanvas = ({
  image,
  currentBkgShape,
  backgroundColor,
  canvasText,
  textColor,
  uploadLogo,
  currentFont,
}: any) => {
  const [imgProps, setImgProps] = useState({ width: 0, height: 0 });
  const [logoImage, setLogoImage] = useState<HTMLImageElement | null>(null);
  const [logoProps, setLogoProps] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [textProps, setTextProps] = useState({
    text: Array.isArray(canvasText) ? canvasText.join("\n") : canvasText,
    fontFamily: currentFont,
    fontStyle: currentFont.includes("italic") ? "italic" : "normal",
  });

  // Refs for transformer nodes
  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const logoRef = useRef<any>(null);

  const canvasWidth = window.innerWidth * 0.3;
  const canvasHeight = window.innerHeight;

  const handleSelect = (e: any) => {
    setSelectedId(e.target.id());
  };

  const handleDeselect = (e: any) => {
    if (e.target === e.target.getStage()) {
      setSelectedId(null);
    }
  };

  const handleTransform = (e: any) => {
    // Handle transformation changes, if needed
  };

  // Set image background
  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
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
    }
  }, [image]);

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
        });
      };

      return () => URL.revokeObjectURL(logo.src); // Cleanup URL
    }

    if (uploadLogo === "") {
      setLogoImage(null);
    }
  }, [uploadLogo]);

  // Re-render the text when font family or canvas text changes
  useEffect(() => {
    setTextProps({
      text: Array.isArray(canvasText) ? canvasText.join("\n") : canvasText,
      fontFamily: currentFont,
      fontStyle: currentFont.includes("italic") ? "italic" : "normal",
    });

    if (textRef.current) {
      textRef.current.fontFamily(currentFont); // Explicitly update the font family
      textRef.current.fontStyle(
        currentFont.includes("italic") ? "italic" : "normal"
      );
      textRef.current.getLayer().batchDraw(); // Force re-render
    }
    console.log("currentFont", currentFont);
  }, [canvasText, currentFont]);

  return (
    <div>
      <Stage
        width={canvasWidth}
        height={canvasHeight}
        onMouseDown={handleDeselect}
        onTouchStart={handleDeselect}
      >
        <Layer>
          {image && (
            <KonvaImage
              image={image}
              x={10}
              y={10}
              width={imgProps.width}
              height={imgProps.height}
            />
          )}
        </Layer>
        <Layer>
          <ShapeSelector
            backgroundColor={backgroundColor}
            currentBkgShape={currentBkgShape}
            shapeProps={{
              width: currentBkgShape === "circle" ? 200 : 220,
              height: currentBkgShape === "circle" ? 200 : 120,
              fill: backgroundColor,
              shadowBlur: 1,
              stroke: "white",
              id: "shape",
              draggable: true,
            }}
            isSelected={selectedId === "shape"}
            onSelect={handleSelect}
            onTransform={handleTransform}
          />
          <Text
            text={textProps.text}
            fontSize={20}
            fill={textColor}
            x={(window.innerWidth * 0.35) / 2 - 130}
            y={100}
            width={220}
            align="center"
            draggable
            onClick={handleSelect}
            onTap={handleSelect}
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
  );
};

export default CustomCanvas;
