import { makeObservable, observable, action } from "mobx";

import BasePaginationStore from "app/basePaginationStore";
import { pagingDepartments, getDepartment, createDepartment, editDepartment, deleteDepartment } from "./DepartmentService";

export default class DepartmentStore extends BasePaginationStore {

  departments = [];
  selectedDepartment = {};
  keyword = "";

  constructor() {
    super();
    makeObservable(this, {
      departments: observable,
      selectedDepartment: observable,
      keyword: observable,
      reset: action,
      setDepartments: action,
      setSelectedDepartment: action,
      loadDepartments: action,
      getDepartment: action,
      createDepartment: action,
      editDepartment: action,
      deleteDepartment: action,
    });
  }

  setSelectedDepartment = (department) => {
    this.selectedDepartment = department;
  };

  setDepartments = (departments) => {
    this.departments = departments;
  };   
  
  reset = () => {
    this.setKeyword("");
    this.setPage(1);
  }

  loadDepartments = async () => {
    try {
      const searchObject = {
        pageIndex: this.page,
        pageSize: this.pageSize,  
        keyword: this.keyword,
        // orderBy: "createDate",
        // direction: "desc",
      };
      const response = await pagingDepartments(searchObject);
      const data = response.data.content;
      this.setDepartments(data);
      this.setTotalPages(response.data.totalPages);
      this.setTotalElements(response.data.totalElements);
    } catch (error) {
      console.error("Failed to load departments", error);
    }
  };

  createDepartment = async (department) => {
    try {
      await createDepartment(department)
    } catch (error) {
      console.error("Failed to create department", error)
    }
  }

  getDepartment = async (id) => {
    try {
      const response = await getDepartment(id);
      this.setSelectedDepartment(response.data);
    } catch (error) {
      console.error("Failed to get department by id", error);
    }
  };

  editDepartment = async (department) => {
    try {
      await editDepartment(department)
    } catch (error) {
      console.error("Failed to edit department", error)
    }
  }

  deleteDepartment = async (departmentId) => {
    try {
      await deleteDepartment(departmentId)
      await this.loadDepartments();
    } catch (error) {
      console.error("Failed to delete department", error)
    }
  } 

  handleSearch = (searchObject) => {
    this.setKeyword(searchObject.keyword);
    this.setPage(1);
    this.loadDepartments();
  };
}  