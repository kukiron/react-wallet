import React from "react";
import PropTypes from "prop-types";
import { MenuItem, FormControl, Select, InputLabel } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { formStyles } from "../../lib/styles";

const useStyles = makeStyles({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "20px",
  },
  form: formStyles,
  labledForm: { ...formStyles, marginTop: -6 },
  label: { fontSize: 13 },
  select: { width: 90 },
});

function SelectCurrency({
  activeCurrency,
  onSelect,
  label,
  currencies,
  disabled,
}) {
  const classes = useStyles();
  return (
    <FormControl
      className={label ? classes.labledForm : classes.form}
      disabled={disabled}
    >
      {label && <InputLabel className={classes.label}>{label}</InputLabel>}
      <Select
        className={classes.select}
        value={activeCurrency}
        onChange={onSelect}
      >
        {currencies.map((currency, index) => (
          <MenuItem key={currency} value={currency}>
            {currency}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

SelectCurrency.propTypes = {
  onSelect: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeCurrency: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

SelectCurrency.defultProps = {
  activeCurrency: "",
  disabled: false,
  label: "",
};

export default SelectCurrency;
