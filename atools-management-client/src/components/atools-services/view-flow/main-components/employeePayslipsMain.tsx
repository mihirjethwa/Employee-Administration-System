import { PlusOutlined, DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Radio, Row, Select, Table } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import service from "../../../../services/service";
import DatePicker from "../../../../utils/datepicker";
import AddDocument from "../../utils/addDocument";

/**
 * Employee Payslip section
 */
function EmployeePayslipsMain({ ...props }) {
  const [form] = Form.useForm();
  const [displayForm, setdisplayForm] = useState(false);

  const [historyData, sethistoryData] = useState(null);
  const [employeeId, setemployeeId] = useState(props.selectedEmployee._id);
  const [tableData, setTableData] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [emp, setEmp] = useState(null);
  const [payslipDoc, setPayslipDoc] = useState(null);

  useEffect(() => {
    getTableData();
  }, [displayForm]);
  useEffect(() => {
    if (props.selectedEmployee) {
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
      getTableData();
    }
  }, [props.activeKey]);

  const getStatus = () => {
    service.getData(`/employee/payslip/${employeeId}`, statusSuccess, statusError);
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
    service.getData(`/employee/payslip/get/${employeeId}`, tableSuccess, tableError);
  };

  const tableSuccess = (response: any) => {
    setTableData(response.data.data.employeePayslip);
    console.log(response.data.data);
    setEmp(response.data.data.employee);
  };
  const tableError = (error: any) => {
    console.log(error.message);
  };

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
    const data2 = Object.assign(values, { employeeId: employeeId }, { payslipDoc: payslipDoc });
    console.log("===form data====");
    console.log(data2);
    service.postData(`/employee/payslip/`, data2, addSuccess, addError);
  };

  const addSuccess = (response) => {
    console.log(response);
    message.success("Employee Payslip Added Successfully");
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

  const download = (file) => {
    console.log(file.payslipDoc);
    service.getData(
      "/file-manager/download?s3Path=" + file.payslipDoc.s3Path,
      function (data) {
        const link = document.createElement("a");
        link.href = window.URL.createObjectURL(new Blob([data.data]));
        link.download = file.payslipDoc.fileName;
        link.click();
      },
      function () {},
      { responseType: "arraybuffer" }
    );
  };

  const columns = [
    // {
    //   title: "Employee Ref",
    //   dataIndex: "employeeId",
    //   key: "employeeRef",
    // },
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (text: any, record, row) => {
        return {
          children: DateFormatter(text),
        };
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (text: any, record, row) => {
        return {
          children: DateFormatter(text),
        };
      },
    },
    {
      title: "Company",
      dataIndex: "company",
      key: "company",
      render: (followupRequest: any) => <>{emp?.store?.storeName}</>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (followupRequest: any) => <>{emp?.firstName + " " + emp?.lastName}</>,
    },
    {
      title: "Net Pay",
      dataIndex: "netPay",
      key: "netPay",
    },
    {
      title: "Download",
      dataIndex: "payslipDoc",
      key: "payslipDoc",
      render: (text, record, row) => {
        return {
          children: (
            <div className='d-flex' style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button className='action-buttons' shape='circle' size='middle' icon={<DownloadOutlined />} onClick={() => download(record)}></Button>
            </div>
          ),
        };
      },
    },
  ];
  const SwitchToForm = () => {
    setdisplayForm(true);
  };
  const SwitchToTable = () => {
    setdisplayForm(false);
  };
  const DateFormatter = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US");
  };

  const addPayslip = (response, file, docDetails) => {
    if (response.status == 200) {
      console.log(response.data);
      let document = response.data;
      let data = {
        fileName: file.name,
        s3Path: document.data.s3Path,
        documentName: docDetails.fieldName,
        documentType: docDetails.docType,
        fieldName: docDetails.fieldName.replace(/\s/g, "_"),
        expiryDate: "",
        status: "active",
        uploadedOn: new Date().toISOString(),
      };
      // let index = documentList.findIndex(x => x.documentName == document.data.documentName)
      setPayslipDoc(data);
    }
  };

  return displayForm ? (
    <>
      <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
        <Card title='Payment Details'>
          <Form.Item label='Start Date' name='startDate'>
            <DatePicker placeholder='Start date' />
          </Form.Item>
          <Form.Item label='End Date' name='endDate'>
            <DatePicker placeholder='End date' />
          </Form.Item>
          <Form.Item label='Total Hours' name='totalHours' rules={[{ required: true, message: "Please enter Total Hours" }]}>
            <Input placeholder='Total Hours *' />
          </Form.Item>
          <Form.Item label='Total Days' name='totalDays' rules={[{ required: true, message: "Please enter Total Days" }]}>
            <Input placeholder='Total Days *' />
          </Form.Item>

          <Form.Item label='Net Pay (£)' name='netPay' rules={[{ required: true, message: "Please enter amount" }]}>
            <Input placeholder='Net Pay (£) *' />
          </Form.Item>
          <Form.Item name='transferredStatus' label='Transfer Status' rules={[{ required: true, message: "Please pick an item!" }]} className='Three-options-side'>
            <Radio.Group>
              <Radio.Button className='gender-buttons' value='yes'>
                Yes
              </Radio.Button>
              <Radio.Button className='gender-buttons' value='no'>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Row>
              <Col span={14}>
                <AddDocument Filename='Payslip' required={true} docDetails={{ fieldName: "Payslip", docType: "payslip", employeeId: employeeId }} onChange={addPayslip} />
              </Col>
            </Row>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <div className='d-flex'>
              <Button htmlType='submit' className='save-details mr-2' type='primary' style={{ background: "#fb8500" }}>
                Submit Details
              </Button>
              <Button className='save-details' type='primary' onClick={SwitchToTable}>
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
            <p className='inter-body2-regular text-center' style={{ opacity: 0.7, marginTop: 10 }}>
              To add payment details of the employee, click "Add Payment Details" and complete the form that is displayed.
            </p>
          </div>
          <div className='d-inline-flex'>
            <Button className='add-button mr-2 obutton' size='large' onClick={SwitchToForm}>
              <PlusOutlined /> Add Payment Details
            </Button>
          </div>
        </Row>
        <Table dataSource={tableData} columns={columns} pagination={{ position: ["bottomLeft"] }} />
      </Card>
    </>
  );
}
export default EmployeePayslipsMain;
