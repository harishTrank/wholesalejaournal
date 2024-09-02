import React, { useEffect } from "react";

const CoverOption = ({
  coverCurrentOption,
  setCoverCurrentOption,
  canvasText,
  setCanvasText,
}: any) => {
  const optionSelectHandler = (e: any) => {
    setCoverCurrentOption(e.target.value);
    setCanvasText(["", "", ""]);
  };

  useEffect(() => {
    if (coverCurrentOption === "Phrase") {
      setCanvasText(["", "", ""]);
    } else {
      setCanvasText("");
    }
  }, [coverCurrentOption, setCanvasText]);

  return (
    <>
      <select
        name="personaliseProd"
        id="personaliseProd"
        value={coverCurrentOption}
        onChange={optionSelectHandler}
      >
        <option value="Phrase">Phrase</option>
        <option value="Name or initial">Name or initial</option>
        <option value="Upload a logo">Upload a logo</option>
      </select>
      {coverCurrentOption === "Phrase" ? (
        <div>
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
        <>
          <div className="file" id="uploadImage">
            <label htmlFor="input-file">Select a file</label>
            <input type="file" id="logoUpload" />
          </div>
          <img
            hidden
            id="logoPreview"
            src=""
            alt="Logo Preview"
            style={{ maxWidth: 200, marginTop: 10 }}
          />
        </>
      )}
    </>
  );
};

export default CoverOption;
