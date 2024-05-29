import axios from "axios";
import service from "../../services/service";
import setAuthToken from "../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import Store from "../../Store";
import { setSpinnerFlag } from "./SpinnerAction";
import { formatData } from "./AccessActions";
export const login = (data: any, isSuccess: Function, isError: Function) => (dispatch: any) => {
  Store.dispatch(setSpinnerFlag(true));
  axios
    .post(service.baseURL + "/auth/login", data)
    .then((res) => {
      Store.dispatch(setSpinnerFlag(false));
      if (res.status === 200) {
        // //console.log(res.data.data)
        const { authToken } = res.data.data;
        const { id } = res.data.data;
        const { profilePic } = res.data.data;
        localStorage.setItem("authToken", authToken);
        localStorage.setItem("parent", id);
        setAuthToken(authToken, id);

        
        const decoded:{access:any} = jwt_decode(authToken);
        dispatch(SetCurrentUser(decoded));
        isSuccess(res)
      }
    })
    .catch((error) => {
      Store.dispatch(setSpinnerFlag(false));
      isError(error.response);
      console.log(error);
    });
};




export const SetCurrentUser = (decoded: any) => {
  return {
    type: "SET_USER",
    payload: decoded,
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("parent");
  setAuthToken(false, false);
  console.log("logout called");
  dispatch({
    type: "REMOVE_USER",
    payload: {},
  });
};
