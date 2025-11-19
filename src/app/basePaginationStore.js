import { makeObservable, observable, action } from "mobx";

export default class BasePaginationStore {
  page = 1;
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  pageSizeOption = [10, 15, 20, 25, 30];

  constructor() {
    makeObservable(this, {
      page: observable,
      pageSize: observable,
      totalPages: observable,
      totalElements: observable,
      pageSizeOption: observable,
      setPage: action,
      setTotalPages: action,
      setTotalElements: action,
      setPageSize: action,
      setKeyword: action,
      handleChangePage: action,
      setRowsPerPage: action,
    });
  }

  setPage = (page) => {
    this.page = page;
  };

  setTotalPages = (totalPages) => {
    this.totalPages = totalPages;
  };

  setTotalElements = (totalElements) => {
    this.totalElements = totalElements;
  };

  setPageSize = (pageSize) => {
    this.pageSize = pageSize;
  };

  setKeyword = (keyword) => {
    this.keyword = keyword;
  };

  handleChangePage = (event, newPage) => {
    this.page = newPage;
  };

  setRowsPerPage = (e) => {
    this.pageSize = e.target.value;
    this.page = 1;
  };
}
