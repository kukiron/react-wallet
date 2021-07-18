import unionBy from "lodash.unionby";

import createReducer from "../utils/createReducer";
import {
  ADD_CURRENCY,
  EXCHANGE_CURRENCY,
  DELETE_CURRENCY,
  RESET_STATE,
} from "../actions/types";

const initialState = [{ balance: 0, currency: "USD" }];

const addCurrency = (state, payload) =>
  unionBy([payload], state, "currency").sort((a, b) =>
    a?.createdAt?.localeCompare(b?.createdAt)
  );

const exchangeCurrency = (state, { current, exchangeTo }) =>
  unionBy([current, exchangeTo], state, "currency").sort((a, b) =>
    a?.createdAt?.localeCompare(b?.createdAt)
  );

const deleteCurrency = (state, payload) =>
  state.filter(({ currency }) => currency !== payload.currency);

const functionsMap = {
  [ADD_CURRENCY]: addCurrency,
  [EXCHANGE_CURRENCY]: exchangeCurrency,
  [DELETE_CURRENCY]: deleteCurrency,
  [RESET_STATE]: () => initialState,
};

export default createReducer(initialState, functionsMap);
