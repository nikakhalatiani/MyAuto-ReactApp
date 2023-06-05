import "./CategDropdown.css";
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

interface CategDropdownProps {
  options: Option[];
}

const CategDropdown: React.FC<CategDropdownProps> = ({ options }) => {
  const [categTerm, setCategTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCloseButtonSelected, setIsCloseButtonSelected] = useState(false);
  const categInputRef = useRef<HTMLInputElement>(null);
  const categDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        categDropdownRef.current &&
        !categDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (categInputRef?.current?.placeholder === "Category") {
          setCategTerm("");
          // console.log("test");
        }
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

    if (categInputRef.current) {
      categInputRef.current.placeholder = selectedOptions
        .map((selectedOption) => selectedOption.label)
        .join(", ");
    }
  };

  // const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
  //   event.stopPropagation();
  //   handleContainerClick();
  //   console.log(event.target);
  // };

  const handleCategTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCategTerm(event.target.value);
  };

  const toggleCategDropdown = () => {
    if (isCloseButtonSelected) {
      setSelectedOptions([]);
      setIsCloseButtonSelected(!isCloseButtonSelected);
      console.log("X-mark");
    } else {
      if (categInputRef?.current?.placeholder === "Category") {
        setCategTerm("");
        // console.log("test");
      }
      setIsOpen(!isOpen);
    }
  };

  const handleContainerClick = () => {
    // console.log("handleContainerClick");
    // console.log(isCloseButtonSelected);
    // setIsCloseButtonSelected(false);
    // if (!isCloseButtonSelected) {
    // console.log("!isCloseButtonSelected");
    if (!isOpen && !isCloseButtonSelected) {
      console.log("isOpen");
      setIsOpen(true);
      categInputRef?.current?.focus(); // Set focus on the categ input field
      // }
    }
  };

  const handleCloseWithSelection = () => {
    setIsOpen(false);
    setCategTerm("");
  };

  const handleClearButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setSelectedOptions([]);
    setIsCloseButtonSelected(false);
  };

  // const handleClearAll = () => {
  //   setSelectedOptions([]);
  //   setIsCloseButtonSelected(false);
  //   if (categInputRef.current) {
  //     categInputRef.current.placeholder = "Categ";
  //   }
  // };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().startsWith(categTerm.toLowerCase())
  );

  return (
    <div ref={categDropdownRef}>
      <div
        onClick={handleContainerClick}
        className={`categ-container ${
          selectedOptions.length > 0 ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          placeholder={
            selectedOptions.length > 0
              ? selectedOptions
                  .map((selectedOption) => selectedOption.label)
                  .join(", ")
              : "Category"
          }
          value={categTerm}
          onChange={handleCategTermChange}
          ref={categInputRef}
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <button
          onClick={toggleCategDropdown}
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
          <div className="categ-dropdown">
            <div className="categ-dropdown-options">
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
              <div className="categ-dropdown-buttons">
                <button
                  className="categ-clear-button"
                  onClick={handleClearButtonClick}
                >
                  Clear Filter
                </button>
                <button
                  className="categ-close-button"
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

export default CategDropdown;
