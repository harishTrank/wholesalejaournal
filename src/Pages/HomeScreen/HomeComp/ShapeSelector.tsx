import React, { useEffect, useRef } from "react";
import { Circle, Rect, Transformer } from "react-konva";

const ShapeSelector = ({
  currentBkgShape,
  isSelected,
  shapeProps,
  onSelect,
  onTransform,
  backgroundColor,
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
          {...shapeProps}
          ref={shapeRef}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={onTransform}
          fill={backgroundColor}
        />
      ) : currentBkgShape === "circle" ? (
        <Circle
          {...shapeProps}
          ref={shapeRef}
          radius={100}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={onTransform}
          fill={backgroundColor}
        />
      ) : currentBkgShape === "squr" ? (
        <Rect
          {...shapeProps}
          width={160}
          height={160}
          ref={shapeRef}
          onClick={onSelect}
          onTap={onSelect}
          onTransformEnd={onTransform}
          fill={backgroundColor}
        />
      ) : (
        currentBkgShape === "trap" && (
          <Rect
            {...shapeProps}
            width={160}
            height={160}
            ref={shapeRef}
            rotation={45}
            onClick={onSelect}
            onTap={onSelect}
            onTransformEnd={onTransform}
            fill={backgroundColor}
          />
        )
      )}
      {isSelected && <Transformer ref={trRef} />}
    </>
  );
};

export default ShapeSelector;
