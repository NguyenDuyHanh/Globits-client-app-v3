import { Formik } from "formik";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Button, Paper, TextField, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

const CountryForm = ({
  action,
  country,
  handleCreateCountry,
  handleEditCountry,
}) => {
  const history = useHistory();

  const { t } = useTranslation();

  const initialValues =
    action === "viewDetail" || action === "edit"
      ? {
          name: country?.name || "",
          code: country?.code || "",
          description: country?.description || "",
        }
      : {
          name: "",
          code: "",
          description: "",
        };

  const handleSubmit = async (values, { resetForm }) => {
    if (action === "edit") {
      await handleEditCountry(values);
    }
    if (action === "add") {
      await handleCreateCountry(values);
      resetForm();
    }
  };

  const handleBack = () => {
    history.push("/category/country");
  };

  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 128px)",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: 24,
          width: "40vh",
          minWidth: 500,
          maxWidth: 700,
          borderRadius: 12,
        }}
      >
        <Typography variant="h5" align="center" gutterBottom>
          {action === "add"
            ? `${t("country.title_add")}`
            : action === "viewDetail"
            ? `${t("country.title_view")}`
            : `${t("country.title_edit")}`}
        </Typography>

        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          enableReinitialize={true}
          validate={(values) => {
            const errors = {};
            if (!values.name) {
              errors.name = "Name is required";
            }
            if (!values.code) {
              errors.code = "Code is required";
            }
            if (!values.description) {
              errors.description = "Description is required";
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
          }) => (
            <form
              style={{ display: "flex", flexDirection: "column", gap: 8 }}
              onSubmit={handleSubmit}
            >
              <TextField
                id="standard-basic"
                label={t("country.name")}
                name="name"
                value={values.name}
                onChange={handleChange}
                fullWidth
                InputProps={{ readOnly: action === "viewDetail" }}
              />

              {errors.name && touched.name && (
                <div style={{ color: "red" }}>{errors.name}</div>
              )}

              <TextField
                id="standard-basic"
                label={t("country.code")}
                name="code"
                value={values.code}
                onChange={handleChange}
                fullWidth
                InputProps={{ readOnly: action === "viewDetail" }}
              />

              {errors.code && touched.code && (
                <div style={{ color: "red" }}>{errors.code}</div>
              )}

              <TextField
                id="standard-basic"
                label={t("country.description")}
                name="description"
                value={values.description}
                onChange={handleChange}
                fullWidth
                InputProps={{ readOnly: action === "viewDetail" }}
              />

              {errors.description && touched.description && (
                <div style={{ color: "red" }}>{errors.description}</div>
              )}

              <Box
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: 16,
                }}
              >
                <Button onClick={handleBack} variant="outlined" color="primary">
                  {t("general.button.back")}
                </Button>
                {action !== "viewDetail" && (
                  <Button type="submit" variant="contained" color="primary">
                    {t("general.button.save")}
                  </Button>
                )}
              </Box>
            </form>
          )}
        </Formik>
      </Paper>
    </Box>
  );
};

export default CountryForm;
