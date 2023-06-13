import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./FilterDropdown.css";

interface OrderingOption {
  value: number;
  label: string;
}

interface FilterDropdownProps {
  ordering_type: OrderingOption[];
  sortSelectedOption: OrderingOption;
  setSortSelectedOption: (sortSelectedOption: OrderingOption) => void;
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  ordering_type,
  sortSelectedOption,
  setSortSelectedOption,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const filterDropdownRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (option: OrderingOption) => {
    setSortSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      filterDropdownRef.current &&
      !filterDropdownRef.current.contains(event.target as Node)
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

  const filteredOptions = ordering_type.filter(
    (option) => option.value !== sortSelectedOption?.value
  );

  return (
    <div className="filter-dropdown-container" ref={filterDropdownRef}>
      {" "}
      <div
        className={`filter-container ${isOpen ? "open" : ""}`}
        onClick={toggleFilterDropdown}
      >
        <span className="period-choice">
          {sortSelectedOption ? sortSelectedOption.label : "Order"}
        </span>
        <button className={isOpen ? "rotate" : ""}>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{ color: "#6f7383", height: "10px", width: "10px" }}
          />
        </button>
      </div>
      <div className={isOpen ? "filter-dropdown-content" : ""}>
        {isOpen && (
          <div className="filter-dropdown-options">
            {filteredOptions.map((option) => (
              <div
                key={option.value}
                className="filter-option"
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

export default FilterDropdown;
