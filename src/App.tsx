import "./App.css";
import Loading from "./Loading/Loading";
import PeriodDropdown from "./Components/PeriodDropdown";
import FilterDropdown from "./Components/FilterDropdown";
import Header from "./Components/Header";
// import CatDropdown from "./Components/CategDropdown";
import ManDropdown from "./Components/ManDropdown";
import ModelDropdown from "./Components/ModelDropdown";
// import SaleRentDropdown from "./Components/SaleRentDropdown";
// import CurrencyChange from "./Components/CurrencyChange";
import Sidebar from "./Components/SideBar";
import Carousel from "./Components/Carousel";

import { useState, useEffect } from "react";
import CategDropdown from "./Components/CategDropdown";

const mans_api = "https://static.my.ge/myauto/js/mans.json";
const cats_api = "https://api2.myauto.ge/en/cats/get";

function App() {
  const [loading, setLoading] = useState(true);
  const [mans_options, setMans] = useState<ManOption[]>([]);
  const [cats_options, setCats] = useState([]);
  const [manSelectedOptions, setManSelectedOptions] = useState<ManOption[]>([]);
  const [modelSelectedOptions, setModSelectedOptions] = useState<ModelOption[]>(
    []
  );
  const [pairManModel, setPairManModel] = useState<GroupedModelOption[]>([]);

  async function fetchData() {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate slow network by waiting 3 seconds
      const mans_response = await fetch(mans_api);
      const mans: ManOption[] = await mans_response.json();
      const response = await fetch(cats_api);
      const cats = await response.json();

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
      />
      {/* <Carousel
        imageBaseUrl={`https://static.my.ge/myauto/photos/5\/5\/3\/5\/7/thumbs/92753554_{PHOTO_INDEX}.jpg`}
        car_id={92753554}
        product_photo="\5\/5\/3\/5\/7"
        photo_ver={1}
      /> */}
    </>
  );
}

export default App;
