const initialData: any = {
  isAuthenticated: false,
  user: {},
};

const AuthReducer = (state = initialData, action: any) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        isAuthenticated: true,
        user: { ...action.payload},
      };
    case "REMOVE_USER":
      return {
        ...state,
        isAuthenticated: false,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default AuthReducer;
