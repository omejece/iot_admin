import React, { useState } from "react";
import "../assets/css/dropdown.css";

const Dropdown = ({ options, onSelect,badge, icon, placeholder = "Select an option"  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleSelect = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header" onClick={handleToggle}>
         <i className={icon}></i>
         {
            badge
            ? <span className="badge badge-danger navbar-badge">{badge}</span>
            :<></>
         }
        {selectedOption ? selectedOption.label : placeholder}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>&#9662;</span>
      </div>
      {isOpen && (
        <ul className="dropdown-list">
          {options.map((option) => (
            <li
              key={option.value}
              className="dropdown-item"
              onClick={() => handleSelect(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
