import React from "react";
//import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <h4> Custom Input </h4>
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Type your input here..`}
      ></textarea>
    </>
  );
};

export default CustomInput;