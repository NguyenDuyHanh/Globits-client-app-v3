import {
  makeStyles,
  Backdrop,
  Fade,
  Button,
  Box,
  Typography,
  Modal,
} from "@material-ui/core";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "none",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      outline: "none",
    },
  }));

const ConfirmModal = ({ openModal, onClose, handleDelete }) => {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={openModal}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.8)",
        },
      }}
    >
      <Fade in={openModal}>
        <div className={classes.paper}>
          <Typography variant="h5" gutterBottom>
            Delete Confirmation
          </Typography>
          <Typography variant="subtitle1" color="textSecondary" gutterBottom>
            Are you sure you want to delete this country?
          </Typography>

          <Box mt={3} display="flex" justifyContent="end" gap="16px">
            <Button
              variant="outlined"
              color="default"
              onClick={onClose}
              style={{ marginRight: 12 }}
            >
              {t("general.button.cancel")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleDelete}
            >
              {t("general.button.delete")}
            </Button>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
};

export default ConfirmModal;
