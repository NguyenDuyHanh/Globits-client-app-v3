import { Formik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useStore } from "app/stores";
import {
  Box,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { MuiPickersUtilsProvider, KeyboardDatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

const DepartmentForm = ({
  action,
  department,
  handleCreateDepartment,
  handleEditDepartment,
}) => {
  const history = useHistory();

  const { t } = useTranslation();

  const { departmentStore } = useStore();

  const initialValues =
    action === "viewDetail" || action === "edit"
      ? {
          parentId: department?.parentId || "",
          name: department?.name || "",
          code: department?.code || "",
          description: department?.description || "",
          func: department?.func || "",
          industryBlock: department?.industryBlock || "",
          foundedNumber: department?.foundedNumber || "",
          foundedDate: department?.foundedDate || null,
          displayOrder: department?.displayOrder || "",
        }
      : {
          parentId: "",
          name: "",
          code: "",
          description: "",
          func: "",
          industryBlock: "",
          foundedNumber: "",
          foundedDate: null,
          displayOrder: "",
        };

  const handleSubmit = async (values, { resetForm }) => {
    if (action === "edit") {
      await handleEditDepartment(values);
    }
    if (action === "add") {
      await handleCreateDepartment(values);
      resetForm();
    }
  };

  const handleBack = () => {
    history.push("/category/department");
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "calc(100vh - 128px)",
        padding: "24px 0",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: 32,
          width: "100%",
          maxWidth: 900,
          borderRadius: 12,
        }}
      >
        <Typography className="mb-24" variant="h5" align="center" gutterBottom>
          {action === "add"
            ? t("department.title_add")
            : action === "viewDetail"
            ? t("department.title_view")
            : t("department.title_edit")}
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Tên phòng ban không được để trống";
            }
            if (!values.code) {
              errors.code = "Mã phòng ban không được để trống";
            }
            return errors;
          }}
        >
          {({
            values,
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldValue,
          }) => (
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                {/* Phòng ban trực thuộc */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label={t("department.parent")}
                    name="parentId"
                    value={values.parentId || ""}
                    size="small"
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{ readOnly: action === "viewDetail" }}
                  >
                    <MenuItem value="">
                      <em>-- Không có --</em>
                    </MenuItem>
                    {departmentStore.departments?.map((dept) => (
                      <MenuItem key={dept.id} value={dept.id}>
                        {dept.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                {/* Tên phòng ban */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("department.name")}
                    name="name"
                    value={values.name}
                    size="small"
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{ readOnly: action === "viewDetail" }}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>

                {/* Mã phòng ban */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("department.code")}
                    name="code"
                    value={values.code}
                    size="small"
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{ readOnly: action === "viewDetail" }}
                    error={touched.code && Boolean(errors.code)}
                    helperText={touched.code && errors.code}
                  />
                </Grid>

                {/* Thứ tự hiển thị */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("department.displayOrder")}
                    name="displayOrder"
                    value={values.displayOrder}
                    size="small"
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{ readOnly: action === "viewDetail" }}
                  />
                </Grid>

                {/* Chức năng */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("department.function")}
                    size="small"
                    name="func"
                    value={values.func}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{ readOnly: action === "viewDetail" }}
                  />
                </Grid>

                {/* Khối ngành */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("department.industryBlock")}
                    size="small"
                    name="industryBlock"
                    value={values.industryBlock}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{ readOnly: action === "viewDetail" }}
                  />
                </Grid>

                {/* Số quyết định thành lập */}
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label={t("department.foundedNumber")}
                    size="small"
                    name="foundedNumber"
                    value={values.foundedNumber}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{ readOnly: action === "viewDetail" }}
                  />
                </Grid>

                {/* Ngày thành lập */}
                <Grid item xs={12} sm={6}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      fullWidth
                      label={t("department.foundedDate")}
                      size="small"
                      format="dd/MM/yyyy"
                      value={values.foundedDate ? new Date(values.foundedDate) : null} // đảm bảo là Date
                      onChange={(date) => setFieldValue("foundedDate", date)}
                      inputVariant="outlined"
                      readOnly={action === "viewDetail"}
                      KeyboardButtonProps={{ "aria-label": "change date" }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                {/* Mô tả */}
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label={t("department.description")}
                    size="small"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    variant="outlined"
                    multiline
                    minRows={3}
                    maxRows={5}
                    InputProps={{ readOnly: action === "viewDetail" }}
                  />
                </Grid>
              </Grid>

              {/* Buttons */}
              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 24,
                }}
              >
                <button onClick={handleBack} className="btn btn-primary-outline">
                  {t("general.button.back")}
                </button>
                {action !== "viewDetail" && (
                  <button type="submit" className="btn btn-primary">
                    {t("general.button.save")}
                  </button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default DepartmentForm;