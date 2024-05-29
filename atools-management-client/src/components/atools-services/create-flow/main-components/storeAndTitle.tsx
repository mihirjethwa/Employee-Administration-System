import { DownloadOutlined } from "@ant-design/icons";
import { Button, Card, Col, Empty, Form, message, Modal, Radio, Row, Select } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import service from '../../../../services/service';
const { Option } = Select;

/**
 * In create flow, Store and Title selct form
 */
function StoreAndTitle({ addNew = false, ...props }) {
  const [form] = Form.useForm();
  const [docList, setdocList] = useState([])
  const [reqList, setreqList] = useState([])
  const [stores, SetStoresData] = useState([])
  const [employeeId, setemployeeId] = useState(null);
  const [roles, SetRolesData] = useState([])
  const [jobTitle, setjobTitle] = useState(null)
  const [historyData, sethistoryData] = useState(null);
  const [DocumentmasterData, SetDocumentmasterData] = useState([])
  const [back, setBack] = useState(false)
  const [value, Setvalue] = useState<Boolean>(null)
  let history = useHistory();
  //* *               UseEffects  start         **//



  useEffect(() => {
    if (addNew === true) {
      getStoreData();
      getRoleData();
      getDocumentmasterData();
      if (history.location.state) {
        var temp: any = history.location.state;
        sethistoryData(history.location.state);
        if (temp.back) {
          form.resetFields();
          setBack(true)
          setemployeeId(temp.employeeId);
          form.setFieldsValue(history.location.state);
          setjobTitle(temp.role)
        }
      }
    }
  }, []);
  useEffect(() => {
    if (addNew === true && history.location.state) {
      var temp: any = history.location.state;
      if (temp.back) {
        getdoclist(temp.role);
        Setvalue(true)


      }
    }


  }, [DocumentmasterData]);
  //* *               UseEffects  end         **//


  //!           ADD/UPDATE   start.........!//

  const addSuccess = (response) => {
    console.log(response.data);
    props.callback(1, "PageOrder")
    message.success("Details saved successfully.")

  }

  const addError = (error) => {
    console.log(error);

    message.error("Updation Unsuccesful, please try again")
  }
  const onFinish = (values: any) => {
    if (docList.length > 0 && values.questionnaire.includes("false")) {
      info()
    }
    else {
      //   var data = {
      //     pageStatus:0,
      // formStatus:"partial",
      // ...values
      //   }
      if (back === true) {
        history.push({
          pathname: "./general-details",
          state: { store: values.store, role: values.role, employeeId: employeeId }
        });
      }
      else {
        history.push({
          pathname: "./general-details",
          state: { store: values.store, role: values.role, employeeId: null }
        });

      };
    }
  }
  //!           ADD/UPDATE   end.........!//
  //!           GetStore data   start.........!//
  const getStoreData = () => {
    service.getData("/master/storeMaster", storeSuccess, storeError);
  };

  const storeSuccess = (response: any) => {
    console.log(response);
    var array = [];
    response.data.data.map(m => array.push({ label: m.storeName, value: m._id }))
    SetStoresData(array)
  };
  const storeError = (error: any) => {
    console.log(error.message);
  }
  //!           GetStore data   start.........!//
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
  //!           GETDocumentData   start.........!//
  const getDocumentmasterData = () => {
    service.getData("/master/documentMaster", isDocSuccess, isDocError);
  };
  const isDocSuccess = (response: any) => {
    console.log(response);
    SetDocumentmasterData(response.data.data);
    if (back === true) {
      getdoclist(historyData.role)
    }
    form.setFieldsValue("questionnaire")

  };
  const isDocError = (error: any) => {
    console.log(error.message);
  };
  //!           GETDocumentData   end.............!//
  const jobSelect = (value) => {
    setjobTitle(value)
    getdoclist(value)

  }
  const getdoclist = (value) => {
    console.log("in doc list", value);

    var obj = DocumentmasterData.find(m => m.role._id === value)
    console.log(DocumentmasterData);
    if (obj) {
      setdocList(obj.documentName)
      setreqList(obj.required)
      console.log(obj);

    }
    else {
      setdocList([])
    }
  }
  const camelCase = (str) => {
    return str
      .replace(/\s(.)/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, '')
      .replace(/^(.)/, function (b) {
        return b.toLowerCase();
      });
  }
  const documentList = {
    "Asst Manager": ["Right To Work Documents(eg passport)", "Tax documents (p45)", "Visa"],
    "Driver": ["Right To Work Documents(eg passport)", "Tax documents (p45)"]

  }

  const onConfirmation = e => {
    console.log('radio checked', e.target.value);
    // Setvalue(e.target.value);
    if (e.target.value === false) {

    }

  };
  function info() {
    Modal.info({
      content: (
        <div>
          <p>Documents present in 'Document Confirmation' section are required before you proceed.</p>
        </div>
      ),
      className: "notifModal",
      centered: true,
      onOk() { },
    });
    Setvalue(null);
  }
  const documentTemplates = [
    { "label": "Driver form", "link": "s3://atools-documents-dev/checklist-documents/NEW OBU FORM.pdf" },
    { "label": "Induction-Checklist", "link": "s3://atools-documents-dev/checklist-documents/Induction Checklist.pdf" },
    { "label": "Induction-Checklist - Manager Guidelines", "link": "s3://atools-documents-dev/checklist-documents/Induction Checklist - Manager guidelines.pdf" },
    { "label": "P46 form", "link": "s3://atools-documents-dev/checklist-documents/p46.pdf" },
    { "label": "Contract Template", "link": "s3://atools-documents-dev/checklist-documents/Contract and Starter form Master COPY.doc" },
    { "label": "Application Form", "link": "s3://atools-documents-dev/checklist-documents/dominos-employment-form.pdf" },
    { "label": "Uniform Deduction Template", "link": "s3://atools-documents-dev/checklist-documents/Uniform deduction Template.pdf" },
  ]
  const download = (link, label) => {
    service.getData("/file-manager/download?s3Path=" + link, function (blob) {
      // 2. Create blob link to download
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', label);
      // 3. Append to html page
      document.body.appendChild(link);
      // 4. Force download
      link.click();
      // 5. Clean up and remove the link
      link.parentNode.removeChild(link);
    }, function () { })
  }
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 10 },
  };

  const buttonItemLongLayout = {
    wrapperCol: { span: 24 },
  };
  return (
    <>
      <Form {...formItemLayout} layout={"horizontal"} form={form} className='std-form' onFinish={onFinish}>
        <Card
          title='A. Store and Title Information'
        >
          <Form.Item name='store' rules={[{ required: true, message: "Please select Store!" }]} label='Store'>
            <Select className='drawer-select' size='large' bordered={false} placeholder='Store *'>
              {stores.map((option: any) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='role' rules={[{ required: true, message: "Please select Job Title!" }]} label='Job Title'>
            <Select className='drawer-select' size='large' bordered={false} placeholder='Job Title *' onChange={jobSelect} >
              {roles.map((option: any) => (
                <Option key={option._id} value={option._id}>
                  {option.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
        <Card title='B. Document Confirmation'>
          {jobTitle === null && <Empty description={<p className="inter-subtitle2-medium text-center" style={{ color: "#dce0e6" }}>Please select Job Title</p>} />}


          {docList.map((m, i) =>
            <Form.Item name={['questionnaire', i]} key={camelCase(m)} rules={[{ required: reqList[i], message: "Please pick an item!" }]} initialValue={back ? "true" : null} className='Two-options-side'>
              <Row style={{ width: "60vw" }} align='middle'>
                <Col span={6}>
                  <p className={reqList[i] === true ? "inter-body2-medium required" : "inter-body2-medium"}>
                    {m}
                  </p>
                </Col>
                <Col span={10} style={{ marginLeft: 10 }}>
                  <Radio.Group defaultValue={back ? true : null}>
                    <Radio.Button className='gender-buttons' value={true}>
                      Yes
                    </Radio.Button>
                    <Radio.Button className='gender-buttons' value={false}>
                      No
                    </Radio.Button>
                  </Radio.Group>
                </Col>
              </Row>

            </Form.Item>

          )}

        </Card>
        <Card title='C. Document Templates'>

          {documentTemplates.map(m =>
            <Form.Item >
              <Row style={{ width: "60vw" }} align='middle'>
                <Col span={6}>
                  <p className="inter-body2-medium">
                    {m.label}
                  </p>
                </Col>
                <Col span={10} style={{ marginLeft: 10 }}>
                  <Button type="primary" icon={<DownloadOutlined />} onClick={() => download(m.link, m.label)} className="download-button">
                    Click to Download
                  </Button>

                </Col>
              </Row>
            </Form.Item>

          )}

        </Card>
        <Form.Item {...buttonItemLongLayout}>
          <Button htmlType='submit' className='save-details col-3' type='primary' style={{ background: "#fb8500" }}>
            Submit Details
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}
export default StoreAndTitle;
