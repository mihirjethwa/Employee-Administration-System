import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import SessionTimeOutReducer from "./SessionTimeoutReducer";
import SpinnerReducer from "./SpinnerReducer";
import AccessReducer from "./AccessReducer";

const RootReducers: any = combineReducers({
  access:AccessReducer,
  spinner: SpinnerReducer,
  auth: AuthReducer,
  session: SessionTimeOutReducer,
});

// export type RootState = ReturnType<typeof RootReducers>;
export default RootReducers;
