import { configureStore } from "@reduxjs/toolkit";
import countrysReducer from "./features/countrys/countrysSlice";

export default configureStore({
  reducer: {
    countrys: countrysReducer,
  },
});
