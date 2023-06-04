import './App.css';
import Loading from "./Loading/Loading";
import SearchDrop from "./Components/SearchDropdown";
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

  const options = [
    { value: 'option1', label: 'Jeep' },
    { value: 'option2', label: 'Benzo' },
    { value: 'option3', label: 'Optio'},
    { value: 'option4', label: 'Baza'},
    { value: 'option5', label: 'Caza'},
    { value: 'option6', label: 'Daza'},
    { value: 'option7', label: 'Eaza'},
    { value: 'option8', label: 'Faza'},
    { value: 'option9', label: 'yaza'},
    { value: 'option10', label: 'zaza'},


    

  ];

  return (
    <SearchDrop options={options}/>
  );
}

export default App;
