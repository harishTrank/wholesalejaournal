import React, { useEffect, useRef } from "react";
import { Circle, Rect, Transformer } from "react-konva";

const ShapeSelector = ({
  currentBkgShape,
  isSelected,
  shapeProps,
  onSelect,
  onTransform,
}: any) => {
  const shapeRef = useRef<any>(null);
  const trRef = useRef<any>(null);

  useEffect(() => {
    if (isSelected) {
      trRef.current?.nodes([shapeRef.current]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {currentBkgShape === "rect" ? (
        <Rect
          x={110}
          y={75}
          {...shapeProps}
          ref={shapeRef}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={onTransform}
        />
      ) : currentBkgShape === "circle" ? (
        <Circle
          {...shapeProps}
          x={215}
          y={160}
          ref={shapeRef}
          radius={100}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={onTransform}
        />
      ) : currentBkgShape === "squr" ? (
        <Rect
          {...shapeProps}
          x={130}
          y={75}
          width={160}
          height={160}
          ref={shapeRef}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={onTransform}
        />
      ) : (
        currentBkgShape === "trap" && (
          <Rect
            {...shapeProps}
            width={160}
            height={160}
            x={215}
            y={75}
            ref={shapeRef}
            rotation={45}
            onClick={onSelect}
            onTap={onSelect}
            onTransformEnd={onTransform}
          />
        )
      )}
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

export default ShapeSelector;
