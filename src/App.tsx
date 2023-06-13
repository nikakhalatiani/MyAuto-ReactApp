import "./App.css";
import Loading from "./Loading/Loading";
import PeriodDropdown from "./Components/PeriodDropdown";
import FilterDropdown from "./Components/FilterDropdown";
import Header from "./Components/Header";
import Sidebar from "./Components/SideBar";
import Main from "./Components/Main";

import { useState, useEffect } from "react";

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
    const [filteredProducts, setFilteredProducts] =
    useState<ProductOption[]>(prod_options);
  const [pairManModel, setPairManModel] = useState<GroupedModelOption[]>([]);
  const [selectedCurrencyIndex, setSelectedCurrencyIndex] = useState(0);

  const fetchProducts = async (page: number) => {
    const prod_api = `https://api2.myauto.ge/en/products/?Page=${page}`;
    const prod_response = await fetch(prod_api);
    const prodsData = await prod_response.json();
    const prodsItems = prodsData.data.items;
    return prodsItems;
  };

  async function fetchData() {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate slow network by waiting 3 seconds
      const mans_response = await fetch(mans_api);
      const mans: ManOption[] = await mans_response.json();
      const cat_response = await fetch(cats_api);
      const cats = await cat_response.json();
      // const prod_response = await fetch(prod_api);
      // const prods = await prod_response.json();

      const allProds = [];
      for (let page = 1; page <= 3; page++) {
        const prodsItems = await fetchProducts(page);
        allProds.push(...prodsItems);
      }
      setProds(allProds);

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
      // setProds(prods["data"]["items"]);
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

  interface PeriodOption {
    value: string;
    label: string;
  }

  interface OrderingOption {
    value: number;
    label: string;
  }

  const periods: PeriodOption[] = [
    { value: "1h", label: "1 hour" },
    { value: "2h", label: "2 hours" },
    { value: "3h", label: "3 hours" },
    { value: "1d", label: "1 day" },
    { value: "2d", label: "2 days" },
    { value: "3d", label: "3 days" },
    { value: "1w", label: "1 week" },
    { value: "2w", label: "2 weeks" },
    { value: "3w", label: "3 weeks" },
  ];

  const ordering_type: OrderingOption[] = [
    { value: 1, label: "order by date desc" },
    { value: 2, label: "order by date asc" },
    { value: 3, label: "Price descending" },
    { value: 4, label: "Price ascending" },
    { value: 5, label: "Mileage descending" },
    { value: 6, label: "Mileage ascending" },
  ];

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
      <div className="main-container">
        {" "}
        <div className="left-container">
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
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
        <div className="right-container">
          {" "}
          <Main
            pairManModel={pairManModel}
            prod_options={prod_options}
            mans_options={mans_options}
            setSelectedCurrencyIndex={setSelectedCurrencyIndex}
            selectedCurrencyIndex={selectedCurrencyIndex}
            periods={periods}
            ordering_type={ordering_type}
            filteredProducts={filteredProducts}
            setFilteredProducts={setFilteredProducts}
          />
        </div>
      </div>
    </>
  );
}

export default App;
