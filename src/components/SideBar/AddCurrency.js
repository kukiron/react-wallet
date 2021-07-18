import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { MonetizationOnOutlined as CurrencyIcon } from "@material-ui/icons";

import CardAction from "./CardAction";
import { getConversionRates } from "../../lib/currency";
import { sidebarCardStyles } from "../../lib/styles";
import { addCurrency } from "../../redux/actions";

const useStyles = makeStyles({
  card: sidebarCardStyles,
  icon: { marginTop: 10 },
});

const modalProps = {
  title: "Add a currency",
  description:
    "Create a new currency card with new balance. It'll appear in your currencies list & update total balance.",
};

const initialState = { balance: "", currency: "" };

function AddCurrency({ activeCurrencies, onAddCurrency }) {
  const classes = useStyles();
  const [currencies, setCurrencies] = useState([]);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(initialState);

  useEffect(() => {
    // fetch conversion rates when modal is opened
    if (open) {
      getConversionRates().then((result) => {
        const currencyList = Object.keys(result).filter(
          (currency) => !activeCurrencies.includes(currency)
        );
        setCurrencies(currencyList);
      });
    }
  }, [open]) // eslint-disable-line

  const handleAddCurrency = () => {
    onAddCurrency(category);
    setCategory(initialState);
    setOpen(false);
  };

  return (
    <Card className={classes.card}>
      <CurrencyIcon className={classes.icon} color="primary" fontSize="large" />
      <CardAction
        open={open}
        setOpen={setOpen}
        state={category}
        setState={setCategory}
        onClick={handleAddCurrency}
        currencies={currencies}
        buttonText="Add currency"
        modalProps={modalProps}
      />
    </Card>
  );
}

AddCurrency.propTypes = {
  onAddCurrency: PropTypes.func.isRequired,
  activeCurrencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

const mapStateToProps = ({ currencies }) => ({
  activeCurrencies: currencies.map(({ currency }) => currency),
});

const mapDispatchToProps = (dispatch) => ({
  onAddCurrency: (category) => dispatch(addCurrency(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddCurrency);
