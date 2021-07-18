const loggingEnabled = process.env.REACT_APP_LOGGING_ENABLED === "true";

const log = (...messages) => {
  if (loggingEnabled) {
    console.log(...messages); // eslint-disable-line no-console
  }
};

const warning = (...messages) => {
  if (loggingEnabled) {
    console.warn(...messages); // eslint-disable-line no-console
  }
};

const error = (...messages) => {
  if (loggingEnabled) {
    console.error(...messages); // eslint-disable-line no-console
  }
};

export default { log, warning, error };
