import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import RootReducers from "./redux/reducers/RootReducers";

const Store = createStore(RootReducers, composeWithDevTools(applyMiddleware(thunk)));

export default Store;
