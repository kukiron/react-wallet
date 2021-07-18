import unionBy from "lodash.unionby";
import createReducer from "../utils/createReducer";
import {
  CREATE_RECORD,
  DELETE_RECORD,
  DELETE_HISTORY,
  RESET_STATE,
} from "../actions/types";

const initialState = [];

const createRecord = (state, payload) => unionBy([payload], state, "id");

const deleteRecord = (state, payload) =>
  state.filter(({ id }) => id !== payload.id);

const functionsMap = {
  [CREATE_RECORD]: createRecord,
  [DELETE_RECORD]: deleteRecord,
  [DELETE_HISTORY]: () => initialState,
  [RESET_STATE]: () => initialState,
};

export default createReducer(initialState, functionsMap);
