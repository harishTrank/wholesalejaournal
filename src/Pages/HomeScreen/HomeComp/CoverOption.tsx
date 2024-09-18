import React, { useEffect } from "react";

const CoverOption = ({
  coverCurrentOption,
  setCoverCurrentOption,
  canvasText,
  setCanvasText,
  setLowerVisible,
  setUploadLogo,
  setCurrentBkgShape,
  currentTheme,
  paramsid,
}: any) => {
  const optionSelectHandler = (e: any) => {
    setCoverCurrentOption(e.target.value);
  };

  const handleLogoUpload = (e: any) => {
    // setUploadLogo(e.target.value);
    const file = e.target.files[0];
    if (file) {
      setUploadLogo(file);
    }
  };

  useEffect(() => {
    if (coverCurrentOption === "Phrase") {
      setCanvasText(["", "", ""]);
      setLowerVisible(true);
      setUploadLogo("");
    } else if (coverCurrentOption === "Name or initial") {
      setCanvasText("");
      setLowerVisible(true);
      setUploadLogo("");
    } else if (coverCurrentOption === "Upload a logo") {
      setCanvasText("");
      setLowerVisible(false);
      setCurrentBkgShape("");
    }
  }, [
    coverCurrentOption,
    setCanvasText,
    setLowerVisible,
    setCurrentBkgShape,
    setUploadLogo,
  ]);

  return (
    <>
      <select
        name="personaliseProd"
        id="personaliseProd"
        value={coverCurrentOption}
        onChange={optionSelectHandler}
      >
        <option value="">Select Option</option>

        {currentTheme?.category_type__phrase_flag && (
          <option value="Phrase">Phrase</option>
        )}

        {currentTheme?.category_type__initial_flag && (
          <option value="Name or initial">Name or initial</option>
        )}
        {currentTheme?.category_type__cover_logo_flag && (
          <option value="Upload a logo">Upload a logo</option>
        )}
      </select>
      {coverCurrentOption === "Phrase" ? (
        <div className="Lines flex">
          <input
            type="text"
            maxLength={25}
            placeholder="Line 1"
            value={canvasText[0]}
            onChange={(e: any) =>
              setCanvasText((oldVal: any) => [
                e.target.value,
                ...oldVal.slice(1, 3),
              ])
            }
          />
          <input
            type="text"
            maxLength={25}
            placeholder="Line 2"
            value={canvasText[1]}
            onChange={(e: any) =>
              setCanvasText((oldVal: any) => [
                oldVal[0],
                e.target.value,
                oldVal[2],
              ])
            }
          />
          <input
            type="text"
            maxLength={25}
            placeholder="Line 3"
            value={canvasText[2]}
            onChange={(e: any) =>
              setCanvasText((oldVal: any) => [
                oldVal[0],
                oldVal[1],
                e.target.value,
              ])
            }
          />
        </div>
      ) : coverCurrentOption === "Name or initial" ? (
        <span className="nameInitial">
          <textarea
            name="writingArea"
            maxLength={15}
            id="writingArea"
            rows={5}
            placeholder="Please enter the message"
            value={canvasText}
            onChange={(e: any) => setCanvasText(e.target.value)}
          ></textarea>
        </span>
      ) : (
        coverCurrentOption === "Upload a logo" && (
          <>
            <div className="file" id="uploadImage">
              <label htmlFor="logoUpload" style={{ cursor: "pointer" }}>
                Select a file
              </label>

              <input
                type="file"
                onChange={handleLogoUpload}
                id="logoUpload"
                style={{ display: "none" }}
              />
            </div>
            <img
              hidden
              id="logoPreview"
              src=""
              alt="Logo Preview"
              style={{ maxWidth: 200, marginTop: 10 }}
            />
          </>
        )
      )}
    </>
  );
};

export default CoverOption;
