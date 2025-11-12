import { useHistory } from "react-router-dom/cjs/react-router-dom.min"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

import CountryForm from "./CountryForm"
import { createCountry } from "./CountryService"
const CountryAdd = () => {
  const { t } = useTranslation();

  const history = useHistory();
  const handleSubmit = async (country) => {
    try {
      const response = await createCountry(country);
      console.log("Country created successfully:", response.data);
      history.push("/category/country");
      toast.success(`${t("toast.add_success")}`);
    } catch (error) {
      console.error("Failed to create country", error);
    }
  }
  return (
      <CountryForm 
        action="add"
        handleCreate={handleSubmit}
      />
  )
}

export default CountryAdd