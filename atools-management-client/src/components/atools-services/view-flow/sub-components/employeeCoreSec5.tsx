import { CloseOutlined, DownloadOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, message, Radio, Row, Select, Upload } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import service from "../../../../services/service";
import DatePicker from "../../../../utils/datepicker";
import RBAC from "../../../../utils/rbac";
import DeleteConfirmModal from "../../../atools-master/utils/deleteConfirmModal";
const { TextArea } = Input;

/**
 * Additional Documents Section for Employee
 */
function EmployeeCoreSecTionFive({ addNew = false, ...props }) {
  const [employeeId, setemployeeId] = useState(null);
  const [showAddDoc, setshowAddDoc] = useState(false);
  const [historyData, sethistoryData] = useState(null);
  const [update, setUpdate] = useState(false);
  const [back, setBack] = useState(false);
  const [draft, setDraft] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [compdata, setCompData] = useState(null);
  const [uploadIndex, setuploadIndex] = useState(0);
  const [documentsdata, setDocuments] = useState([]);
  const [deletePopconfirm, SetdeletePopconfirm] = useState(false);
  const [deleteRecord, SetdeleteRecord] = useState();
  const [currentUpdate, SetcurrentUpdate] = useState(false);
  const [expiryOn, setExpiryOn] = useState(false);
  const [form] = Form.useForm();
  let history = useHistory();
  var localeData = require("dayjs/plugin/localeData");
  //* *               UseEffects  start         **//
  useEffect(() => {
    if (addNew === true) {
      props.callback(4, "PageOrder");
      form.resetFields();
      window.scrollTo(0, 0);
      form.scrollToField("additionalDocsSelect");
      var temp: any = history.location.state;
      sethistoryData(history.location.state);
      setemployeeId(temp.employeeId);

      if (temp.back || temp.putFlag) {
        getAdditionalDocDetails(temp.employeeId);
        setBack(temp.back);
      }
    }
  }, []);

  useEffect(() => {
    if (props.selectedEmployee) {
      window.scrollTo(0, 0);
      form.scrollToField("additionalDocsSelect");
      setemployeeId(props.selectedEmployee._id);
      getAdditionalDocDetails(props.selectedEmployee._id);
    }
  }, [props.selectedEmployee]);

  //* *               UseEffects  end         **//

  //!           getData   start.........!//

  const getAdditionalDocDetails = (employeeId) => {
    service.getData(`/employee/docs/${employeeId}`, isSuccess, isError);
  };
  const isSuccess = (response: any) => {
    console.log(response);
    var data = response.data.data[0];
    data.verifiedDate = dayjs(data.createdAt);
    var temp = {};
    var tempk = {};
    var final = data.documents.forEach((m) => {
      if (m.expiryDate) {
        var temp1 = new Array();
        temp1.push(dayjs(m.expiryDate));
        m.expiryDate = temp1;
      }
      if (m.reason) {
        var temp2 = new Array();
        temp2.push(m.reason);
        m.reason = temp2;
      }
      if (m.uniqueId) {
        var temp2 = new Array();
        temp2.push(m.uniqueId);
        m.uniqueId = temp2;
      }
      if (data.employee && data.employee.userName) {
        m.verifiedBy = data.employee.userName;
      }

      m.verifiedDate = dayjs(data.createdAt);
    });

    if (data.documents.length > 0) {
      setshowAddDoc(true);
      setDocuments(data.documents);
    }
    setCompData(data);
    setUpdate(true);

    console.log(data);

    form.setFieldsValue(data);
  };
  const isError = (error: any) => {
    console.log(error.message);
  };

  //!           getData   end.........!//

  //!           ADD/UPDATE   start.........!//
  dayjs.extend(localeData);
  const addSuccess = (response) => {
    console.log(response);

    message.success("Details saved successfully");
    if (addNew === true) {
      if (draft === false) {
        history.push({
          pathname: "./summary",
          state: { employeeId: employeeId, putFlag: update },
        });
      } else {
        history.push({
          pathname: "../employee-manager",
        });
      }
    } else if (currentUpdate) {
      getAdditionalDocDetails(props.selectedEmployee._id);
    } else {
      props.handleToggle(3);
    }
  };
  const addError = (error) => {
    message.error(error.message);
  };

  const onFinish = (values: any) => {
    let final = documentsdata;
    console.log(values, final);
    values.documents.map((m, index) => {
      if (m.expiryDate && m.expiryDate[0]) {
        final[index].expiryDate = m.expiryDate[0];
      } else {
        final[index].expiryDate = "";
      }
      if (m.reason && m.reason[0] && m.reason[0].length > 0) {
        final[index].reason = m.reason[0];
      } else {
        final[index].reason = null;
      }
      if (m.uniqueId && m.uniqueId[0] && m.uniqueId[0].length > 0) {
        final[index].uniqueId = m.uniqueId[0];
      } else {
        final[index].uniqueId = null;
      }
    });
    var data = {
      documents: final,
      employeeId: employeeId,
      pageStatus: 4,
    };

    if (addNew === false || update === true) {
      service.postData(`/employee/docs`, data, addSuccess, addError);
    } else {
      service.postData("/employee/docs", data, addSuccess, addError);
    }
  };

  const goNext = () => {
    history.push({
      pathname: "./summary",
      state: { employeeId: employeeId, putFlag: update },
    });
  };

  //!           ADD/UPDATE   start.........!//
  const onRadioChange = (event) => {
    console.log(event);
    setshowAddDoc(event.target.value);
    if (event.target.value === false) {
      props.callback(4, "PageOrder");
      onFinish({ additionalDocsSelect: "false" });
    }
  };

  const normFile = (e: any) => {
    console.log("Upload event:", fileList);
    if (Array.isArray(e)) {
      return e;
      console.log("Upload event:", e);
    }
    return e && e.fileList;
  };
  const goToBack = () => {
    history.push({
      pathname: "./right-to-work",
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
  const formItemUploadLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 12 },
  };
  const formItemlongLayout = {
    wrapperCol: { span: 10 },
  };
  const formItemTitleLayout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 13 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 14 },
  };
  const buttonItemLayoutlong = {
    wrapperCol: { span: 24 },
  };

  const addToDocument = (response, file, documentName, uploadIndex) => {
    console.log(response);

    if (response.status == 200) {
      console.log(response.data);
      let document = response.data;
      let data = {
        fileName: file.name,
        s3Path: document.data.s3Path,
        documentType: "additional-documents",
        fieldName: `document_${uploadIndex}`,
        documentName: documentName,
        expiryDate: "",
        status: "active",
        uploadedOn: new Date().toISOString(),
      };
      let index = documentsdata.findIndex((x) => x.documentName === documentName);

      if (index == -1) {
        documentsdata.push(data);
      } else {
        documentsdata[index] = data;
      }
      setDocuments(documentsdata);
    }
    let docs: any = form.getFieldValue;
    docs.documents = documentsdata;

    // form.setFieldsValue({...docs,verifiedBy:compdata.verifiedBy})
    // if(compdata){
    //   form.setFieldsValue({verifiedBy:compdata.verifiedBy,verifiedDate:compdata.verifiedDate});
    // }
  };
  const uploadProps = {
    beforeUpload: (file) => {
      var tempdocList = form.getFieldValue("documents");
      if (tempdocList[uploadIndex]) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("type", file.type);
        formData.append("documentType", "additional-documents");
        formData.append("employeeId", employeeId);
        formData.append("fieldName", tempdocList[uploadIndex].documentName);
        service.postData(
          "/file-manager/upload",
          formData,
          function (response) {
            message.success(`Document uploaded successfully`);
            console.log(response);
            addToDocument(response, file, tempdocList[uploadIndex].documentName, uploadIndex);
          },
          function (error) {
            message.error(`Document upload failed.`);
            addToDocument(error, file, tempdocList[uploadIndex].documentName, uploadIndex);
          }
        );
        return false;
      } else {
        message.error(`Please Input Document Name before Uploading`);
        return false;
      }
    },
  };
  const download = (index) => {
    console.log(index, documentsdata);
    let docDetails = documentsdata[index];
    service.getData(
      "/file-manager/download?s3Path=" + docDetails.s3Path,
      function (data) {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(new Blob([data.data]));
        link.download = docDetails.fileName;
        link.click();
      },
      function () { },
      { responseType: "arraybuffer" }
    );
  };
  const handleDelete = (index) => {
    SetdeletePopconfirm(true);
    SetdeleteRecord(index);
  };
  const deleteFile = (index) => {
    let docDetails = documentsdata[index];
    if (docDetails) {
      service.deleteData(
        "/file-manager/deleteDoc?s3Path=" + docDetails.s3Path,
        function (response) {
          message.success(`Document deleted successfully`);
          console.log(response);
          let newdocumentsdata = documentsdata.filter((x) => x != docDetails);
          setDocuments(newdocumentsdata);
          form.setFieldsValue({ documents: newdocumentsdata });
          SetdeletePopconfirm(false);
          SetcurrentUpdate(true);
          form.submit();
        },
        function (error) {
          message.error(`Document delete failed.`);
        }
      );
    }
  };

  return addNew === true && !history.location.state ? (
    <Redirect to='/services/addEmployee/store-and-title' />
  ) : (
    <RBAC accessModules={["View_Employee_Manager", "Edit_Employee_Manager"]}>
      <>
        <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
          <Card title='J. Additional Documents'>
            <Form.List name='documents'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <div className='fileUpload col-10 mb-3'>
                      <Row gutter={[16, 16]}>
                        <Col span={18}>
                          <Form.Item label='Document Name' name={[field.name, "documentName"]} {...formItemTitleLayout} >
                            <Input placeholder='Document Name' />
                          </Form.Item>
                        </Col>
                        <Col span={1} className='ml-auto'>
                          <CloseOutlined onClick={() => handleDelete(index)} className='ml-auto' />
                        </Col>
                      </Row>
                      <Form.Item name={[field.name, "fieldName"]} label={"File"} {...formItemLayout} valuePropName='originFileObj' getValueFromEvent={normFile} extra={"Document " + (index + 1)} >
                        <Row>
                          <Col span={11}>
                            {update && index < documentsdata.length && (
                              <Button icon={<DownloadOutlined />} className='save-details' type='primary' onClick={() => download(index)}>
                                Download
                              </Button>
                            )}
                          </Col>
                          <Col span={2}></Col>
                          <Col span={11}>
                            <Upload name='logo' {...uploadProps}>
                              <Button icon={<UploadOutlined />} className='save-details ' onClick={() => setuploadIndex(index)}>
                                Upload
                              </Button>
                            </Upload>
                          </Col>
                        </Row>
                      </Form.Item>
                      {/* <Form.Item {...field} name={[field.name, "fieldName"]} noStyle label={"File (Optional)"} valuePropName='originFileObj' getValueFromEvent={normFile} extra={"Document " + (index + 1)}>
                    <Row gutter={[12, 12]}>
                          <Col span={6}>
                            <p className='inter-body2-medium'>File upload</p>
                          </Col>
                          <Col span={4}>
                            {update && index < documentsdata.length && (
                              <Button icon={<DownloadOutlined />} className='save-details' type='primary' onClick={() => download(index)}>
                                Download
                              </Button>
                            )}
                          </Col>
                          <Col span={8} className='mb-3'>
                            <Upload name='logo' {...uploadProps}>
                              <Button icon={<UploadOutlined />} className='save-details ' onClick={() => setuploadIndex(index)}>
                                Upload
                              </Button>
                            </Upload>
                          </Col>
                        </Row>
                      </Form.Item> */}

                      <Form.List name={[field.name, "expiryDate"]} {...formItemUploadLayout}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map((field, index1) => (
                              <Form.Item {...formItemlongLayout} label={"Expiry Date"} required={false} key={field.key}>
                                <Row key={index1} style={{ display: "flex", marginBottom: 8 }} align="middle" >
                                  <Col span={19}>
                                    <Form.Item
                                      {...field}
                                      style={{ display: "flex", marginBottom: 0 }}>

                                      <DatePicker placeholder='Expiry Date' />
                                    </Form.Item>
                                  </Col>
                                  <Col span={5} >
                                    <MinusCircleOutlined onClick={() => remove(0)} style={{ color: "red", marginLeft: 40, marginBottom: 5 }} />
                                  </Col>
                                </Row>
                              </Form.Item>
                            ))}
                            {fields.length < 1 && (
                              <Form.Item>
                                <Button type='link' className=' text-right drawer-pd  d-flex' onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add Expiry Date
                                </Button>
                              </Form.Item>
                            )}
                          </>
                        )}
                      </Form.List>
                      <Form.List name={[field.name, "uniqueId"]} {...formItemUploadLayout}>
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map((field, index1) => (
                              <Form.Item {...formItemlongLayout} label={"Unique ID"} required={false} key={field.key}>

                                <Row key={index1} style={{ display: "flex", marginBottom: 8 }} align="middle" >
                                  <Col span={19}>
                                    <Form.Item
                                      {...field}
                                      style={{ display: "flex", marginBottom: 0 }}>
                                      <Input placeholder='Unique Id' />
                                    </Form.Item>
                                  </Col>
                                  <Col span={5} >
                                    <MinusCircleOutlined onClick={() => remove(0)} style={{ color: "red", marginLeft: 40, marginBottom: 5 }} />
                                  </Col>
                                </Row>
                              </Form.Item>
                            ))}
                            {fields.length < 1 && (
                              <Form.Item>
                                <Button type='link' className=' text-right drawer-pd  d-flex' onClick={() => add()} block icon={<PlusOutlined />}>
                                  Add Unique ID
                                </Button>
                              </Form.Item>
                            )}
                          </>
                        )}
                      </Form.List>
                      {addNew === false && index < documentsdata.length && (
                        <>
                          <Form.List name={[field.name, "reason"]} {...formItemLayout}>
                            {(fields, { add, remove }) => (
                              <>
                                <Form.Item label='Document Verified?' className='Three-options-side'>
                                  <Radio.Group
                                    onChange={(event) => {
                                      event.target.value ? remove(0) : add();
                                    }}
                                    defaultValue={true}
                                  >
                                    <Radio.Button className='gender-buttons' value={true}>
                                      Yes
                                    </Radio.Button>
                                    <Radio.Button className='gender-buttons' value={false}>
                                      No
                                    </Radio.Button>
                                  </Radio.Group>
                                </Form.Item>
                                {fields.map((field, index1) => (
                                  <Form.Item {...formItemLayout} label={"Reason"} required={false} key={field.key}>
                                    <Form.Item className='mb-0' {...field}>
                                      <TextArea placeholder='Please mention the reason' />
                                    </Form.Item>
                                  </Form.Item>
                                ))}
                              </>
                            )}
                          </Form.List>

                          {/* 
        <Form.Item  label='Document Verified?'  name={["docVer",Filename]}   className='Three-options-side'>
            <Radio.Group onChange={(event)=>setDocVer(event.target.value) } defaultValue={docDetails.reason ? false : true }>
              <Radio.Button className='gender-buttons' value={true} >
                Yes
              </Radio.Button>
              <Radio.Button className='gender-buttons' value={false}>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          {DocVer === false && <Form.Item  label='Reason' name={["reason",Filename]}  className='Two-options-side'>
          <TextArea placeholder="Please mention the reason" allowClear />
          </Form.Item> }  */}

                          <Form.Item label='Verified By' name={[field.name, "verifiedBy"]}>
                            <Input placeholder='Verified By' disabled />
                          </Form.Item>
                          <Form.Item label='Verified Date' name={[field.name, "verifiedDate"]} className='mb-0'>
                            <DatePicker placeholder='verified date' disabled />
                          </Form.Item>
                        </>
                      )}
                    </div>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => {
                        add();
                        setshowAddDoc(true);
                      }}
                      block
                      icon={<PlusOutlined />}
                      style={{ height: 40 }}
                    >
                      Add Document
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Card>
          <RBAC accessModules={["Edit_Employee_Manager"]}>
            <Form.Item {...buttonItemLayoutlong}>
              <div className='d-flex justify-content-between'>
                {addNew === true && (
                  <>
                    <Button onClick={() => goToBack()} className='save-details ml-2 col-2 ' type='primary'>
                      Back
                    </Button>

                    {showAddDoc && (
                      <Button className='save-details col-3 ml-auto mr-2' type='primary' onClick={() => saveDraft()}>
                        Save Draft
                      </Button>
                    )}
                  </>
                )}

                {showAddDoc ? (
                  <Button htmlType='submit' className={addNew === true ? "save-details col-3" : "save-details col-3 ml-auto"} type='primary' style={{ background: "#fb8500" }}>
                    {showAddDoc ? (addNew === true ? "Submit Details" : "Update Details") : "Skip"}
                  </Button>
                ) : (
                  <Button onClick={goNext} className={addNew === true ? "save-details col-3" : "save-details col-3 ml-auto"} type='primary' style={{ background: "#fb8500" }}>
                    Skip
                  </Button>
                )}
              </div>
            </Form.Item>
          </RBAC>

          <DeleteConfirmModal deletePopconfirm={deletePopconfirm} cancelDelete={() => SetdeletePopconfirm(false)} deleteSetConfirm={() => deleteFile(deleteRecord)} />
        </Form>
      </>
    </RBAC>
  );
}
export default EmployeeCoreSecTionFive;
