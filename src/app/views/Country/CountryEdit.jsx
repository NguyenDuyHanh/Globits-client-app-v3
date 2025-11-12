import { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"


import CountryForm from './CountryForm'
import { getCountry, editCountry } from './CountryService'

const CountryEdit = () => {
  const history = useHistory();

  const [country, setCountry] = useState({});

  const { countryId } = useParams();

  const { t } = useTranslation();

  useEffect(() => {
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

  const handleSubmit = async (updatedCountry) => {
    try {
      updatedCountry.id = countryId;
      await editCountry(updatedCountry);
      history.push("/category/country");
      toast.success(`${t("toast.update_success")}`);
    } catch (error) {
      console.error("Failed to update country", error);
    }
  };

  return (
    <CountryForm 
      handleEdit={handleSubmit} 
      action="edit" 
      country={country}
    />
  )
}

export default CountryEdit