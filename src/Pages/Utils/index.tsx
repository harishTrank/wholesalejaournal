import { PhotoEditorSDKUI } from "photoeditorsdk";

export const colors = [
  {
    color: "#333333",
    colorName: "Black",
  },
  {
    color: "#FFF",
    colorName: "White",
  },
  {
    color: "#474747",
    colorName: "Noble",
  },
  {
    color: "#544F50",
    colorName: "Emperor",
  },
  {
    color: "#F5E6D9",
    colorName: "Parchment",
  },
  {
    color: "#EAD16A",
    colorName: "Maize",
  },
  {
    color: "#F6E5E1",
    colorName: "Potpourri",
  },
  {
    color: "#F6B9B1",
    colorName: "Mandy's Pink",
  },
  {
    color: "#FDDDCF",
    colorName: "Target Peach",
  },
  {
    color: "#E6843B",
    colorName: "Orange",
  },
  {
    color: "#50744B",
    colorName: "Forest Shade",
  },
  {
    color: "#E1E7DF",
    colorName: "Misty",
  },
];

export const initEditor = async () => {
  const editor: any = await PhotoEditorSDKUI.init({
    container: "#editor",
    license: "tKdK-1QwIsYAZVux36KAWmgWoifVjj01S2i0XPfe2ALf4BJgL3IKS4J5SNKApi0W",
    image:
      "https://cdn.img.ly/packages/imgly/photoeditorsdk/latest/assets/example.jpg",
    assetBaseUrl:
      "https://cdn.img.ly/packages/imgly/photoeditorsdk/latest/assets",
    export: {
      image: {
        enableDownload: false,
      },
    },
  });

  editor.on("export", () => {
    let format = "image/jpg";

    switch (editor.getImageMimeType()) {
      case "image/png":
      case "image/svg+xml":
      case "image/gif":
      case "image/bmp":
      case "image/tiff":
        format = "image/png";
        break;
      default:
        break;
    }

    editor.export({
      enableDownload: true,
      preventExportEvent: true,
      format,
    });
  });
};
