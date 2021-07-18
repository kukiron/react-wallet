import { createRecord, deleteRecord, deleteHistory } from "../history";
import { CREATE_RECORD, DELETE_RECORD, DELETE_HISTORY } from "../types";

describe("createRecord", () => {
  it("should create a transaction record", () => {
    const payload = {
      id: "01",
      amount: 100,
      currency: "USD",
      description: "foo",
    };
    const expectedAction = {
      type: CREATE_RECORD,
      payload,
    };

    expect(createRecord({ record: payload })).toEqual(expectedAction);
  });
});

describe("deleteRecord", () => {
  it("should delete a transaction record", () => {
    const payload = { id: "01" };
    const expectedAction = { type: DELETE_RECORD, payload };

    expect(deleteRecord(payload)).toEqual(expectedAction);
  });
});

describe("deleteHistory", () => {
  it("should delete the transaction history", () => {
    const expectedAction = { type: DELETE_HISTORY };
    expect(deleteHistory()).toEqual(expectedAction);
  });
});
