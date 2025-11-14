import { makeAutoObservable } from "mobx";

import {
  pagingCountries,
  getCountry,
  createCountry,
  editCountry,
  deleteCountry,
} from "./CountryService";

export default class CountryStore {
  countries = [];
  page = 1;
  pageSize = 10;
  toltalPages = 0;
  toltalElements = 0;
  pageSizeOption = [10, 15, 20, 25, 30];
  keyword = "";
  selectedCountry = {};

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedCountry = (country) => {
    this.selectedCountry = country;
  };

  setCountries = (countries) => {
    this.countries = countries;
  };

  setToltalPages = (toltalPages) => {
    this.toltalPages = toltalPages;
  };

  setToltalElements = (toltalElements) => {
    this.toltalElements = toltalElements;
  };

  setPageSize = (pageSize) => {
    this.pageSize = pageSize;
  };

  setPage = (page) => {
    this.page = page;
  };

  setKeyword = (keyword) => {
    this.keyword = keyword;
  };

  handleChangePage = (event, newPage) => {
    this.setPage(newPage);
  };

  setRowsPerPage = (e) => {
    this.setPageSize(e.target.value);
    this.setPage(1);
  };

  handleSearch = (searchObject) => {
    console.log(searchObject);
    this.setKeyword(searchObject.keyword);
    this.setPage(1);
    this.loadCountries();
  };

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
      this.setToltalPages(response.data.totalPages);
      this.setToltalElements(response.data.totalElements);
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
}
