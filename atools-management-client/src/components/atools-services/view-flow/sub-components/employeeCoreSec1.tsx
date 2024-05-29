import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Radio, Result, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import service from "../../../../services/service";
import DatePicker from "../../../../utils/datepicker";
import RBAC from "../../../../utils/rbac";
const { Option } = Select;

/**
 * General Section for Employee Form
 */
function EmployeeCoreSecTionOne({ addNew = false, ...props }) {
  const [employeeId, setemployeeId] = useState(null);
  const [historyData, sethistoryData] = useState(null);
  const [formValues, setFormValues] = useState(null);
  const [gdata, setgdata] = useState(null);
  const [update, setUpdate] = useState(false);
  const [back, setBack] = useState(false);
  const [draft, setDraft] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  let history = useHistory();
  var localeData = require("dayjs/plugin/localeData");
  dayjs.extend(localeData);
  //* *               UseEffects  start         **//
  useEffect(() => {
    if (addNew === true) {
      props.callback(1, "PageOrder");
      form.resetFields();
      window.scrollTo(0, 0);
      form.scrollToField("title");
      console.log(history.location.state);
      var temp: any = history.location.state;
      sethistoryData(history.location.state);
      setemployeeId(temp.employeeId);
      form.setFieldsValue(history.location.state);
      if (temp.back || temp.employeeId !== null) {
        getGeneralDetails(temp.employeeId);
        setBack(temp.back);
      }
    }
  }, []);

  useEffect(() => {
    if (props.selectedEmployee) {
      window.scrollTo(0, 0);
      form.resetFields();
      setemployeeId(props.selectedEmployee._id);
      getGeneralDetails(props.selectedEmployee._id);
    }
  }, [props.selectedEmployee]);

  //* *               UseEffects  end         **//

  //!           getData   start.........!//
  const getGeneralDetails = (employeeId) => {
    service.getData(`/employee/general/${employeeId}`, isSuccess, isError);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    var data = response.data.data[0];
    data.DOB = dayjs(response.data.data[0].dateOfBirth);
    form.setFieldsValue(data);
    setUpdate(true);
    setgdata(response.data.data[0]);
  };
  const isError = (error: any) => {
    console.log(error.message);
  };

  //!           getData   end.........!//

  //!           ADD/UPDATE   start.........!//
  const addSuccess = (response) => {
    console.log(response);
    var employeeId = response.data.data.data.employeeId;
    console.log(employeeId);

    setemployeeId(employeeId);
    // var data = {
    //   id:employeeId,
    //   formCompleted:false,
    //   pageStatus:"1",
    //   userName:formValues.userName,
    //   email:formValues.email
    // }
    //     service.postData('/auth/register',data,addEmployeeSuccess,addError)
    if (addNew === true) {
      if (draft === false) {
        history.push({
          pathname: "./payroll-details",
          state: {
            employeeId: employeeId,
            role: historyData.role,
            putFlag: update,
          },
        });
      } else {
        history.push({
          pathname: "../employee-manager",
        });
      }
    } else {
      props.handleToggle(2);
    }
  };
  // const addEmployeeSuccess = (response) =>{
  //   console.log(response);

  //   if(addNew === true)
  //   {
  //     props.callback(2, "PageOrder");
  //     history.push({
  //     pathname: "./payroll-details",
  //     state: { employeeId: employeeId,role:historyData.role },
  //   });}
  //   else{
  //     props.handleToggle(2)
  //   }
  // }
  const addError = (error) => {
    message.error(error.message);
  };
  const onFinish = (values: any) => {
    console.log(values);
    setFormValues(values);
    var data = {
      pageStatus: "1",
      ...values,
      ...historyData,
    };
    if (addNew === false || update === true) {
      service.putData(`/employee/general/${employeeId}`, data, addSuccess, addError);
    } else {
      service.postData("/employee/general", data, addSuccess, addError);
    }
  };

  //!           ADD/UPDATE   end.........!//

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 24 },
  };
  const goToBack = () => {
    if (update === true) {
      history.push({
        pathname: "./store-and-title",
        state: {
          employeeId: employeeId,
          role: gdata.role,
          store: gdata.store,
          back: true,
        },
      });
    } else {
      history.push({
        pathname: "./store-and-title",
        state: {
          employeeId: employeeId,
          role: historyData.role,
          store: historyData.store,
          back: true,
        },
      });
    }
  };
  const saveDraft = () => {
    setDraft(true);
    form.submit();
  };
  var martialStatusOpt = ["Single", "Married", "Divorced", "Widowed", "Civil Partnership", "Other", "Partnered"];
  var relationshipOpt = ["Spouse", "Parent", "Child", "Sibling", "Friend", "Unknown", "Partner"];
  var titleOpt = ["Mr", "Mrs", "Miss", "Ms", "Other", "Dr"];
  // return summaryData === null ?(  <Result
  //   status="404"
  //   title="No employee Selected"
  //   subTitle="Please Select a Employee"
  // /> ): (
  //   <>
  return addNew === true && !history.location.state ? (
    <Redirect to='/services/addEmployee/store-and-title' />
  ) : addNew === false && props.selectedEmployee === undefined ? (
    <Result status='404' title='No employee Selected' subTitle='Please Select a Employee' />
  ) : (
    <>
      <RBAC accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]}>
        <Form key='form' {...formItemLayout} form={form} ref={formRef} layout={"horizontal"} className='std-form' onFinish={onFinish}>
          <Card
            title='A. General Details'
            extra={
              addNew === false && (
                <Button className='view-summary-button' onClick={() => props.handleToggle(3)} size='large'>
                  <ArrowRightOutlined className='ml-0' />
                  View Summary
                </Button>
              )
            }
          >
            {/* <Form.Item label='ID (auto-generated)' name='employeeId' rules={[{ required: true, message: "Please input ID" }]}>
            <Input placeholder='ID (auto-generated) *' readOnly />
          </Form.Item> */}
            <Form.Item label='Title' name='title' rules={[{ required: true, message: "Title" }]}>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Title *'>
                {titleOpt.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='First Name' name='firstName' rules={[{ required: true, message: "Please input First Name" }]}>
              <Input placeholder='First Name *' />
            </Form.Item>
            <Form.Item label='Middle Name' name='middleName' rules={[{ required: false, message: "Please input Middle Name" }]}>
              <Input placeholder='Middle Name' />
            </Form.Item>
            <Form.Item label='Surname' name='lastName' rules={[{ required: true, message: "Please input Surname" }]}>
              <Input placeholder='Surname *' />
            </Form.Item>
            <Form.Item label='Date of Birth' name='DOB' dependencies={['DOB']} hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please input Date of Birth",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    var dob = new Date(value)
                    var today = new Date();
                    var years = today.getFullYear() - dob.getFullYear();
                    var m = today.getMonth() - dob.getMonth();
                    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                      years--;
                    }
                    console.log(years);

                    if (years < 16) {
                      return Promise.reject(new Error('Minimum age is 18'));
                    }
                    return Promise.resolve();
                  },
                }),
              ]}>
              <DatePicker placeholder='Date of Birth *' />
            </Form.Item>
            <Form.Item name='maritialStatus' rules={[{ required: true, message: "Please select Martial Status!" }]} label='Marital Status'>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Marital Status *'>
                {martialStatusOpt.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name='gender' label='Gender' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='Male'>
                  Male
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='Female'>
                  Female
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='Username' name='userName' rules={[{ required: true, message: "Please input Username" }]}>
              <Input placeholder='Username *' />
            </Form.Item>
            <Form.Item label='Employee Number' name='employeeNumber' rules={[{ required: false, message: "Please input Employee Number" }]}>
              <Input placeholder='Employee Number' />
            </Form.Item>
          </Card>
          <Card title='B. Contact Details'>
            <Form.Item label='Phone Number' name='phoneNumber' rules={[{ required: false, message: "Title" }]}>
              <Input placeholder='Phone Number' />
            </Form.Item>
            <Form.Item label='Work Number' name='workNumber' rules={[{ required: false, message: "Title" }]}>
              <Input placeholder='Work Number' />
            </Form.Item>
            <Form.Item label='Email Address' name='email' rules={[{ required: true, message: "Please input Email Address" }]}>
              <Input placeholder='Email Address *' />
            </Form.Item>
            <Form.Item label='Mobile Number' name='mobileNumber' rules={[{ required: true, message: "Please input Mobile Number" }]}>
              <Input placeholder='Mobile Number *' />
            </Form.Item>
            <Form.Item label='Address Line 1' name='addressLine1' rules={[{ required: true, message: "Please input Address Line 1" }]}>
              <Input placeholder='Address Line 1 *' />
            </Form.Item>
            <Form.Item label='Address Line 2' name='addressLine2' rules={[{ required: true, message: "Please input Address Line 2" }]}>
              <Input placeholder='Address Line 2 *' />
            </Form.Item>
            <Form.Item label='Postcode' name='postCode' rules={[{ required: true, message: "Please input Postcode" }]}>
              <Input placeholder='Postcode *' />
            </Form.Item>
          </Card>
          <Card title='C. Emergency Contact'>
            <Form.Item
              label='Contact Name'
              name='emergencyContactName'
              rules={[
                {
                  required: true,
                  message: "Please input Emergency Contact name",
                },
              ]}
            >
              <Input placeholder='Contact Name *' />
            </Form.Item>
            <Form.Item name='emergencyContactRelationship' rules={[{ required: true, message: "Please select relationship!" }]} label='Relationship'>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Relationship *'>
                {relationshipOpt.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              label='Contact Telephone'
              name='emergencyContactNumber'
              rules={[
                {
                  required: true,
                  message: "Please input Emergency Contact number",
                },
              ]}
            >
              <Input placeholder='Contact Telephone *' />
            </Form.Item>
          </Card>
          <RBAC accessModules={["Edit_Employee_Manager"]}>
            <Form.Item {...buttonItemLayout}>
              <div className='d-flex justify-content-between'>
                {addNew === true && (
                  <>
                    <Button onClick={() => goToBack()} className='save-details ml-2 col-2 ' type='primary'>
                      Back
                    </Button>

                    <Button className='save-details col-3 ml-auto mr-2' type='primary' onClick={() => saveDraft()}>
                      Save Draft
                    </Button>
                  </>
                )}
                {/* <Button
                  className="save-details"
                  type="primary"
                >
                  Save Draft
                </Button> */}
                <Button htmlType='submit' className={addNew === true ? "save-details col-3" : "save-details col-3 ml-auto"} type='primary' style={{ background: "#fb8500" }}>
                  {addNew === true ? "Submit Details" : "Update Details"}
                </Button>
              </div>
            </Form.Item>
          </RBAC>
        </Form>
      </RBAC>
    </>
  );
}
export default EmployeeCoreSecTionOne;
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
