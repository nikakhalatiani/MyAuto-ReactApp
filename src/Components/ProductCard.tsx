import { useState, useEffect } from "react";
import "./ProductCard.css";
import Carousel from "./Carousel";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";

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

interface ProductCardProps {
  products: ProductOption[];
  mans: ManOption[];
  selectedCurrencyIndex: number;
  setSelectedCurrencyIndex: (selectedCurrencyIndex: number) => void;
  setLoading: (loading: boolean) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
  products,
  mans,
  setLoading,
  selectedCurrencyIndex,
  setSelectedCurrencyIndex,
}) => {
  const [modelList, setModelList] = useState<Array<[number, string]>>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 5;
  const totalPages = Math.ceil(products.length / productsPerPage);

  useEffect(() => {
    const fetchData = async () => {
      const updatedModelList: Array<[number, string]> = [];

      for (const product of products) {
        const modelName = await getModelName(product.man_id, product.model_id);
        updatedModelList.push([product.model_id, modelName]);
      }

      setModelList(updatedModelList);
    };

    fetchData();
  }, [products]);

  const handleCurrencyToggle = () => {
    setSelectedCurrencyIndex(selectedCurrencyIndex === 0 ? 1 : 0);
  };

  function mapFuelType(fuelTypeId: number): string {
    switch (fuelTypeId) {
      case 8:
        return "CNG";
      case 6:
        return "Hybrid";
      case 7:
        return "Electronic";
      case 3:
        return "Diesel";
      case 2:
        return "Petrol";
      default:
        return "Unknown";
    }
  }

  function mapGearType(gearTypeId: number): string {
    switch (gearTypeId) {
      case 2:
        return "Automatic";
      case 3:
        return "Tiptronic";
      case 1:
        return "Manual";
      case 4:
        return "Variator";
      default:
        return "Unknown";
    }
  }

  function getManName(man_id: string): string {
    const foundMan = mans.find((man) => man.man_id === man_id);
    return foundMan ? foundMan.man_name : "";
  }

  function toTitleCase(input: string): string {
    return input
      .toLowerCase()
      .split(" ")
      .map(function (word) {
        return word?.replace(word[0], word[0]?.toUpperCase());
      })
      .join(" ");
  }

  const modelCache: Record<number, ModelOption[]> = {};

  async function getModelName(
    man_id: number,
    model_id: number
  ): Promise<string> {
    if (modelCache[man_id]) {
      const foundModel = modelCache[man_id].find(
        (model) => model.model_id === model_id
      );
      if (foundModel) {
        console.log("Cache hit", foundModel.model_name);
        return foundModel.model_name;
      }
    }

    const url = `https://api2.myauto.ge/ka/getManModels?man_id=${man_id}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      const foundModel = data.data.find(
        (model: ModelOption) => model.model_id === model_id
      );
      if (foundModel) {
        if (!modelCache[man_id]) {
          modelCache[man_id] = [foundModel];
        } else {
          modelCache[man_id].push(foundModel);
        }
        return foundModel.model_name;
      }
    } catch (error) {
      console.error("Error:", error);
    }

    return "";
  }

  function mapDoorType(doorTypeId: number): string {
    return doorTypeId % 2 === 0 ? "Left" : "Right";
  }

  function getTimeDifference(orderDate: string) {
    const currentDate: Date = new Date();
    const orderDateObj: Date = new Date(orderDate);

    const differenceInMilliseconds: number =
      currentDate.getTime() - orderDateObj.getTime();
    const differenceInSeconds: number = Math.floor(
      differenceInMilliseconds / 1000
    );
    const differenceInMinutes: number = Math.floor(differenceInSeconds / 60);
    const differenceInHours: number = Math.floor(differenceInMinutes / 60);
    const differenceInDays: number = Math.floor(differenceInHours / 24);
    const differenceInMonths: number = Math.floor(differenceInDays / 30);
    const differenceInYears: number = Math.floor(differenceInDays / 365);

    return differenceInMinutes < 2
      ? "a minute ago"
      : differenceInMinutes < 60
      ? `${differenceInMinutes} minutes ago`
      : differenceInHours < 2
      ? "an hour ago"
      : differenceInHours < 24
      ? `${differenceInHours} hours ago`
      : differenceInDays < 2
      ? "a day ago"
      : differenceInDays < 30
      ? `${differenceInDays} days ago`
      : differenceInMonths < 2
      ? "a month ago"
      : differenceInMonths < 12
      ? `${differenceInMonths} months ago`
      : differenceInYears < 2
      ? "a year ago"
      : `${differenceInYears} years ago`;
  }
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  //   return modelList.length > 0 ? (
  return (
    <div>
      {currentProducts.map((product) => (
        <div key={product.car_id} className="product-card">
          <div className="card-photo">
            {" "}
            <Carousel
              imageBaseUrl={`https://static.my.ge/myauto/photos/${product.photo}/thumbs/${product.car_id}_{PHOTO_INDEX}.jpg`}
              photo_ver={product.photo_ver}
            />
          </div>

          <div className="card-info">
            <header>
              <div className="long-info">
                {product.for_rent && (
                  <div>
                    {" "}
                    <div className="for-rent-icon">For rent</div>
                  </div>
                )}
                <p>{toTitleCase(getManName(product.man_id.toString()))}</p>
                {(() => {
                  const [modelId, modelName] =
                    [...modelList].find(
                      ([modelId]) => modelId === product.model_id
                    ) || [];
                  return <p key={modelId}>{modelName}</p>;
                })()}
                <p>{product.car_model}</p>
                <p className="years-number">{product.prod_year} y</p>
              </div>

              <div className="short-info">
                {product.customs_passed ? (
                  <div className="customs-check">
                    {" "}
                    <FontAwesomeIcon
                      icon={faCheck}
                      style={{ height: "10px", width: "10px" }}
                    />{" "}
                    <span>Customs-cleared</span>
                  </div>
                ) : (
                  <div className="customs-uncheck">
                    {" "}
                    <FontAwesomeIcon
                      icon={faXmark}
                      style={{ height: "10px", width: "10px" }}
                    />{" "}
                    <span>Customs-uncleared</span>
                  </div>
                )}
              </div>
            </header>
            <div className="product-info">
              <aside className="left">
                <p>
                  <svg
                    width="16"
                    height="12"
                    viewBox="0 0 16 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M5.525 0c-.388 0-.703.35-.703.783 0 .433.315.783.703.783h1.808v1.707H5.686a.662.662 0 0 0-.465.19L4.004 4.665h-.667a.654.654 0 0 0-.658.65v1.23H1.5V5.134a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v4.95c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77V8.086h1.18v1.871c0 .36.294.65.658.65h.667l1.217 1.203c.124.121.29.19.465.19h5.17a.67.67 0 0 0 .395-.13l1.88-1.393a.648.648 0 0 0 .263-.52V8.086H14.5v1.998c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-4.95a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v1.411h-1.106v-1.23a.646.646 0 0 0-.193-.46l-1.41-1.392a.662.662 0 0 0-.465-.19H8.74V1.566h1.807c.389 0 .704-.35.704-.783 0-.432-.315-.783-.704-.783H5.525Zm-.783 5.775 1.217-1.202h5.094l1.025 1.011v4.049L10.637 10.7H5.959L4.742 9.498a.662.662 0 0 0-.465-.19h-.282V5.965h.282a.662.662 0 0 0 .465-.19Z"
                      fill="#9CA2AA"
                    />
                  </svg>
                  {product.engine_volume / 1000}{" "}
                  {mapFuelType(product.fuel_type_id)}
                </p>
                <p>
                  <svg
                    width="12"
                    height="16"
                    viewBox="0 0 12 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x=".6"
                      y="7.6"
                      width="10.8"
                      height="7.8"
                      rx="1.2"
                      stroke="#8C929B"
                      stroke-width="1.2"
                    />
                    <path
                      d="M6 5v5"
                      stroke="#8C929B"
                      stroke-width="1.2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M6 12v1.5"
                      stroke="#8C929B"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <circle
                      cx="6"
                      cy="2.5"
                      r="1.8"
                      stroke="#8C929B"
                      stroke-width="1.4"
                    />
                    <path
                      d="M3 10v3m6-3v3"
                      stroke="#8C929B"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {mapGearType(product.gear_type_id)}
                </p>
              </aside>
              <center>
                <p>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="6.3"
                      stroke="#9CA2AA"
                      stroke-width="1.4"
                    />
                    <circle
                      cx="7"
                      cy="7"
                      r="1.3"
                      stroke="#9CA2AA"
                      stroke-width="1.4"
                    />
                    <path
                      d="M11 7a4 4 0 1 0-8 0"
                      stroke="#9CA2AA"
                      stroke-width="1.4"
                      stroke-linecap="round"
                    />
                    <path
                      d="m8 6 1.5-1.5"
                      stroke="#9CA2AA"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {product.car_run_km} km
                </p>

                <p>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="7"
                      cy="7"
                      r="6.3"
                      stroke="#9CA2AA"
                      stroke-width="1.4"
                    />
                    <circle
                      cx="7"
                      cy="7"
                      r="1.3"
                      stroke="#9CA2AA"
                      stroke-width="1.4"
                    />
                    <path
                      d="m8.5 7 4-1.5M5.214 7 1 6.299M7 8.5V13"
                      stroke="#9CA2AA"
                      stroke-width="1.4"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  {mapDoorType(product.door_type_id)}
                </p>
              </center>
              <aside className="right">
                <p className="product-price">
                  {" "}
                  {selectedCurrencyIndex === 0
                    ? Math.floor(product.price_value).toLocaleString("en-US")
                    : Math.floor(product.price_usd).toLocaleString(
                        "en-US"
                      )}{" "}
                </p>
                <div className="button-box">
                  <button
                    className={`lari-btn ${
                      selectedCurrencyIndex === 0 ? "selected" : ""
                    }`}
                    onClick={handleCurrencyToggle}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="10"
                      height="11"
                      viewBox="0 0 10 11"
                    >
                      <path d="M8.914 11V9.311H5.251a2.938 2.938 0 0 1-1.643-.46 3 3 0 0 1-1.089-1.3 4.608 4.608 0 0 1-.384-1.94 5 5 0 0 1 .343-1.987A2.543 2.543 0 0 1 3.59 2.399v3.372h.894v-3.64a2.492 2.492 0 0 1 .48-.044 2.936 2.936 0 0 1 .5.044v3.64h.894V2.4a2.469 2.469 0 0 1 1.134 1.24 5.547 5.547 0 0 1 .343 2.132H10a6.022 6.022 0 0 0-.439-2.324 4.874 4.874 0 0 0-1.263-1.8A4.534 4.534 0 0 0 6.359.629V0h-.894v.472L5.229.465Q5.148.458 4.993.458q-.347 0-.51.015V0h-.894v.631a4.67 4.67 0 0 0-1.891.982A4.823 4.823 0 0 0 .442 3.284 4.872 4.872 0 0 0 0 5.33a5.7 5.7 0 0 0 .229 1.61 4.62 4.62 0 0 0 .672 1.4 3.294 3.294 0 0 0 1.056.968v.058H.546V11Z" />
                    </svg>
                  </button>
                  <button
                    className={`dollar-btn ${
                      selectedCurrencyIndex === 1 ? "selected" : ""
                    }`}
                    onClick={handleCurrencyToggle}
                  >
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="9"
                      height="14"
                      viewBox="0 0 9 14"
                    >
                      <path
                        data-name="$"
                        d="M2.518 8.564H.544a3.8 3.8 0 0 0 1.022 2.506 3.783 3.783 0 0 0 2.45.966v1.19h.828v-1.19a4.359 4.359 0 0 0 1.72-.424 3.707 3.707 0 0 0 1.071-.8 2.62 2.62 0 0 0 .553-.917 2.6 2.6 0 0 0 .156-.771 7.425 7.425 0 0 0-.049-.8 2.226 2.226 0 0 0-.315-.9 3.024 3.024 0 0 0-.826-.861 4.839 4.839 0 0 0-1.6-.693q-.2-.056-.371-.1l-.339-.076V3.212a1.033 1.033 0 0 1 .81.4 1.472 1.472 0 0 1 .35.952h1.988a3.209 3.209 0 0 0-.308-1.26 2.783 2.783 0 0 0-.686-.892 3.178 3.178 0 0 0-.973-.56 5.033 5.033 0 0 0-1.181-.274V.5h-.828v1.078a4.667 4.667 0 0 0-1.218.245 3.291 3.291 0 0 0-1.036.574 2.8 2.8 0 0 0-.718.915 2.782 2.782 0 0 0-.273 1.26 2.569 2.569 0 0 0 .235 1.171 2.325 2.325 0 0 0 .637.784 3.337 3.337 0 0 0 .9.5q.5.189 1.022.329.14.028.259.063t.189.063v2.93a1.955 1.955 0 0 1-1.078-.588 1.72 1.72 0 0 1-.417-1.26Zm2.326 1.848V7.724a3.381 3.381 0 0 1 1.169.5.983.983 0 0 1 .343.819 1.152 1.152 0 0 1-.14.581 1.385 1.385 0 0 1-.357.413 1.641 1.641 0 0 1-.49.259 2.555 2.555 0 0 1-.525.116Zm-.828-7.2v2.282a2.3 2.3 0 0 1-.966-.406.889.889 0 0 1-.294-.714 1.162 1.162 0 0 1 .1-.511 1.048 1.048 0 0 1 .288-.36 1.219 1.219 0 0 1 .406-.217 1.54 1.54 0 0 1 .466-.074Z"
                      />
                    </svg>
                  </button>
                </div>
              </aside>
            </div>
            <footer>
              <div className="views-time">
                <p>{product.views} views</p>
                <p className="dot"> •</p>
                <p>{getTimeDifference(product.order_date)}</p>
              </div>
              <div className="right-icons">
                <svg
                  className="comment"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M4.917 7a.75.75 0 0 1 .75-.75h4.666a.75.75 0 0 1 0 1.5H5.667a.75.75 0 0 1-.75-.75Z"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M1.72 2.006C2.463 1.264 3.496.87 4.667.87h6.666c1.17 0 2.204.394 2.947 1.136.743.743 1.137 1.777 1.137 2.947v4c0 1.17-.394 2.205-1.137 2.947-.58.58-1.336.947-2.197 1.08v.727c0 1.136-1.263 1.8-2.198 1.178m-.001 0-2.777-1.848h-2.44c-1.17 0-2.204-.394-2.947-1.137C.977 11.158.583 10.124.583 8.953v-4c0-1.17.394-2.204 1.137-2.947m1.06 1.061c-.423.424-.697 1.057-.697 1.886v4c0 .83.273 1.463.697 1.887.424.424 1.057.697 1.887.697h2.666a.75.75 0 0 1 .416.125l2.834 1.886v-1.261a.75.75 0 0 1 .75-.75c.83 0 1.463-.274 1.887-.697.423-.424.697-1.057.697-1.887v-4c0-.83-.274-1.462-.697-1.886-.424-.424-1.057-.697-1.887-.697H4.667c-.83 0-1.463.273-1.887.697Z"
                  />
                </svg>
                <svg
                  className="eye"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M15.197 1.864a.75.75 0 1 0-1.06-1.061l-2.18 2.179C10.764 2.182 9.41 1.737 8 1.737c-2.671 0-5.078 1.575-6.706 4.133C.9 6.49.727 7.27.727 8.003c0 .734.172 1.514.567 2.133V5.87v4.267c.464.728.994 1.379 1.573 1.935L.803 14.136a.75.75 0 0 0 1.06 1.061l4.98-4.98.009-.008 3.357-3.357.008-.008 4.98-4.98ZM9.623 5.316l1.249-1.248C9.969 3.52 8.992 3.237 8 3.237c-2.035 0-4.015 1.197-5.44 3.439h-.001c-.205.321-.332.801-.332 1.327 0 .526.127 1.006.332 1.327.41.644.874 1.209 1.37 1.681l1.387-1.388a3.134 3.134 0 0 1 4.307-4.307ZM6.363 8A1.634 1.634 0 0 1 8.5 6.44L6.44 8.5a1.632 1.632 0 0 1-.078-.5Zm6.534-3.298a.75.75 0 0 1 1.054.115c.26.323.517.672.755 1.047.395.62.568 1.399.568 2.133s-.173 1.513-.568 2.133c-1.628 2.558-4.034 4.133-6.706 4.133a6.892 6.892 0 0 1-2.678-.552.75.75 0 1 1 .583-1.382A5.394 5.394 0 0 0 8 12.763c2.035 0 4.015-1.198 5.44-3.439h.001c.205-.321.332-.802.332-1.327 0-.526-.127-1.006-.332-1.327a10.065 10.065 0 0 0-.659-.912.75.75 0 0 1 .115-1.055Zm-1.82 3.9a.75.75 0 1 0-1.475-.271 1.627 1.627 0 0 1-1.278 1.278.75.75 0 1 0 .272 1.475 3.126 3.126 0 0 0 2.481-2.481Z"
                  />
                </svg>
                <svg
                  className="heart"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M8.686 2.168a4.292 4.292 0 0 0-.495.421l-.128.132L8 2.79l-.063-.07-.128-.13a4.292 4.292 0 0 0-.495-.422A3.373 3.373 0 0 0 5.3 1.5C2.585 1.5 1 3.877 1 6.304c0 2.375 1.191 4.437 3.137 6.096C5.505 13.567 7.295 14.5 8 14.5c.705 0 2.495-.933 3.863-2.1C13.81 10.74 15 8.68 15 6.304 15 3.877 13.415 1.5 10.7 1.5a3.37 3.37 0 0 0-2.014.668Zm-2.01 1.55C6.238 3.292 5.79 3.1 5.3 3.1c-1.549 0-2.7 1.348-2.7 3.204 0 1.784.881 3.434 2.575 4.879a11.28 11.28 0 0 0 1.899 1.295c.306.164.568.283.768.356.07.026.122.042.158.052.036-.01.088-.026.158-.052.2-.073.463-.192.769-.356a11.21 11.21 0 0 0 1.898-1.295C12.519 9.738 13.4 8.088 13.4 6.304c0-1.856-1.151-3.204-2.7-3.204-.49 0-.939.191-1.375.619l-.097.099L8 5.17 6.772 3.818l-.097-.1Z"
                  />
                </svg>
              </div>
            </footer>
          </div>
        </div>
      ))}

      <div className="pagination-bar">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => {
              handlePageChange(index + 1);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );

  //   : (
  //     <></>
  //   );
};

export default ProductCard;
