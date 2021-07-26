import { v4 as uuidv4 } from "uuid";
import {
  getHistoryRecord,
  formatBalance,
  formatDate,
  confirmDelete,
} from "../utils";

jest.mock("uuid");

const mockedDate = new Date(2010, 10, 10);
const date = mockedDate.toISOString();

beforeEach(() => {
  global.Date = jest.fn().mockImplementation(() => mockedDate);
});

afterEach(() => {
  global.Date.mockReset();
});

describe("getHistoryRecord", () => {
  it("should return history record object", () => {
    uuidv4.mockImplementation(() => "testId");

    const input = { balance: 100, currency: "BDT", exchangeToCurrency: "USD" };
    const record = getHistoryRecord(input);

    expect(record).toStrictEqual({
      id: "testId",
      amount: input.balance,
      currency: "BDT",
      description: "Exchanged from BDT to USD",
      date,
    });
  });

  it("should return correct description if there's no change currency", () => {
    const input = { balance: 100, currency: "USD" };
    const record = getHistoryRecord(input);

    expect(record.description).toEqual("Balance deposited");
  });
});

describe("formatDate", () => {
  describe("if date is passed", () => {
    it("should return long & short date string", () => {
      const { long, short } = formatDate();

      expect(short).toEqual("November 10, 2010");
      expect(long).toEqual("Wednesday, November 10, 2010");
    });
  });

  describe("if date is not passed", () => {
    it("should return long & short date string", () => {
      const { long, short } = formatDate(date);

      expect(short).toEqual("November 10, 2010");
      expect(long).toEqual("Wednesday, November 10, 2010");
    });
  });
});

describe("formatBalance", () => {
  it("should format number into comma separated string", () => {
    const formattedBalance = formatBalance(10000);

    expect(formattedBalance).toEqual("10,000.00");
  });
});

describe("confirmDelete", () => {
  const callback = jest.fn();

  it("should call the passed callback after confirmation", () => {
    global.confirm = () => true;
    confirmDelete({ callback });

    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should not call the passed callback after rejection", () => {
    global.confirm = () => false;
    confirmDelete({ callback });

    expect(callback).toHaveBeenCalledTimes(0);
  });
});
