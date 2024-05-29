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
function EmployeeOverviewSecTwo(params: any) {
  const [form] = Form.useForm();

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  const dataSource = [
    {
      key: "1",
      description: "Welcome to Dominos",
      type: "Notice",
      createdBy: "Harry Gardener",
      issued: "07/01/2021	",
    },
    {
      key: "2",
      description: "Instore Induction Plan",
      type: "Notice",
      createdBy: "Harry Gardener",
      issued: "07/01/2021	",
    },
    {
      key: "3",
      description: "Wash Your Hands",
      type: "Notice",
      createdBy: "Harry Gardener",
      issued: "07/01/2021	",
    },
  ];
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Created by",
      dataIndex: "createdBy",
      key: "createdBy",
    },
    {
      title: "Issued",
      dataIndex: "issued",
      key: "issued",
    },
    {
      title: "Confirmed",
      dataIndex: "confirmed",
      key: "confirmed",
    },
  ];
  return (
    <>
      <Card title="Compliance & Learing Entries">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ["bottomLeft"] }}
        />
      </Card>
    </>
  );
}
export default EmployeeOverviewSecTwo;
