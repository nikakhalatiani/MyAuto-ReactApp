import "./App.css";
import Loading from "./Loading/Loading";
import PeriodDropdown from "./Components/PeriodDropdown";
import FilterDropdown from "./Components/FilterDropdown";
import Header from "./Components/Header";
import Sidebar from "./Components/SideBar";
import Carousel from "./Components/Carousel";
import ProductCard from "./Components/ProductCard";

import { useState, useEffect } from "react";
import CategDropdown from "./Components/CategDropdown";

const mans_api = "https://static.my.ge/myauto/js/mans.json";
const cats_api = "https://api2.myauto.ge/en/cats/get";
const prod_api = "https://api2.myauto.ge/en/products/";

function App() {
  const [loading, setLoading] = useState(true);
  const [mans_options, setMans] = useState<ManOption[]>([]);
  const [cats_options, setCats] = useState<CategOption[]>([]);
  const [prod_options, setProds] = useState<ProductOption[]>([]);
  const [manSelectedOptions, setManSelectedOptions] = useState<ManOption[]>([]);
  const [modelSelectedOptions, setModSelectedOptions] = useState<ModelOption[]>(
    []
  );
  const [pairManModel, setPairManModel] = useState<GroupedModelOption[]>([]);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);


  async function fetchData() {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate slow network by waiting 3 seconds
      const mans_response = await fetch(mans_api);
      const mans: ManOption[] = await mans_response.json();
      const cat_response = await fetch(cats_api);
      const cats = await cat_response.json();
      const prod_response = await fetch(prod_api);
      const prods = await prod_response.json();

      ////! This part of code was commented and replaced with the code below it since filtering takes too long
      // // Fetch model options for each man_option and filter out empty data arrays
      // const optionsPromises = mans.map(async (man: ManOption) => {
      //   const url = `https://api2.myauto.ge/ka/getManModels?man_id=${man.man_id}`;
      //   return fetch(url)
      //     .then((response) => response.json())
      //     .then((data) => ({ man_name: man.man_name, options: data.data }));
      // });
      // const options: GroupedModelOption[] = await Promise.all(optionsPromises);

      // // Filter out man_options with empty data arrays
      // const filteredMans = options.filter(
      //   (option) => option.options.length > 0
      // );

      // const filteredMansSet = new Set(
      //   filteredMans.map((option) => option.man_name)
      // );
      // const filteredMansArray = mans.filter((man: ManOption) =>
      //   filteredMansSet.has(man.man_name)
      // );
      // setPairManModel(filteredMans);

      ////! You can use this instead of the above commented code (for demo purposes)
      const filteredMansArray = mans.filter(
        (man) => !["144", "184", "134", "454"].includes(man.man_id)
      );

      setMans(filteredMansArray);
      setCats(cats["data"]);
      setProds(prods["data"]["items"]);
      setLoading(false);
    } catch (error) {
      setLoading(true);
      console.log("Failed to fetch Manufacturers");
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
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

  // const periods = [
  //   { value: "option1", label: "1 hour" },
  //   { value: "option2", label: "2 hours" },
  //   { value: "option3", label: "3 hours" },
  //   { value: "option4", label: "1 day" },
  //   { value: "option5", label: "2 days" },
  //   { value: "option6", label: "3 days" },
  //   { value: "option7", label: "1 week" },
  //   { value: "option8", label: "2 weeks" },
  //   { value: "option9", label: "3 weeks" },
  // ];

  // const order_types = [
  //   { value: "option1", label: "order by date desc" },
  //   { value: "option2", label: "order by date asc" },
  //   { value: "option3", label: "Price descending" },
  //   { value: "option4", label: "Price ascending" },
  //   { value: "option5", label: "Mileage descending" },
  //   { value: "option6", label: "Mileage ascending" },
  // ];

  // const handlePeriodChange = (selectedPeriod: string) => {
  //   // Handle the selected period change here
  //   console.log("Selected period:", selectedPeriod);
  // };

  // const handleFilterChange = (selectedFilter: string) => {
  //   // Handle the selected period change here
  //   console.log("Selected period:", selectedFilter);
  // };

  return (
    <>
      <Header />
      <Sidebar
        pairManModel={pairManModel}
        manOptions={mans_options}
        catOptions={cats_options}
        currencies={["GEL", "USD"]}
        manSelectedOptions={manSelectedOptions}
        setManSelectedOptions={setManSelectedOptions}
        modelSelectedOptions={modelSelectedOptions}
        setModSelectedOptions={setModSelectedOptions}
        setSelectedCurrencyIndex={setSelectedCurrencyIndex}
        selectedCurrencyIndex={selectedCurrencyIndex}
      />
      <ProductCard products={prod_options} 
      mans={mans_options}
      setSelectedCurrencyIndex={setSelectedCurrencyIndex}
      selectedCurrencyIndex={selectedCurrencyIndex}
      setLoading={setLoading}
      />
    
    </>
  );
}

export default App;
