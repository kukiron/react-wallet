import React, { memo } from "react";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import CurrencyModal from "../common/CurrencyModal";
import { actionButtonStyle } from "../../lib/styles";

const useStyles = makeStyles({
  button: actionButtonStyle,
});

function CardAction({ buttonText, ...props }) {
  const classes = useStyles();

  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={() => props.setOpen(true)}
      >
        {buttonText}
      </Button>
      <CurrencyModal {...props} />
    </>
  );
}

CardAction.propTypes = {
  buttonText: PropTypes.string.isRequired,
};

export default memo(CardAction);
