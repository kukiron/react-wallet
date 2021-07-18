import { createStore, applyMiddleware } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import { createLogger } from "redux-logger";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";

import rootReducer from "./reducers";

const persistConfig = { key: "root", storage };

const logger = createLogger({
  predicate: () => process.env.NODE_ENV === "development",
});

export const configureStore = (initialState = {}) => {
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  const store = createStore(
    persistedReducer,
    initialState,
    applyMiddleware(reduxThunk, logger)
  );
  const persistor = persistStore(store);

  return { store, persistor };
};
