import { createStore } from "redux";
import coreReducer from "./reducers";
export default createStore(
    coreReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
