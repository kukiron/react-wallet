import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Divider, Button, Typography, Tooltip } from "@material-ui/core";
import { ArrowForwardIosSharp as ArrowIcon } from "@material-ui/icons";
import { makeStyles, withStyles } from "@material-ui/core/styles";

import { Alert, CurrencyModal } from "./common";
import { blueGray, red } from "../lib/colors";
import { cardStyles, linkStyle } from "../lib/styles";
import { formatBalance, confirmDelete } from "../lib/utils";
import { exchangeCurrency, deleteCurrency } from "../redux/actions";

const useStyles = makeStyles({
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gridGap: 40,
    width: "100%",
  },
  card: {
    ...cardStyles,
    borderLeft: `6px solid ${red}`,
  },
  cardContent: {
    padding: 20,
  },
  title: {
    fontWeight: 400,
    paddingBottom: 5,
  },
  activeText: linkStyle,
  inactiveText: {
    ...linkStyle,
    color: `${blueGray}`,
    textDecoration: "none",
    cursor: "default",
    "&:hover": {
      color: `${blueGray}`,
    },
  },
  icon: {
    marginLeft: 5,
    fontSize: 13,
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "flex-end",
    padding: 10,
  },
  button: {
    height: 30,
    fontSize: 12,
    textTransform: "none",
  },

  // responsive styles
  "@media (max-width: 1024px)": {
    wrapper: {
      gridTemplateColumns: "1fr 1fr",
      gridGap: 30,
    },
  },
  "@media (max-width: 768px)": {
    wrapper: {
      gridTemplateColumns: "1fr",
    },
  },
});

const StyledTooltip = withStyles({
  tooltip: {
    backgroundColor: blueGray,
    color: "#fff",
    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.08)",
    fontSize: 11,
    borderRadius: 4,
  },
})(Tooltip);

const getModalProps = (currency) => ({
  title: "Exchange currency",
  description: `Convert ${
    currency || ""
  } to another active currency within existing balance.`,
  label: "Convert to",
});

const initialState = { balance: "", currency: "" };

function CurrencyList({ currencies, onExchangeCurrency, onDeleteCurrency }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState(null);
  const [exchange, setExchange] = useState(initialState);
  const canExchange = currencies.length > 1;

  const activeCurrencyList = useMemo(
    () =>
      currencies.reduce(
        (acc, { currency }) =>
          currency === selectedCurrency?.currency ? acc : [...acc, currency],
        []
      ),
    [currencies, selectedCurrency]
  );

  const handleClickLink = ({ currency, balance }) => {
    if (balance <= 0) {
      setAlertMessage("Insufficient balance. Please deposit & try again.");
    } else {
      setSelectedCurrency({ currency, balance });
      setExchange(initialState);
      setOpen(true);
    }
  };

  const handleExchangeCurrency = () => {
    if (exchange.balance > selectedCurrency.balance) {
      setAlertMessage("Invalid balance. Please try again.");
    } else {
      onExchangeCurrency({
        balance: exchange.balance,
        exchangeToCurrency: exchange.currency,
        currency: selectedCurrency.currency,
      });
    }
    setExchange(initialState);
    setSelectedCurrency(null);
    setOpen(false);
  };

  const renderRemoveButton = ({ balance, currency }) => (
    <span>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        disabled={balance > 0 || !canExchange}
        onClick={() =>
          confirmDelete({ callback: () => onDeleteCurrency(currency) })
        }
      >
        Remove
      </Button>
    </span>
  );

  return (
    <div className={classes.wrapper}>
      {currencies.map((item, i) => {
        const { currency, balance } = item;
        return (
          <Card key={currency} className={classes.card}>
            <div className={classes.cardContent}>
              <Typography variant="h5" className={classes.title}>
                {`${formatBalance(balance)} ${currency}`}
              </Typography>
              <Typography
                variant="body2"
                className={
                  canExchange ? classes.activeText : classes.inactiveText
                }
                onClick={() => canExchange && handleClickLink(item)}
              >
                {canExchange ? "Convert balance" : "Cannot be converted"}
                {canExchange && <ArrowIcon className={classes.icon} />}
              </Typography>
            </div>

            <Divider />

            <div className={classes.buttonWrapper}>
              {balance > 0 && canExchange ? (
                <StyledTooltip
                  placement="top"
                  title="Cannot be removed. Exchange & empty tha balance first"
                >
                  {renderRemoveButton(item)}
                </StyledTooltip>
              ) : (
                renderRemoveButton(item)
              )}
            </div>
          </Card>
        );
      })}
      {alertMessage && (
        <Alert
          message={alertMessage}
          open={Boolean(alertMessage)}
          setOpen={setAlertMessage}
        />
      )}
      <CurrencyModal
        open={open}
        setOpen={setOpen}
        state={exchange}
        setState={setExchange}
        onClick={handleExchangeCurrency}
        currencies={activeCurrencyList}
        modalProps={getModalProps(selectedCurrency?.currency)}
        exchangeCurrency={selectedCurrency}
      />
    </div>
  );
}

CurrencyList.propTypes = {
  currencies: PropTypes.arrayOf(
    PropTypes.shape({
      balance: PropTypes.number.isRequired,
      currency: PropTypes.string.isRequired,
    })
  ).isRequired,
  onExchangeCurrency: PropTypes.func.isRequired,
  onDeleteCurrency: PropTypes.func.isRequired,
};

const mapStateToProps = ({ currencies }) => ({ currencies });

const mapDispatchToProps = (dispatch) => ({
  onDeleteCurrency: (currency) => dispatch(deleteCurrency(currency)),
  onExchangeCurrency: (exchange) => dispatch(exchangeCurrency(exchange)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CurrencyList);
