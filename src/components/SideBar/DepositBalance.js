import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "@material-ui/core";
import { QueueOutlined as AddIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import CardAction from "./CardAction";
import { sidebarCardStyles } from "../../lib/styles";
import { addCurrency } from "../../redux/actions";

const useStyles = makeStyles({
  card: sidebarCardStyles,
  icon: { marginTop: 10 },
});

const modalProps = {
  title: "Deposit balance",
  description:
    "Add to your total balance by depositing an amount to one of your existing currencies.",
};

function DepositBalance({ activeCurrency, currencies, onDeposit }) {
  const initialState = { balance: "", currency: activeCurrency };
  const activeCurrencies = useMemo(
    () => currencies.map(({ currency }) => currency),
    [currencies]
  );
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [deposit, setDeposit] = useState(initialState);

  const handleAddBalance = () => {
    onDeposit(deposit);
    setDeposit(initialState);
    setOpen(false);
  };

  return (
    <Card className={classes.card}>
      <AddIcon className={classes.icon} color="primary" fontSize="large" />
      <CardAction
        open={open}
        setOpen={setOpen}
        state={deposit}
        setState={setDeposit}
        onClick={handleAddBalance}
        currencies={activeCurrencies}
        buttonText="Deposit balance"
        modalProps={modalProps}
      />
    </Card>
  );
}

DepositBalance.propTypes = {
  activeCurrency: PropTypes.string.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  onDeposit: PropTypes.func.isRequired,
};

const mapStateToProps = ({ total, currencies }) => ({
  currencies,
  activeCurrency: total.currency,
});

const mapDispatchToProps = (dispatch) => ({
  onDeposit: (deposit) => dispatch(addCurrency(deposit)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositBalance);
