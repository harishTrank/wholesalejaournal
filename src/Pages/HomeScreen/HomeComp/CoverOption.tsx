import React from "react";

const CoverOption = ({coverCurrentOption, setCoverCurrentOption}: any) => {
  return (
    <>
      <select
        name="personaliseProd"
        id="personaliseProd"
        value={coverCurrentOption}
        onChange={(e: any) => setCoverCurrentOption(e.target.value)}
      >
        <option value="Phrase">Phrase</option>
        <option value="Name or initial">Name or initial</option>
        <option value="Upload a logo">Upload a logo</option>
      </select>
      {coverCurrentOption === "Phrase" ? (
        <div>
          <input
            name="textLine[]"
            type="text"
            id="textInput"
            maxLength={25}
            placeholder="Line 1"
          />
          <input
            name="textLine[]"
            type="text"
            id="textInput2"
            maxLength={25}
            placeholder="Line 2"
          />
          <input
            name="textLine[]"
            type="text"
            id="textInput3"
            maxLength={25}
            placeholder="Line 3"
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
