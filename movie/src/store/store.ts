import {createStore} from "redux";
import {isLoggedReducer} from "./reducers/isLoggedReducer";

const store = createStore(isLoggedReducer);

export default store;
