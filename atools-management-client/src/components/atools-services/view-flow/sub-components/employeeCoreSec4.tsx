import { Button, Card, Divider, Form, Input, message, Radio, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import service from "../../../../services/service";
import DatePicker from "../../../../utils/datepicker";
import RBAC from "../../../../utils/rbac";
import AddDocument from "../../utils/addDocument";
import ViewDocument from "../../utils/viewDocument";
const { Option, OptGroup } = Select;
/**
 * Right to work Section for Employee
 */
function EmployeeCoreSecTionFour({ addNew = false, ...props }) {
  const [employeeId, setemployeeId] = useState(null);
  const [mNationality, setNationality] = useState(null);
  const [NationalityName, setNationalityName] = useState(null);
  const [NationalityData, SetNationalityData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [back, setBack] = useState(false);
  const [draft, setDraft] = useState(false);
  const [docList, setdocList] = useState([]);
  const [docForm, setDocForm] = useState([]);
  const [rightData, setrightData] = useState(null);
  const [rightDataDocs, setrightDataDocs] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [form] = Form.useForm();
  let history = useHistory();
  var localeData = require("dayjs/plugin/localeData");
  // var documentMap = { "EU citizen":{"National Identity Card":["National Identity Card","EU Settelemt Doc"],"Passport":["Passport Number","EU Settelemt Doc","Passport Cover","Passport Detail Page"],"Residency Permit or Registration Certificate":["EU Settelemt Doc","Residency Permit or Registration Certificate"]},  "Others":{"Passport, Biometric Residence permit, EEA Visa":["Passport Number","Passport Cover","Passport Detail Page","Biometric Residence permit","EEA Visa"]}}
  // var nationality ={"EU citizen":["Albania","Andorra","Armenia","Austria","Azerbaijan","Belarus","Belgium","Bosnia and Herzegovina","Bulgaria","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Italy","Kosovo","Latvia","Liechtenstein","Lithuania","Luxembourg","Macedonia","Malta","Moldova","Monaco","Montenegro","The Netherlands","Norway","Poland","Portugal","Romania","Russia","San Marino","Serbia","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","Ukraine","United Kingdom"],"Others":[]}
  //* *               UseEffects  start         **//
  useEffect(() => {
    if (addNew === true) {
      getNationalityData();
      props.callback(3, "PageOrder");
      form.scrollToField("nationalityName");
      window.scrollTo(0, 0);
      form.resetFields();
      console.log(history.location.state);
      var temp: any = history.location.state;
      sethistoryData(history.location.state);
      setemployeeId(temp.employeeId);
      if (temp.back || temp.putFlag) {
        getRightToWorkDetails(temp.employeeId);
        setBack(temp.back);
      }
    }
  }, []);

  useEffect(() => {
    if (props.selectedEmployee) {
      getNationalityData();
      form.scrollToField("nationalityName");
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
    }
  }, [props.selectedEmployee]);
  useEffect(() => {
    if (rightData && NationalityData.length > 1 && rightData !== null) {
      setNationalityForDoc(rightData.nationalityName);
    }
  }, [NationalityData, rightData]);
  useEffect(() => {
    if (rightData && NationalityData.length > 1 && rightData !== null && docList.length > 0 && NationalityName === rightData.nationalityName) {
      setDocSelectForList(rightData.documentType);
    }
  }, [NationalityData, rightData, docList]);
  //* *               UseEffects  end         **//

  //!           getData   start.........!//
  dayjs.extend(localeData);
  const getRightToWorkDetails = (employeeId) => {
    service.getData(`/employee/right/${employeeId}`, isSuccess, isError);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    var data = response.data.data[0];

    setrightData(data);
    setrightDataDocs(data.documents);
    setDocumentList(data.documents);
    data.date = dayjs(data.date);
    if (data.employee && data.employee.userName) {
      data.verifiedBy = data.employee.userName;
    }
    data.verifiedDate = dayjs(data.createdAt);
    console.log(data.nationalityName);
    if (NationalityData.length > 0) {
      setNationalityForDoc(data.nationalityName);
    }
    var temp = {};
    var tempk = {};
    var final = data.documents.forEach((m) => {
      if (m.expiryDate && m.expiryDate !== null) {
        var temp1 = new Array();
        temp1.push(dayjs(m.expiryDate));
        Object.assign(temp, { [m.documentName]: temp1 });
      }
      if (m.reason) {
        var temp2 = new Array();
        temp2.push(m.reason);
        Object.assign(tempk, { [m.documentName]: temp2 });
      }
    });
    if (temp !== undefined) {
      data.expiryField = temp;
    }
    if (tempk !== undefined) {
      data.reason = tempk;
    }

    setUpdate(true);
    form.setFieldsValue(data);
  };

  const isError = (error: any) => {
    console.log(error.message);
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
        expiryDate: docDetails.expiryDate,
        uniqueId: docDetails.uniqueId,
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

  //!           getData   end.........!//
  //!           getRoleData   start.........!//
  dayjs.extend(localeData);
  const getNationalityData = () => {
    service.getData("/master/nationalityMaster", roleSuccess, roleError);
  };

  const roleSuccess = (response: any) => {
    console.log(response);
    SetNationalityData(response.data.data);
    if (props.selectedEmployee) {
      getRightToWorkDetails(props.selectedEmployee._id);
    }
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
        history.push({
          pathname: "./additional-documents",
          state: { employeeId: employeeId, putFlag: update },
        });
      } else {
        history.push({
          pathname: "../employee-manager",
        });
      }
    } else {
      props.handleToggle(5);
    }
  };
  const addError = (error) => {
    if (error && error.message) {
      message.error(error.message);
    }
  };
  const onFinish = (values: any) => {
    console.log(values.expiryField);

    if (values.expiryField) {
      Object.keys(values.expiryField).map((m) => {
        let index = documentList.findIndex((x) => x.documentName == m);
        if (values.expiryField[m] && values.expiryField[m].length > 0 && values.expiryField[m][0] !== null) {
          console.log(values.expiryField[m]);

          documentList[index].expiryDate = values.expiryField[m];
        } else {
          documentList[index].expiryDate = "";
        }
      });
    }
    if (values.reason) {
      Object.keys(values.reason).map((m) => {
        let index = documentList.findIndex((x) => x.documentName == m);
        if (values.reason[m] && values.reason[m].length > 0) {
          documentList[index].reason = values.reason[m];
        } else {
          documentList[index].reason = "";
        }
      });
    }
    console.log(documentList);

    var data = {
      ...values,
      documents: documentList,
      employeeId: employeeId,
      nationality: mNationality,
    };
    if (addNew === false || update === true) {
      service.putData(`/employee/right/${employeeId}`, data, addSuccess, addError);
    } else {
      service.postData("/employee/right", data, addSuccess, addError);
    }
  };

  //!           ADD/UPDATE   start.........!//
  const goToBack = () => {
    history.push({
      pathname: "./payroll-details",
      state: { employeeId: employeeId, role: historyData.role, back: true },
    });
  };
  const saveDraft = () => {
    setDraft(true);
    form.submit();
  };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const labelItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  const buttonItemLayoutlong = {
    wrapperCol: { span: 24 },
  };
  const setNationalityForDoc = (event) => {
    var documentMap = NationalityData.find((m) => m.nationalityName === event || m.subLocation.includes(event)).documentGroups;
    setdocList(documentMap);
    console.log(documentMap);
    setNationalityName(event);
    console.log(event);
    if (rightData && event !== rightData.nationalityName) {
      form.resetFields();
      form.setFieldsValue({ nationalityName: event });
      setDocForm([]);
    }
    form.setFieldsValue({ nationalityName: event });
    console.log(docList);
  };
  const handleNationality = (event) => {
    var nationalityId = NationalityData.find((m) => m.nationalityName === event || m.subLocation.includes(event))._id;
    setNationalityForDoc(event);
    setNationality(nationalityId);
  };
  const setDocSelectForList = (event) => {
    console.log(docList);
    console.log(event);
    form.setFieldsValue({ documentType: event });
    var documentForm = docList.find((m) => m.label === event).DocGroup;
    console.log(documentForm);

    setDocForm(documentForm);
  };
  const handleDocSelect = (event) => {
    console.log(event);

    setDocSelectForList(event);
  };
  return addNew === true && !history.location.state ? (
    <Redirect to='/services/addEmployee/store-and-title' />
  ) : (
    <>
      <RBAC accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]}>
        <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
          <Card title='A. Right to Work'>
            <Form.Item name='nationalityName' rules={[{ required: true, message: "Please select Rule" }]} label='Nationality'>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Nationality *' onChange={handleNationality}>
                {NationalityData.map((m) =>
                  m.subLocation.length > 0 ? (
                    <OptGroup label={m.nationalityName}>
                      {m.subLocation.map((k) => (
                        <Option key={k} value={k}>
                          {k}
                        </Option>
                      ))}
                    </OptGroup>
                  ) : (
                    <Option key={m.nationalityName} value={m.nationalityName}>
                      {m.nationalityName}
                    </Option>
                  )
                )}
              </Select>
            </Form.Item>
            {mNationality === "Others" && (
              <Form.Item label='Country Name' name='countryName' rules={[{ required: true, message: "Country Name" }]}>
                <Input placeholder='Country Name *' />
              </Form.Item>
            )}
            <Form.Item name='documentType' rules={[{ required: true, message: "Please select Rule" }]} label='Documents'>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Document *' onChange={handleDocSelect}>
                {docList.map((option: any) => (
                  <Option key={option.label} value={option.label}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            {docForm.map((m) =>
              rightDataDocs.find((k) => k.documentName == m.label) ? (
                <ViewDocument
                  Filename={m.label}
                  required={m.required ? m.required : false}
                  expiryStatusOn={true}
                  addNew={addNew}
                  input={m.input ? m.input : false}
                  docDetails={{ fieldName: m.label, docType: "right-to-work", employeeId: employeeId, ...rightData.documents.find((x) => x.documentName == m.label) }}
                  onChange={addToDocument}
                />
              ) : (
                <AddDocument
                  Filename={m.label}
                  required={m.required ? m.required : false}
                  expiryStatusOn={true}
                  input={m.input ? m.input : false}
                  docDetails={{ fieldName: m.label, docType: "right-to-work", employeeId: employeeId }}
                  onChange={addToDocument}
                />
              )
            )}

            {/* <ViewDocument /> */}
          </Card>
          <Card title='B. Document Validity and Declaration' className='std-label'>
            <Form.Item {...labelItemLayout} name='question1' label='Dose the picture in candidate document match the person?' rules={[{ required: true, message: "Please pick an item!" }]} className='Three-options-side'>
              {/* <Row style={{ width: "60vw" }} align='middle'>
              <Col span={6}>
                <p className="inter-body2-medium">
                  Dose the picture in candidate document match the person?
                </p>
              </Col>
              <Col span={10} style={{ marginLeft: 10 }}> */}
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='yes'>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='no'>
                  No
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='n/a'>
                  N/A
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item {...labelItemLayout} name='question2' label='Are the dates on candidate documents reliable with the appearance of the person ?' rules={[{ required: true, message: "Please pick an item!" }]} className='Three-options-side'>
              {/* <Row style={{ width: "60vw" }} align='middle'>
              <Col span={6}>
                <p className="inter-body2-medium">
                 Are the dates on candidate documents reliable with the appearance of the person ?
                </p>
              </Col>
              <Col span={10} style={{ marginLeft: 10 }}> */}
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='yes'>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='no'>
                  No
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='n/a'>
                  N/A
                </Radio.Button>
              </Radio.Group>
              {/* </Col>
            </Row> */}
            </Form.Item>
            <Form.Item {...labelItemLayout} name='question3' label='Is the visa the candidate has in date?' rules={[{ required: true, message: "Please pick an item!" }]} className='Three-options-side'>
              {/* <Row style={{ width: "60vw" }} align='middle'>
              <Col span={6}>
                <p className="inter-body2-medium">
                  Is the visa the candidate has in date?
                </p>
              </Col>
              <Col span={10} style={{ marginLeft: 10 }}> */}
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='yes'>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='no'>
                  No
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='n/a'>
                  N/A
                </Radio.Button>
              </Radio.Group>
              {/* </Col>
            </Row> */}
            </Form.Item>
            <Form.Item
              {...labelItemLayout}
              name='question4'
              label='Do the right work documents (stamps, Visa etc) have any restrictions that would mean this employee could not work for this company ?'
              rules={[{ required: true, message: "Please pick an item!" }]}
              className='Three-options-side'
            >
              {/* <Row style={{ width: "60vw" }} align='middle'>
              <Col span={6}>
                <p className="inter-body2-medium">
                 Do the right work documents (stamps, Visa etc) have any restrictions that would mean this employee could not work for this company ?
                </p>
              </Col>
              <Col span={10} style={{ marginLeft: 10 }}> */}
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='yes'>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='no'>
                  No
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='n/a'>
                  N/A
                </Radio.Button>
              </Radio.Group>
              {/* </Col>
            </Row> */}
            </Form.Item>
            <Form.Item
              {...labelItemLayout}
              name='question5'
              label='Are these original Copies, these must not be photocopies or have been tampered in any way?'
              rules={[{ required: true, message: "Please pick an item!" }]}
              className='Three-options-side'
            >
              {/* <Row style={{ width: "60vw" }} align='middle'>
              <Col span={6}>
                <p className="inter-body2-medium">
               
                </p>
              </Col>
              <Col span={10} style={{ marginLeft: 10 }}> */}
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='yes'>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='no'>
                  No
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='n/a'>
                  N/A
                </Radio.Button>
              </Radio.Group>
              {/* </Col>
            </Row> */}
            </Form.Item>
            <Form.Item
              {...labelItemLayout}
              name='question6'
              label='If the employee has a different name do you have a name change document ?(please upload this on the next change)'
              rules={[{ required: true, message: "Please pick an item!" }]}
              className='Three-options-side'
            >
              {/* <Row style={{ width: "60vw" }} align='middle'>
              <Col span={6}>
                <p className="inter-body2-medium">
                
                </p>
              </Col>
              <Col span={10} style={{ marginLeft: 10 }}> */}
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='yes'>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='no'>
                  No
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='n/a'>
                  N/A
                </Radio.Button>
              </Radio.Group>
              {/* </Col>
            </Row> */}
            </Form.Item>
            <Form.Item {...labelItemLayout} name='question7' label='Do you scan in all the document from the candidate?' rules={[{ required: true, message: "Please pick an item!" }]} className='Three-options-side'>
              {/* <Row style={{ width: "60vw" }} align='middle'>
              <Col span={6}>
                <p className="inter-body2-medium">
                  Do you scan in all the document from the candidate?
                </p>
              </Col>
              <Col span={10} style={{ marginLeft: 10 }}> */}
              <Radio.Group>
                <Radio.Button className='gender-buttons' value='yes'>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value='no'>
                  No
                </Radio.Button>
              </Radio.Group>
              {/* </Col>
            </Row> */}
            </Form.Item>
            <Divider orientation='left' plain>
              Declaration
            </Divider>
            <Form.Item label='Enter Full Name' name='fullName' rules={[{ required: true, message: "Please inputname" }]}>
              <Input placeholder='Full Name *' />
            </Form.Item>
            <Form.Item label='Date' name='date' rules={[{ required: true, message: "Please input Account Name" }]}>
              <DatePicker placeholder='Date *' />
            </Form.Item>
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
export default EmployeeCoreSecTionFour;
