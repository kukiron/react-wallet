import logger from "./logger";

export const getConversionRates = async () => {
  try {
    const api = `https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_EXCHANGE_RATE_API}/latest/USD`;
    const data = await fetch(api);
    const { conversion_rates: rates } = await data.json();
    return rates || [];
  } catch (error) {
    logger.log("Error while fetching conversion rates", error);
    throw new Error("Currency coversion cannot be fetched now");
  }
};

export const getBalance = async ({ amount, current, converted = "USD" }) => {
  const conversionRates = await getConversionRates();
  return (
    Number(amount) * (conversionRates[converted] / conversionRates[current])
  );
};
