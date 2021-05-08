export default (dataState, action) => {
  switch (action.type) {
    case "PASS_DATA":
      return {
        ...dataState,
        dataHolder: action.dataHolder,
      };

    case "LOADING":
      return { ...dataState };

    case "LOAD_DATA":
      return { ...dataState };
    default:
      return { ...dataState };
  }
};
