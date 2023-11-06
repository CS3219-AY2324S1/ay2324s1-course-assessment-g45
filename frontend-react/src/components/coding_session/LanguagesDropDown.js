// LanguageDropdown.js

import React from "react";
import Select from "react-select";
//import { customStyles } from "../constants/customStyles";
import { languageOptions } from "../../constants/languageOptions";

const LanguagesDropdown = ({ selectedLanguage, onSelectChange }) => {
  return (
    <Select
      placeholder={languageOptions[0]}
      value={selectedLanguage}
      options={languageOptions}
      //styles={customStyles}
      defaultValue={languageOptions[0]}
      onChange={(selectedOption) => onSelectChange(selectedOption)}
    />
  );
};

export default LanguagesDropdown;
