import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  Paper,
  Popper,
  MenuItem,
  MenuList,
} from "@material-ui/core";
import ArrowDropUpIcon from "@material-ui/icons/ArrowDropUp";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  button: { margin: 10, boxShadow: "none" },
  dropButton: { textTransform: "none" },
  growTo: { transformOrigin: "center top" },
});

const EXCHANGE_FULL_BALANCE = "Exchange all";
const options = [EXCHANGE_FULL_BALANCE, "Exchange"];

function ModalButton({
  state,
  setState,
  onSave,
  setFullExchange,
  exchangeCurrency,
}) {
  const classes = useStyles();
  const anchorRef = useRef(null);
  const [buttonState, setButtonState] = useState({
    open: false,
    selectedIndex: 1,
  });

  if (!exchangeCurrency) {
    return (
      <Button
        className={classes.button}
        disabled={!state.balance || !state.currency}
        onClick={onSave}
        color="primary"
        variant="contained"
      >
        Save
      </Button>
    );
  }

  const handleExchange = (selected) => {
    const exchangeFull = selected === EXCHANGE_FULL_BALANCE;

    setFullExchange(exchangeFull);
    setState({
      ...state,
      balance: exchangeFull ? exchangeCurrency.balance : "",
    });
  };

  const handleSelect = (index) => (event) => {
    setButtonState({
      open: false,
      selectedIndex: index,
    });
    handleExchange(event.target.innerText);
  };

  const handleClose = (event) => {
    if (!anchorRef?.current?.contains(event.target)) {
      setButtonState({ ...buttonState, open: false });
    }
  };

  return (
    <Grid container direction="column" alignItems="flex-end">
      <Grid item xs={12}>
        <ButtonGroup
          ref={anchorRef}
          variant="contained"
          color="primary"
          disabled={!state.currency}
          className={classes.button}
        >
          <Button
            disabled={!state.balance}
            className={classes.dropButton}
            onClick={() => {
              onSave();
              setFullExchange(false);
            }}
          >
            {options[buttonState.selectedIndex]}
          </Button>
          <Button
            color="primary"
            size="small"
            onClick={() =>
              setButtonState({
                ...buttonState,
                open: !buttonState.open,
              })
            }
          >
            <ArrowDropUpIcon />
          </Button>
        </ButtonGroup>
        <Popper
          open={buttonState.open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps }) => (
            <Grow {...TransitionProps} className={classes.growTop}>
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList>
                    {options.map((option, index) => (
                      <MenuItem
                        key={option}
                        onClick={handleSelect(index)}
                        selected={index === buttonState.selectedIndex}
                      >
                        {option}
                      </MenuItem>
                    ))}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Grid>
    </Grid>
  );
}

ModalButton.propTypes = {
  state: PropTypes.shape({
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string.isRequired,
  }).isRequired,
  setState: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  setFullExchange: PropTypes.func.isRequired,
  exchangeCurrency: PropTypes.shape({
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
  }),
};

ModalButton.defaultProps = {
  exchangeCurrency: undefined,
};

export default ModalButton;
