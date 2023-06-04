import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./PeriodDropdown.css";

interface Option {
  value: string;
  label: string;
}

interface SearchDropdownProps {
  options: Option[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const togglePeriodDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredOptions = options.filter((option) => option.value !== selectedOption?.value);

  return (
    <div ref={dropdownRef}>
      <div
        className={`period-container ${isOpen ? "open" : ""}`}
        onClick={togglePeriodDropdown}
      >
        <span className="period-choice">{selectedOption ? selectedOption.label : "Period"}</span>
        <button className={isOpen ? "rotate" : ""}>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: "#6f7383", height: "10px", width: "10px" }}
          />
        </button>
      </div>
      {isOpen && (
        <div className="period-dropdown-options">
          {filteredOptions.map((option) => (
            <div
              key={option.value}
              className="period-option"
              onClick={() => handleOptionSelect(option)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
