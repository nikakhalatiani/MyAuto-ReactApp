import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./PeriodDropdown.css";

interface PeriodOption {
  value: string;
  label: string;
}

interface PeriodDropdownProps {
  periods: PeriodOption[];
}

const PeriodDropdown: React.FC<PeriodDropdownProps> = ({ periods }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<PeriodOption | null>(null);
  const periodDropdownRef = useRef<HTMLDivElement>(null);

  const togglePeriodDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: PeriodOption) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      periodDropdownRef.current &&
      !periodDropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredOptions = periods.filter(
    (option) => option.value !== selectedOption?.value
  );

  return (
    <div className="period-dropdown-container" ref={periodDropdownRef}>
      {" "}
      <div
        className={`period-container ${isOpen ? "open" : ""}`}
        onClick={togglePeriodDropdown}
      >
        <span className="period-choice">
          {selectedOption ? selectedOption.label : "Period"}
        </span>
        <button className={isOpen ? "rotate" : ""}>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: "#6f7383", height: "10px", width: "10px" }}
          />
        </button>
      </div>
      <div className={isOpen ? "period-dropdown-content" : ""}>
        {" "}
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
    </div>
  );
};

export default PeriodDropdown;
