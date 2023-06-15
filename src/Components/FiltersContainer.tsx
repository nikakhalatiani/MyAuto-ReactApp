import { useState } from "react";
import "./FiltersContainer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faCircleMinus,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

interface OrderingOption {
  value: string;
  label: string;
}

interface PeriodOption {
  value: string;
  label: string;
}

interface FilterOption {
  type: string;
  id: string;
  label: string;
  mod_id?: string;
}
type Search = {
  Mans: string;
  Cats: string;
  PriceTo: string;
  PriceFrom: string;
  ForRent: string;
};

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

interface CategOption {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

interface FiltersContainerProps {
  filters: FilterOption[];
  setFilters: (filters: FilterOption[]) => void;
  setSortSelectedOption: (sortSelectedOption: OrderingOption) => void;
  setPerSelectedOption: (perSelectedOption: PeriodOption) => void;
  setSearchButton: (searchButton: Search) => void;
  searchButton: Search;
  setManSelectedOptions: (selectedOptions: ManOption[]) => void;
  manSelectedOptions: ManOption[];
  setModSelectedOptions: (selectedOptions: ModelOption[]) => void;
  modelSelectedOptions: ModelOption[];
  catSelectedOptions: CategOption[];
  setCatSelectedOptions: (selectedOptions: CategOption[]) => void;
  setPriceFrom: (priceFrom: string) => void;
  setPriceTo: (priceTo: string) => void;
}

const FiltersContainer: React.FC<FiltersContainerProps> = ({
  filters,
  setFilters,
  setSortSelectedOption,
  setPerSelectedOption,
  setSearchButton,
  searchButton,
  setManSelectedOptions,
  manSelectedOptions,
  setModSelectedOptions,
  modelSelectedOptions,
  catSelectedOptions,
  setCatSelectedOptions,
  setPriceFrom,
  setPriceTo,
}) => {
  const [showAllFilters, setShowAllFilters] = useState(false);
  const visibleFilters = showAllFilters ? filters : filters.slice(0, 10);

  const toggleFilters = () => {
    setShowAllFilters((prevState) => !prevState);
  };

  function deleteCatsSubstring(str: string, substring: string): string {
    const elements = str.split(".");
    const filteredElements = elements.filter(
      (element) => element !== substring
    );
    return filteredElements.join(".");
  }

  function deleteSubstringAndHyphen(str: string, substring: string): string {
    const elements = str.split("-");
    const filteredElements = elements.filter(
      (element) => !element.startsWith(substring + ".")
    );
    const finFilteredElements = filteredElements.filter(
      (element) => element !== substring
    );
    return finFilteredElements.join("-");
  }

  function deleteSubsubstringBetween(
    string: string,
    substring: string,
    subsubstring: string
  ): string {
    const elements = string.split("-");

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].startsWith(substring + ".")) {
        const subElements = elements[i].split(".");
        const filteredSubElements = subElements.filter(
          (subElement, index) => index === 0 || subElement !== subsubstring
        );
        elements[i] = filteredSubElements.join(".");
        break;
      }
    }

    return elements.join("-");
  }

  const handlMullClick = () => {
    setSearchButton({
      Mans: "",
      Cats: "",
      PriceTo: "",
      PriceFrom: "",
      ForRent: "",
    });
    setManSelectedOptions([]);
    setModSelectedOptions([]);
    setCatSelectedOptions([]);
    setPriceFrom("");
    setPriceTo("");
    setSortSelectedOption({
      value: "",
      label: "Sort",
    });
    setPerSelectedOption({
      value: "",
      label: "Period",
    });
    setFilters([]);
  };

  const filterOutElements = (type: string, id: string, mod_id?: string) => {
    if (type === "t") {
      const filteredFilters = filters.filter((filter) => filter.type !== "t");
      setFilters(filteredFilters);
      setPerSelectedOption({
        value: "3w",
        label: "Period",
      });
    } else if (type === "sr") {
      setSearchButton({
        Mans: searchButton.Mans,
        Cats: searchButton.Cats,
        PriceTo: searchButton.PriceTo,
        PriceFrom: searchButton.PriceFrom,
        ForRent: "",
      });
      const filteredFilters = filters.filter((filter) => filter.type !== "sr");
      setFilters(filteredFilters);
    } else if (type === "cat") {
      const filteredFilters = filters.filter(
        (filter) => !(filter.type === "cat" && filter.id === id)
      );
      setCatSelectedOptions(
        catSelectedOptions.filter(
          (option) => option.category_id.toString() !== id
        )
      );
      setSearchButton({
        Mans: searchButton.Mans,
        Cats: deleteCatsSubstring(searchButton.Cats, id),
        PriceTo: searchButton.PriceTo,
        PriceFrom: searchButton.PriceFrom,
        ForRent: searchButton.ForRent,
      });
      setFilters(filteredFilters);
    } else if (type === "man") {
      setManSelectedOptions(
        manSelectedOptions.filter((option) => !(option.man_id === id))
      );
      setModSelectedOptions(
        modelSelectedOptions.filter(
          (option) => !(option.man_id.toString() === id)
        )
      );
      const filteredFilters = filters.filter(
        (filter) =>
          !(
            (filter.type === "man" || filter.type === "mod") &&
            filter.id === id
          )
      );
      setFilters(filteredFilters);

      setSearchButton({
        Mans: deleteSubstringAndHyphen(searchButton.Mans, id),
        Cats: searchButton.Cats,
        PriceTo: searchButton.PriceTo,
        PriceFrom: searchButton.PriceFrom,
        ForRent: searchButton.ForRent,
      });
    } else if (type === "mod") {
      setModSelectedOptions(
        modelSelectedOptions.filter(
          (option) => !(option.model_id.toString() === mod_id)
        )
      );

      const filteredFilters = filters.filter(
        (filter) => !(filter.type === "mod" && filter.mod_id === mod_id)
      );
      setFilters(filteredFilters);

      setSearchButton({
        Mans: deleteSubsubstringBetween(
          searchButton.Mans,
          id,
          mod_id !== undefined ? mod_id : "never"
        ),
        Cats: searchButton.Cats,
        PriceTo: searchButton.PriceTo,
        PriceFrom: searchButton.PriceFrom,
        ForRent: searchButton.ForRent,
      });
    } else if (type === "prf") {
      setPriceFrom("");
      const filteredFilters = filters.filter((filter) => filter.type !== "prf");
      setFilters(filteredFilters);
      setSearchButton({
        Mans: searchButton.Mans,
        Cats: searchButton.Cats,
        PriceTo: searchButton.PriceTo,
        PriceFrom: "",
        ForRent: searchButton.ForRent,
      });
    } else if (type === "prt") {
      setPriceTo("");
      const filteredFilters = filters.filter((filter) => filter.type !== "prt");
      setFilters(filteredFilters);
      setSearchButton({
        Mans: searchButton.Mans,
        Cats: searchButton.Cats,
        PriceTo: "",
        PriceFrom: searchButton.PriceFrom,
        ForRent: searchButton.ForRent,
      });
    }
  };

  return (
    <div className="filters-container">
      <span className="mull" onClick={handlMullClick}>
        <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M5.458 1.452c-.213.076-.316.254-.316.548 0 .294.103.472.316.548.151.054 4.933.054 5.084 0 .213-.076.316-.254.316-.548 0-.294-.103-.472-.316-.548-.151-.054-4.933-.054-5.084 0M1.764 4.44c-.232.072-.349.257-.35.554-.001.307.118.496.356.567.104.03.3.039.888.039h.755v4.063c0 3.894.002 4.068.05 4.213.091.277.289.496.564.627l.146.07h7.654l.152-.071c.213-.1.404-.287.508-.499l.086-.175.007-4.114.007-4.114h.755c.588 0 .784-.009.888-.039.236-.071.357-.26.357-.561 0-.197-.049-.337-.154-.447-.155-.162.238-.153-6.445-.151-5.069.001-6.128.008-6.224.038m9.643 5.06-.007 3.9H4.6l-.007-3.9-.007-3.9h6.828l-.007 3.9"
            fill-rule="evenodd"
            fill="#454857"
          />{" "}
        </svg>
      </span>
      <span className="ver-line"></span>
      {visibleFilters.map((filter, index) => (
        <span className="filter-span" key={index}>
          {filter.label}
          <span
            onClick={() =>
              filterOutElements(filter.type, filter.id, filter?.mod_id)
            }
          >
            {" "}
            <FontAwesomeIcon icon={faXmark} style={{ color: "#272a37" }} />
          </span>{" "}
        </span>
      ))}
      {filters.length > 10 && (
        <button className="read-more-button" onClick={toggleFilters}>
          {showAllFilters ? (
            <>
              Roll up
              <FontAwesomeIcon
                icon={faCircleMinus}
                style={{ color: "#272a37" }}
              />
            </>
          ) : (
            <>
              Total {filters.length - 10}{" "}
              <FontAwesomeIcon
                icon={faCirclePlus}
                style={{ color: "#272a37" }}
              />
            </>
          )}{" "}
        </button>
      )}
    </div>
  );
};

export default FiltersContainer;
