import './App.css';
import Loading from "./Loading/Loading";
import { useState, useEffect } from "react";

const mans_list = "https://static.my.ge/myauto/js/mans.json";

function App() {
  const [loading, setLoading] = useState(true);

  async function fetchMans() {
    setLoading(true);
    try {
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

  return (
    <h2>hello world</h2>
  );
}

export default App;
