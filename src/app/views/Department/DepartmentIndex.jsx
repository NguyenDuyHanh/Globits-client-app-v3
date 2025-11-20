import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useStore } from "app/stores";
import { observer } from "mobx-react";
import MaterialTable from "material-table";
import VisibilityIcon from "@material-ui/icons/Visibility";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AddIcon from "@material-ui/icons/Add";
import NoteIcon from "@material-ui/icons/Note";
import { toast } from "react-toastify";

import GlobitsSearchInput from "app/common/GlobitsSearchInput";
import BtnWithIconAndLabel from "app/common/button/BtnWithIconAndLabel";
import GlobitsPagination from "app/common/GlobitsPagination";
import GlobitsConfirmationDialog from "app/common/GlobitsConfirmationDialog";

const DepartmentIndex = observer(() => {
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);

  const { t } = useTranslation();

  const history = useHistory();

  const { departmentStore } = useStore();

  useEffect(() => {
    departmentStore.loadDepartments();
  }, [departmentStore.page, departmentStore.pageSize]);

  useEffect(() => {
    return () => {
      departmentStore.reset();
    };
  }, []);

  const columns = [
    { title: `${t("general.table.code")}`, field: "code", sorting: false },
    {
      title: `${t("general.table.name")}`,
      field: "name",
      sorting: false,
      align: "left",
    },
    {
      title: `${t("general.table.description")}`,
      field: "description",
      sorting: false,
      align: "left",
    },
    {
      title: `${t("general.table.action")}`,
      field: "actions",
      sorting: false,
      align: "center",
      render: (row) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
          }}
        >
          <VisibilityIcon
            fontSize="small"
            style={{ color: "#00ACC1", cursor: "pointer" }}
            onClick={() => openViewDetail(row)}
          />
          <EditIcon
            fontSize="small"
            style={{ color: "#FFB300", cursor: "pointer" }}
            onClick={() => openEditForm(row)}
          />
          <DeleteIcon
            fontSize="small"
            style={{ color: "#E53935", cursor: "pointer" }}
            onClick={() => handleOpenConfirmDialog(row)}
          />
          <GlobitsConfirmationDialog
            title={t("confirm_dialog.delete.title")}
            text={t("confirm_dialog.delete.text")}
            agree={t("confirm_dialog.delete.agree")}
            cancel={t("confirm_dialog.delete.cancel")}
            open={openConfirmDialog}
            onConfirmDialogClose={handleCloseConfirmDialog}
            onYesClick={() => handleDeleteDepartment(departmentStore.selectedDepartment.id)}
          />
        </div>
      ),
    },
  ];

  const openAddForm = () => {
    history.push("/category/department/new")
  }

  const openViewDetail = (dept) => {
    history.push(`/category/department/viewDetail/${dept.id}`);
    departmentStore.setSelectedDepartment(dept);
    console.log("dept", dept);
  }

  const openEditForm = (dept) => {
    history.push(`/category/department/edit/${dept.id}`);
    departmentStore.setSelectedDepartment(dept);
    console.log("dept", dept);
  }

  const handleOpenConfirmDialog = (dept) => {
    setOpenConfirmDialog(true);
    departmentStore.setSelectedDepartment(dept);
    console.log("dept", dept);
  }

  const handleCloseConfirmDialog = () => {
    setOpenConfirmDialog(false);
    departmentStore.setSelectedDepartment(null);
  }

  const handleDeleteDepartment = (deptId) => {
    departmentStore.deleteDepartment(deptId);
    toast.success(t("toast.delete_success"));
    setOpenConfirmDialog(false);
  }

  console.log(departmentStore.keyword);

  return (
    <div className="px-40">
      <h2 className="my-40 text-center">{t("department.title")}</h2>
      <div className="mb-20 flex flex-middle flex-center mt-10">
        <div className="flex flex-middle flex-center">
          <BtnWithIconAndLabel
            labelKey="general.button.add"
            positionIcon="start"
            icon={<AddIcon />}
            variant="contained"
            classname="bg-primary"
            onClick={openAddForm}
          />
          <BtnWithIconAndLabel
            labelKey="general.button.importExcel"
            positionIcon="start"
            icon={<NoteIcon />}
            variant="contained"
            classname="bg-error"
          />
        </div>

        <GlobitsSearchInput 
          type="department"
          search={departmentStore.handleSearch}
        />
      </div>
      <MaterialTable
        style={{ marginBottom: "20px" }}
        columns={columns}
        data={departmentStore.departments}
        parentChildData={(row, rows) =>
          rows.find((r) => r.id === row.parentId) || null
        }
        options={{
          selection: true,
          paging: false,
          search: false,
          toolbar: false,
          showTitle: false,
          headerStyle: {
            backgroundColor: "#04c0ca",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
          },
          rowStyle: () => ({ height: 48 }),
        }}
        localization={{
          body: { emptyDataSourceMessage: "Không có dữ liệu" },
          header: { actions: "Thao tác" },
        }}
      />
      <GlobitsPagination
        totalPages={departmentStore.totalPages}
        totalElements={departmentStore.totalElements}
        pageSize={departmentStore.pageSize}
        page={departmentStore.page}
        pageSizeOption={departmentStore.pageSizeOption}
        handleChangePage={departmentStore.handleChangePage}
        setRowsPerPage={departmentStore.setRowsPerPage}
      />
    </div>
  );
});

export default DepartmentIndex;
