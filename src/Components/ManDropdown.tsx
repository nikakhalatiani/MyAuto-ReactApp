import "./ManDropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useState, useRef, useEffect } from "react";

interface ManOption {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

interface ManDropdownProps {
  options: ManOption[];
}

const ManDropdown: React.FC<ManDropdownProps> = ({ options }) => {
  const [manTerm, setManTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<ManOption[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isCloseButtonSelected, setIsCloseButtonSelected] = useState(false);
  const manInputRef = useRef<HTMLInputElement>(null);
  const manDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        manDropdownRef.current &&
        !manDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (manInputRef?.current?.placeholder === "Manufacturer") {
          setManTerm("");
          // console.log("test");
        }
      }
    };

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleCheckboxChange = (option: ManOption) => {
    const isSelected = selectedOptions.some(
      (selectedOption) => selectedOption.man_id === option.man_id
    );

    if (isSelected) {
      setSelectedOptions(
        selectedOptions.filter(
          (selectedOption) => selectedOption.man_id !== option.man_id
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

    if (manInputRef.current) {
      manInputRef.current.placeholder = selectedOptions
        .map((selectedOption) => selectedOption.man_name)
        .join(", ");
    }
  };

  // const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
  //   event.stopPropagation();
  //   handleContainerClick();
  //   console.log(event.target);
  // };

  const handleManTermChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManTerm(event.target.value);
  };

  function toTitleCase(input: string): string {
    return input
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word?.replace(word[0], word[0]?.toUpperCase());
      })
      .join(" ");
  }

  const toggleManDropdown = () => {
    if (isCloseButtonSelected) {
      setSelectedOptions([]);
      setIsCloseButtonSelected(!isCloseButtonSelected);
      console.log("X-mark");
    } else {
      if (manInputRef?.current?.placeholder === "Manufacturer") {
        setManTerm("");
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
      manInputRef?.current?.focus(); // Set focus on the man input field
      // }
    }
  };

  const handleCloseWithSelection = () => {
    setIsOpen(false);
    setManTerm("");
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
  //   if (manInputRef.current) {
  //     manInputRef.current.placeholder = "Man";
  //   }
  // };

  // const filteredOptions = options.filter((option) =>
  //   option.man_name.toLowerCase().startsWith(manTerm.toLowerCase()).sort((a, b) => a.man_name.localeCompare(b.man_name));
  // );

  const filteredOptions = options
    .filter((option) =>
      option.man_name.toLowerCase().startsWith(manTerm.toLowerCase())
    )
    .sort((a, b) => a.man_name.localeCompare(b.man_name));

  return (
    <div className="man-dropdown-container" ref={manDropdownRef}>
      {" "}
      <div
        onClick={handleContainerClick}
        className={`man-container ${
          selectedOptions.length > 0 ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          id="2"
          placeholder={
            selectedOptions.length > 0
              ? selectedOptions
                  .map((selectedOption) => toTitleCase(selectedOption.man_name))
                  .join(", ")
              : "Manufacturer"
          }
          value={manTerm}
          onChange={handleManTermChange}
          ref={manInputRef}
          onClick={() => {
            setIsOpen(true);
          }}
        />
        <button
          onClick={toggleManDropdown}
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
      <div className={isOpen ? "man-dropdown-content" : ""}>
        {isOpen && (
          <div className="man-dropdown">
            <div className="man-dropdown-options">
              {filteredOptions.length === 0 ? (
                <span>No records</span>
              ) : (
                filteredOptions.map((option) => (
                  <label key={option.man_id}>
                    <input
                      type="checkbox"
                      id={option.man_id}
                      checked={selectedOptions.some(
                        (selectedOption) =>
                          selectedOption.man_id === option.man_id
                      )}
                      onChange={() => {
                        handleCheckboxChange(option);
                        setIsChecked(!isChecked);
                      }}
                    />
                    {selectedOptions.some(
                      (selectedOption) =>
                        selectedOption.man_id === option.man_id
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
                    {toTitleCase(option.man_name)}
                  </label>
                ))
              )}
            </div>

            {selectedOptions.length > 0 && (
              <div className="man-dropdown-buttons">
                <button
                  className="man-clear-button"
                  onClick={handleClearButtonClick}
                >
                  Clear Filter
                </button>
                <button
                  className="man-close-button"
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

export default ManDropdown;
