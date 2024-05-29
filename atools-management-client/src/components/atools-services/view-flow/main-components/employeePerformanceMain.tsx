import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input, Form, Card, Skeleton } from "antd";
import EmployeePerformanceSecOne from "../sub-components/employeePerformanceSec1";
import EmployeePerformanceSecTwo from "../sub-components/employeePerformanceSec2";

import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";

const { Option } = Select;
function EmployeePerformanceMain(props: any) {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  var martialStatusOpt = ["Single", "Married", "Widow"];
  var relationshipOpt = ["Father", "Mother", "Brother", "Sister", "Son", "Daughter", "Uncle", "Aunt"];
  switch (props.ActiveSection) {
    case 1:
      return <EmployeePerformanceSecOne selectedEmployee={props.selectedEmployee} activeKey={props.activeKey} />;
      break;
    case 2:
      return <EmployeePerformanceSecTwo selectedEmployee={props.selectedEmployee} activeKey={props.activeKey} />;
      break;
    default:
      return <EmployeePerformanceSecOne />;
      break;
  }
}
export default EmployeePerformanceMain;
