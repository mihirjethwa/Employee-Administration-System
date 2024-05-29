import axios from "axios";
import { environment } from "../config/environment.staging";
import Store from "../Store";
import { setSpinnerFlag } from "../redux/actions/SpinnerAction";
import { setSessionTimeOut } from "../redux/actions/SessionTimeoutAction";

const service = {
  serviceHeader: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  serviceHeaderFormData: {
    Accept: "application/json",
    "Content-Type": "multipart/form-data",
  },
  baseURL: environment.HOST + "/" + environment.VERSION,

  async downloadFile(url: any, fileName, isError: any) {
    Store.dispatch(setSpinnerFlag(true));
    axios
      .get(this.baseURL + url, { headers: service.serviceHeader, ...{responseType: "arraybuffer"} })
      .then((response) => {
        Store.dispatch(setSpinnerFlag(false));
        if (response.status === 200) {
          const blob = new Blob([response.data]);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = fileName;
          link.click();  
        }
      })
      .catch((error) => {
        Store.dispatch(setSpinnerFlag(false));
        console.log("====error===");
        console.log(error);
        if (error?.response?.status == 401) {
          Store.dispatch(setSessionTimeOut(true));
          localStorage.clear();
        } else isError(error);
      });
  },
  async getData(url: any, isSuccess: any, isError: any, headers?) {
    Store.dispatch(setSpinnerFlag(true));
    axios
      .get(this.baseURL + url, { headers: service.serviceHeader, ...headers })
      .then((response) => {
        Store.dispatch(setSpinnerFlag(false));
        if (response.status === 200) {
          isSuccess(response);
          return response.data.data;
        }
      })
      .catch((error) => {
        Store.dispatch(setSpinnerFlag(false));
        ////console.log(error)
        console.log("====error===");
        console.log(error);
        if (error?.response?.status == 401) {
          Store.dispatch(setSessionTimeOut(true));
          localStorage.clear();
        } else isError(error);
      });
  },

  async postData(url: any, data: any, isSuccess: any, isError: any) {
    Store.dispatch(setSpinnerFlag(true));
    axios
      .post(this.baseURL + url, data, { headers: data instanceof FormData ? service.serviceHeaderFormData : service.serviceHeader })
      .then((response) => {
        Store.dispatch(setSpinnerFlag(false));
        if (response.status === 200) {
          isSuccess(response);
          //////////////console.log(response.headers);
        }
      })
      .catch(function (error) {
        console.log(error);
        Store.dispatch(setSpinnerFlag(false));
        if (error?.response?.status == 401) {
          localStorage.clear();
          Store.dispatch(setSessionTimeOut(true));
        } else isError(error?.response?.data?.status);
      });
  },

  async putData(url: any, data: any, isSuccess: any, isError: any) {
    Store.dispatch(setSpinnerFlag(true));
    axios
      .put(this.baseURL + url, data, { headers: service.serviceHeader })
      .then((response) => {
        Store.dispatch(setSpinnerFlag(false));
        if (response.status === 200) {
          isSuccess(response);
          //console.log(response.headers);
        }
      })
      .catch(function (error) {
        //console.log(error?.response);
        Store.dispatch(setSpinnerFlag(false));
        if (error?.response?.status == 401) {
          localStorage.clear();
          Store.dispatch(setSessionTimeOut(true));
        } else isError(error?.response?.data?.status);
      });
  },

  async deleteData(url: any, isSuccess: any, isError: any) {
    Store.dispatch(setSpinnerFlag(true));
    axios
      .delete(this.baseURL + url, { headers: service.serviceHeader })
      .then(function (response) {
        Store.dispatch(setSpinnerFlag(false));
        if (response.status === 200) {
          isSuccess(response);
          //console.log(response.headers);
        }
      })
      .catch(function (error) {
        Store.dispatch(setSpinnerFlag(false));
        if (error?.response?.status == 401) {
          localStorage.clear();
          Store.dispatch(setSessionTimeOut(true));
        } else isError(error?.response?.data?.status);
      });
  },

  async getThirdpartyData(url: any, isSuccess: any, isError: any) {
    axios
      .get(url)
      .then((response) => {
        if (response.status === 200) {
          isSuccess(response);
        }
      })
      .catch(function (error) {
        isError(error.response);
      });
  },
};

export default service;
