import PeriodDropdown from "././PeriodDropdown";
import ProductCard from "./ProductCard";
import FilterDropdown from "./FilterDropdown";
import FiltersContainer from "./FiltersContainer";
import "./Main.css";
import { useContext } from "react";
import { AppContext } from "../../Contexts/AppContext";

const Main: React.FC = () => {
  const { filters, prod_options, prodsLoading } = useContext(AppContext);
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
          <PeriodDropdown />
          <FilterDropdown />
        </div>
      </div>
      {filters.length !== 0 && <FiltersContainer />}

      <ProductCard />
    </div>
  );
};

export default Main;
