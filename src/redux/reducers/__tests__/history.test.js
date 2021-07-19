import reducer from "../history";

describe("history", () => {
  it("should create a new record", () => {
    const state = [];
    const payload = {
      id: "01",
      description: "foo",
      amount: 100,
      currency: "USD",
    };
    const action = { type: "CREATE_RECORD", payload };
    const expected = [payload];
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it("should delete a record", () => {
    const state = [
      {
        id: "01",
        description: "foo",
        amount: 100,
        currency: "USD",
      },
      {
        id: "02",
        description: "bar",
        amount: 200,
        currency: "CHF",
      },
    ];
    const action = {
      type: "DELETE_RECORD",
      payload: { id: "02" },
    };
    const expected = [
      {
        id: "01",
        description: "foo",
        amount: 100,
        currency: "USD",
      },
    ];
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it("should delete entire history", () => {
    const state = [
      {
        id: "01",
        description: "foo",
        amount: 100,
        currency: "USD",
      },
      {
        id: "02",
        description: "bar",
        amount: 200,
        currency: "CHF",
      },
    ];
    const action = { type: "DELETE_HISTORY" };
    const expected = [];
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });

  it("should reset the state", () => {
    const state = [{ id: "01" }, { id: "02" }];
    const action = {
      type: "RESET_STATE",
    };
    const expected = [];
    const actual = reducer(state, action);
    expect(actual).toEqual(expected);
  });
});
