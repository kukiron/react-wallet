import reducer from "../total";

const initialState = { balance: 0, currency: "USD" };

describe("total", () => {
  it("should update total balance", () => {
    const state = initialState;
    const payload = { balance: 100, currency: "BDT" };
    const action = { type: "UPDATE_TOTAL_BALANCE", payload };
    const expected = payload;
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it("should reset the state", () => {
    const state = { balance: 100, currency: "USD" };
    const action = { type: "RESET_STATE" };
    const expected = initialState;
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });
});
