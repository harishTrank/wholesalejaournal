import React, { useEffect } from "react";

const CoverOption = ({
  coverCurrentOption,
  setCoverCurrentOption,
  canvasText,
  setCanvasText,
  lowerVisible,
  setLowerVisible
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
      <label htmlFor="">Personalise Inner Pages</label>
      <select name="" id="">
        <option value="">Select an option</option>
        <option value="">Cover</option>
        <option value="">Lined</option>
        <option value="">Non Lined</option>
      </select>
      {coverCurrentOption === "Phrase" ? (
       
        <div className="Lines flex">
          {setLowerVisible(true)}
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
          {setLowerVisible(true)}
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
      ) :coverCurrentOption === "Upload a logo" ?(
        <>
        {setLowerVisible(false)}
          <div className="file" id="uploadImage">
    
      <label htmlFor="logoUpload" style={{ cursor: "pointer" }}>
        Select a file
      </label>
     
      <input type="file" id="logoUpload" style={{ display: "none" }} />
    </div>
          <img
            hidden
            id="logoPreview"
            src=""
            alt="Logo Preview"
            style={{ maxWidth: 200, marginTop: 10 }}
          />
        </>
      ):(
        <div>hello</div>
      )}
    </>
  );
};

export default CoverOption;
