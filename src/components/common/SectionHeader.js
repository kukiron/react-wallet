import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

function SectionHeader({ text }) {
  const classes = useStyles();

  return <div className={classes.header}>{text}</div>;
}

SectionHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default SectionHeader;
