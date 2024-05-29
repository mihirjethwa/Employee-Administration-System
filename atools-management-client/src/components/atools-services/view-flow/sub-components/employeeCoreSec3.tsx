import { Button, Card, Col, DatePicker, Form, message, Result, Row, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import service from "../../../../services/service";
import RBAC from "../../../../utils/rbac";

/**
 * Summary Section for Employee
 */
function EmployeeCoreSecTionThree({ addNew = false, ...props }) {
  const [form] = Form.useForm();
  const [summaryData, setSummaryData] = useState(null);
  const [eDocs, setEDocs] = useState(null);

  const [payroll, setPayroll] = useState(null);

  const [right, setRight] = useState(null);

  const [employeeId, setemployeeId] = useState(null);
  const [Roles, SetRolesData] = useState([]);
  const [historyData, sethistoryData] = useState(null);
  let history = useHistory();
  var localeData = require("dayjs/plugin/localeData");

  //* *               UseEffects  start         **//
  useEffect(() => {
    if (addNew === true) {
      props.callback(5, "PageOrder");
      console.log(history.location.state);
      window.scrollTo(0, 0);
      var temp: any = history.location.state;
      sethistoryData(history.location.state);
      setemployeeId(temp.employeeId);
      getRoleData();
      getSummaryDetails(temp.employeeId);
    }
  }, []);

  useEffect(() => {
    if (props.selectedEmployee) {
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
      // getRoleData();
      getSummaryDetails(props.selectedEmployee._id);
    }
  }, [props.selectedEmployee]);

  //* *               UseEffects  end         **//
  //!           ADD/UPDATE   start.........!//

  const addSuccess = (response) => {
    console.log(response.data);
    props.callback(1, "PageOrder");
    message.success("Employee added succesfully");
    history.push({
      pathname: "../employee-manager",
    });
  };

  const addError = (error) => {
    console.log(error);

    message.error("Updation Unsuccesful, please try again");
  };
  const onFinish = (values: any) => {
    console.log(values);
    var data = {
      formCompleted: true,
      pageStatus: "5",
      startDate: values.startDate,
    };
    service.putData(`/auth/updateEmployee/${employeeId}`, data, addSuccess, addError);
  };

  //!           ADD/UPDATE   end.........!//
  //!           getRoleData   start.........!//
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

  dayjs.extend(localeData);

  //!           getData   start.........!//

  const getSummaryDetails = (id) => {
    service.getData(`/employee/employeesummary/${id}`, isSuccess, isError);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    setSummaryData(response.data.data);
    setEDocs(extractId(response.data.data?.employeeDocs?.documents));
    setPayroll(extractId(response.data.data?.payrollDetails?.documents));
    setRight(extractId(response.data.data?.rightToWorkDetails?.documents));
    var data = response.data.data;
    data.startDate = dayjs(response.data.data.startDate);
    form.setFieldsValue(response.data.data);
  };
  const isError = (error: any) => {
    console.log(error.message);
  };

  const extractId = (data) => {
    const extract = data.filter((value) => {
      return value.uniqueId !== null;
    });
    return extract;
  };

  //!           getData   end.........!//
  const goToBack = () => {
    history.push({
      pathname: "./additional-documents",
      state: { employeeId: employeeId, role: historyData.role, back: true },
    });
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 24 },
  };
  const DateFormatter = (date) => {
    const newdate = new Date(date);
    return newdate.toLocaleDateString("en-US");
  };
  return summaryData === null ? (
    <Result status='404' title='No employee Selected' subTitle='Please Select a Employee' />
  ) : (
    <>
      <RBAC accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]}>
        <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
          <Card title='A. Employee Summary'>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Store:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.store ? summaryData?.store?.storeName : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Job Title:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.role ? summaryData?.role?.roleName : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>First Name:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.firstName ? summaryData?.generalDetails?.firstName : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Middle Name:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.middleName ? summaryData.generalDetails.middleName : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Last Name:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.lastName ? summaryData?.generalDetails?.lastName : "NA"}</p>
              </Col>
            </Row>
            {/* <Row>
            <Col span={6}>
              <p className="inter-body2-medium">Rota Name:</p>
            </Col>
            <Col span={18}>
              <p>Null</p>
            </Col>
          </Row> */}
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Date of Birth:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.dateOfBirth ? DateFormatter(summaryData?.generalDetails?.dateOfBirth) : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Gender:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.gender ? summaryData?.generalDetails?.gender : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Martial Status:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.maritialStatus ? summaryData?.generalDetails?.maritialStatus : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Employee Number:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.employeeNumber ? summaryData?.generalDetails?.employeeNumber : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Phone:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.phoneNumber ? summaryData?.generalDetails?.phoneNumber : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Address Line 1:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.addressLine1 ? summaryData?.generalDetails?.addressLine1 : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Address Line 2:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.addressLine2 ? summaryData?.generalDetails?.addressLine2 : "NA"}</p>
              </Col>
            </Row>
            {/* <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>PostCode:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.postCode ? summaryData?.generalDetails?.postCode : "NA"}</p>
              </Col>
            </Row> */}
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Emergency contact Name:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.emergencyContactName ? summaryData?.generalDetails?.emergencyContactName : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Relationship:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.emergencyContactRelationship ? summaryData?.generalDetails?.emergencyContactRelationship : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Contact Telephone:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.generalDetails?.emergencyContactNumber ? summaryData?.generalDetails?.emergencyContactNumber : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Rate:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.payrollDetails?.payRate ? summaryData?.payrollDetails?.payRate : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Per:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.payrollDetails?.payRatePer ? summaryData?.payrollDetails?.payRatePer : "NA"}</p>
              </Col>
            </Row>
            {/* <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>NI Number:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData?.payrollDetails?.niNumber ? summaryData?.payrollDetails?.niNumber : "NA"}</p>
              </Col>
            </Row> */}
            {/* <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>PAYE Form:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData ? summaryData?.payrollDetails?.payeForm : "NA"}</p>
              </Col>
            </Row> */}
            {/* <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Sort Code:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData ? summaryData?.payrollDetails?.sortCode : "NA"}</p>
              </Col>
            </Row> */}
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Account No:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData ? summaryData?.payrollDetails?.accountNumber : "NA"}</p>
              </Col>
            </Row>
            <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Account Name:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData ? summaryData?.payrollDetails?.accountName : "NA"}</p>
              </Col>
            </Row>
            {/* <Row>
              <Col span={6}>
                <p className='inter-body2-medium'>Account ref:</p>
              </Col>
              <Col span={18}>
                <p>{summaryData ? summaryData?.payrollDetails?.accountRefrence : "NA"}</p>
              </Col>
            </Row> */}
            {eDocs?.map((val: any) => (
              <Row>
                <Col span={6}>
                  <p className='inter-body2-medium'>{val?.documentName} Number:</p>
                </Col>
                <Col span={18}>
                  <p>{val?.uniqueId}</p>
                </Col>
              </Row>
            ))}
            <p className='inter-body2-medium'>The following documents have been uploaded for this employee: </p>
            {summaryData?.payrollDetails?.documents?.map((val: any) => (
              <Row>
                <Col span={6}>
                  <p className='inter-body2-medium'>{val?.documentName}:</p>
                </Col>
                <Col span={18}>
                  <p>{val?.fileName}</p>
                </Col>
              </Row>
            ))}
            {summaryData?.rightToWorkDetails?.documents?.map((val: any) => (
              <Row>
                <Col span={6}>
                  <p className='inter-body2-medium'>{val?.documentName}:</p>
                </Col>
                <Col span={18}>
                  <p>{val?.fileName}</p>
                </Col>
              </Row>
            ))}
            {summaryData?.employeeDocs?.documents?.map((val: any) => (
              <Row>
                <Col span={6}>
                  <p className='inter-body2-medium'>{val?.documentName}:</p>
                </Col>
                <Col span={18}>
                  <p>{val?.fileName}</p>
                </Col>
              </Row>
            ))}
          </Card>
          {addNew === true && (
            <Card title='B. Employee Start Date'>
              <Form.Item label='Start Date' name='startDate' rules={[{ required: true, message: "Please choose a Date" }]}>
                <DatePicker />
              </Form.Item>
            </Card>
          )}
          {addNew === false && (
            <Card title='B. Employee Start Date'>
              <Form.Item label='Start Date' name='startDate' rules={[{ required: true, message: "Please choose a Date" }]}>
                <DatePicker />
              </Form.Item>
            </Card>
          )}

          <RBAC accessModules={["Edit_Employee_Manager"]}>
            {addNew === true && (
              <Form.Item {...buttonItemLayout}>
                <div className='d-flex justify-content-between'>
                  <Button onClick={() => goToBack()} className='save-details ml-2 col-2' type='primary'>
                    Back
                  </Button>
                  <Button htmlType='submit' className='save-details col-3' type='primary' style={{ background: "#fb8500" }}>
                    Submit Details
                  </Button>
                </div>
              </Form.Item>
            )}
          </RBAC>
        </Form>
      </RBAC>
    </>
  );
}
export default EmployeeCoreSecTionThree;
