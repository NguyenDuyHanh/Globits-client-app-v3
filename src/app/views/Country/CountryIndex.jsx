import { useEffect, useState } from "react";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
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

import ConfirmModal from "./component/ConfirmModal";
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

export default observer(function CountryIndex() {
  const { t } = useTranslation();

  const classes = useStyles();

  const { countryStore } = useStore();

  const { countries } = countryStore;

  const [openModal, setOpenModal] = useState(false);
  const [countryId, setCountryId] = useState(null);

  const history = useHistory();

  useEffect(() => {
    countryStore.loadCountries();
  }, [countryStore.page, countryStore.pageSize]);

  useEffect(() => {
    return () => {
      countryStore.setKeyword("");
      countryStore.setPage(1);
    };
  }, []);

  const handleViewDetails = (countryId) => {
    history.push(`/category/country/viewDetails/${countryId}`, { countryId });
  };

  const handleOpenEditForm = (countryId) => {
    history.push(`/category/country/edit/${countryId}`, { countryId });
  };

  const handleOpenAddForm = () => {
    history.push("/category/country/new");
  };

  const handleOpenModal = (countryId) => {
    setOpenModal(true);
    setCountryId(countryId);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCountryId(null);
  };

  const handleDeleteCountry = async () => {
    await countryStore.deleteCountry(countryId);
    toast.success(t("toast.delete_success"));
    handleCloseModal();
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

        <GlobitsSearchInput 
          type="country"
          search={countryStore.handleSearch} 
        />
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
              handleDelete={() => handleDeleteCountry()}
            />
          </TableBody>
        </Table>
      </TableContainer>

      <GlobitsPagination
        totalPages={countryStore.toltalPages}
        totalElements={countryStore.toltalElements}
        page={countryStore.page}
        pageSize={countryStore.pageSize}
        pageSizeOption={countryStore.pageSizeOption}
        handleChangePage={countryStore.handleChangePage}
        setRowsPerPage={countryStore.setRowsPerPage}
      />
    </div>
  );
});
