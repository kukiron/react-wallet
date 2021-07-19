import reducer from "../currencies";

const initialState = [{ balance: 0, currency: "USD" }];

describe("currencies", () => {
  it("should add a new currency with balance", () => {
    const state = initialState;
    const action = {
      type: "ADD_CURRENCY",
      payload: {
        balance: 100,
        currency: "EUR",
      },
    };
    const expected = [
      { balance: 100, currency: "EUR" },
      { balance: 0, currency: "USD" },
    ];
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it("should exchange between two currencies", () => {
    const state = [
      { balance: 1000, currency: "USD" },
      { balance: 1000, currency: "EUR" },
    ];
    const action = {
      type: "EXCHANGE_CURRENCY",
      payload: {
        current: {
          balance: 9000,
          currency: "USD",
        },
        exchangeTo: {
          balance: 1084.57,
          currency: "EUR",
        },
      },
    };
    const expected = [
      { balance: 9000, currency: "USD" },
      { balance: 1084.57, currency: "EUR" },
    ];
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it("should delete a currency", () => {
    const state = [
      { balance: 1000, currency: "USD" },
      { balance: 1000, currency: "EUR" },
    ];
    const action = {
      type: "DELETE_CURRENCY",
      payload: { currency: "EUR" },
    };
    const expected = [{ balance: 1000, currency: "USD" }];
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it("should reset the state", () => {
    const state = [
      { balance: 1000, currency: "USD" },
      { balance: 1000, currency: "EUR" },
    ];
    const action = {
      type: "RESET_STATE",
    };
    const expected = initialState;
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });
});
