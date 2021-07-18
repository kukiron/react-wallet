import React from "react";
import PropTypes from "prop-types";
import { Snackbar } from "@material-ui/core";

function Alert({ message, open, setOpen }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      open={open}
      autoHideDuration={6000}
      onClose={() => setOpen(false)}
      message={message}
    />
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Alert;
