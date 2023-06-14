import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import PeriodDropdown from "./PeriodDropdown";
import FilterDropdown from "./FilterDropdown";
import FiltersContainer from "./FiltersContainer";
import "./Main.css";

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

interface ManOption {
  man_id: string;
  man_name: string;
  is_car: string;
  is_spec: string;
  is_moto: string;
}

interface PeriodOption {
  value: string;
  label: string;
}

interface CategOption {
  category_id: number;
  category_type: number;
  has_icon: number;
  title: string;
  seo_title: string;
  vehicle_types: number[];
}

interface OrderingOption {
  value: string;
  label: string;
}

interface PeriodOption {
  value: string;
  label: string;
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

interface GroupedModelOption {
  man_name: string;
  options: ModelOption[];
}

interface FilterOption {
  type: string;
  id: string;
  label: string;
  man_id?: string;
}

type Search = {
  Mans: string;
  Cats: string;
  PriceTo: string;
  PriceFrom: string;
  ForRent: string;
};

interface MainProps {
  pairManModel: GroupedModelOption[];
  prod_options: ProductOption[];
  setProds: (prods: ProductOption[]) => void;
  mans_options: ManOption[];
  selectedCurrencyIndex: number;
  setSelectedCurrencyIndex: (selectedCurrencyIndex: number) => void;
  periods: PeriodOption[];
  ordering_type: OrderingOption[];
  filters: FilterOption[];
  setFilters: (filters: FilterOption[]) => void;
  prod_api: string;
  setProdApi: (prod_api: string) => void;
  prodsLoading: boolean;
  setProdsLoading: (prodsLoading: boolean) => void;
  setSaleSelectedOption: (saleSelectedOption: string) => void;
  perSelectedOption: PeriodOption;
  setPerSelectedOption: (perSelectedOption: PeriodOption) => void;
  sortSelectedOption: OrderingOption;
  setSortSelectedOption: (sortSelectedOption: OrderingOption) => void;
  setSearchButton: (searchButtonArray: Search) => void;
  searchButton: Search;
  setManSelectedOptions: (selectedOptions: ManOption[]) => void;
  manSelectedOptions: ManOption[];
  modelSelectedOptions: ModelOption[];
  catSelectedOptions: CategOption[];
  setCatSelectedOptions: (selectedOptions: CategOption[]) => void;
  setModSelectedOptions: (selectedOptions: ModelOption[]) => void;
  setModIsCloseButtonSelected: (isManCloseButtonSelected: boolean) => void;
  setManIsCloseButtonSelected: (isModCloseButtonSelected: boolean) => void;
  setIsCategCloseButtonSelected: (isCategCloseButtonSelected: boolean) => void;
}

const Main: React.FC<MainProps> = ({
  pairManModel,
  prod_options,
  setProds,
  mans_options,
  setSelectedCurrencyIndex,
  selectedCurrencyIndex,
  periods,
  ordering_type,
  filters,
  setFilters,
  prod_api,
  setProdApi,
  prodsLoading,
  setProdsLoading,
  setSaleSelectedOption,
  perSelectedOption,
  setPerSelectedOption,
  sortSelectedOption,
  setSortSelectedOption,
  setSearchButton,
  searchButton,
  setManSelectedOptions,
  manSelectedOptions,
  modelSelectedOptions,
  setModSelectedOptions,
  catSelectedOptions,
  setCatSelectedOptions,
  setModIsCloseButtonSelected,
  setManIsCloseButtonSelected,
  setIsCategCloseButtonSelected,
}) => {
  return (
    <div className="right-products-container">
      <div className="above-products">
        <div>
          {prodsLoading ? (
            <div className="loading-container">
              <div className="custom-loader"></div> Loading
            </div>
          ) : (
            <p className="count-listing">
              {prod_options.length < 1
                ? "No Listings"
                : prod_options.length === 1
                ? "1 Listing"
                : `${prod_options.length} Listings`}
            </p>
          )}
        </div>
        <div className="right-drops">
          <PeriodDropdown
            periods={periods}
            perSelectedOption={perSelectedOption}
            setPerSelectedOption={setPerSelectedOption}
            setFilters={setFilters}
            filters={filters}
          />
          <FilterDropdown
            ordering_type={ordering_type}
            sortSelectedOption={sortSelectedOption}
            setSortSelectedOption={setSortSelectedOption}
          />
        </div>
      </div>
      {filters.length !== 0 && (
        <FiltersContainer
          filters={filters}
          setFilters={setFilters}
          setSortSelectedOption={setSortSelectedOption}
          setPerSelectedOption={setPerSelectedOption}
          setSearchButton={setSearchButton}
          searchButton={searchButton}
          setManSelectedOptions={setManSelectedOptions}
          manSelectedOptions={manSelectedOptions}
          setModSelectedOptions={setModSelectedOptions}
          modelSelectedOptions={modelSelectedOptions}
          catSelectedOptions={catSelectedOptions}
          setCatSelectedOptions={setCatSelectedOptions}
        />
      )}

      <ProductCard
        pairManModel={pairManModel}
        products={prod_options}
        mans={mans_options}
        setSelectedCurrencyIndex={setSelectedCurrencyIndex}
        selectedCurrencyIndex={selectedCurrencyIndex}
        sortSelectedOption={sortSelectedOption}
        perSelectedOption={perSelectedOption}
        prodsLoading={prodsLoading}
      />
    </div>
  );
};

export default Main;
