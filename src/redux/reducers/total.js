import createReducer from "../utils/createReducer";
import { UPDATE_TOTAL_BALANCE, RESET_STATE } from "../actions/types";

const initialState = { balance: 0, currency: "USD" };

const updateTotalBalance = (state, payload) => ({
  ...state,
  ...payload,
});

const functionsMap = {
  [UPDATE_TOTAL_BALANCE]: updateTotalBalance,
  [RESET_STATE]: () => initialState,
};

export default createReducer(initialState, functionsMap);
