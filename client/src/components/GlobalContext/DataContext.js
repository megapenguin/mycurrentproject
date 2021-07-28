import React, { createContext, useEffect, useReducer } from "react";
import DataReducer from "../GlobalReducer/DataReducer";

const DataContext = createContext();

let initialState = {
  dataHolder: {},
};

function DataContextProvider({ children }) {
  let [dataState, dispatch] = useReducer(DataReducer, initialState);

  const passData = (data) => {
    dispatch({
      type: "PASS_DATA",
      dataHolder: data,
    });

    return { success: true };
  };

  return (
    <DataContext.Provider value={{ dataState, passData }}>
      {children}
    </DataContext.Provider>
  );
}

export { DataContextProvider, DataContext };
