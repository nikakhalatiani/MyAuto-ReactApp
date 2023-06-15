import "./ModelDropdown.css";
import GroupModelDropdown from "./GroupModelDropdown";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

interface ManOption {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

interface ModelOption {
  model_id: number;
  man_id: number;
  model_name: string;
  model_group: string;
  sort_order: number;
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  show_in_salons: number;
  shown_in_slider: number;
}

interface GroupedModelOptions {
  man_name: string;
  options: ModelOption[];
}

interface GroupManModel {
  model_group: string;
  options: ModelOption[];
}

interface ModelDropdownProps {
  allOptions: GroupedModelOptions[];
  setManSelectedOptions: (selectedOptions: ManOption[]) => void;
  manSelectedOptions: ManOption[];
  modelSelectedOptions: ModelOption[];
  setModSelectedOptions: (selectedOptions: ModelOption[]) => void;
  setManIsCloseButtonSelected: (isManCloseButtonSelected: boolean) => void;
  isModCloseButtonSelected: boolean;
  setModIsCloseButtonSelected: (isModCloseButtonSelected: boolean) => void;
}

const ModelDropdown: React.FC<ModelDropdownProps> = ({
  allOptions, // this argument is used only on line 112 since parent component is using another implementation we omit it
  manSelectedOptions,
  setManSelectedOptions,
  modelSelectedOptions,
  setModSelectedOptions,
  setManIsCloseButtonSelected,
  isModCloseButtonSelected,
  setModIsCloseButtonSelected,
}) => {
  const [groupedModelOptions, setGroupedModelOptions] = useState<
    GroupedModelOptions[]
  >([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modelTerm, setModelTerm] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const modelDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modelDropdownRef.current &&
        !modelDropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        if (modelInputRef?.current?.placeholder === "Model") {
          setModelTerm("");
        }
      }
    };
    window.addEventListener("click", handleClickOutside);
    fetchModelOptions();
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [manSelectedOptions]);

  const fetchModelOptions = async () => {
    try {
      const optionsPromises = manSelectedOptions.map(async (option) => {
        const url = `https://api2.myauto.ge/ka/getManModels?man_id=${option.man_id}`;
        const response = await fetch(url);
        const data = await response.json();
        return { man_name: option.man_name, options: data.data || [] };
      });

      const options = await Promise.all(optionsPromises);
      setGroupedModelOptions(options);
    } catch (error) {
      console.error("Error fetching model options:", error);
    }
  };

  ////* This implementation of fetchModelOPtions is not used since parent component is using another implementation
  //!   const fetchModelOptions = () => {
  //?     const options = allOptions.filter((option) =>
  //*       manSelectedOptions.some(
  //!         (manOption) => manOption.man_name === option.man_name
  //?       )
  //*     );
  //!     setGroupedModelOptions(options);
  //?   };

  const handleCheckboxChangeGroup = (group: GroupedModelOptions) => {
    const updatedManOptions = manSelectedOptions.filter(
      (option) => option.man_name !== group.man_name
    );
    console.log(updatedManOptions);
    if (updatedManOptions.length === 0) {
      setManIsCloseButtonSelected(false);
    }
    setManSelectedOptions(updatedManOptions);

    let updatedModelSelectedOptions: ModelOption[] =
      modelSelectedOptions.filter(
        (selectedOption) =>
          !group.options.some(
            (option) => option.model_id === selectedOption.model_id
          )
      );

    if (updatedModelSelectedOptions.length === 0) {
      setModIsCloseButtonSelected(false);
    }

    setModSelectedOptions(updatedModelSelectedOptions);

    // if (modelInputRef.current) {
    //   console.log("updatedSelectedOptions", updatedSelectedOptions);
    //   console.log(modelInputRef.current.placeholder);
    //   modelInputRef.current.placeholder = isEmpty(updatedManOptions)
    //     ? "Model"
    //     : updatedSelectedOptions
    //         .map((selectedOption) => selectedOption.model_name)
    //         .join(", ");

    //   console.log(modelInputRef.current.placeholder);
    // }
  };

  const handleCheckboxChange = (option: ModelOption) => {
    const isSelected = modelSelectedOptions.some(
      (selectedOption) => selectedOption.model_id === option.model_id
    );

    let updatedSelectedOptions: ModelOption[];

    if (isSelected) {
      updatedSelectedOptions = modelSelectedOptions.filter(
        (selectedOption) => selectedOption.model_id !== option.model_id
      );
      if (updatedSelectedOptions.length === 0 && isModCloseButtonSelected) {
        setModIsCloseButtonSelected(false);
      }
    } else {
      updatedSelectedOptions = [...modelSelectedOptions, option];
      if (!isModCloseButtonSelected) {
        setModIsCloseButtonSelected(true);
      }
    }
    updatedSelectedOptions.sort((a, b) =>
      a.model_name.localeCompare(b.model_name)
    );

    setModSelectedOptions(updatedSelectedOptions);

    console.log("updatedSelectedOptions", updatedSelectedOptions);

    if (modelInputRef.current) {
      modelInputRef.current.placeholder = updatedSelectedOptions
        .map((selectedOption) => selectedOption.model_name)
        .join(", ");
    }
  };

  const handleModelTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setModelTerm(event.target.value);
  };

  const toggleModelDropdown = () => {
    if (isModCloseButtonSelected) {
      setModSelectedOptions([]);
      setModIsCloseButtonSelected(!isModCloseButtonSelected);
    } else {
      if (modelInputRef?.current?.placeholder === "Model") {
        setModelTerm("");
      }
      setIsOpen(!isOpen);
    }
  };

  const handleContainerClick = () => {
    if (!isOpen && !isModCloseButtonSelected) {
      setIsOpen(true);
      modelInputRef?.current?.focus();
      // }
    }
  };

  const handleCloseWithSelection = () => {
    setIsOpen(false);
    setModelTerm("");
  };

  const handleClearButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    setModSelectedOptions([]);
    setModIsCloseButtonSelected(false);
  };

  const filteredOptions: GroupedModelOptions[] = groupedModelOptions
    .map((group) => ({
      man_name: group.man_name,
      options: group.options.filter(
        (option) =>
          group.man_name.toLowerCase().startsWith(modelTerm.toLowerCase()) ||
          option.model_name.toLowerCase().startsWith(modelTerm.toLowerCase())||
            option.model_group.toLowerCase().startsWith(modelTerm.toLowerCase())
      ),
    }))
    .filter((group) => group.options.length > 0)
    .sort((a, b) => a.man_name.localeCompare(b.man_name))
    .map((group) => ({
      man_name: group.man_name,
      options: group.options,
    }));

  function toTitleCase(input: string): string {
    return input
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word?.replace(word[0], word[0]?.toUpperCase());
      })
      .join(" ");
  }

  function groupOptionsByModelGroup(options: ModelOption[]): GroupManModel[] {
    const groupedOptions: { [modelGroup: string]: ModelOption[] } = {};

    options.forEach((option) => {
      const { model_group } = option;
      if (model_group) {
        if (model_group in groupedOptions) {
          groupedOptions[model_group].push(option);
        } else {
          groupedOptions[model_group] = [option];
        }
      }
    });

    return Object.keys(groupedOptions).map((model_group) => ({
      model_group,
      options: groupedOptions[model_group],
    }));
  }

  const isEmpty = (obj: any[]): boolean => {
    return obj.length === 0;
  };

  const handleAllModelCheck = (
    model_group: string,
    groupedOptions: GroupManModel[]
  ) => {
    const optionsInGroup = groupedOptions.find(
      (group) => group.model_group === model_group
    );

    if (!optionsInGroup) {
      return;
    }

    const areAllOptionsSelected = optionsInGroup.options.every((option) =>
      modelSelectedOptions.some(
        (selectedOption) => selectedOption.model_id === option.model_id
      )
    );

    let updatedModSelectedOptions: ModelOption[];

    if (areAllOptionsSelected) {
      updatedModSelectedOptions = modelSelectedOptions.filter(
        (selectedOption) =>
          !optionsInGroup.options.some(
            (option) => option.model_id === selectedOption.model_id
          )
      );
    } else {
      const optionsToAdd = optionsInGroup.options.filter(
        (option) =>
          !modelSelectedOptions.some(
            (selectedOption) => selectedOption.model_id === option.model_id
          )
      );
      updatedModSelectedOptions = [...modelSelectedOptions, ...optionsToAdd];
    }

    setModSelectedOptions(updatedModSelectedOptions);

    if (modelInputRef.current) {
      modelInputRef.current.placeholder = updatedModSelectedOptions
        .map((selectedOption) => selectedOption.model_name)
        .join(", ");
    }
  };

  return (
    <div className="model-dropdown-container" ref={modelDropdownRef}>
      {" "}
      <div
        onClick={isEmpty(manSelectedOptions) ? () => {} : handleContainerClick}
        className={`model-container ${
          modelSelectedOptions.length > 0 ? "dark-font" : ""
        } ${isOpen ? "open" : ""}`}
      >
        <input
          id="9"
          placeholder={
            modelSelectedOptions.length > 0
              ? modelSelectedOptions
                  .map((selectedOption) => selectedOption.model_name)
                  .join(", ")
              : "Model"
          }
          value={modelTerm}
          onChange={handleModelTermChange}
          ref={modelInputRef}
          onClick={
            isEmpty(manSelectedOptions)
              ? () => {}
              : () => {
                  setIsOpen(true);
                }
          }
          disabled={isEmpty(manSelectedOptions)}
          autoComplete="off"
        />
        <button
          onClick={isEmpty(manSelectedOptions) ? () => {} : toggleModelDropdown}
          className={
            isModCloseButtonSelected ? "rotate-x" : isOpen ? "rotate" : ""
          }
        >
          {isModCloseButtonSelected ? (
            <FontAwesomeIcon icon={faXmark} style={{ color: "#272a37" }} />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{ color: "#6f7383", height: "10px", width: "10px" }}
            />
          )}
        </button>
      </div>
      <div className={isOpen ? "model-dropdown-content" : ""}>
        {isOpen && (
          <div className="model-dropdown">
            <div className="model-dropdown-options">
              {filteredOptions.length === 0 || isEmpty(manSelectedOptions) ? (
                <span>No records</span>
              ) : (
                filteredOptions.map((group) => (
                  <div key={group.man_name} className="model-group">
                    <div
                      className="man-name-title"
                      onClick={() => handleCheckboxChangeGroup(group)}
                    >
                      <input
                        type="checkbox"
                      />
                      <span className="custom-checkbox-checked">
                        <FontAwesomeIcon
                          icon={faCheck}
                          style={{ height: "10px", width: "10px" }}
                        />
                      </span>
                      <div className="group-name">
                        <span className="group-text">
                          {toTitleCase(group.man_name)}
                        </span>
                      </div>
                      <hr className="grey-hor-line" />
                    </div>

                    {group.options.map((option) => (
                      <>
                        {!option.model_group && (
                          <label key={option.model_id}>
                            <input
                              type="checkbox"
                              checked={modelSelectedOptions.some(
                                (selectedOption) =>
                                  selectedOption.model_id === option.model_id
                              )}
                              onChange={() => {
                                handleCheckboxChange(option);
                                setIsChecked(!isChecked);
                              }}
                            />
                            {modelSelectedOptions.some(
                              (selectedOption) =>
                                selectedOption.model_id === option.model_id
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
                            {option.model_name}
                          </label>
                        )}
                      </>
                    ))}

                    {groupOptionsByModelGroup(group.options).map(
                      ({ model_group, options }) => (
                        <GroupModelDropdown
                          model_group={model_group}
                          options={options}
                          modelSelectedOptions={modelSelectedOptions}
                          handleCheckboxChange={handleCheckboxChange}
                          setModSelectedOptions={setModSelectedOptions}
                          modelInputRef={modelInputRef}
                          setModIsCloseButtonSelected={
                            setModIsCloseButtonSelected
                          }
                        />
                      )
                    )}
                  </div>
                ))
              )}
            </div>

            {modelSelectedOptions.length > 0 && (
              <div className="model-dropdown-buttons">
                <button
                  className="model-clear-button"
                  onClick={handleClearButtonClick}
                >
                  Clear Filter
                </button>
                <button
                  className="model-close-button"
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

export default ModelDropdown;
