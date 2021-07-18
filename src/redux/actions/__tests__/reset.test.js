import { resetState } from "../reset";
import { RESET_STATE } from "../types";

describe("resetState", () => {
  it("should dispatch `RESET_STATE` & reset to intial state", () => {
    const expectedAction = { type: RESET_STATE };

    expect(resetState()).toEqual(expectedAction);
  });
});
