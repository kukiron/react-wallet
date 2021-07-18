import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Button, useMediaQuery } from "@material-ui/core";
import { ReplayOutlined as ResetIcon } from "@material-ui/icons";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { confirmDelete } from "../lib/utils";
import { resetState } from "../redux/actions";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginTop: 60,
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  button: {
    width: "25%",
    maxHeight: 40,
    fontSize: 18,
    textTransform: "none",
  },
  icon: {
    alignSelf: "center",
    color: "#fff",
    marginLeft: 5,
  },

  // responsive styles
  [theme.breakpoints.down("sm")]: {
    icon: { marginLeft: 1 },
    button: { fontSize: 16 },
  },
}));

function ResetButton({ resetApp }) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));

  const handleResetApp = () => {
    confirmDelete({
      message: "Do you want to reset the app data?",
      callback: resetApp,
    });
  };

  return (
    <div className={classes.wrapper}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        onClick={handleResetApp}
      >
        Reset
        <ResetIcon
          className={classes.icon}
          fontSize={matches ? "small" : "medium"}
        />
      </Button>
    </div>
  );
}

ResetButton.propTypes = {
  resetApp: PropTypes.func.isRequired,
};

export default connect(null, { resetApp: resetState })(ResetButton);
