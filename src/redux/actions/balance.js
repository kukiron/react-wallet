import { UPDATE_TOTAL_BALANCE } from "./types";
import { getBalance } from "../../lib/currency";

// actions
export const receiveUpdateBalance = ({ balance, currency }) => ({
  type: UPDATE_TOTAL_BALANCE,
  payload: { balance, currency },
});

// thunks
export const updateTotalBalance =
  ({ balance, currency, change = false }) =>
  async (dispatch, getState) => {
    const { total } = getState();
    const current = change ? total.currency : currency;
    const converted = change ? currency : total.currency;
    const convertedBalance =
      currency !== total.currency
        ? await getBalance({
            amount: balance || total.balance,
            current,
            converted,
          })
        : balance;
    const updatedBalance = change
      ? convertedBalance
      : total.balance + convertedBalance;

    dispatch(
      receiveUpdateBalance({
        balance: Number(updatedBalance),
        currency: converted,
      })
    );
  };
