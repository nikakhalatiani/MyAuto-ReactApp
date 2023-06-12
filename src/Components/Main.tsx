import { useState } from "react";
import ProductCard from "./ProductCard";
import PeriodDropdown from "./PeriodDropdown";
import FilterDropdown from "./FilterDropdown";
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

interface OrderingOption {
  value: string;
  label: string;
}

type MainProps = {
  prod_options: ProductOption[];
  mans_options: ManOption[];
  selectedCurrencyIndex: number;
  setSelectedCurrencyIndex: (selectedCurrencyIndex: number) => void;
  periods: PeriodOption[];
  ordering_type: OrderingOption[];
};

const Main: React.FC<MainProps> = ({
  prod_options,
  mans_options,
  setSelectedCurrencyIndex,
  selectedCurrencyIndex,
  periods,
  ordering_type,
}) => {
  return (
    <div>
      <div className="above-products">
        <div>
          <p className="count-listing">
            {prod_options.length < 1
              ? "No Listings"
              : prod_options.length === 1
              ? "1 Listing"
              : `${prod_options.length} Listings`}
          </p>{" "}
        </div>
        <div className="right-drops">
          <PeriodDropdown periods={periods} />
          <FilterDropdown ordering_type={ordering_type} />
        </div>
      </div>
      <ProductCard
        products={prod_options}
        mans={mans_options}
        setSelectedCurrencyIndex={setSelectedCurrencyIndex}
        selectedCurrencyIndex={selectedCurrencyIndex}
      />
    </div>
  );
};

export default Main;
