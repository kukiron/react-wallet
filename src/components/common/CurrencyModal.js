import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import SelectCurrency from "./SelectCurrency";
import ModalButton from "./ModalButton";
import { blueGray } from "../../lib/colors";

const useStyles = makeStyles({
  form: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "5px 10px",
  },
  loader: {
    color: `${blueGray}`,
    padding: 10,
    marginTop: 8,
  },
  textField: { marginTop: 0 },
  formButton: { margin: 10 },
});

function CurrencyModal({
  loading,
  open,
  setOpen,
  state,
  setState,
  onClick,
  currencies,
  modalProps,
  exchangeCurrency, // only available when exchanging currency
}) {
  const classes = useStyles();
  const [fullExchange, setFullExchange] = useState(false);
  const { title, description, label } = modalProps;
  const noCurrency = !currencies.length;

  const handleClose = () => {
    setFullExchange(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog maxWidth="sm" open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{description}</DialogContentText>
          <div className={classes.form}>
            <TextField
              margin="dense"
              id="balance"
              label="Add an amount"
              type="number"
              value={state.balance > 0 ? Number(state.balance.toFixed(2)) : ""}
              onChange={({ target: { value } }) =>
                setState({ ...state, balance: Number(value) })
              }
              className={classes.textField}
              disabled={fullExchange}
            />
            {loading ? (
              <CircularProgress className={classes.loader} size={20} />
            ) : (
              <SelectCurrency
                label={noCurrency ? "No currency" : label || "Currency"}
                activeCurrency={state.currency}
                currencies={currencies}
                onSelect={({ target: { value } }) =>
                  setState({ ...state, currency: value })
                }
                disabled={noCurrency}
              />
            )}
          </div>
        </DialogContent>

        <DialogActions>
          <ModalButton
            setFullExchange={setFullExchange}
            onSave={onClick}
            state={state}
            setState={setState}
            exchangeCurrency={exchangeCurrency}
          />
        </DialogActions>
      </Dialog>
    </>
  );
}

CurrencyModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  state: PropTypes.shape({
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  setState: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  modalProps: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  exchangeCurrency: PropTypes.shape({
    balance: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    currency: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

CurrencyModal.defaultProps = {
  loading: false,
  exchangeCurrency: undefined,
};

export default CurrencyModal;
