import { Button, Card, Form, Input, message, Radio, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useEffect, useState } from "react";
import service from "../../../../services/service";
import DatePicker from "../../../../utils/datepicker";
import AddDocument from "../../utils/addDocument";
import ViewDocument from "../../utils/viewDocument";

/**
 * Contract section for employee
 */
function EmployeeContractMain({...props }) {
  const [form] = Form.useForm();
  const [contractdoc, setcontractdoc] = useState({})
  const [employeeId, setemployeeId] = useState(null);
  const [employeeData, setemployeeData] = useState(null);
  const [docdata, setdocdata] = useState(null);
  const [update, setUpdate] = useState(false);
  var localeData = require("dayjs/plugin/localeData");

  useEffect(() => {
    if (props.selectedEmployee) {
      window.scrollTo(0, 0);
      setemployeeId(props.selectedEmployee._id);
      setemployeeData(props.selectedEmployee)
      form.setFieldsValue({role:props.selectedEmployee.role.roleName,store:props.selectedEmployee.role.storeName})
      getDocDetails(props.selectedEmployee._id);
    }
  }, [props.activeKey]);
    //!           getData   start.........!//
    dayjs.extend(localeData);
    const getDocDetails = (employeeId) => {
      service.getData(`/employee/contract/${employeeId}`, isSuccess, isError);
    };
    const isSuccess = (response: any) => {
      console.log(response);
      var data = response.data.data[0];
      data.verifiedBy = data.employee.userName;
      data.verifiedDate = dayjs(data.createdAt);
      let contract = data.documents.find(x => x.documentName == "Signed Contract")
      setcontractdoc(contract)
      var uploadedDate = dayjs(data.contractUploaded);
      // data.DOB = dayjs(response.data.data[0].DOB);
      // form.setFieldsValue(data);
      form.setFieldsValue({UploadedOn:uploadedDate,waitingAmendment:data.waitingAmendment,verifiedBy:data.verifiedBy,verifiedDate:data.verifiedDate})
      setUpdate(true);
      setdocdata(response.data.data);
    };

    const isError = (error: any) => {
      console.log(error.message);
    };
  
    //!           getData   end.........!//
     //!           ADD/UPDATE   start.........!//
  const addSuccess = (response) => {
    console.log(response);

    message.success("Details saved successfully");
    // if (addNew === true ) {
    //   if(draft === false){
    //   props.callback(3, "PageOrder");
    //   history.push({
    //     pathname: "./right-to-work",
    //     state: { employeeId: employeeId, putFlag: update },
    //   });
    // }
    // else{
    //   history.push({
    //     pathname: "../employee-manager",
    //   });  
    // }
    // } else {
    //   props.handleToggle(4);
    // }
  };
  const [documentList, setDocumentList] = useState([])
  const addToDocument = (response, file, docDetails) => {
    if(response.status == 200){
      console.log(response.data)
      let document = response.data;
      let data =  {
        "fileName": file.name,
        "s3Path": document.data.s3Path,
        "documentName": docDetails.fieldName,
        "documentType": docDetails.docType,
        "fieldName": docDetails.fieldName.replace(/\s/g, '_'),
        "expiryDate": "",
        "status": "active",
        "uploadedOn": new Date().toISOString()
      }
      let index = documentList.findIndex(x => x.documentName == document.data.documentName)
      var uploadedDate = dayjs(data.uploadedOn);
      form.setFieldsValue({UploadedOn:uploadedDate})
      
      if(index == -1){
        documentList.push(data)
      }
      else {
        documentList[index] =  data;
      }
      setDocumentList(documentList)
    }
    console.log(documentList);
  }
  const addError = (error) => {
    message.error(error.message);
  };
  const onFinish = (values: any) => {
    console.log(values)
    var data = {
      documents: documentList,
      employeeId: employeeId,
      waitingAmendment:values.waitingAmendment,
      contractUploaded:values.UploadedOn
    };

    if (update === true) {
      service.putData(
        `/employee/contract/${employeeId}`,
        data,
        addSuccess,
        addError
      );
    } else {
      service.postData("/employee/contract", data, addSuccess, addError);
    }
  };
  //!           ADD/UPDATE   false.........!//
  const download = (type) => {
    service.getData(
      `/export/${type}/${employeeId}`,
      function (data, name = `${employeeData.firstName} ${employeeData.lastName} ${type === "contractGenerator" ? "Contract_Form" : "Summary"}.pdf`) {
        console.log("===blob===",data);
        const blob = new Blob([data.data]);
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = name;
        link.click();
      },
      function () {},
      {responseType: "arraybuffer"}
    );
  };
    const DateFormatter = (date) => {
      const newdate = new Date(date);
      return newdate.toLocaleDateString("en-US");
    };
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 8 },
  };
  const buttonItemLayout = {
    wrapperCol: { span: 8 },
  };
  var store = ["First store", "Second Store", "Third Store"];
  var job = ["Job1", "Job2", "Job3"];
  var role = ["admin", "superAdmin", "user"];
  var status = ["on leave", "working", "half day"];

  var relationshipOpt = ["Father", "Mother", "Brother", "Sister", "Son", "Daughter", "Uncle", "Aunt"];
  return (
    <>
      <Form  {...formItemLayout}
          layout={"horizontal"}
          form={form}
          className="std-form"
          onFinish={onFinish}>
        <Card
          title='A. Employee Details'
          //   extra={
          //     <Button className='view-summary-button' size='large'>
          //       {" "}
          //       <ArrowRightOutlined className='ml-0' />
          //       View Summary
          //     </Button>
          //   }
        >
           
          <Form.Item label='Job Title' name='role'>
            <Input placeholder='Job Title' disabled />
          </Form.Item>
          <Form.Item label='Store' name='store'>
            <Input placeholder='Store ' disabled />
          </Form.Item>
        </Card>
        <Card title='B. Contract Details'>
          <Form.Item label='Generate Contract' name='generateContract'>
            <Button className='save-details' type='primary' style={{ height: 56 }} onClick={()=>download("contractGenerator")}>
              Generate Contract
            </Button>
          </Form.Item>
          <Form.Item label='Employee Summary ' name='employeeSummary'>
            <Button className='save-details' type='primary' style={{ height: 56 }}  onClick={()=>download("summaryGenerator")}>
              Employee Summary
            </Button>
          </Form.Item>
        </Card>
        <Card title='C. Upload Employee Contract'>
        {update ? (
              <ViewDocument Filename="SignedContract" required={true} docDetails={{fieldName: "Signed Contract", docType: "contract", employeeId: employeeId, ...contractdoc}} onChange={addToDocument} />
            ) : (
              <AddDocument Filename="SignedContract" required={true} docDetails={{fieldName: "Signed Contract", docType: "contracr", employeeId: employeeId}} onChange={addToDocument} />
            )}
          {/* <Form.Item label='Employee Summary ' name='employeeSummary'>
            <div className='d-flex flex-column'>
              <p>
                <b>Signed Contract</b>
              </p>
              <div className='row'>
                <div className='col'>
                  <Button className='save-details' type='primary' style={{ height: 34 }}>
                    Download
                  </Button>
                </div>
                <div className='col'>
                  <Button className='save-details' type='primary' style={{ height: 34 }}>
                    Update
                  </Button>
                </div>
              </div>
            </div>
          </Form.Item>
          <Form.Item label='Successfully Uploaded' name='successUpload'>
            <Input placeholder='Successfully Uploaded' />
          </Form.Item>
          <Form.Item name='radio-button' label='Document Verified' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
            <Radio.Group>
              <Radio.Button className='gender-buttons' value='a'>
                Yes
              </Radio.Button>
              <Radio.Button className='gender-buttons' value='b'>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
          <Form.Item label='Verified By' name='verifiedBy'>
            <Input placeholder='Verified By' />
          </Form.Item>
          <Form.Item label='Verified Date' name='verifiedDate'>
            <Input placeholder='Verified Date' />
          </Form.Item> */}
          <Form.Item label='Contract Uploaded' name='UploadedOn'>
            <DatePicker placeholder='Contract Uploaded' disabled />
          </Form.Item>
          <Form.Item  label='Waiting Amendment?' name='waitingAmendment' rules={[{ required: true, message: "Please pick an item!" }]} className='Two-options-side'>
            <Radio.Group>
              <Radio.Button className='gender-buttons' value={true}>
                Yes
              </Radio.Button>
              <Radio.Button className='gender-buttons' value={false}>
                No
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
         
        </Card>
        <Form.Item {...buttonItemLayout}>
            <Button htmlType='submit' className='save-details mr-2' type='primary' style={{background:"#fb8500"}}>
                Submit Details
            </Button>
          </Form.Item>
      </Form>
    </>
  );
}
export default EmployeeContractMain;
