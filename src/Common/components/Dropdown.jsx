import PropTypes from "prop-types";

const Dropdown = ({
  options,
  className,
  selectedOption,
  setSelectedOption,
}) => {
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
  selectedOption: PropTypes.any.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default Dropdown;
