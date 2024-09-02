import React, { useState, useEffect } from "react";
import {
  Stage,
  Layer,
  Image as KonvaImage,
  Rect,
  Circle,
  Text,
} from "react-konva";

const ShapeSelector = ({ currentBkgShape, backgroundColor }: any) => {
  return (
    <>
      {currentBkgShape === "rect" ? (
        <Rect
          x={110}
          y={75}
          width={220}
          height={120}
          fill={backgroundColor}
          shadowBlur={1}
          stroke={"white"}
        />
      ) : currentBkgShape === "circle" ? (
        <Circle
          x={215}
          y={160}
          stroke={"white"}
          radius={100}
          fill={backgroundColor}
          shadowBlur={1}
        />
      ) : currentBkgShape === "squr" ? (
        <Rect
          x={130}
          y={75}
          width={160}
          height={160}
          fill={backgroundColor}
          shadowBlur={1}
          stroke={"white"}
        />
      ) : (
        <Rect
          x={215}
          y={75}
          width={160}
          height={160}
          fill={backgroundColor}
          shadowBlur={1}
          stroke={"white"}
          rotation={45}
        />
      )}
    </>
  );
};

const CustomCanvas = ({ image, currentBkgShape, backgroundColor }: any) => {
  const [imgProps, setImgProps] = useState({ width: 0, height: 0 });

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

  return (
    <div>
      <Stage width={window.innerWidth * 0.3} height={window.innerHeight}>
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
          />
          <Text
            text={"textMessage"}
            fontSize={20}
            fill="black"
            x={(window.innerWidth * 0.35) / 2 - 130}
            y={100}
            width={220}
            align="center"
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default CustomCanvas;
