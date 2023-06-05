import "./App.css";
import Loading from "./Loading/Loading";
import CatDropdown from "./Components/CategDropdown";
import CurrencyChange from "./Components/CurrencyChange";
import PeriodDropdown from "./Components/PeriodDropdown";
import FilterDropdown from "./Components/FilterDropdown";
import Header from "./Components/Header";
import ManDropdown from "./Components/ManDropdown";
import SaleRentDropdown from "./Components/SaleRentDropdown";

import { useState, useEffect } from "react";

const mans_list = "https://static.my.ge/myauto/js/mans.json";

function App() {
  const [loading, setLoading] = useState(true);

  async function fetchMans() {
    setLoading(true);
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000)); // simulate slow network by waiting 3 seconds
      const response = await fetch(mans_list);
      const mans = await response.json();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log("error");
    }
  }

  useEffect(() => {
    fetchMans();
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
    { value: "option2", label: "3 hours" },
    { value: "option3", label: "6 hours" },
    { value: "option4", label: "12 hours" },
    { value: "option5", label: "24 hours" },
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

  const cat_options = [
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

  const man_options = [
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
    { value: "option20", label: "haza" },
    { value: "option21", label: "gaza" },
    { value: "option22", label: "faza" },
    { value: "option23", label: "daza" },
    { value: "option24", label: "caza" },
    { value: "option25", label: "baza" },
    { value: "option26", label: "naza" },
    { value: "option27", label: "maza" },
    { value: "option28", label: "laza" },
    { value: "option29", label: "kaza" },
    { value: "option30", label: "jaza" },
    { value: "option31", label: "haza" },
  ];

  return (
    <>
      <Header />
      <SaleRentDropdown options={["For sale", "For rent"]} />
      <ManDropdown options={man_options} />

      <CatDropdown options={cat_options} />
      <PeriodDropdown options={periods} />
      <FilterDropdown options={order_types} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
      <CurrencyChange currencies={currencies} />
    </>
  );
}

export default App;
