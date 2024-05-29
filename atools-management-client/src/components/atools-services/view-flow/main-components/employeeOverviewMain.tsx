import * as React from "react";
import { useState, useEffect } from "react";
import {
  Table,
  Row,
  Col,
  Avatar,
  Button,
  Tag,
  Select,
  Radio,
  Input,
  Form,
  Card,
  Skeleton,
} from "antd";
import EmployeeOverviewSecOne from "../sub-components/employeeOverviewSec1";
import EmployeeOverviewSecTwo from "../sub-components/employeeOverviewSec2";

import {
  PictureOutlined,
  UserOutlined,
  EditOutlined,
  EyeOutlined,
  SearchOutlined,
  DownloadOutlined,
  PlusOutlined,
  FilterOutlined,
  ArrowRightOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const { Option } = Select;
function EmployeeOverviewMain(props: any) {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  var martialStatusOpt = ["Single", "Married", "Widow"];
  var relationshipOpt = [
    "Father",
    "Mother",
    "Brother",
    "Sister",
    "Son",
    "Daughter",
    "Uncle",
    "Aunt",
  ];
  switch (props.ActiveSection) {
    case 1:
      return <EmployeeOverviewSecOne />;
      break;
    case 2:
      return <EmployeeOverviewSecTwo />;
      break;
    default:
      return <EmployeeOverviewSecOne />;
      break;
  }
}
export default EmployeeOverviewMain;
