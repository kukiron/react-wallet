// common function for creating reducer in place of switch method
export default (initialState, functionsMap) =>
  (state = initialState, action) => {
    const { type, payload } = action;
    const handler = functionsMap[type];

    return handler ? handler(state, payload) : state;
  };
