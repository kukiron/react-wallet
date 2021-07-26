import { v4 as uuidv4 } from "uuid";

export const getHistoryRecord = (payload) => {
  const { balance, currency, exchangeToCurrency } = payload;
  return {
    id: uuidv4(),
    amount: Number(balance),
    currency,
    description: exchangeToCurrency
      ? `Exchanged from ${currency} to ${exchangeToCurrency}`
      : "Balance deposited",
    date: new Date().toISOString(),
  };
};

export const formatBalance = (balance) => {
  const options = {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  };
  return Number(balance).toLocaleString("en", options);
};

export const formatDate = (date) => {
  const commonOptions = { year: "numeric", month: "long", day: "numeric" };
  const currentDate = date ? new Date(date.substring(0, 10)) : new Date();
  const long = currentDate.toLocaleDateString("en", {
    ...commonOptions,
    weekday: "long",
  });
  const short = currentDate.toLocaleDateString("en", commonOptions);

  return { long, short };
};

export const confirmDelete = ({ callback, message = "Are you sure?" }) => {
  if (window.confirm(message)) {
    callback();
  }
};
