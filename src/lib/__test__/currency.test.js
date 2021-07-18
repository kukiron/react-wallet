import { getConversionRates, getBalance } from "../currency";

const rates = {
  USD: 1,
  EUR: 0.8457,
  CHF: 0.9194,
};

beforeEach(() => {
  global.fetch = jest.fn().mockImplementation(async () => ({
    json: async () => ({ conversion_rates: rates }),
  }));
});

afterEach(() => {
  global.fetch.mockReset();
});

describe("getConversionRates", () => {
  it("should return conversation rates", async () => {
    const conversionRates = await getConversionRates();

    expect(conversionRates).toEqual(rates);
  });

  it("should return empty array if conversion rates is invalid", async () => {
    global.fetch = jest.fn().mockImplementation(async () => ({
      json: async () => ({ conversion_rates: undefined }),
    }));
    const conversionRates = await getConversionRates();

    expect(conversionRates).toEqual([]);
  });

  it("should throw an error for failed conversion rates", async () => {
    global.fetch = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject({ SUCCESS: false }));

    await expect(getConversionRates()).rejects.toThrow(
      "Currency coversion cannot be fetched now"
    );
  });
});

describe("getBalance", () => {
  it("should return the converted balance", async () => {
    const input = {
      amount: 10000,
      current: "USD",
      converted: "EUR",
    };
    const convertedAmount = await getBalance(input);

    expect(convertedAmount).toEqual(8457);
  });

  it("should return the balance in USD in absebce of converted currency", async () => {
    const input = {
      amount: 9194,
      current: "CHF",
    };
    const convertedAmount = await getBalance(input);

    expect(convertedAmount).toEqual(10000);
  });
});
