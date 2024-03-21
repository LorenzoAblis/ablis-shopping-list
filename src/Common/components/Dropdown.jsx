import PropTypes from "prop-types";
import { useState } from "react";

const Dropdown = ({ options, className }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className={`dropdown ${className}`}>
      <select
        value={selectedOption}
        onChange={(e) => handleSelect(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

Dropdown.propTypes = {
  options: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default Dropdown;
