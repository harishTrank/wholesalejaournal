import React from "react";
import { fonts } from "../../../Utils";

const FontsComponents = ({ currentFont, setCurrentFont }: any) => {
  return (
    <div className="swatch-container">
      {fonts.map((item: any, index: any) => (
        <div
          className="swatch customily-swatch"
          key={index}
          onClick={() => setCurrentFont(item.name)}
        >
          <label
            htmlFor="font1"
            className="needsclick needsfocus"
            style={{
              boxShadow:
                currentFont === item.name
                  ? "0 0 5px rgba(0, 0, 0, 0.5)"
                  : undefined,
              border:
                currentFont === item.name
                  ? "2px solid black"
                  : "1px solid black",
            }}
          >
            <img
              src={item.image}
              loading="lazy"
              width="40"
              height="40"
              alt=""
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default FontsComponents;
