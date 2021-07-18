import { combineReducers } from "redux";

import total from "./total";
import currencies from "./currencies";
import history from "./history";

const rootReducer = combineReducers({
  total,
  currencies,
  history,
});

export default rootReducer;
