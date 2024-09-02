import React from "react";
import { colors } from "../../Utils";

const BackGroundColor = ({ backgroundColor, setBackGroundColor }: any) => {
  return (
    <div className="swatch customily-swatch" style={{ width: "55%" }}>
      {colors.map((item: any, index: any) => (
        <div className="tooltip" key={index}>
          <label
            onClick={() => setBackGroundColor(item.color)}
            htmlFor="black"
            className="needsclick needsfocus"
            style={{
              marginBottom: "5px",
              backgroundColor: item.color,
              width: 40,
              height: 40,
              display: "inline-block",
              border: backgroundColor !== item.color ? "2px solid #DEDEDE" : "2px solid black"
            }}
          />
          <span className="tooltiptext">{item.colorName}</span>
        </div>
      ))}
    </div>
  );
};

export default BackGroundColor;
