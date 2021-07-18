import { ADD_CURRENCY, EXCHANGE_CURRENCY, DELETE_CURRENCY } from "./types";
import { createRecord } from "./history";
import { updateTotalBalance } from "./balance";
import { getBalance } from "../../lib/currency";
import { getHistoryRecord } from "../../lib/utils";

// actions
export const receiveAddCurrency = ({ balance, currency, createdAt }) => ({
  type: ADD_CURRENCY,
  payload: { balance, currency, createdAt },
});

export const receiveExchangeCurrencies = ({ current, exchangeTo }) => ({
  type: EXCHANGE_CURRENCY,
  payload: { current, exchangeTo },
});

export const receiveDeleteCurrency = ({ currency }) => ({
  type: DELETE_CURRENCY,
  payload: { currency },
});

// thunks
export const addCurrency = (payload) => async (dispatch, getState) => {
  const { currencies } = getState();
  const { balance = 0, createdAt } =
    currencies.find(({ currency }) => currency === payload.currency) || {};

  // update existing currency balance
  dispatch(
    receiveAddCurrency({
      ...payload,
      balance: Number(balance + payload.balance),
      createdAt: createdAt || new Date().toISOString(),
    })
  );
  // update total balance
  await dispatch(updateTotalBalance(payload));
  // create history record
  dispatch(createRecord({ record: getHistoryRecord(payload) }));
};

export const exchangeCurrency = (payload) => async (dispatch, getState) => {
  const { balance, currency, exchangeToCurrency } = payload;
  const currencies = getState().currencies.reduce(
    (acc, curr) => ({
      ...acc,
      ...(curr.currency === currency ? { [currency]: curr } : {}),
      ...(curr.currency === exchangeToCurrency
        ? { [exchangeToCurrency]: curr }
        : {}),
    }),
    {}
  );

  const convertedBalance = await getBalance({
    amount: balance,
    current: currency,
    converted: exchangeToCurrency,
  });
  const exchangePayload = {
    current: {
      ...currencies[currency],
      balance: currencies[currency].balance - Number(balance),
      createdAt: currencies[currency].createdAt || new Date().toISOString(),
    },
    exchangeTo: {
      ...currencies[exchangeToCurrency],
      balance: currencies[exchangeToCurrency].balance + convertedBalance,
      createdAt:
        currencies[exchangeToCurrency].createdAt || new Date().toISOString(),
    },
  };

  dispatch(receiveExchangeCurrencies(exchangePayload));
  dispatch(createRecord({ record: getHistoryRecord(payload) }));
};

export const deleteCurrency = (currency) => async (dispatch, getState) => {
  const { total, currencies } = getState();
  if (currency === total.currency) {
    // update total balance
    const { currency: replacedCurrency } = currencies.filter(
      (item) => item.currency !== currency
    )[0];
    await dispatch(
      updateTotalBalance({ currency: replacedCurrency, change: true })
    );
  }
  dispatch(receiveDeleteCurrency({ currency }));
};
