import { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { toast } from "react-toastify";

import { pagingCountries, deleteCountry } from "./CountryService";
import ConfirmModal from "./ConfirmModal";
import GlobitsPagination from "app/common/GlobitsPagination";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
  },
  headCell: {
    fontWeight: "bold",
    fontSize: "16px",
  },
  viewDetailBtn: {
    color: "blue",
    marginRight: "10px",
    cursor: "pointer",
  },
  editBtn: {
    color: "gold",
    marginRight: "10px",
    cursor: "pointer",
  },
  deleteBtn: {
    color: "red",
    cursor: "pointer",
  },
  btnAdd: {
    backgroundColor: "#04c0ca",
    whiteSpace: "nowrap",
    // paddingTop: 0,
    // paddingBottom: 0,
    color: "#fff",
    "&:hover": {
      backgroundColor: "#039ea3",
    },
    fontSize: "16px",
  },
}));

export default function CountryIndex() {
  const { t } = useTranslation();

  const classes = useStyles();

  const [countries, setCountries] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [selectedCountryId, setSelectedCountryId] = useState(null);

  const [pagination, setPagination] = useState({
    pageSize: 10,
    totalPages: 0,
    keyword: "",
    page: 1,
    totalElements: 0,
    pageSizeOption: [10, 15, 20, 25, 30],
  });
  const history = useHistory();

  const loadCountries = async () => {
    try {
      let searchObject = {
        pageIndex: pagination.page,
        pageSize: pagination.pageSize,
        keyword: pagination.keyword,
        orderBy: "createDate",
        direction: "desc",
      };
      let data = await pagingCountries(searchObject);
      console.log("Countries data:", data.data.content);
      setCountries(data.data.content);
      setPagination((prev) => ({
        ...prev,
        totalPages: data.data.totalPages,
        totalElements: data.data.totalElements,
      }));
    } catch (error) {
      console.error("Failed to load countries", error);
    }
  };

  useEffect(() => {
    loadCountries();
  }, [pagination.page, pagination.pageSize, pagination.keyword]);

  const handleViewDetails = (countryId) => {
    history.push(`/category/country/${countryId}`, { countryId });
  };

  const handleOpenEditForm = (countryId) => {
    history.push(`/category/country/edit/${countryId}`, { countryId });
  };

  const handleOpenAddForm = () => {
    history.push("/category/country/new");
  };

  const handleOpenModal = (countryId) => {
    setSelectedCountryId(countryId);
    console.log("Selected country ID for deletion:", countryId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeleteCountry = async (countryId) => {
    try {
      await deleteCountry(countryId);
      setSelectedCountryId(null);
      await loadCountries();
      setOpenModal(false);
      toast.success(`${t("toast.delete_success")}`);
    } catch (error) {
      console.error("Failed to delete country", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPagination((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const setRowsPerPage = (e) => {
    setPagination((prev) => ({
      ...prev,
      pageSize: e.target.value,
      page: 1,
    }));
  };

  // search
  const handleSearch = (searchObject) => {
    console.log("Search object:", searchObject);
    setPagination((prev) => ({
      ...prev,
      keyword: searchObject.keyword || "",
      page: 1,
    }));
  };

  return (
    <div className="px-40">
      <h2 className="my-40 text-center">{t("country.title")}</h2>
      <div className="flex flex-space-between flex-middle mb-20">
        <button
          variant="contained"
          className="btn btn-primary"
          onClick={handleOpenAddForm}
        >
          {t("general.button.add")}
        </button>

        <GlobitsSearchInput search={handleSearch}/>
      </div>

      <TableContainer component={Paper} className="px-20 mb-20">
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.headCell}>Id</TableCell>
              <TableCell align="right" className={classes.headCell}>
                {t("general.table.name")}
              </TableCell>
              <TableCell align="right" className={classes.headCell}>
                {t("general.table.code")}
              </TableCell>
              <TableCell align="right" className={classes.headCell}>
                {t("general.table.description")}
              </TableCell>
              <TableCell align="right" className={classes.headCell}>
                {t("general.table.action")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country, index) => (
              <TableRow key={index}>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  {country.id}
                </TableCell>
                <TableCell align="right">{country.name}</TableCell>
                <TableCell align="right">{country.code}</TableCell>
                <TableCell align="right">{country.description}</TableCell>
                <TableCell align="right">
                  <VisibilityIcon
                    fontSize="small"
                    className={classes.viewDetailBtn}
                    onClick={() => handleViewDetails(country.id)}
                  />
                  <EditIcon
                    fontSize="small"
                    className={classes.editBtn}
                    onClick={() => handleOpenEditForm(country.id)}
                  />
                  <DeleteIcon
                    fontSize="small"
                    className={classes.deleteBtn}
                    onClick={() => handleOpenModal(country.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
            <ConfirmModal
              openModal={openModal}
              onClose={handleCloseModal}
              handleDelete={() => handleDeleteCountry(selectedCountryId)}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <GlobitsPagination
        totalPages={pagination.totalPages}
        totalElements={pagination.totalElements}
        page={pagination.page}
        pageSize={pagination.pageSize}
        pageSizeOption={pagination.pageSizeOption}
        handleChangePage={handleChangePage}
        setRowsPerPage={setRowsPerPage}
      />
    </div>
  );
}
