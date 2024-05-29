const initialData: any = {
  SessionTimeOut: false,
};

const SessionTimeOutReducer = (state = initialData, action: any) => {
  // //console.log(action.payload)
  switch (action.type) {
    case "SET_SESSION_FLAG":
      return {
        ...state,
        SessionTimeOut: action.payload,
      };
    default:
      return state;
  }
};

export default SessionTimeOutReducer;
