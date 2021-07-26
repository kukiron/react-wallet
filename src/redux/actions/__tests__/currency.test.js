import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { v4 as uuidv4 } from "uuid";

import {
  receiveAddCurrency,
  receiveExchangeCurrencies,
  receiveDeleteCurrency,
  addCurrency,
  exchangeCurrency,
  deleteCurrency,
} from "../currency";
import {
  ADD_CURRENCY,
  EXCHANGE_CURRENCY,
  DELETE_CURRENCY,
  UPDATE_TOTAL_BALANCE,
  CREATE_RECORD,
} from "../types";
import * as currency from "../../../lib/currency";
import * as utils from "../../../lib/utils";

jest.mock("uuid");
jest.mock("../../../lib/currency");
jest.mock("../../../lib/utils");

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockedDate = new Date(2010, 10, 10);
const date = mockedDate.toISOString();

beforeEach(() => {
  global.Date = jest.fn().mockImplementation(() => mockedDate);
});

afterEach(() => {
  global.Date.mockReset();
});

describe("receiveAddCurrency", () => {
  it("should receive a new currency", () => {
    const payload = {
      balance: 100,
      currency: "CHF",
      createdAt: "2020-03-08T15:54:00.434Z",
    };
    const expectedAction = {
      type: ADD_CURRENCY,
      payload,
    };
    expect(receiveAddCurrency(payload)).toEqual(expectedAction);
  });
});

describe("receiveAddCurrency", () => {
  it("should receive a exchange between two currencies", () => {
    const payload = {
      current: {
        balance: 100,
        currency: "USD",
      },
      exchangeTo: {
        balance: 85,
        currency: "EUR",
      },
    };
    const expectedAction = {
      type: EXCHANGE_CURRENCY,
      payload,
    };
    expect(receiveExchangeCurrencies(payload)).toEqual(expectedAction);
  });
});

describe("receiveDeleteCurrency", () => {
  it("should delete a currency", () => {
    const payload = { currency: "AUD" };
    const expectedAction = { type: DELETE_CURRENCY, payload };

    expect(receiveDeleteCurrency(payload)).toEqual(expectedAction);
  });
});

describe("thunks", () => {
  beforeEach(() => {
    uuidv4.mockImplementation(() => "testId");
    currency.getBalance = jest.fn().mockImplementation(async () => 100);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("addCurrency", () => {
    const initialState = {
      total: { balance: 0, currency: "USD" },
      currencies: [{ balance: 0, currency: "USD" }],
    };
    const store = mockStore(initialState);
    const payload = {
      balance: 92,
      currency: "CHF",
      createdAt: date,
    };

    it("should dispatch `ADD_CURRENCY` & `UPDATE_TOTAL_BALANCE` with correct payloads", async () => {
      const record = {
        id: "testId",
        amount: payload.balance,
        currency: payload.currency,
        description: "Balance deposited",
        date,
      };
      utils.getHistoryRecord = jest.fn().mockReturnValueOnce(record);

      await store.dispatch(addCurrency(payload));
      const actions = [
        { type: ADD_CURRENCY, payload },
        {
          type: UPDATE_TOTAL_BALANCE,
          payload: { balance: 100, currency: "USD" },
        },
        {
          type: CREATE_RECORD,
          payload: record,
        },
      ];
      expect(store.getActions()).toEqual(actions);
    });
  });

  describe("exchangeCurrency", () => {
    const initialState = {
      total: { balance: 192, currency: "USD" },
      currencies: [
        { balance: 100, currency: "USD" },
        { balance: 100, currency: "CHF" },
      ],
    };
    const store = mockStore(initialState);
    const payload = {
      balance: 92,
      currency: "CHF",
      exchangeToCurrency: "USD",
    };

    it("should dispatch `EXCHANGE_CURRENCY` with correct payload", async () => {
      const record = {
        id: "testId",
        amount: payload.balance,
        currency: payload.currency,
        description: "Exchanged from CHF to USD",
        date,
      };
      utils.getHistoryRecord = jest.fn().mockReturnValueOnce(record);

      await store.dispatch(exchangeCurrency(payload));
      const actions = [
        {
          type: EXCHANGE_CURRENCY,
          payload: {
            exchangeTo: {
              balance: 200,
              currency: "USD",
              createdAt: date,
            },
            current: {
              balance: 8,
              currency: "CHF",
              createdAt: date,
            },
          },
        },
        {
          type: CREATE_RECORD,
          payload: record,
        },
      ];
      expect(store.getActions()).toEqual(actions);
    });
  });

  describe("deleteCurrency", () => {
    it("should dispatch `DELETE_CURRENCY` with correct payload", async () => {
      const initialState = {
        total: { balance: 100, currency: "USD" },
        currencies: [
          { balance: 100, currency: "USD" },
          { balance: 0, currency: "CHF" },
        ],
      };
      const store = mockStore(initialState);
      const payload = "CHF";

      await store.dispatch(deleteCurrency(payload));
      const actions = [
        {
          type: DELETE_CURRENCY,
          payload: { currency: "CHF" },
        },
      ];
      expect(store.getActions()).toEqual(actions);
    });

    it("should update total balance if active currency is removed", async () => {
      const initialState = {
        total: { balance: 92, currency: "CHF" },
        currencies: [
          { balance: 100, currency: "USD" },
          { balance: 0, currency: "CHF" },
        ],
      };
      const store = mockStore(initialState);
      const payload = "CHF";

      await store.dispatch(deleteCurrency(payload));
      const actions = [
        {
          type: UPDATE_TOTAL_BALANCE,
          payload: { balance: 100, currency: "USD" },
        },
        {
          type: DELETE_CURRENCY,
          payload: { currency: "CHF" },
        },
      ];
      expect(store.getActions()).toEqual(actions);
    });
  });
});

afterAll(() => {
  jest.unmock("uuid");
  jest.unmock("../../../lib/currency");
  jest.unmock("../../../lib/utils");
});
