import "./App.css";
import Loading from "./Loading/Loading";
import PeriodDropdown from "./Components/PeriodDropdown";
import FilterDropdown from "./Components/FilterDropdown";
import Header from "./Components/Header";
// import CatDropdown from "./Components/CategDropdown";
// import ManDropdown from "./Components/ManDropdown";
// import SaleRentDropdown from "./Components/SaleRentDropdown";
// import CurrencyChange from "./Components/CurrencyChange";
import Sidebar from "./Components/SideBar";
import Carousel from "./Components/Carousel";

import { useState, useEffect } from "react";

const mans_api = "https://static.my.ge/myauto/js/mans.json";
const cats_api = "https://api2.myauto.ge/en/cats/get";

function App() {
  const [loading, setLoading] = useState(true);
  const [mans_options, setMans] = useState([]);
  const [cats_options, setCats] = useState([]);

  // async function fetchMans() {
  //   setLoading(true);
  //   try {
  //     // await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate slow network by waiting 3 seconds
  //     const response = await fetch(mans_api);
  //     const mans = await response.json();
  //     setMans(mans);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(true);
  //     console.log("Failed to fetch Manufacturers");
  //   }
  // }
  // async function fetchCats() {
  //   setLoading(true);
  //   try {
  //     // await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate slow network by waiting 3 seconds
  //     const response = await fetch(cats_api);
  //     const cats = await response.json();
  //     setCats(cats);
  //     setLoading(false);
  //   } catch (error) {
  //     setLoading(true);
  //     console.log("Failed to fetch Categories");
  //   }
  // }

  // useEffect(() => {
  //   fetchMans();
  //   fetchCats();
  // }, []);

  async function fetchData() {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate slow network by waiting 3 seconds
      const mans_response = await fetch(mans_api);
      const mans = await mans_response.json();
      const cats_response = await fetch(cats_api);
      const cats = await cats_response.json();
      setMans(mans);
      setCats(cats["data"]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error");
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


  const periods = [
    { value: "option1", label: "1 hour" },
    { value: "option2", label: "2 hours" },
    { value: "option3", label: "3 hours" },
    { value: "option4", label: "1 day" },
    { value: "option5", label: "2 days" },
    { value: "option6", label: "3 days" },
    { value: "option7", label: "1 week" },
    { value: "option8", label: "2 weeks" },
    { value: "option9", label: "3 weeks" },
  ];

  const order_types = [
    { value: "option1", label: "order by date desc" },
    { value: "option2", label: "order by date asc" },
    { value: "option3", label: "Price descending" },
    { value: "option4", label: "Price ascending" },
    { value: "option5", label: "Mileage descending" },
    { value: "option6", label: "Mileage ascending" },
  ];

  const currencies = ["GEL", "USD"];

  const handlePeriodChange = (selectedPeriod: string) => {
    // Handle the selected period change here
    console.log("Selected period:", selectedPeriod);
  };

  const handleFilterChange = (selectedFilter: string) => {
    // Handle the selected period change here
    console.log("Selected period:", selectedFilter);
  };

  const cats_options_test = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option6", label: "Daza" },
    { value: "option7", label: "Eaza" },
    { value: "option8", label: "Faza" },
    { value: "option9", label: "yaza" },
    { value: "option10", label: "zaza" },
    { value: "option11", label: "xaza" },
    { value: "option12", label: "caza" },
    { value: "option13", label: "vaza" },
    { value: "option14", label: "baza" },
    { value: "option15", label: "naza" },
    { value: "option16", label: "maza" },
    { value: "option17", label: "laza" },
    { value: "option18", label: "kaza" },
    { value: "option19", label: "jaza" },
  ];

  return (
    <>
      <Header />
{/* 
      <Sidebar
        manOptions={mans_options}
        catOptions={cats_options}
        currencies={currencies}
      /> */}
      <Carousel imageBaseUrl={`https://static.my.ge/myauto/photos/5\/5\/3\/5\/7/thumbs/92753554_{PHOTO_INDEX}.jpg`} car_id={92753554} product_photo= "\5\/5\/3\/5\/7" photo_ver={1} />
      {/* https://static.my.ge/myauto/photos/{product.photo}/thumbs/{product.product_id}_1.jpg?v={product.phot
o_ver}
 */}
      {/* <Carousel /> */}

      {/* 
      <PeriodDropdown options={periods} />
      <FilterDropdown options={order_types} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} /> */}
    </>
  );
}

export default App;
