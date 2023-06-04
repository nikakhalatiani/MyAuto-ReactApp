import "./SearchDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

interface Option {
  value: string;
  label: string;
}

interface SearchDropdownProps {
  options: Option[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ options }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCloseButtonSelected, setIsCloseButtonSelected] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option: Option) => {
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption.value === option.value
    );

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOption) => selectedOption.value !== option.value
        )
      );
      if (selectedOptions.length === 1 && isCloseButtonSelected) {
        setIsCloseButtonSelected(false);
      }
    } else {
      setSelectedOptions([...selectedOptions, option]);
      if (!isCloseButtonSelected) {
        setIsCloseButtonSelected(true);
      }
    }

    if (searchInputRef.current) {
      searchInputRef.current.placeholder = selectedOptions
        .map((selectedOption) => selectedOption.label)
        .join(", ");
    }
  };

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const toggleDropdown = () => {
    if (isCloseButtonSelected) {
      setSelectedOptions([]);
      setIsCloseButtonSelected(false);
    } else {
      setIsOpen(!isOpen);
    }
  };

  const handleCloseWithSelection = () => {
    setIsOpen(false);
    setSearchTerm("");
  };

  const handleClearButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setSelectedOptions([]);
  };

  // const handleClearAll = () => {
  //   setSelectedOptions([]);
  //   setIsCloseButtonSelected(false);
  //   if (searchInputRef.current) {
  //     searchInputRef.current.placeholder = "Search";
  //   }
  // };
  

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div ref={dropdownRef}>
      <div
        className={`search-container ${
          selectedOptions.length > 0 ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          onClick={() => setIsOpen(true)}
          placeholder={
            selectedOptions.length > 0
              ? selectedOptions
                  .map((selectedOption) => selectedOption.label)
                  .join(", ")
              : "Search"
          }
          value={searchTerm}
          onChange={handleSearchTermChange}
          ref={searchInputRef}
        />
        <button
          onClick={toggleDropdown}
          className={
            isCloseButtonSelected ? "rotate-x" : isOpen ? "rotate" : ""
          }
        >
          {isCloseButtonSelected ? (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#272a37" }} />
          ) : isOpen ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#6f7383", height: "10px", width: "10px" }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#6f7383", height: "10px", width: "10px" }}
            />
          )}
        </button>
      </div>
      <div>
        {isOpen && (
          <div className="dropdown">
            <div className="dropdown-options">
              {filteredOptions.length === 0 ? (
                <span>No records</span>
              ) : (
                filteredOptions.map((option) => (
                  <label key={option.value}>
                    <input
                      type="checkbox"
                      checked={selectedOptions.some(
                        (selectedOption) =>
                          selectedOption.value === option.value
                      )}
                      onChange={() => {
                        handleCheckboxChange(option);
                        setIsChecked(!isChecked);
                      }}
                    />
                    {selectedOptions.some(
                      (selectedOption) => selectedOption.value === option.value
                    ) ? (
                      <span className="custom-checkbox-checked">
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ height: "10px", width: "10px" }}
                        />
                      </span>
                    ) : (
                      <span className="custom-checkbox-unchecked"></span>
                    )}
                    {option.label}
                  </label>
                ))
              )}
            </div>

            {selectedOptions.length > 0 && (
              <div className="dropdown-buttons">
                <button className="clear-button" onClick={handleClearButtonClick}>
                  Clear Filter
                </button>
                <button
                  className="close-button"
                  onClick={handleCloseWithSelection}
                >
                  Choose
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDropdown;
