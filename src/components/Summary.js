import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { SelectCurrency } from "./common";
import { blueGray } from "../lib/colors";
import { cardStyles } from "../lib/styles";
import { formatBalance, formatDate } from "../lib/utils";
import { updateTotalBalance } from "../redux/actions";

const useStyles = makeStyles({
  card: cardStyles,
  wrapper: {
    padding: 10,
  },
  headerWrapper: {
    display: "flex",
    alignItems: "baseline",
    justifyContent: "space-between",
  },
  time: {
    fontSize: 16,
    fontWeight: 400,
    marginRight: 15,
    color: `${blueGray}`,
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: "10px",
  },
  title: {
    fontWeight: 400,
  },
  balance: {
    fontWeight: "bold",
    marginRight: 5,
    marginLeft: 8,
  },
  formWrapper: {
    display: "flex",
    alignItems: "baseline",
  },

  // responsive styles
  "@media (max-width: 768px)": {
    headerWrapper: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    time: { margin: "0 0 15px" },
    title: { fontSize: 18 },
  },
});

function Summary({ total, currencies, onUpdateBalance }) {
  const { balance, currency } = total;
  const classes = useStyles();

  const handleSelect = async (event) => {
    const { value } = event.target;
    await onUpdateBalance({ balance, currency: value });
  };

  return (
    <Card className={classes.card}>
      <div className={classes.wrapper}>
        <div className={classes.headerWrapper}>
          <CardHeader title="👋 Welcome!" />
          <div className={classes.time}>{formatDate().long}</div>
        </div>

        <Divider variant="middle" />

        <CardContent className={classes.content}>
          <Typography variant="h6" className={classes.title}>
            Your current account balance is -
            <span className={classes.balance}>{`${formatBalance(
              balance
            )}`}</span>
            <span>{`${currency}`}</span>
          </Typography>

          <div className={classes.formWrapper}>
            <Typography color="textSecondary">Select currency</Typography>
            <SelectCurrency
              activeCurrency={currency}
              currencies={currencies}
              onSelect={handleSelect}
            />
          </div>
        </CardContent>
      </div>
    </Card>
  );
}

Summary.propTypes = {
  total: PropTypes.shape({
    balance: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
  }).isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  onUpdateBalance: PropTypes.func.isRequired,
};

const mapStateToProps = ({ total, currencies }) => ({
  total,
  currencies: currencies.map(({ currency }) => currency),
});

const mapDispatchToProps = (dispatch) => ({
  onUpdateBalance: ({ balance, currency }) =>
    dispatch(updateTotalBalance({ balance, currency, change: true })),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
