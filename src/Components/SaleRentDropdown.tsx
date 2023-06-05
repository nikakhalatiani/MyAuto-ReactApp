import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCheck,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import "./SaleRentDropdown.css";

interface SaleRentDropdownProps {
  options: string[];
}

const SaleRentDropdown: React.FC<SaleRentDropdownProps> = ({ options }) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCloseButtonSelected, setIsCloseButtonSelected] = useState(false);
  const saleRentdropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        saleRentdropdownRef.current &&
        !saleRentdropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option: string) => {
    const isSelected = selectedOptions.includes(option);

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter((selectedOption) => selectedOption !== option)
      );
      if (selectedOptions.length === 1 && isCloseButtonSelected) {
        setIsCloseButtonSelected(false);
      }
    } else {
      if (selectedOptions.length > 0) {
        setSelectedOptions([option]);
      } else {
        setSelectedOptions([...selectedOptions, option]);
      }
      setIsCloseButtonSelected(true);
    }
  };

  const toggleDropdown = () => {
    if (isCloseButtonSelected) {
      setSelectedOptions([]);
      setIsCloseButtonSelected(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleContainerClick = () => {
    if (!isOpen && !isCloseButtonSelected) {
      setIsOpen(true);
    }
  };

  const handleClearButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setSelectedOptions([]);
    setIsCloseButtonSelected(false);
  };

  return (
    <div className="sale-rent-dropdown-container" ref={saleRentdropdownRef}>
      <div
        onClick={handleContainerClick}
        className={`sale-rent-container ${
          selectedOptions.length > 0 ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          placeholder={
            selectedOptions.length > 0
              ? selectedOptions.join(", ")
              : "Deal type"
          }
          readOnly
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <button
          onClick={toggleDropdown}
          className={
            isCloseButtonSelected ? "rotate-x" : isOpen ? "rotate" : ""
          }
        >
          {isCloseButtonSelected ? (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#272a37" }} />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#6f7383", height: "10px", width: "10px" }}
            />
          )}
        </button>
      </div>
      <div className={isOpen ? "sale-rent-dropdown-content" : ""}>
        {" "}
        {isOpen && (
          <div className="sale-rent-dropdown">
            <div className="sale-rent-dropdown-options">
              {options.map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    checked={selectedOptions.includes(option)}
                    onChange={() => {
                      handleCheckboxChange(option);
                      setIsChecked(!isChecked);
                    }}
                  />
                  {selectedOptions.includes(option) ? (
                    <span className="custom-checkbox-checked">
                      <FontAwesomeIcon
                        className="checkbox-icon"
                        icon={faCheck}
                        style={{ height: "10px", width: "10px" }}
                      />
                    </span>
                  ) : (
                    <span className="custom-checkbox-unchecked"></span>
                  )}
                  {option}
                </label>
              ))}
            </div>
            {selectedOptions.length > 0 && (
              <div className="sale-rent-dropdown-buttons">
                <button
                  className="sale-rent-clear-button"
                  onClick={handleClearButtonClick}
                >
                  Clear Selection
                </button>
                <button
                  className="sale-rent-close-button"
                  onClick={() => setIsOpen(false)}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SaleRentDropdown;
