import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useTranslation } from "react-i18next";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import { toast } from "react-toastify";

import { useStore } from "app/stores";
import ConfirmModal from "./components/ConfirmModal";
import GlobitsPagination from "app/common/GlobitsPagination";
import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import BtnWithIconAndLabel from "app/common/button/BtnWithIconAndLabel";
const useStyles = makeStyles(() => ({
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: "#04c0ca",
  },
  headCell: {
    fontWeight: "bold",
    fontSize: "16px",
    color: "#fff",
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
        <BtnWithIconAndLabel
            labelKey="general.button.add"
            positionIcon="start"
            icon={<AddIcon />}
            variant="contained"
            classname="bg-primary"
            onClick={handleOpenAddForm}
        />

        <GlobitsSearchInput 
          type="country"
          search={countryStore.handleSearch} 
        />
      </div>

      <TableContainer component={Paper} className="mb-20">
        <Table className={classes.table} aria-label="simple table">
          <TableHead className={classes.tableHead}>
            <TableRow className="">
              <TableCell className={`${classes.headCell} pl-20`}>Id</TableCell>
              <TableCell align="right" className={classes.headCell}>
                {t("general.table.name")}
              </TableCell>
              <TableCell align="right" className={classes.headCell}>
                {t("general.table.code")}
              </TableCell>
              <TableCell align="right" className={classes.headCell}>
                {t("general.table.description")}
              </TableCell>
              <TableCell align="right" className={`${classes.headCell} pr-20`}>
                {t("general.table.action")}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {countries.map((country, index) => (
              <TableRow key={index}>
                <TableCell style={{ whiteSpace: "nowrap", paddingLeft: 20}}>
                  {country.id}
                </TableCell>
                <TableCell align="right">{country.name}</TableCell>
                <TableCell align="right">{country.code}</TableCell>
                <TableCell align="right">{country.description}</TableCell>
                <TableCell align="right" style={{ paddingRight: 16 }}>
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
        totalPages={countryStore.totalPages}
        totalElements={countryStore.totalElements}
        page={countryStore.page}
        pageSize={countryStore.pageSize}
        pageSizeOption={countryStore.pageSizeOption}
        handleChangePage={countryStore.handleChangePage}
        setRowsPerPage={countryStore.setRowsPerPage}
      />
    </div>
  );
});
