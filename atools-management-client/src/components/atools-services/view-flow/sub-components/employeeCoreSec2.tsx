import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, message, Radio, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import service from "../../../../services/service";
import RBAC from "../../../../utils/rbac";
import AddDocument from "../../utils/addDocument";
import ViewDocument from "../../utils/viewDocument";
const { Option } = Select;

/**
 * Payroll Section for Employee From
 */
function EmployeeCoreSecTionTwo({ addNew = false, ...props }) {
  const [employeeId, setemployeeId] = useState(null);
  const [historyData, sethistoryData] = useState(null);
  const [payMethod, setpayMethod] = useState(null);
  const [accountType, setAccountType] = useState(null);
  const [roles, SetRolesData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [back, setBack] = useState(false);
  const [draft, setDraft] = useState(false);
  const [documentList, setDocumentList] = useState([]);
  const [form] = Form.useForm();
  const formRef = useRef(form);
  let history = useHistory();
  var localeData = require("dayjs/plugin/localeData");
  //* *               UseEffects  start         **//
  useEffect(() => {
    getRoleData();
    if (addNew === true) {
      props.callback(2, "PageOrder");
      window.scrollTo(0, 0);
      form.resetFields();
      form.scrollToField("role");
      console.log(history.location.state);
      var temp: any = history.location.state;
      sethistoryData(history.location.state);
      setemployeeId(temp.employeeId);

      form.setFieldsValue(history.location.state);
      if (temp.back || temp.putFlag) {
        getpayrollDetails(temp.employeeId);
        setBack(temp.back);
      }
    }
  }, []);

  useEffect(() => {
    if (props.selectedEmployee) {
      form.scrollToField("role");
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
      getpayrollDetails(props.selectedEmployee._id);
    }
  }, []);

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  //* *               UseEffects  end         **//

  //!           getData   start.........!//

  const getpayrollDetails = (employeeId) => {
    service.getData(`/employee/payroll/${employeeId}`, isSuccess, isError);
  };

  const [niProof, setNiProof] = useState({});
  const [paye45Form, setP45Proof] = useState({});
  const [paye46Form, setP46Proof] = useState({});
  const [bankDeclarationForm, setBankDeclarationProof] = useState({});
  const isSuccess = (response: any) => {
    console.log(response);
    var data = response.data.data[0];
    data.verifiedBy = data.employee.userName;
    data.verifiedDate = dayjs(data.createdAt);
    setpayMethod(data.paymentMethod);
    setAccountType(data.accountType);
    form.setFieldsValue(data);
    let niProof = data.documents.find((x) => x.documentName == "NI proof");
    setNiProof(niProof);
    let p45Form = data.documents.find((x) => x.documentName == "P45 Form");
    if (p45Form) {
      setP45Proof(p45Form);
    }
    let p46Form = data.documents.find((x) => x.documentName == "P46 Form");
    if (p46Form) {
      setP46Proof(p46Form);
    }
    let bankDeclaration = data.documents.find((x) => x.documentName == "Bank Declaration");
    if (bankDeclaration) {
      setBankDeclarationProof(bankDeclaration);
    }
    setDocumentList(data.documents);
    setUpdate(true);
  };
  const isError = (error: any) => {
    console.log(error.message);
  };

  //!           getData   end.........!//
  //!           getRoleData   start.........!//
  dayjs.extend(localeData);
  const getRoleData = () => {
    service.getData("/master/roleMaster", roleSuccess, roleError);
  };

  const roleSuccess = (response: any) => {
    console.log(response);
    var array = [];
    response.data.data.map((m) => array.push({ _id: m._id, roleName: m.roleName }));
    SetRolesData(array);
  };
  const roleError = (error: any) => {
    console.log(error.message);
  };

  //!           getRoleData   end.........!//
  //!           ADD/UPDATE   start.........!//
  const addSuccess = (response) => {
    console.log(response);

    message.success("Details saved successfully");
    if (addNew === true) {
      if (draft === false) {
        props.callback(3, "PageOrder");
        history.push({
          pathname: "./right-to-work",
          state: { employeeId: employeeId, putFlag: update },
        });
      } else {
        history.push({
          pathname: "../employee-manager",
        });
      }
    } else {
      props.handleToggle(4);
    }
  };
  const camelCase = (str) => {
    return str
      .replace(/\s(.)/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, "")
      .replace(/^(.)/, function (b) {
        return b.toLowerCase();
      });
  };
  const addToDocument = (response, file, docDetails) => {
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

      let index = documentList.findIndex((x) => x.fieldName == docDetails.fieldName);
      form.validateFields([camelCase(docDetails.fieldName)]);

      if (index == -1) {
        documentList.push(data);
      } else {
        documentList[index] = data;
      }
      setDocumentList(documentList);
    }
    console.log(documentList);
  };
  const addError = (error) => {
    message.error(error.message);
  };
  const onFinish = (values: any) => {
    console.log(values);
    delete values.bankDeclaration;
    var data = {
      ...values,
      documents: documentList,
      employeeId: employeeId,
    };

    if (addNew === false || update === true) {
      service.putData(`/employee/payroll/${employeeId}`, data, addSuccess, addError);
    } else {
      service.postData("/employee/payroll", data, addSuccess, addError);
    }
  };
  //!           ADD/UPDATE   false.........!//

  const onPayChange = (event) => {
    setpayMethod(event.target.value);
  };
  const onAccountTypeChange = (event) => {
    setAccountType(event.target.value);
  };
  const goToBack = () => {
    history.push({
      pathname: "./general-details",
      state: { employeeId: employeeId, role: historyData.role, back: true },
    });
  };
  const saveDraft = () => {
    setDraft(true);
    form.submit();
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  const buttonItemLayoutlong = {
    wrapperCol: { span: 24 },
  };
  var payRate = ["Federal Minimum Wage", "State Minimum Wage", "Local Minimum Wage", "Manual"];
  var holidayPerYear = ["Not Set", "28 days", "22 days"];
  return addNew === true && !history.location.state ? (
    <Redirect to='/services/addEmployee/store-and-title' />
  ) : (
    <>
      <RBAC accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]}>
        <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
          <Card
            title='D. Employment'
            extra={
              addNew === false && (
                <Button className='view-summary-button' onClick={() => props.handleToggle(3)} size='large'>
                  <ArrowRightOutlined className='ml-0' />
                  View Summary
                </Button>
              )
            }
          >
            <Form.Item label='Job Title' id='jobTitle' name='role' rules={[{ required: true, message: "Please Job Title" }]}>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Job Title *' disabled={true}>
                {roles.map((option: any) => (
                  <Option key={option._id} value={option._id}>
                    {option.roleName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Contract' name='contract' rules={[{ required: true, message: "Please Enter Contract" }]}>
              <Input placeholder='Contract *' />
            </Form.Item>
          </Card>
          <Card title='E. Pay Rate'>
            <Form.Item name='payRateRule' rules={[{ required: true, message: "Please select Rule" }]} label='Rule'>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Rule *'>
                {payRate.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label='Rate ($)' name='payRate' rules={[{ required: true, message: "Please choose a rate" }]}>
              <Input placeholder='Rate ($) *' />
            </Form.Item>
            <Form.Item name='payRatePer' label='Per' rules={[{ required: true, message: "Please pick an item!" }]} className='Three-options-side'>
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='hour'>
                  Hour
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='day'>
                  Day
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='year'>
                  Year
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card title='F. Holiday Allowance'>
            <Form.Item label='Days per Year' name='holidayRule' rules={[{ required: true, message: "Please pick an item!" }]}>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Not Set'>
                {holidayPerYear.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Card>
          <Card title='G. Tax'>
            <Form.Item label='SSN Number' id='ssnNumber' name='ssnNumber' rules={[{ required: true, message: "Please input SSN Number" }]}>
              <Input placeholder='SSN Number *' />
            </Form.Item>

            {addNew === false || update ? (
              <ViewDocument Filename='SSN proof' required={true} addNew={addNew} docDetails={{ fieldName: "SSN proof", docType: "payroll", employeeId: employeeId, ...niProof }} onChange={addToDocument} />
            ) : (
              <AddDocument Filename='SSN proof' required={true} docDetails={{ fieldName: "SSN proof", docType: "payroll", employeeId: employeeId }} onChange={addToDocument} />
            )}
            {/* <Form.Item name='payeForm' label='PAYE form' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
              <Radio.Group onChange={onPayeFormChange}>
                <Radio.Button className='gender-buttons' value='P45'>
                  P45
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='P46'>
                  P46
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            {payeForm === "P45" &&
              (addNew === false || update ? (
                <ViewDocument Filename='P45 Form' required={true} addNew={addNew} docDetails={{ fieldName: "P45 Form", docType: "payroll", employeeId: employeeId, ...paye45Form }} onChange={addToDocument} />
              ) : (
                <AddDocument Filename='P45 Form' required={true} docDetails={{ fieldName: "P45 Form", docType: "payroll", employeeId: employeeId }} onChange={addToDocument} />
              ))}
            {payeForm === "P46" && (
              <>
                {addNew === false || update ? (
                  <ViewDocument Filename='P46 Form' required={true} addNew={addNew} docDetails={{ fieldName: "P46 Form", docType: "payroll", employeeId: employeeId, ...paye46Form }} onChange={addToDocument} />
                ) : (
                  <AddDocument Filename='P46 Form' required={true} docDetails={{ fieldName: "P46 Form", docType: "payroll", employeeId: employeeId }} onChange={addToDocument} />
                )}
                <Form.Item name='p46letter' label='P46 letter Ticked' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
                  <Radio.Group>
                    <Radio.Button className='gender-buttons' value='A'>
                      A
                    </Radio.Button>
                    <Radio.Button className='gender-buttons' value='B'>
                      B
                    </Radio.Button>
                    <Radio.Button className='gender-buttons' value='C'>
                      C
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
                <Form.Item name='p46Dletter' label='P46 letter D Ticked' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
                  <Radio.Group>
                    <Radio.Button className='gender-buttons' value='yes'>
                      Yes
                    </Radio.Button>
                    <Radio.Button className='gender-buttons' value='no'>
                      No
                    </Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </>
            )} */}
          </Card>
          <Card title='H. Payment'>
            {/* <Form.Item label='Payment Method' name='paymentMethod'>
              <Button className='save-details' type='primary' style={{ height: 56 }}>
                BACS
              </Button>
            </Form.Item> */}
            <Form.Item name='paymentMethod' label='Payment Method' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
              <Radio.Group onChange={onPayChange}>
                <Radio.Button className='gender-buttons' value='directDeposit'>
                  Direct Deposit
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='paperChecks'>
                  Paper Checks
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label='Routing No.' name='routingNumber' rules={[{ required: true, message: "Please input Sort Code" }]}>
              <Input placeholder='Routing No. *' />
            </Form.Item>
            <Form.Item label='Account No' name='accountNumber' rules={[{ required: true, message: "Please input Account No" }]}>
              <Input placeholder='Account No *' />
            </Form.Item>
            <Form.Item label='Bank Name' name='BankName' rules={[{ required: true, message: "Please input Account Name" }]}>
              <Input placeholder='Bank Name *' />
            </Form.Item>
            {/* <Form.Item label='Account Ref' name='accountRefrence' rules={[{ required: true, message: "Please input Account Ref" }]}>
              <Input placeholder='Account Ref *' />
            </Form.Item> */}
            <Form.Item name='accountType' label='Account Type' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
              <Radio.Group onChange={onAccountTypeChange}>
                <Radio.Button className='gender-buttons' value='savings'>
                  Savings
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='checking'>
                  Checking
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
          </Card>
          <Card title='I. Bank Declaration'>
            {/* <Form.Item label='Payment Method' name='bankPaymentMethod'>
            <Button className='save-details' type='primary' style={{ height: 56 }}>
              BACS
            </Button>
          </Form.Item>
          <Form.Item label='Sort Code' name='bankSortCode' rules={[{ required: true, message: "Please input Sort Code" }]}>
            <Input placeholder='Sort Code *' />
          </Form.Item>
          <Form.Item name='bankDocumentVerified' label='Document verified?' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
            <Radio.Group>
              <Radio.Button className='gender-buttons' value='yes'>
                Yes
              </Radio.Button>
              <Radio.Button className='gender-buttons' value='no'>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Account Name' name='bankAccountName' rules={[{ required: true, message: "Please input Account Name" }]}>
            <Input placeholder='Account Name *' />
          </Form.Item>
          <Form.Item label='Account Ref *' name='bankAccountRefrence' rules={[{ required: true, message: "Please input Account Ref" }]}>
            <Input placeholder='Account Ref *' />
          </Form.Item> */}
            {addNew === false || update ? (
              <ViewDocument Filename='Bank Declaration' required={true} addNew={addNew} docDetails={{ fieldName: "Bank Declaration", docType: "payroll", employeeId: employeeId, ...bankDeclarationForm }} onChange={addToDocument} />
            ) : (
              <AddDocument Filename='Bank Declaration' required={true} docDetails={{ fieldName: "Bank Declaration", docType: "payroll", employeeId: employeeId }} onChange={addToDocument} />
            )}
          </Card>
          <RBAC accessModules={["Edit_Employee_Manager"]}>
            <Form.Item {...buttonItemLayoutlong}>
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
export default EmployeeCoreSecTionTwo;
