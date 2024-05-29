import React from "react";
import axios from "axios";

const SetAuthToken = (token: any, parent: any) => {
  if (token) {
    axios.defaults.headers.common["Accept"] = `application/json`;
    axios.defaults.headers.get["Content-Type"] = `application/json`;
    axios.defaults.headers.put["Content-Type"] = `application/json`;
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    if (localStorage.parent) axios.defaults.headers.common["parent"] = localStorage.parent;
  } else {
    delete axios.defaults.headers.common["Authorization"];
    if (localStorage.parent) delete axios.defaults.headers.common["parent"];
  }
};

export default SetAuthToken;
