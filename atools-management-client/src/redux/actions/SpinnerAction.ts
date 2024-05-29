export const setSpinnerFlag = (flag: boolean) => {
  return {
    type: "SET_FLAG",
    payload: flag,
  };
};
