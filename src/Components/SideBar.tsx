import SaleRentDropdown from "./SaleRentDropdown";
import ManDropdown from "./ManDropdown";
import ModelDropdown from "./ModelDropdown";
import CatDropdown from "./CategDropdown";
import CurrencyChange from "./CurrencyChange";
import "./SideBar.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";

interface GroupedModelOption {
  man_name: string;
  options: ModelOption[];
}

interface CategOption {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

interface ManOption {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

interface ProductOption {
  car_id: number;
  status_id: number;
  user_id: number;
  dealer_user_id: number;
  paid_add: number;
  photo: string;
  pic_number: number;
  prod_year: number;
  prod_month: number;
  man_id: number;
  car_model: string;
  price: number;
  price_usd: number;
  first_deposit: number;
  price_value: number;
  fuel_type_id: number;
  gear_type_id: number;
  drive_type_id: number;
  door_type_id: number;
  color_id: number;
  saloon_color_id: number;
  cylinders: number;
  car_run: number;
  car_run_km: number;
  car_run_dim: number;
  engine_volume: number;
  airbags: number;
  abs: boolean;
  esd: boolean;
  el_windows: boolean;
  conditioner: boolean;
  leather: boolean;
  disks: boolean;
  nav_system: boolean;
  central_lock: boolean;
  hatch: boolean;
  right_wheel: boolean;
  alarm: boolean;
  board_comp: boolean;
  hydraulics: boolean;
  chair_warming: boolean;
  climat_control: boolean;
  obstacle_indicator: boolean;
  customs_passed: boolean;
  client_name: string;
  client_phone: number;
  model_id: number;
  location_id: number;
  parent_loc_id: number;
  tech_inspection: boolean;
  checked_for_duplicates: boolean;
  order_number: number;
  stickers: any;
  changable: boolean;
  auction: boolean;
  has_turbo: boolean;
  for_rent: boolean;
  rent_daily: boolean;
  rent_purchase: boolean;
  rent_insured: boolean;
  rent_driver: boolean;
  currency_id: number;
  vehicle_type: number;
  category_id: number;
  vin: string;
  user_type: any;
  prom_color: number;
  special_persons: boolean;
  back_camera: boolean;
  car_desc: string;
  order_date: string;
  video_url: string;
  hp: number;
  hours_used: number;
  photo_ver: number;
  checked: boolean;
  lang_type_id: number;
  el_starter: number;
  start_stop: boolean;
  trunk: boolean;
  windshield: boolean;
  inspected_in_greenway: boolean;
  license_number: string;
  words_checked: number;
  is_payd: boolean;
  condition_type_id: number;
  primary_damage_type: number;
  secondary_damage_type: number;
  auction_has_key: number;
  is_auction: number;
  saloon_material_id: number;
  map_lat: number;
  map_long: number;
  zoom: number;
  predicted_price: string;
  hdd: number;
  map_title: string;
  has_catalyst: number;
  tmp: string;
  views: number;
  dealerId: any;
  has_logo: any;
  logo_ver: any;
  active_ads: any;
  dealer_title: any;
  has_predicted_price: boolean;
  pred_first_breakpoint: number;
  pred_second_breakpoint: number;
  pred_min_price: number;
  pred_max_price: number;
  comfort_features: number[];
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

interface SidebarProps {
  pairManModel: GroupedModelOption[];
  manOptions: ManOption[];
  catOptions: CategOption[];
  currencies: string[];
  manSelectedOptions: ManOption[];
  setManSelectedOptions: (selectedOptions: ManOption[]) => void;
  modelSelectedOptions: ModelOption[];
  setModSelectedOptions: (selectedOptions: ModelOption[]) => void;
  selectedCurrencyIndex: number;
  setSelectedCurrencyIndex: (selectedCurrencyIndex: number) => void;
  filteredProducts: ProductOption[];
  setFilteredProducts: (filteredProducts: ProductOption[]) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  pairManModel,
  manOptions,
  catOptions,
  currencies,
  manSelectedOptions,
  setManSelectedOptions,
  modelSelectedOptions,
  setModSelectedOptions,
  selectedCurrencyIndex,
  setSelectedCurrencyIndex,
  filteredProducts,
  setFilteredProducts,
}) => {
  const [isModCloseButtonSelected, setModIsCloseButtonSelected] =
    useState(false);
  const [isManCloseButtonSelected, setManIsCloseButtonSelected] =
    useState(false);

  const [isCategCloseButtonSelected, setIsCategCloseButtonSelected] =
    useState(false);

  const [carClicked, setCarClicked] = useState(true);
  const [specClicked, setSpecClicked] = useState(false);
  const [motoClicked, setMotoClicked] = useState(false);
  const [catSelectedOptions, setCatSelectedOptions] = useState<CategOption[]>(
    []
  );

  const [saleSelectedOption, setSaleSelectedOption] = useState("");
  const [filteredManOptions, setFilteredManOptions] = useState<ManOption[]>(
    manOptions.filter((option) => option.is_car === "1")
  );
  const [filteredCatOptions, setFilteredCatOptions] = useState<CategOption[]>(
    catOptions.filter((option) => option.category_type === 0)
  );

  const handleCarClick = () => {
    setCarClicked(true);
    setSpecClicked(false);
    setMotoClicked(false);
    setManSelectedOptions([]);
    setCatSelectedOptions([]);
    setModSelectedOptions([]);
    setManIsCloseButtonSelected(false);
    setModIsCloseButtonSelected(false);
    setIsCategCloseButtonSelected(false);
    setFilteredManOptions(manOptions.filter((option) => option.is_car === "1"));
    setFilteredCatOptions(
      catOptions.filter((option) => option.category_type === 0)
    );
  };

  const handleSpecClick = () => {
    console.log(filteredCatOptions);
    setCarClicked(false);
    setSpecClicked(true);
    setMotoClicked(false);
    setCatSelectedOptions([]);
    setManSelectedOptions([]);
    setModSelectedOptions([]);
    setManIsCloseButtonSelected(false);
    setModIsCloseButtonSelected(false);
    setIsCategCloseButtonSelected(false);

    setFilteredManOptions(
      manOptions.filter((option) => option.is_spec === "1")
    );

    setFilteredCatOptions(
      catOptions.filter((option) => option.category_type === 1)
    );
  };
  //   console.log(catOptions);

  const handleMotoClick = () => {
    setCarClicked(false);
    setSpecClicked(false);
    setMotoClicked(true);
    setCatSelectedOptions([]);
    setManSelectedOptions([]);
    setModSelectedOptions([]);
    setManIsCloseButtonSelected(false);
    setModIsCloseButtonSelected(false);
    setIsCategCloseButtonSelected(false);
    setFilteredManOptions(
      manOptions.filter((option) => option.is_moto === "1")
    );
    setFilteredCatOptions(
      catOptions.filter((option) => option.category_type === 2)
    );
  };

  const handleSearchParClick = () => {
    setSaleSelectedOption("");
  };

  return (
    <>
      <div className="home-text">
        {" "}
        <p>Home</p>
        <FontAwesomeIcon
          icon={faGreaterThan}
          style={{ color: "#6F7383", height: "7px", width: "7px" }}
        />
        <p onClick={handleSearchParClick}>Search </p>
        {saleSelectedOption !== "" && (
          <>
            <FontAwesomeIcon
              icon={faGreaterThan}
              style={{ color: "#6F7383", height: "7px", width: "7px" }}
            />
            <p className="sale-rent-text">{saleSelectedOption}</p>{" "}
          </>
        )}
      </div>

      <div className="sidebar">
        <div className="svg-row">
          <button
            className={`car-svg-icon${
              !specClicked && !motoClicked ? "-default" : ""
            }${carClicked ? "-clicked" : "-unchecked"}`}
            onClick={handleCarClick}
          >
            {" "}
            <svg
              width="30"
              height="15"
              viewBox="0 0 30 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19.719 10.973A3.112 3.112 0 1 1 22.831 14a3.067 3.067 0 0 1-3.112-3.027Zm2.171 0a.94.94 0 1 0 .941-.913.93.93 0 0 0-.94.913h-.001Zm-17.628 0a3.068 3.068 0 0 1 3.113-3.024 3.027 3.027 0 1 1 0 6.051 3.068 3.068 0 0 1-3.112-3.027h-.001Zm2.172 0a.94.94 0 1 0 .941-.913.93.93 0 0 0-.94.913h-.001Zm20.327.376a3.38 3.38 0 0 0 .039-.366 3.846 3.846 0 0 0-7.688 0c.006.123.02.245.039.366h-8.1c.02-.121.032-.243.038-.366a3.786 3.786 0 0 0-3.846-3.722A3.785 3.785 0 0 0 3.4 10.982c.006.123.019.245.038.366H.509A.499.499 0 0 1 0 10.855V8.942a.394.394 0 0 1 .4-.387V7.111a1.46 1.46 0 0 1 1.132-1.406l5.184-1.252 3.852-3A6.949 6.949 0 0 1 14.831 0h6.907c.438-.001.862.156 1.192.444l3.4 2.965 1.093-.058a1.484 1.484 0 0 1 1.567 1.27l.5 3.937a.5.5 0 0 1 .51.493v1.8a.5.5 0 0 1-.51.494l-2.729.004ZM11.448 2.755 9.6 4.191l9.637-.472v-2.17h-4.253a5.752 5.752 0 0 0-3.536 1.206Zm9.394.883 3.182-.156-1.967-1.713a.888.888 0 0 0-.588-.219h-.626l-.001 2.088Z" />
            </svg>
          </button>

          <button
            className={`spec-svg-icon${
              specClicked ? "-clicked" : "-unchecked"
            }`}
            onClick={handleSpecClick}
          >
            {" "}
            <svg
              width="22"
              height="18"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.735 14.27a3.868 3.868 0 0 0-3.868-3.729A3.87 3.87 0 0 0 0 14.271 3.868 3.868 0 0 0 3.868 18a3.87 3.87 0 0 0 3.867-3.73Zm-3.222 0a.644.644 0 1 1-.644-.62.633.633 0 0 1 .643.62h.001ZM22 13.03a5.062 5.062 0 0 0-5.157-4.965 5.065 5.065 0 0 0-5.155 4.964 5.059 5.059 0 0 0 5.155 4.963A5.065 5.065 0 0 0 22 13.03Zm-3.222 0a1.899 1.899 0 0 1-1.935 1.863 1.9 1.9 0 0 1-1.934-1.863 1.899 1.899 0 0 1 1.934-1.86 1.9 1.9 0 0 1 1.935 1.86ZM10.4 14.893V13.03H8.863a4.907 4.907 0 0 1 .122 1.861l1.415.002Zm7.089-1.863a.644.644 0 1 0-.646.621.635.635 0 0 0 .646-.62Zm-6.96-1.24a6.396 6.396 0 0 1 6.314-4.964 6.61 6.61 0 0 1 4.1 1.418l.821-.957a7.972 7.972 0 0 0-9.194-.461H3.864a2.536 2.536 0 0 0-2.575 2.48v.668a5.276 5.276 0 0 1 2.578-.668 5.202 5.202 0 0 1 4.465 2.483h2.197ZM6.446 5.585V3.723a1.899 1.899 0 0 0-1.934-1.86v1.236a.634.634 0 0 1 .645.62v1.866h1.289Zm5.754 0a9.316 9.316 0 0 1 6.578-1.038V1.24h1.288V0H9.752v1.24h1.122L9.69 5.585h2.51Z" />
            </svg>
          </button>

          <button
            className={`moto-svg-icon${
              motoClicked ? "-clicked" : "-unchecked"
            }`}
            onClick={handleMotoClick}
          >
            {" "}
            <svg
              width="23"
              height="17"
              viewBox="0 0 23 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M6.448 12.665a3.362 3.362 0 0 0-.759-2.119l.871-1.071a4.611 4.611 0 0 1 1.094 2.066c.082.369.123.745.124 1.123a.656.656 0 0 0 .644.666h6.08a3.875 3.875 0 0 0 3.633 2.669 3.941 3.941 0 0 0 3.867-4 3.94 3.94 0 0 0-3.867-4 3.94 3.94 0 0 0-3.869 4h-1.331a5.436 5.436 0 0 1 .88-2.96 4.081 4.081 0 0 0-3.03-2.323.647.647 0 0 1-.438-.289L8.878 4.151a3.22 3.22 0 0 0-1.314-1.169c0 .005-.009.007-.015.013A3.1 3.1 0 0 0 6.49 2.68V1.391c.185-.031.372-.05.559-.058h.729a.667.667 0 0 0 0-1.333h-.729a5.871 5.871 0 0 0-5.715 5.921 2.14 2.14 0 0 0 .579 1.526 1.811 1.811 0 0 0 1.309.552c.366 0 .73.04 1.088.12.44.105.861.281 1.246.521l-.871 1.071a3.1 3.1 0 0 0-1.459-.379 3.284 3.284 0 0 0-3.224 3.333 3.225 3.225 0 1 0 6.446 0Zm-1.29 0a1.934 1.934 0 1 1-3.866 0 1.969 1.969 0 0 1 1.934-2c.215.003.428.042.63.117l-1.134 1.466a.682.682 0 0 0 .1.938.633.633 0 0 0 .907-.1l1.133-1.471c.192.316.295.68.295 1.05h.001Zm15.554-.666a2.627 2.627 0 0 1-2.577 2.667 2.556 2.556 0 0 1-2.222-1.334h1.576a1.97 1.97 0 0 0 1.934-2 .644.644 0 1 0-1.289 0 .657.657 0 0 1-.645.667h-1.933a2.627 2.627 0 0 1 2.579-2.667 2.627 2.627 0 0 1 2.577 2.667Zm-1.933-5.335a3.283 3.283 0 0 0 3.223-3.331.655.655 0 0 0-.647-.668h-2.828l-4.136 2.542a9.743 9.743 0 0 1-1.7.814 5.43 5.43 0 0 1 2.015 1.93c0 .011 0 .022.01.033a5.32 5.32 0 0 1 4.063-1.32Zm-5.049-2.6 1.029-.641a4.482 4.482 0 0 0-3.757-2.091 4.356 4.356 0 0 0-2.392.739c.535.348.992.804 1.342 1.338l1.1 1.715a8.469 8.469 0 0 0 2.678-1.061v.001Z" />
            </svg>
          </button>
        </div>
        <div className="sale-component side-component">
          <p>Deal type</p>
          <div className="dropdown">
            {" "}
            <SaleRentDropdown
              options={["For sale", "For rent"]}
              saleSelectedOption={saleSelectedOption}
              setSaleSelectedOption={setSaleSelectedOption}
            />
          </div>
        </div>
        <div className="side-component">
          <p>Manufacturer</p>
          <div className="dropdown">
            {" "}
            <ManDropdown
              options={filteredManOptions}
              manSelectedOptions={manSelectedOptions}
              setManSelectedOptions={setManSelectedOptions}
              modelSelectedOptions={modelSelectedOptions}
              setModSelectedOptions={setModSelectedOptions}
              isManCloseButtonSelected={isManCloseButtonSelected}
              setManIsCloseButtonSelected={setManIsCloseButtonSelected}
              setModIsCloseButtonSelected={setModIsCloseButtonSelected}
            />{" "}
          </div>
        </div>

        <div className="side-component">
          <p>Model</p>
          <div className="dropdown">
            {" "}
            <ModelDropdown
              allOptions={pairManModel}
              manSelectedOptions={manSelectedOptions}
              setManSelectedOptions={setManSelectedOptions}
              modelSelectedOptions={modelSelectedOptions}
              setModSelectedOptions={setModSelectedOptions}
              setManIsCloseButtonSelected={setManIsCloseButtonSelected}
              setModIsCloseButtonSelected={setModIsCloseButtonSelected}
              isModCloseButtonSelected={isModCloseButtonSelected}
            />{" "}
          </div>
        </div>
        <div className="cat-component side-component">
          <p>Category</p>
          <div className="dropdown">
            {" "}
            <CatDropdown
              options={filteredCatOptions}
              catSelectedOptions={catSelectedOptions}
              setCatSelectedOptions={setCatSelectedOptions}
              isCategCloseButtonSelected={isCategCloseButtonSelected}
              setIsCategCloseButtonSelected={setIsCategCloseButtonSelected}
            />
          </div>
        </div>
        <span className="pop-line"></span>
        <div className="currency-side-component">
          <CurrencyChange
            currencies={currencies}
            selectedCurrencyIndex={selectedCurrencyIndex}
            setSelectedCurrencyIndex={setSelectedCurrencyIndex}
          />
        </div>
        <div className="search-button-div">
          <button>Search {filteredProducts.length}</button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
