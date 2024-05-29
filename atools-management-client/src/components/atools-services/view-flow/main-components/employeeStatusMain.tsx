import { Button, Card, Form, Input, message, Radio, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import service from "../../../../services/service";
import DatePicker from "../../../../utils/datepicker";
import AddDocument from "../../utils/addDocument";

var localeData = require("dayjs/plugin/localeData");

const { Option } = Select;

/**
 * Status Tab Form
 */
function EmployeeStatusMain({ ...props }) {
  const [historyData, sethistoryData] = useState(null);
  const [employeeId, setemployeeId] = useState(null);
  const [roles, SetRolesData] = useState([]);
  const [stores, SetStoresData] = useState([]);
  const [status, setStatus] = useState(null);
  const [addNew, setAddNew] = useState(false);

  const [formData, setFormData] = useState(null);

  console.log("EMPLOYEE IN Status" + props.selectedEmployee._id);

  const [form] = Form.useForm();

  let history = useHistory();

  var test;

  useEffect(() => {
    form.resetFields();
    if (props.selectedEmployee) {
      test = null;
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
      getRoleData();
      getStoreData();
      getStatus(props.selectedEmployee._id);
    }
  }, [props.activeKey]);
  // useEffect(() => {
  //   getRoleData();
  //   getStoreData();
  //   getStatus();
  // }, []);

  const getRoleData = () => {
    service.getData("/master/roleMaster", roleSuccess, roleError);
  };

  const roleSuccess = (response: any) => {
    SetRolesData(response.data.data);
  };
  const roleError = (error: any) => {
    console.log(error.message);
  };
  //!           GetRole data   start.........!//
  //!           GetStore data   start.........!//
  const getStoreData = () => {
    service.getData("/master/storeMaster", storeSuccess, storeError);
  };

  const storeSuccess = (response: any) => {
    SetStoresData(response.data.data);
  };
  const storeError = (error: any) => {
    console.log(error.message);
  };

  dayjs.extend(localeData);

  const getStatus = (emp) => {
    service.getData(`/employee/status/${emp}`, statusSuccess, statusError);
  };

  const statusSuccess = (response: any) => {
    setStatus(response.data.data);

    // if (response.data.data.findEmployeeStatus === null) {
    //   setAddNew(true);
    // }
    const test = Object.assign({}, response.data.data.findEmployee, response.data.data.findEmployeeStatus);
    // test["canLogin"] = roles.find((x) => x._id == test.role) && roles.find((x) => x._id == test.role).roleName == "admin";
    if (test.leaveDate !== null && test.leaveDate !== undefined) {
      test.leaveDate = dayjs(test.leaveDate);
    } else {
      test.leaveDate = null;
    }
    setFormData(test);
    form.setFieldsValue(test);
    console.log(test);
  };
  const statusError = (error: any) => {
    console.log(error.message);
  };

  const resetPassword = () => {
    service.postData("/auth/forgotPassword", { email: status.findEmployee.email }, isSuccess, isError);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    message.success("Reset Link sent to the Employee's Email");
  };
  const isError = (error: any) => {
    console.log(error.message);
  };

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  var statuss = ["Current", "Leaver", "Deleted", "On Hold"];

  const onFinish = (values: any) => {
    if (addNew) {
      const data2 = Object.assign(values, { employeeId: employeeId });
      console.log(data2);
      service.postData(`/employee/status/`, data2, addSuccess, addError);
    } else {
      const data = JSON.stringify(values);
      service.putData(`/employee/status/${employeeId}`, data, addSuccess, addError);
    }
  };

  const addSuccess = (response) => {
    console.log(response);
    message.success("Employee Status Updated Successfully");
  };
  const addError = (response) => {
    console.log(response);
  };

  return (
    <>
      <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
        <Card title='A. General'>
          <Form.Item name='store' rules={[{ required: true, message: "Please select Store!" }]} label='Store'>
            <Select className='drawer-select' size='large' bordered={false} placeholder='Store *'>
              {stores.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option.storeName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='role' rules={[{ required: true, message: "Please select Job Title!" }]} label='Job Title'>
            <Select className='drawer-select' size='large' bordered={false} placeholder='Job Title *'>
              {roles?.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
        <Card title='B. Rota Stores'>
          <Form.Item name='rotaStore' rules={[{ required: true, message: "Please select Store!" }]} label='Add Store'>
            {/* <Select className='drawer-select' size='large' bordered={false} placeholder='Store *'>
              {stores.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option.storeName}
                </Option>
              ))}
            </Select> */}
            <Input placeholder='Rota Store' />
          </Form.Item>
        </Card>
        <Card title='C. Leaver'>
          <Form.Item name='status' rules={[{ required: true, message: "Please select Status!" }]} label='Status'>
            <Select className='drawer-select' size='large' bordered={false} placeholder='Store *'>
              {statuss.map((option: any) => (
                <Option key={option} value={option}>
                  {option}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Leave Date' name='leaveDate' rules={[{ required: false, message: "Date!" }]}>
            <DatePicker placeholder='Leave Date' />
          </Form.Item>
          <Form.Item label='Leave Reason' name='leaveReason'>
            <Input placeholder='Leave Reason' />
          </Form.Item>
        </Card>
        <Card title='D. Resignation'>
          {/* <p>file upload</p> */}
          <AddDocument
            Filename='ResignationLetter'
            required={false}
            docDetails={{ fieldName: "Resignation", docType: "payroll", employeeId: employeeId }}
            onChange={(response) => {
              console.log(response);
            }}
          />
        </Card>
        <Card title='E. Address for P45'>
          <Form.Item label='Address Line 1' name='addressLine1' rules={[{ required: true, message: "Title" }]}>
            <Input placeholder='Address Line 1 *' />
          </Form.Item>
          <Form.Item label='Address Line 2' name='addressLine2' rules={[{ required: true, message: "Title" }]}>
            <Input placeholder='Address Line 2 *' />
          </Form.Item>
          <Form.Item label='Postcode' name='postCode' rules={[{ required: true, message: "Title" }]}>
            <Input placeholder='Postcode *' />
          </Form.Item>
        </Card>
        <Card title='F. Security'>
          <Form.Item label='Username' name='userName'>
            <Input disabled />
          </Form.Item>
          <Form.Item label='Passowrd'>
            <Button size='large' onClick={resetPassword}>
              Reset Password
            </Button>
          </Form.Item>
          <Form.Item name='canLogin' label='Login' className='Two-options-side'>
            <Radio.Group>
              <Radio.Button className='gender-buttons' value={true} disabled={true}>
                Enable
              </Radio.Button>
              <Radio.Button className='gender-buttons' value={false} disabled={true}>
                Disable
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item name='role' rules={[{ required: true, message: "Please select Role!" }]} label='Role   '>
            <Select className='drawer-select' size='large' bordered={false} placeholder='Role *'>
              {roles?.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item {...buttonItemLayout}>
            <Button htmlType='submit' className='save-details mr-2' type='primary' style={{ background: "#fb8500" }}>
              Submit Details
            </Button>
          </Form.Item>
        </Card>
      </Form>
    </>
  );
}
export default EmployeeStatusMain;
