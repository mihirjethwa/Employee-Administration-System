import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input, Form, Card, Skeleton,DatePicker } from "antd";
import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
const { Option } = Select;
function EmployeePerformanceSecTwo(params: any) {
    const [form] = Form.useForm();
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 8 },
    };
    const buttonItemLayout = {
      wrapperCol: { span: 8 },
    };
    const config = {
        rules: [{ type: 'object' as const, required: true, message: 'Please select time!' }],
      };
    return(
        <>
        <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form'>
        <Card
          title='Late/Absent Export'
          extra={
            <Button className='view-summary-button' size='large'>
              {" "}
              <ArrowRightOutlined className='ml-0' />
              Export
            </Button>
          }
        >
              <Form.Item name="date-picker" label="Start date" {...config}>
        <DatePicker />
      </Form.Item>
      <Form.Item name="date-picker" label="End date" {...config}>
        <DatePicker />
      </Form.Item>
        </Card>
        </Form>
        </>
    )
}
export default EmployeePerformanceSecTwo;