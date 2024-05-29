import axios from "axios";
import service from "../../services/service";
import Store from "../../Store";
import { setSpinnerFlag } from "./SpinnerAction";

export const getAccessRoutes = (id,isSuccess?: Function,res?:any) => (dispatch: any) => {
  console.log("in Access Master");
  
  Store.dispatch(setSpinnerFlag(true));
  axios
    .get(service.baseURL + `/master/accessMaster`)
    .then((res) => {
      Store.dispatch(setSpinnerFlag(false));
      if (res.status === 200) {
        console.log(res.data.data);
        console.log(id);
        
        var data = res.data.data.filter(p => p.role._id === id)
        dispatch(formatData(data));
        localStorage.setItem("accessRoutes",JSON.stringify(data));
        if(res){
        }
      }

    })
    .catch((error) => {
      Store.dispatch(setSpinnerFlag(false));
      console.log(error);
    });
};

const makeRoutes = (data) =>{
    
  var obj = new Array();
  console.log(data);

   data[0].modulesAccess.map(k => {if(k.access === true){obj.push(k.name)}} )
  
return obj
  }


export const formatData = (data,isSuccess?: Function,res?:any) => {
    return {
      type: "GET_ACCESS_ROUTES",
      payload: makeRoutes(data),
    };
  };