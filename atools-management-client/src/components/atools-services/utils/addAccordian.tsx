import * as React from "react";
import { useEffect, useState } from "react";
import "./utils.scss";
import { Tabs, Card, Skeleton, List } from "antd";

import { DownOutlined, RightOutlined,CheckCircleFilled } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import service from "../../../services/service";

/**
 * Create Employee Flow Left panel
 */
const AddAccordian = ({pageOrder}) => {


  let location = useLocation();





  const data = [
    { title: "Store and Title Section", link: "store-and-title",order:1  },
    { title: "General Details", link: "general-details",order:2  },
    { title: "Payroll Details", link: "payroll-details",order:3 },
    { title: "Right to Work", link: "right-to-work",order:4 },
    { title: "Additional Documents", link: "additional-documents",order:5},
    { title: "Summary", link: "summary",order:6}
  ];

  return (
    <>
      <List
        className='accordian'
        itemLayout='horizontal'
        dataSource={data}
        renderItem={(item) => (
          <>
              <List.Item>
                <List.Item.Meta
                  className={location.pathname === "/services/addEmployee/" + item.link ? "master-active" : ""}
                  title={
                    <>
                   {item.order > pageOrder ? <span className="radio-icon"></span> : <CheckCircleFilled className="float-none orange-tick" />}   {item.title}  {location.pathname === "/services/addEmployee/" + item.link ?<RightOutlined /> : ""}
                    </>
                  }
                />
              </List.Item>
          </>
        )}
      />
    </>
  );
};

export default AddAccordian;
