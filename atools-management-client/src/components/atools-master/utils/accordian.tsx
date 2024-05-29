import * as React from "react";
import { useEffect, useState } from "react";
import "./utils.scss";
import { Tabs, Card, Skeleton, List } from "antd";
import StoreMasterDrawer from "../../common/drawer/StoreMaster";
import LocationMasterDrawer from "../../common/drawer/LocationMaster";
import DocumentMasterDrawer from "../../common/drawer/DocumentMaster";
import RoleMaster from "../../common/drawer/RoleMaster";
import AccessMaster from "../../common/drawer/AccessMaster";
import HolidayMaster from "../../common/drawer/HolidayMaster";
import { DownOutlined, RightOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import service from "../../../services/service";

const AccordianMain = () => {
  const [StoreMasterd, setStoreMasterd] = useState(false);
  const [LocationMasterd, setLocationMasterd] = useState(false);
  const [RoleMasterd, setRoleMasterd] = useState(false);
  const [AccessMasterd, setAccessMasterd] = useState(false);
  const [HolidayMasterd, setHolidayMasterd] = useState(false);
  const [DocumentMasterd, setDocumentMasterd] = useState(false);
  
  const [count, setCount] = useState(null);

  let location = useLocation();

  const isSuccess = (response: any) => {
    console.log(response);
    setCount(response.data.data);
  };
  const isError = (error: any) => {
    console.log(error.message);
  };
  const getCountMaster = () => {
    service.getData("/master/count", isSuccess, isError);
  };

  useEffect(() => {
    getCountMaster();
  }, []);

  function showDrawer(item: any) {
    switch (item.id) {
      case 1:
        setStoreMasterd(true);
        break;
      case 2:
        setLocationMasterd(true);
        break;
      case 3:
        setHolidayMasterd(true);
        break;
      case 4:
        setStoreMasterd(true);
        break;
      case 5:
        setDocumentMasterd(true);

        break;
      case 6:
        setRoleMasterd(true);

        break;
      default:
        break;
    }
  }
  const drawerClose = () => {
    setStoreMasterd(false);
    setLocationMasterd(false);
    setRoleMasterd(false);
    setStoreMasterd(false);
    setHolidayMasterd(false);
    setDocumentMasterd(false);
  };
  const data = [
    { title: "Location Master", link: "location-master", number: count?.locationCount },
    { title: "Store Master", link: "store-master", number: count?.storeCount },
    { title: "Holiday Log Master", link: "holiday-log-master", number: count?.holidayCount },
    { title: "Role Master", link: "role-master", number: count?.roleCount },
    { title: "Document Selector Master", link: "document-selector-master", number: count?.documentCount },
    { title: "Access Manager Master", link: "access-manager-master", number: count?.accessCount },
    { title: "Nationality Master", link: "nationality-master", number: count?.nationalityCount },   
    { title: "Document Group Master", link: "document-access-master", number: count?.documentAccessCount},
  ];

  return (
    <>
      <List
        className='accordian mt-3'
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <>
            <Link
              to={{
                pathname: item.link,
              }}
            >
              <List.Item>
                <List.Item.Meta
                  className={location.pathname === "/master/" + item.link ? "master-active" : ""}
                  title={
                    <>
                      {item.title} ({item.number}) <RightOutlined />
                    </>
                  }
                />
              </List.Item>
            </Link>
          </>
        )}
      />
    
    </>
  );
};

export default AccordianMain;
