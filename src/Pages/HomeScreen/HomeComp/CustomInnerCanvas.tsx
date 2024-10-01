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
  uploadInnerLogo,
  selectedId,
  setSelectedId,
}: any) => {
  const [logoInnerImage, setLogoInnerImage] = useState<HTMLImageElement | null>(null);

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
  const [logoProps, setLogoProps] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    draggable: true,
  });
  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const logoInnerRef = useRef<any>(null);

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
    img.src = NonLinedImageSrc;
    if (innerPageOption === "Lined") {
      img.src = LinedImageSrc;
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

  useEffect(() => {
    if (uploadInnerLogo && uploadInnerLogo !== "") {
      const logo = new window.Image();
      logo.src = URL.createObjectURL(uploadInnerLogo);
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

        setLogoInnerImage(logo);
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

    if (uploadInnerLogo === "") {
      setLogoInnerImage(null);
    }
  }, [uploadInnerLogo, canvasHeight, canvasWidth]);

  return (
    <div>
      <Stage
        width={imgProps?.width || canvasWidth}
        height={imgProps?.height || canvasHeight}
        onMouseDown={handleDeselect}
        onTouchStart={handleDeselect}
        ref={innerRef}
      >
        <Layer>
          {currentBackImg && (
            <KonvaImage
              image={currentBackImg}
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
        <Layer>
          {logoInnerImage && (
            <KonvaImage
              image={logoInnerImage}
              x={logoProps.x}
              y={logoProps.y}
              width={logoProps.width}
              height={logoProps.height}
              draggable
              ref={logoInnerRef}
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
          {selectedId === "logo" && logoInnerRef.current && (
            <Transformer ref={trRef} nodes={[logoInnerRef.current]} />
          )}
        </Layer>
      </Stage>
    </div>
  );
};

export default CustomInnerCanvas;
