const initialData: any = {
    accessRoutes: {},
  };

  const AccessReducer = (state = initialData, action: any) => {

    switch (action.type) {
      case "GET_ACCESS_ROUTES":
     
        
        initialData.accessRoutes = action.payload
        return {
          ...state,
        };
      default:
        return state;
    }
  };
  
  export default AccessReducer;
  