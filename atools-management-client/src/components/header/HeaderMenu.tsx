import React, { useEffect, useState } from "react";
import { Header } from "antd/lib/layout/layout";
import { logoutUser } from "../../redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Header.scss";
import ProfilePic from "../../assets/list/profile.png";
import ATools from "../../assets/header/ATools..svg";
import { Popover, Button, Menu, Avatar } from "antd";
import { DownOutlined } from "@ant-design/icons";
import RBAC from "../../utils/rbac";
import { useHistory } from "react-router-dom";
const { SubMenu } = Menu;

const HeaderMenu = () => {
  const [current, SetCurrent] = useState("view_employee");
  const userData = useSelector((state: any) => state.auth);
  console.log(userData);
  const dispatch = useDispatch();
  let history = useHistory();
  const handleClick = (e: any) => {
    SetCurrent(e.key);
  };

  const signOut = () => {
    dispatch(logoutUser());
    history.push({
      pathname: "/login",
    });
  };

  return (
    <Header className='header'>
      <div className='logo'>
        <img src={ATools} alt='logo' />
      </div>
      {userData.isAuthenticated ? (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div className='leftNavSection'>
            <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
              <SubMenu
                key='Services'
                title={
                  <>
                    Services <DownOutlined />
                  </>
                }
                popupClassName='submenu'
              >
                <Menu.ItemGroup title='Recent Services'>
                  <Menu.Item key='Service_Employee_Manager'>
                    <Link to='/services/employee-manager'> Employee Manager</Link>
                  </Menu.Item>
                  <Menu.Item key='Service_Document_Manager'>Document Manager</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='Upcoming Services'>
                  <Menu.Item key='Service_Task_Manager'>Task Manager</Menu.Item>
                  <Menu.Item key='Service_Scheduling'>Scheduling</Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <Menu.Item key='Dashboard'>
                Dashboard <span className='mx-2'>&nbsp;</span>
              </Menu.Item>

              <SubMenu
                key='Employees'
                title={
                  <>
                    Employees <DownOutlined />
                  </>
                }
                popupClassName='submenu'
              >
                <Menu.ItemGroup title=''>
                  <Menu.Item key='view_employee'>
                    <Link to='/services/employee-manager'>View Employees</Link>
                  </Menu.Item>
                  <Menu.Item key='add_employee'>
                    <Link to='/services/addEmployee/store-and-title'>Add Employee</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>

              <SubMenu
                key='Masters'
                title={
                  <>
                    Masters <DownOutlined />
                  </>
                }
                popupClassName='submenu'
              >
                <Menu.ItemGroup title='Master Book'>
                  <Menu.Item key='Masters_Location_Master'>
                    <Link to='/master/location-master'> Location Master</Link>
                  </Menu.Item>
                  <Menu.Item key='Masters_Store_Master'>
                    <Link to='/master/store-master'>Store Master</Link>
                  </Menu.Item>
                  <Menu.Item key='Masters_Holiday_Log_Manager'>
                    <Link to='/master/holiday-log-master'>Holiday Log Manager</Link>
                  </Menu.Item>
                  <Menu.Item key='Masters_Role_Manager'>
                    <Link to='/master/role-master'>Role Manager</Link>
                  </Menu.Item>
                  <Menu.Item key='Masters_Document_Seletor'>
                    <Link to='/master/document-selector-master'>Document Selector</Link>
                  </Menu.Item>
                  <Menu.Item key='Masters_Access_Manager'>
                    <Link to='/master/access-manager-master'>Access Manager</Link>
                  </Menu.Item>
                  <Menu.Item key='Nationality_Manager'>
                    <Link to='/master/nationality-master'>Nationality Master</Link>
                  </Menu.Item>
                  <Menu.Item key='Nationality_Manager'>
                    <Link to='/master/document-access-master'>Document Group Master</Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item key='Settings'>
                Settings <span className='mx-2'>&nbsp;</span>
              </Menu.Item>
            </Menu>
          </div>
          <div className='rightNavSection'>
            <Menu onClick={handleClick} selectedKeys={[current]} mode='horizontal'>
              <SubMenu
                key='Profile'
                title={
                  <div className='d-flex align-items-center Profile' style={{ fontFamily: "Inter" }}>
                    <div>
                      {/* <Avatar size={40} src={ProfilePic} alt='' /> */}
                      <Avatar size={40} style={{ backgroundColor: "#5A4992" }}>
                        {/* {userData.user.userName.split(" ")[0].split("")[0]?.toUpperCase()}
                        {userData.user.userName.split(" ")[1].split("")[0].toUpperCase()} */}
                        {userData.user.firstName[0]?.toUpperCase()}
                        {userData.user.lastName[0]?.toUpperCase()}
                      </Avatar>
                    </div>
                    <div className='d-flex justify-content-between w-100'>
                      <div className='d-flex flex-column ml-2 align-self-center mr-1'>
                        <p className='inter-body2-medium mb-0' style={{ wordWrap: "break-word", wordBreak: "break-word" }}>
                          {userData.user.firstName}&nbsp;{userData.user.lastName}
                        </p>
                        <p
                          className='inter-body2-regular mb-0'
                          style={{
                            wordWrap: "break-word",
                            wordBreak: "break-word",
                            fontSize: 12,
                            color: "#FB8500",
                          }}
                        >
                          {userData.user?.store?.storeName}
                        </p>
                      </div>
                      <div className='ml-2'>
                        <DownOutlined className='mr-0' />
                      </div>
                    </div>{" "}
                  </div>
                }
                popupClassName='submenu'
              >
                <Menu.ItemGroup title='Profile'>
                  <Menu.Item key='Profile_Edit_Profile'>Edit Profile</Menu.Item>
                  <Menu.Item key='Profile_Change_Password'>Change Password</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='Help'>
                  <Menu.Item key='Profile_FAQ'>F.A.Q.</Menu.Item>
                  <Menu.Item key='Profile_Req_a_Callback'>Request a Callback</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title='Sign Out' className='mb-3'>
                  <Menu.Item key='Signout' onClick={() => signOut()}>
                    Sign out
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            </Menu>
          </div>
        </div>
      ) : (
        <div className='rightNavSection'>
          <Button className='freetrial'>Start Free Trial</Button>
          <Button className='rightMenuItem'>
            <Link to='/login'> Login</Link>
          </Button>
        </div>
      )}
    </Header>
  );
};
export default HeaderMenu;
