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
function EmployeeOverviewSecOne(params: any) {
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
      name: "Erika",
      employeeRef: "405512",
      company: "Barnsley",
      process_date: "07/01/2021	",
      net_pay: "10000",
    },
    {
      key: "2",
      name: "Erika",
      employeeRef: "405512",
      company: "Barnsley",
      process_date: "07/01/2021	",
      net_pay: "10000",
    },
  ];
  const columns = [
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Certificate",
      dataIndex: "certificate",
      key: "certificate",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "Uploaded on",
      dataIndex: "uploadedon",
      key: "uploadedon",
    },
    {
      title: "Course Date",
      dataIndex: "course_date",
      key: "course_date",
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
  ];
  return (
    <>
      <Card title="Employee Details">
        {/* <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form'>
       <Form.Item label='Employee' name='employee' >
            <Input placeholder='Employee' />
          </Form.Item>
          <Form.Item label='Start Date' name='startDate' >
            <Input placeholder='Start Date' />
          </Form.Item>
          <Form.Item label='Job' name='job'>
            <Input placeholder='Job' />
          </Form.Item>
          </Form> */}
        <Row>
          <Col span={6}>
            <p className="inter-body2-medium">Employee:</p>
          </Col>
          <Col span={18}>
            <p>Null</p>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <p className="inter-body2-medium">Start Date:</p>
          </Col>
          <Col span={18}>
            <p>Null</p>
          </Col>
        </Row>
        <Row>
          <Col span={6}>
            <p className="inter-body2-medium">Job:</p>
          </Col>
          <Col span={18}>
            <p>Null</p>
          </Col>
        </Row>
      </Card>
      <Card title="Dlearn History">
        <p>Click here to view History on Dleran</p>
      </Card>
      <Card title="Training Certificates">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{ position: ["bottomLeft"] }}
        />
      </Card>
    </>
  );
}
export default EmployeeOverviewSecOne;
