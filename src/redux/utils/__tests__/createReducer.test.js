import createReducer from "../createReducer";
import { RESET_STATE } from "../../actions/types";

const initialState = "";
const functionsMap = {
  [RESET_STATE]: () => initialState,
};

it("should create a reducer and return state for the type", () => {
  const state = "foo";
  const handler = createReducer(initialState, functionsMap);
  const actual = handler(state, { type: RESET_STATE });
  const expected = "";

  expect(actual).toEqual(expected);
});

it("should create a reducer and return the previous state for unrecognized type", () => {
  const state = "foo";
  const handler = createReducer(initialState, functionsMap);
  const actual = handler(state, { type: "SOME_TYPE" });
  const expected = "foo";

  expect(actual).toEqual(expected);
});
