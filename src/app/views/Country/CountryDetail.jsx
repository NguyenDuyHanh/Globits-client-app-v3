import { useState, useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import { getCountry } from "./CountryService";
import CountryForm from "./CountryForm";

const CountryDetail = () => {
  const [country, setCountry] = useState({});
  const { countryId } = useParams();

  useEffect(() => {
    if (!countryId) {
      console.error("No countryId provided in route parameters");
      return;
    }
    const fetchCountry = async () => {
      try {
        const response = await getCountry(countryId);
        setCountry(response.data);
      } catch (error) {
        console.error("Failed to fetch country details", error);
      }
    };
    fetchCountry();
  }, []);

  return (
    <CountryForm
      action="viewDetail"
      country={country}
    />
  );
};

export default CountryDetail;
