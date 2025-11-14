import { useEffect } from "react";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import { observer } from "mobx-react";
import { useStore } from "app/stores";
import { toast } from "react-toastify";

import CountryForm from "./component/CountryForm";

const CountryEdit = observer(() => {
  const history = useHistory();

  const { countryId } = useParams();

  const { countryStore } = useStore();

  const { t } = useTranslation();

  useEffect(() => {
    countryStore.getCountryById(countryId);
  }, []);

  const handleEditCountry = async (updatedCountry) => {
    updatedCountry.id = countryId;
    await countryStore.editCountry(updatedCountry);
    toast.success(`${t("toast.update_success")}`);
    history.push("/category/country");  
  };

  return (
    <CountryForm
      handleEditCountry={handleEditCountry}
      action="edit"
      country={countryStore.selectedCountry}
    />
  );
});

export default CountryEdit;
