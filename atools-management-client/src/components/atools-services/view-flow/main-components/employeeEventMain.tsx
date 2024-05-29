import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input, Form, Card, Skeleton, message, DatePicker } from "antd";
import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
// import DatePicker from "../../../../utils/datepicker";
import service from "../../../../services/service";
import { on } from "events";
import moment from "moment";
const { Option } = Select;
function EmployeeEventMain({ ...props }) {
  //   const [form] = Form.useForm();
  //   const [displayForm, setdisplayForm] = useState(false);
  const [employeeId, setemployeeId] = useState(props.selectedEmployee._id);
  const [defYear, setDefYear] = useState("2021");
  const [tableData, SettableData] = useState();

  useEffect(() => {
    getHolidayData();
  }, []);
  const getHolidayData = () => {
    service.getData("/master/holidayMaster", isSuccess, isError);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    SettableData(response.data.data);
  };
  const isError = (error: any) => {
    console.log(error.message);
    // setErrorMessage(error.message)
    // setIsError(true)
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
    setDefYear(dateString);
  }

  const defDate = "Holiday Year " + moment(defYear).format("YYYY") + ":";
  const defDate2 = moment(defYear);

  const SwitchToForm = () => {};
  const SwitchToTable = () => {};
  const DateFormatter = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US");
  };
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const columns = [
    {
      title: "Date",
      dataIndex: "holidayDate",
      key: "date",
      render: (text: any, record, row) => {
        return {
          children: DateFormatter(text),
        };
      },
    },
    {
      title: "Month",
      dataIndex: "holidayDate",
      key: "holidayDate",
      render: (text: any, record, row) => {
        const newdate = new Date(text);
        return {
          children: months[newdate.getMonth()],
        };
      },
    },
    {
      title: "Reason",
      dataIndex: "holidayReason",
      key: "holidayReason",
    },
  ];
  return (
    <>
      <Form {...formItemLayout} layout={"horizontal"} className='std-form'>
        <Card title='Events'>
          <Row align='middle' style={{ marginBottom: 12 }}>
            <Col span={6}>
              <p className='inter-body2-medium'>Year* :</p>
            </Col>
            <Col span={18}>
              <DatePicker placeholder='Year' picker='year' defaultValue={defDate2} style={{ width: 270 }} onChange={onChange} />
            </Col>
          </Row>

          <Row align='middle' style={{ marginBottom: 12 }}>
            <Col span={6}>
              <p className='inter-body2-medium'>{defDate}</p>
            </Col>
            <Col span={18}>
              <p>
                01/01/{defYear} - 31/12/{defYear}
              </p>
            </Col>
          </Row>
          <Table dataSource={tableData} className='master-tables' columns={columns} pagination={{ position: ["bottomLeft"] }} />
          <p className='inter-body2-medium'>Holiday Year</p>
          <p>Note: The Holiday Year starts from January 1st and ends on December 31st for each year.</p>
        </Card>
      </Form>
    </>
  );
}
export default EmployeeEventMain;
