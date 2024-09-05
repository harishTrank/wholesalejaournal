import "./CanvaClone.css";
import CreativeEditorSDK from "@cesdk/cesdk-js";
import React, { useEffect, useRef, useState } from "react";
import { findUnsplashAssets } from "./unsplashAssetLibrary";

function CanvaClone({ assetLibrary = "airtable" }) {
  const cesdkContainer = useRef(null);
  const [cesdkInstance, setCesdkInstance] = useState(null);

  useEffect(() => {
    const externalAssetSources = {
      ...(assetLibrary === "unsplash" && {
        unsplash: {
          findAssets: findUnsplashAssets,
          credits: {
            name: "Unsplash",
            url: "https://unsplash.com/",
          },
          license: {
            name: "Unsplash license (free)",
            url: "https://unsplash.com/license",
          },
        },
      }),
    };

  // const customImagePath = `${window.location.protocol}//${window.location.host}/resources/programming.png`;

    let cesdk;
    let config = {
      initialSceneURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_business_card_1.scene`,
      assetSources: {
        ...externalAssetSources,
        // custom: {
        //   findAssets: () => {
        //     return {
        //       assets: [
        //         {
        //           id: "custom-image-1",
        //           type: "ly.img.image",
        //           locale: "en",
        //           label: "Programming",
        //           thumbUri: customImagePath,
        //           size: {
        //             width: 512,
        //             height: 512,
        //           },
        //           meta: {
        //             uri: customImagePath,
        //           },
        //           context: {
        //             sourceId: "custom",
        //           },
        //           credits: {
        //             name: "Freepik",
        //             url: "https://www.flaticon.com/free-icon/programming_1208884?related_id=1208782&origin=search",
        //           },
        //         },
        //       ],
        //       currentPage: 1,
        //       total: 1,
        //       nextPage: undefined,
        //     };
        //   },
        // },
      },
      i18n: {
        en: {
          "libraries.airtable.label": "Airtable",
          "libraries.unsplash.label": "Unsplash",
          "libraries.custom.label": "Custom",
        },
      },
      presets: {
        templates: {
          postcard_1: {
            label: "Postcard Design",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_postcard_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_postcard_1.png`,
          },
          postcard_2: {
            label: "Postcard Tropical",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_postcard_2.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_postcard_2.png`,
          },
          business_card_1: {
            label: "Business card",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_business_card_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_business_card_1.png`,
          },
          instagram_photo_1: {
            label: "Instagram photo",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_instagram_photo_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_instagram_photo_1.png`,
          },
          instagram_story_1: {
            label: "Instagram story",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_instagram_story_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_instagram_story_1.png`,
          },
          poster_1: {
            label: "Poster",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_poster_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_poster_1.png`,
          },
          presentation_4: {
            label: "Presentation",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_presentation_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_presentation_1.png`,
          },
          collage_1: {
            label: "Collage",
            scene: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_collage_1.scene`,
            thumbnailURL: `https://cdn.img.ly/packages/imgly/cesdk-js/latest/assets/templates/cesdk_collage_1.png`,
          },
        },
      },
    };

    if (cesdkContainer.current) {
      CreativeEditorSDK.init(cesdkContainer.current, config).then(
        (instance) => {
          cesdk = instance;
          setCesdkInstance(instance); // Save the instance to state for later use
          console.log("CE.SDK Instance:", cesdk);
          console.dir(cesdk.engine); // Log the engine property in a more readable way
        }
      );
    }

    return () => {
      if (cesdk) {
        cesdk.dispose();
      }
    };
  }, [cesdkContainer, assetLibrary]);

  const handleDownloadImage = async () => {
    if (cesdkInstance) {
      const blocks = await cesdkInstance.engine.block.findAll();
      const base64Images = [];
      for (const block of blocks) {
        const type = cesdkInstance.engine.block.getType(block);
        if (type.includes("page")) {
          const blockBlob = await cesdkInstance.engine.block.export(
            block,
            "image/png"
          );
          const reader = new FileReader();
          reader.readAsDataURL(blockBlob);
          reader.onloadend = () => {
            const base64String = reader.result;
            base64Images.push(base64String);
          };
        }
      }
      console.log(base64Images);
    }
  };

  return (
    <div className="caseContainer">
      <div className="wrapper">
        <button onClick={handleDownloadImage} className="download-button">
          Download Edited Image
        </button>
        <div ref={cesdkContainer} className="cesdk"></div>
      </div>
    </div>
  );
}

export default CanvaClone;
