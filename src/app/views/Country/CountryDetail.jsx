import { useEffect } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { observer } from "mobx-react";
import { useStore } from "app/stores";

import CountryForm from "./component/CountryForm";

const CountryDetail =  observer( () => {
  const { countryId } = useParams();
  const { countryStore } = useStore();

  console.log(countryStore.selectedCountry);

  useEffect(() => {
    countryStore.getCountryById(countryId);
  }, []);

  return (
    <CountryForm
      action="viewDetail"
      country={countryStore.selectedCountry}
    />
  );
});

export default CountryDetail;
