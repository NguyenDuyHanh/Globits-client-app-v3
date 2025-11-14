import { useStore } from "app/stores"
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

import CountryForm from "./component/CountryForm";

const CountryAdd = () => {
  const { countryStore } = useStore();

  const { t } = useTranslation();

  const handleCreateCountry = async (values) => {
    await countryStore.createCountry(values);
    toast.success(`${t("toast.add_success")}`);
  }
  
  return (
      <CountryForm 
        action="add"
        handleCreateCountry={handleCreateCountry}
      />
  )
}

export default CountryAdd