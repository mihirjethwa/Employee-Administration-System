export const setSessionTimeOut = (flag: boolean) => {
  return {
    type: "SET_SESSION_FLAG",
    payload: flag,
  };
};

