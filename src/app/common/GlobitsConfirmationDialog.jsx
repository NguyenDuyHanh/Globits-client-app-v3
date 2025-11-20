import React from "react";
import { Dialog, DialogActions } from "@material-ui/core";

export default function GlobitsConfirmationDialog(props) {
  const { open, onConfirmDialogClose, text, title, agree, cancel, onYesClick } =
    props;
  return (
    <Dialog
      maxWidth="xs"
      fullWidth={true}
      open={open}
      onClose={onConfirmDialogClose}
      BackdropProps={{
        timeout: 500,
        style: {
          backgroundColor: "rgba(0, 0, 0, 0.25)",
        },
      }}
    >
      <div className="pt-24 px-20 pb-8">
        <h4 className="capitalize">{title}</h4>
        <p>{text}</p>
        <DialogActions>
          <div className="flex flex-space-between flex-middle">
            <button
              variant="contained"
              className="mr-12 btn btn-warning"
              onClick={onConfirmDialogClose}
            >
              {cancel}
            </button>
            <button
              className="btn btn-primary"
              variant="contained"
              onClick={onYesClick}
            >
              {agree}
            </button>
          </div>
        </DialogActions>
      </div>
    </Dialog>
  );
}
