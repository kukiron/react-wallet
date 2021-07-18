import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

import { receiveUpdateBalance, updateTotalBalance } from "../balance";
import { UPDATE_TOTAL_BALANCE } from "../types";

describe("receiveUpdateBalance", () => {
  it("should receive updated balance", () => {
    const payload = { balance: 100, currency: "USD" };
    const expectedAction = {
      type: UPDATE_TOTAL_BALANCE,
      payload,
    };
    expect(receiveUpdateBalance(payload)).toEqual(expectedAction);
  });
});

describe("updateTotalBalance", () => {
  const middlewares = [thunk];
  const mockStore = configureMockStore(middlewares);

  it("should update the total balance for same currency", async () => {
    const initialState = {
      total: { balance: 0, currency: "USD" },
    };
    const store = mockStore(initialState);

    const payload = { balance: 100, currency: "USD" };

    await store.dispatch(updateTotalBalance(payload));

    const actions = [{ type: UPDATE_TOTAL_BALANCE, payload }];
    expect(store.getActions()).toEqual(actions);
  });

  it("should update the total balance for changed currency", async () => {
    const initialState = {
      total: { balance: 0, currency: "USD" },
    };
    const store = mockStore(initialState);
    const payload = { balance: 0, currency: "EUR", change: true };

    await store.dispatch(updateTotalBalance(payload));

    const actions = [
      { type: UPDATE_TOTAL_BALANCE, payload: { balance: 0, currency: "EUR" } },
    ];
    expect(store.getActions()).toEqual(actions);
  });
});

afterAll(() => {
  jest.unmock("../balance");
});
