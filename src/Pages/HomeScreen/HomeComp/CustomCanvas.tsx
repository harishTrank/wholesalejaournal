import React, { useState, useEffect, useRef } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Text,
  Transformer,
} from "react-konva";
import ShapeSelector from "./ShapeSelector";

const CustomCanvas = ({
  image,
  currentBkgShape,
  backgroundColor,
  canvasText,
  textColor,
}: any) => {
  const [imgProps, setImgProps] = useState({ width: 0, height: 0 });
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Refs for transformer nodes
  const textRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  // Shape props
  const shapeProps = {
    width: currentBkgShape === "circle" ? 200 : 220,
    height: currentBkgShape === "circle" ? 200 : 120,
    fill: backgroundColor,
    shadowBlur: 1,
    stroke: "white",
    id: "shape",
    draggable: true, // Enable dragging
  };

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

  useEffect(() => {
    if (image) {
      const img = new window.Image();
      img.src = image.src;
      img.onload = () => {
        const aspectRatio = img.width / img.height;
        const canvasWidth = window.innerWidth * 0.3;
        const canvasHeight = window.innerHeight;

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

  // Deselect shape when currentBkgShape changes
  useEffect(() => {
    setSelectedId(null);
  }, [currentBkgShape]);

  return (
    <div>
      <Stage
        width={window.innerWidth * 0.3}
        height={window.innerHeight}
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
            shapeProps={shapeProps}
            isSelected={selectedId === "shape"}
            onSelect={handleSelect}
            onTransform={handleTransform}
          />
          <Text
            text={
              Array.isArray(canvasText) ? canvasText.join("\n") : canvasText
            }
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

export default CustomCanvas;
