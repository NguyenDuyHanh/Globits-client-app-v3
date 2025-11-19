import { makeObservable, observable, action } from "mobx";

import BasePaginationStore from "app/basePaginationStore";

import {
  pagingCountries,
  getCountry,
  createCountry,
  editCountry,
  deleteCountry,
} from "./CountryService";

export default class CountryStore extends BasePaginationStore {
  countries = [];
  selectedCountry = {};
  keyword = "";

  constructor() {
    super();
    makeObservable(this, {
      countries: observable,
      selectedCountry: observable,
      keyword: observable,
      setCountries: action,
      setSelectedCountry: action,
      reset: action,
      loadCountries: action,
      getCountryById: action,
      createCountry: action,
      editCountry: action,
      deleteCountry: action,
    });
  }

  setSelectedCountry = (country) => {
    this.selectedCountry = country;
  };

  setCountries = (countries) => {
    this.countries = countries;
  };

  reset = () => {
    this.setKeyword("");
    this.setPage(1);
  }

  loadCountries = async () => {
    try {
      const searchObject = {
        pageIndex: this.page,
        pageSize: this.pageSize,
        keyword: this.keyword,
        orderBy: "createDate",
        direction: "desc",
      };
      const response = await pagingCountries(searchObject);
      this.setCountries(response.data.content);
      this.setTotalPages(response.data.totalPages);
      this.setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error("Failed to load countries", error);
    }
  };

  getCountryById = async (countryId) => {
    try {
      const response = await getCountry(countryId);
      this.setSelectedCountry(response.data);
    } catch (error) {
      console.error("Failed to fetch country details", error);
    }
  };

  createCountry = async (country) => {
    try {
      const response = await createCountry(country);
      console.log("Country created successfully:", response.data);
    } catch (error) {
      console.error("Failed to create country", error);
    }
  };

  editCountry = async (country) => {
    try {
      const response = await editCountry(country);
      console.log("Country updated successfully:", response.data);
    } catch (error) {
      console.error("Failed to update country", error);
    }
  };

  deleteCountry = async (countryId) => {
    try {
      await deleteCountry(countryId);
      await this.loadCountries();
    } catch (error) {
      console.error("Failed to delete country", error);
    }
  };

  handleSearch = (searchObject) => {
    this.setKeyword(searchObject.keyword);
    this.setPage(1);
    this.loadCountries();
  };
}
