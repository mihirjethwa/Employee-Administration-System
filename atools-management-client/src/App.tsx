import React, { useEffect, useState } from "react";
import "./App.scss";
import "antd/dist/antd.css";
import "./Style.scss";
import "./index.css";
import Layout from "antd/lib/layout/layout";
import jwt_decode from "jwt-decode";
import Store from "./Store";
import { Route, Switch } from "react-router";
import HeaderMenu from "./components/header/HeaderMenu";
import Login from "./components/authentication/Login";
import ForgotPassword from "./components/authentication/ForgotPassword";
import ResetPassword from "./components/authentication/ResetPassword";
import List from "./components/atools-services/list";
import EmployeeMain from "./components/atools-services/view-flow/employeeMain";
import StoreMaster from "./components/atools-master/components/storeMaster";
import HolidayLogMaster from "./components/atools-master/components/holidaylogMaster";
import RoleMaster from "./components/atools-master/components/roleMaster";
import AccessMaster from "./components/atools-master/components/accessMaster";
import DocumentMaster from "./components/atools-master/components/documentMaster";
import LocationMaster from "./components/atools-master/components/locationMaster";
import DocumentMasterNew from "./components/atools-master/components/documentMasterNew";
import MasterMain from "./components/atools-master/masterMain";
import AddEmployee from "./components/atools-services/create-flow/addEmployeeMain";
import NationalityMaster from "./components/atools-master/components/nationalityMaster";
import SetAuthToken from "./utils/setAuthToken";
import { SetCurrentUser } from "./redux/actions/AuthActions";
import { logoutUser } from "./redux/actions/AuthActions";
import { formatData } from "./redux/actions/AccessActions";
import ErrorModal from "./utils/ErrorModal";
import { useSelector } from "react-redux";
import { Spin } from "antd";
import ProtectedRoute from "./components/common/protectedRoute/ProtectedRoute";
import { useDispatch } from "react-redux";
import TestComp from "./components/authentication/TestComp";
const routePaths = require("./components/common/roles/RoutePaths");
function App() {
  const dispatch = useDispatch();
  const sessionData = useSelector((state: any) => state.session.SessionTimeOut);
  const spinner = useSelector((state: any) => state.spinner.spinner);
  const [session, setSession] = useState(sessionData);

  if (localStorage.authToken) {
    SetAuthToken(localStorage.authToken, localStorage.parent);
    const decoded = jwt_decode(localStorage.authToken);
    Store.dispatch(SetCurrentUser(decoded));
  } else {
    dispatch(logoutUser());
  }

  // useEffect(() => {
  //   setSession(sessionData.SessionTimeOut);
  // }, [sessionData]);

  return (
    <Layout className='mainLayout'>
      <HeaderMenu></HeaderMenu>
      <Spin spinning={spinner} size='large'>
        <ErrorModal set={sessionData} />
        <Switch>
          <Route path='/' exact component={Login}></Route>
          <Route path='/login' exact component={Login}></Route>
          <Route path='/forgot-password' exact component={ForgotPassword}></Route>
          <Route path='/reset-password' exact component={ResetPassword}></Route>
          <Route path='/list' component={List}></Route>
          <ProtectedRoute path='/services/addEmployee/store-and-title' accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]} component={AddEmployee}></ProtectedRoute>
          <ProtectedRoute path='/services/addEmployee/general-details' accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]} component={AddEmployee}></ProtectedRoute>
          <ProtectedRoute path='/services/addEmployee/payroll-details' accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]} component={AddEmployee}></ProtectedRoute>
          <ProtectedRoute path='/services/addEmployee/right-to-work' accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]} component={AddEmployee}></ProtectedRoute>
          <ProtectedRoute path='/services/addEmployee/additional-documents' accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]} component={AddEmployee}></ProtectedRoute>
          <ProtectedRoute path='/services/addEmployee/summary' accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]} component={AddEmployee}></ProtectedRoute>
          <ProtectedRoute path='/services/employee-manager' accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]} component={EmployeeMain}></ProtectedRoute>
          <ProtectedRoute path='/master-main' component={MasterMain}></ProtectedRoute>
          <ProtectedRoute path='/master/location-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={LocationMaster}></ProtectedRoute>
          <ProtectedRoute path='/master/store-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={StoreMaster}></ProtectedRoute>
          <ProtectedRoute path='/master/holiday-log-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={HolidayLogMaster}></ProtectedRoute>
          <ProtectedRoute path='/master/role-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={RoleMaster}></ProtectedRoute>
          <ProtectedRoute path='/master/document-selector-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={DocumentMaster}></ProtectedRoute>
          <ProtectedRoute path='/master/access-manager-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={AccessMaster}></ProtectedRoute>
          <ProtectedRoute path='/master/nationality-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={NationalityMaster}></ProtectedRoute>
          <ProtectedRoute path='/master/document-access-master' accessModules={["View_Master_Manager", "Edit_Master_Manager"]} component={DocumentMasterNew}></ProtectedRoute>
        </Switch>
      </Spin>
    </Layout>
  );
}

export default App;
