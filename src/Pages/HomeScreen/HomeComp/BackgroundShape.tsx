import React from "react";

const details = [
  {
    src: "https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/10/55e6ac90-8ac2-4261-a67b-4e8fee0ba436.png",
    alt: "rect",
  },
  {
    src: "https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/10/f02c6bba-314f-4f60-ac4f-1f082d3f5b03.png",
    alt: "circle",
  },
  {
    src: "https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/10/7a3fb3b4-9b12-4a6a-9259-a71dac6c4f60.png",
    alt: "trap",
  },
  {
    src: "https://cdn.customily.com/shopify/assetFiles/swatches/may-designs-main.myshopify.com/af1a5c75-f3c9-474f-bc9d-590d16cae0d0/10/92138a4f-da40-4bfe-8602-44a08f30c7b6.png",
    alt: "squr",
  },
];

const BackgroundShape = ({ currentBkgShape, setCurrentBkgShape }: any) => {
  return (
    <div className="swatch-container">
      <div
        className="swatch"
        style={{
          display: "flex",
          flexDirection: "row",
          width: window.innerWidth * 0.4,
         
        }}
      >
        {details.map((item: any, index: any) => (
          <div key={index}>
            <label
              htmlFor={item.alt}
              className="needsclick needsfocus"
              onClick={() => setCurrentBkgShape(item.alt)}
              style={{
                boxShadow:
                  currentBkgShape === item.alt
                    ? "0 0 5px rgba(0, 0, 0, 0.5)"
                    : undefined,
                border: currentBkgShape === item.alt ? "2px solid black" : "1px solid black"
              }}
            >
              <img
                src={item.src}
                loading="lazy"
                width="40"
                height="40"
                alt={item.alt}
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BackgroundShape;
