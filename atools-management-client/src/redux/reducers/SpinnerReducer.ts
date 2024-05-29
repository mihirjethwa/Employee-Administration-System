const initialData: any = {
  spinner: false,
};

const SpinnerReducer = (state = initialData, action: any) => {
  // //console.log(action.payload)
  switch (action.type) {
    case "SET_FLAG":
      return {
        ...state,
        spinner: action.payload,
      };
    default:
      return state;
  }
};

export default SpinnerReducer;
