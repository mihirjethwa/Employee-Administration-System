import * as React from "react";
import { useState, useEffect } from "react";
import { Table, Row, Col, Avatar, Button, Tag, Select, Radio, Input, Form, Card, Skeleton, message } from "antd";
import { PictureOutlined, UserOutlined, EditOutlined, EyeOutlined, SearchOutlined, DownloadOutlined, PlusOutlined, FilterOutlined, ArrowRightOutlined, DeleteOutlined } from "@ant-design/icons";
import service from "../../../../services/service";
import { useHistory } from "react-router";
import DatePicker from "../../../../utils/datepicker";
const { Option } = Select;
function EmployeePerformanceSecOne(props: any) {
  const [form] = Form.useForm();
  const [displayForm, setdisplayForm] = useState(false);

  const [historyData, sethistoryData] = useState(null);
  const [employeeId, setemployeeId] = useState(props.selectedEmployee._id);
  const [roles, SetRolesData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [addNew, setAddNew] = useState(false);

  let history = useHistory();
  useEffect(() => {
    if (displayForm === false) {
      getTableData();
    }
    getStatus();
  }, [displayForm]);

  useEffect(() => {
    if (props.selectedEmployee) {
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
      getTableData();
    }
    console.log("EMPLOYEE ID FROM PROPS");
    console.log(employeeId);
  }, [props.activeKey]);

  const getStatus = () => {
    service.getData(`/employee/feedback/${employeeId}`, statusSuccess, statusError);
  };

  const statusSuccess = (response: any) => {
    setFeedback(response.data.data);

    if (response.data.data.employeeFeedback === null) {
      setAddNew(true);
    }
    const test = Object.assign({}, response.data.data.employee, response.data.data.employeeFeedback);
    form.setFieldsValue(test);
    console.log(test);
  };
  const statusError = (error: any) => {
    console.log(error.message);
  };
  const getTableData = () => {
    service.getData(`/employee/feedback/get/${employeeId}`, tableSuccess, tableError);
  };

  const tableSuccess = (response: any) => {
    setTableData(response.data.data);
  };
  const tableError = (error: any) => {
    console.log(error.message);
  };

  var statuss = ["Current", "Leaver", "Deleted", "On Hold"];

  const onFinish = (values: any) => {
    // if (addNew) {
    //   const data2 = Object.assign(values, { employeeId: employeeId });
    //   console.log("===form data====");
    //   console.log(data2);
    //   service.postData(`/employee/feedback/`, data2, addSuccess, addError);
    // }
    // else {
    //   const data = JSON.stringify(values);
    //   service.putData(`/employee/feedback/${employeeId}`, data, addSuccess, addError);
    // }
    const data2 = Object.assign(values, { employeeId: employeeId });
    console.log("===form data====");
    console.log(data2);
    service.postData(`/employee/feedback/`, data2, addSuccess, addError);
  };

  const addSuccess = (response) => {
    console.log(response);
    message.success("Employee Feedback Done Successfully");
    setdisplayForm(false);
  };
  const addError = (response) => {
    console.log(response);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  const SwitchToForm = () => {
    setdisplayForm(true);
  };
  const SwitchToTable = () => {
    setdisplayForm(false);
  };
  var martialStatusOpt = ["Product", "Service", "Image", "Safety/Security", "Induction", "Traning", "Paperwork Compliance", "Sickness", "Lateness", "Absent"];

  const DateFormatter = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US");
  };

  const columns = [
    {
      title: "Submitted",
      dataIndex: "dateOfSubmission",
      key: "submitted",
      render: (text: any, record, row) => {
        return {
          children: DateFormatter(text),
        };
      },
    },
    {
      title: "Issued",
      dataIndex: "dateOfIssue",
      key: "dateOfIssue",
      render: (text: any, record, row) => {
        return {
          children: DateFormatter(text),
        };
      },
    },
    {
      title: "Manager",
      dataIndex: "managerName",
      key: "managerName",
    },
    {
      title: "Criteria",
      dataIndex: "feedbackCriteria",
      key: "feedbackCriteria",
    },
    {
      title: "Feedback type",
      dataIndex: "feedbackType",
      key: "feedbackType",
    },
    {
      title: "Follow Up",
      dataIndex: "followupRequest",
      key: "followupRequest",
      render: (followupRequest: any) => <>{followupRequest ? <p>Yes</p> : <p>No</p>}</>,
    },
  ];

  return displayForm ? (
    <>
      <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
        <Card title='A. Employee Details'>
          <Form.Item label='Date of Submission' name='dateOfSubmission' rules={[{ required: true, message: "Please input ID" }]}>
            {/* <Input placeholder='Date of Submission' /> */}
            <DatePicker placeholder='Date of Submission' />
          </Form.Item>
          <Form.Item label='ID ' name='_id' rules={[{ required: true, message: "Please input ID" }]}>
            <Input placeholder='ID ' disabled />
          </Form.Item>
          <Form.Item label='Store' rules={[{ required: true, message: "Store" }]}>
            <Input placeholder='Store *' value={feedback?.employee?.store?.storeName} disabled />
          </Form.Item>
          <Form.Item label='First Name' name='firstName' rules={[{ required: true, message: "Please input First Name" }]}>
            <Input placeholder='First Name *' disabled />
          </Form.Item>
          <Form.Item label='Middle Name' name='middleName'>
            <Input placeholder='Middle Name *' disabled />
          </Form.Item>
          <Form.Item label='Surname' name='lastName' rules={[{ required: true, message: "Please input Surname" }]}>
            <Input placeholder='Surname *' disabled />
          </Form.Item>
          <Form.Item label='Email' name='email' rules={[{ required: true, message: "Please input Surname" }]}>
            <Input placeholder='Email *' disabled />
          </Form.Item>
          <Form.Item label='Date of Issue' name='dateOfIssue' rules={[{ required: true, message: "Please input Date of Issue" }]}>
            {/* <Input placeholder='Date of Issue*' /> */}
            <DatePicker placeholder='Date of Issue*' />
          </Form.Item>
          <Form.Item name='feedbackType' label='feedback Type' rules={[{ required: true, message: "Please pick an item!" }]} className='Three-options-side'>
            <Radio.Group>
              <Radio.Button className='gender-buttons' value='postitve'>
                Postive
              </Radio.Button>
              <Radio.Button className='gender-buttons' value='negative'>
                Negative
              </Radio.Button>
              <Radio.Button className='gender-buttons' value='neutral'>
                Neutral
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name='feedbackCriteria' rules={[{ required: true, message: "Please select State!" }]} label='Feedback Criteria'>
            <Select className='drawer-select' size='large' bordered={false} placeholder='Feedback Criteria *'>
              {martialStatusOpt.map((option: any) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label='Obervation' name='observation' rules={[{ required: true, message: "Please input Obervation" }]}>
            <Input.TextArea />
          </Form.Item>

          <Form.Item label='Feedback Given' name='feedbackGiven' rules={[{ required: true, message: "Please input Feedback" }]}>
            <Input.TextArea />
          </Form.Item>
          <Form.Item label='Follow Up Required?' name='followupRequest' rules={[{ required: true, message: "Please pick an item!" }]}  className='Two-options-side feedback'>
            <Radio.Group>
              <Radio.Button className='gender-buttons' value='yes'>
                Yes
              </Radio.Button>
              <Radio.Button className='gender-buttons' value='no'>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='OER' name='oer' rules={[{ required: true, message: "Please input Employee Number" }]}>
            <Input placeholder='OER *' />
          </Form.Item>
        </Card>
        <Card title='B. Optional File'>
          <Form.Item label='Employee Summary ' name='feedbackFormFile'>
            <div className='d-flex flex-column'>
              <p>
                <b>Feedback Form</b>
              </p>
              <div className='row'>
                <div className='col'>
                  <Button className='save-details w-50' type='primary' style={{ height: 40 }}>
                    Upload
                  </Button>
                </div>
              </div>
            </div>
          </Form.Item>
        </Card>
        <Card title='C. Declarations'>
          <Form.Item name='understandImplication' label="Does the Employer fully understand the implication of this feedback?" rules={[{ required: true, message: "Please pick an item!" }]}  className='Two-options-side feedback'>
           
                <Radio.Group>
                  <Radio.Button className='gender-buttons' value='yes'>
                    Yes
                  </Radio.Button>
                  <Radio.Button className='gender-buttons' value='no'>
                    No
                  </Radio.Button>
                </Radio.Group>
             
          </Form.Item>
          <Form.Item label='Manager Name' name='managerName' rules={[{ required: true, message: "Manager Name" }]}>
            <Input placeholder='Manager Name *' />
          </Form.Item>

          <Form.Item {...buttonItemLayout}>
            <div className='d-flex'>
              <Button className='save-details w-50' type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button className='save-details ml-2 w-50' type='primary' onClick={SwitchToTable}>
                Cancel
              </Button>
            </div>
          </Form.Item>
        </Card>
      </Form>
    </>
  ) : (
    <>
      <Card>
        <Row className='mx-0' justify='space-between' style={{ marginBottom: 16, zIndex: 101 }}>
          <div>
            <p className='inter-body2-regular text-center' style={{ opacity: 0.7 }}>
              To create Feedback for the employee, click "New Feedback" and complete the form that is displayed.
            </p>
          </div>
          <div className='d-inline-flex'>
            <Button className='add-button mr-2 obutton' size='large' onClick={SwitchToForm}>
              <PlusOutlined /> New Feedback
            </Button>
            <Button className='export-button obutton' size='large'>
              <DownloadOutlined /> Export
            </Button>
          </div>
        </Row>
        <Table dataSource={tableData} columns={columns} pagination={{ position: ["bottomLeft"] }} />
      </Card>
    </>
  )
}
export default EmployeePerformanceSecOne;
