import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./FilterDropdown.css";

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

interface OrderingOption {
  value: string;
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
    (option) => option.label !== sortSelectedOption?.label
  );

  return (
    <div className="filter-dropdown-container" ref={filterDropdownRef}>
      {" "}
      <div
        className={`filter-container ${isOpen ? "open" : ""}`}
        onClick={toggleFilterDropdown}
      >
        <span className="period-choice">
          {sortSelectedOption.label}
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
