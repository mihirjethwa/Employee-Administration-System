import React, { useState, useRef } from "react";
import { Drawer, Button, Row, Col, Form, Input, Select, Checkbox, message,Space,Switch, Upload , Card} from "antd";
import { useEffect } from "react";
import DocumentMasterImage from "../../../assets/common/drawer/Documents.svg";
import Close from "../../../assets/common/drawer/Close.svg";
import service from "../../../services/service";
import DeleteConfirmModal from "../../atools-master/utils/deleteConfirmModal";
import { ArrowUpOutlined, ArrowDownOutlined, PlusOutlined, DownloadOutlined, CloseOutlined, UploadOutlined  } from "@ant-design/icons";
import "./drawer.scss";
import RBAC from "../../../utils/rbac"
interface DrawerProps {
  visible: boolean;
  data?: any;
  editFlag?: boolean;
  callback: any;
  drawerClose: () => void;
}

const { Option } = Select;
const plainOptions = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6"];

const DocumentAccessMaster: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  const [roles, SetRolesData] = useState([]);
  const [addNationality,setaddNationality]=useState(false);
  const [uploadIndex, setuploadIndex] = useState(0);
  const [update, setUpdate] = useState(false);
  const [documentsdata, setDocuments] = useState([]);
  const [deletePopconfirm, SetdeletePopconfirm] = useState(false);
  const [deleteRecord, SetdeleteRecord] = useState();
  const [currentUpdate, SetcurrentUpdate] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  useEffect(() => {
    setVisible(props.visible);
    getRoleData();
    if(!props.data){
      form.setFields([
        {
          name: "GroupStatus",
          value:true,
        },
     ]);
     
    }
  }, [props.visible]);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({...props.data });
      setDocuments(props.data.documents)
      setUpdate(true)
    } else {
      form.resetFields();
      setUpdate(false)
    }
  }, [props.editFlag, props.data]);

  const onClose = () => {
    setVisible(false);
    props.drawerClose();
  };

// get role //
const getRoleData = () => {
    service.getData("/master/roleMaster", roleSuccess, roleError);
  };
  const roleSuccess = (response: any) => {
    console.log(response);
    var array = [];
    response.data.data.map((m) => array.push({_id:m._id,roleName:m.roleName}));
    SetRolesData(array);
  };
  const roleError = (error: any) => {
    console.log(error.message);
  };

// end of get role //
  const addSuccess = (response) => {
    console.log(response);
    props.callback(false, "OpsComplete");
    props.editFlag ? message.success("Document Access Manager updated succesfully") : message.success("Document Access Manager created succesfully");
  };
  const addError = (error) => {
    console.log(error);
    message.error(error.message)
  };
  const onFinish = (values: any) => {
    values.documents.forEach(m => {
      var find = documentsdata.find(k => k.documentName === m.documentName)
      Object.assign(m,find)
    })

    

    // let final = documentsdata;
    console.log(values);

    
    if (props.editFlag && props.data) {
      service.putData(`/master/documentAccessMaster/${props.data._id}`, values, addSuccess, addError);
    } else {
      service.postData("/master/documentAccessMaster", values, addSuccess, addError);
    }
  };
  const normFile = (e: any) => {
    console.log("Upload event:", FileList);
    if (Array.isArray(e)) {
      return e;
      console.log("Upload event:", e);
    }
    return e && e.fileList;
  };
  const addToDocument = (response, file, documentName, uploadIndex) => {
    console.log(response);

    if (response.status === 200) {
      console.log(response.data);
      let document = response.data;
      let data = {
        fileName: file.name,
        s3Path: document.data.s3Path,
        documentType: "general-documents",
        fieldName: `document_${uploadIndex}`,
        documentName: documentName,
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
      console.log(file);
      console.log(uploadIndex);
      console.log(form.getFieldValue("documents"));
      var tempdocList = form.getFieldValue("documents");
      if (tempdocList[uploadIndex]) {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", file.name);
        formData.append("type", file.type);
        formData.append("employeeId", "documentAccesMaster");
        formData.append("documentType", "general-documents");
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
      function () {},
      {responseType: "arraybuffer"}
    );
  };
  const handleDelete = (index) => {
    deleteFile(index);
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

  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={613} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={DocumentMasterImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Document Group</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1} style={{ float: "right" }}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form form={form} ref={formRef} name='accessMaster'  initialValues={{ remember: true }} onFinish={onFinish} style={{ width: "100%" }}>
              <p className="inter-subtitle2-medium drawer-pd">Create your document group based on the employee citizenship status</p>
              <Form.Item name={"documentGroupName"} rules={[{ required: false, message: "Please select State!" }]}>
          <Input placeholder="Enter Document Group Name" className='auth-input' />
           
         </Form.Item>
          
         <Form.Item name="GroupStatus" label="Visibility Status" valuePropName="checked" >
        <Switch  checked/>
      </Form.Item>
                      <Form.List name='documents'>
              {(fields, { add, remove, move }) => (
                <>
                  {fields.map((field, index) => (
                    <Card className='col-12 mb-3'>
                      <Row gutter={[16, 16]}>
                        <Col span={22}>
                          <Form.Item  name={[field.name, "documentName"]}
                           dependencies={['documents']}  hasFeedback
                           rules={[
                             {
                               required: true,
                               message: 'Please Input Document Name!',
                             },
            ({ getFieldValue }) => ({
              validator(_, value) {
                var docs = form.getFieldValue('documents');

                var array = []
                docs.map((m,index) => {if(m && m.documentName && index !== field.name){array.push(m.documentName)}})
                
  
                
                if (!value || array.includes(value)) {
                  
                  return Promise.reject(new Error('Document Name is repeating, please input an unique value'));
                 
                }
                return Promise.resolve();
              },
            }),
          ]}>
                            <Input placeholder='Document Name' className='auth-input' />
                          </Form.Item>
                        </Col>
                        <Col span={1} className='ml-auto'>
                          <CloseOutlined  onClick={() => remove(index)} className='ml-auto' />
                        </Col>
                      </Row>
                      <Form.Item {...field} name={[field.name, "fieldName"]} noStyle label={"File (Optional)"} valuePropName='originFileObj' getValueFromEvent={normFile} extra={"Document " + (index + 1)} className='col-12'>
                        
                        <Row gutter={[12, 12]}>
                          <Col span={6}>
                            <p className='inter-body2-medium'>File upload</p>
                          </Col>
                          
                            {update && index < documentsdata.length && (
                                <Col span={9}>
                              <Button icon={<DownloadOutlined />} className='save-details' type='primary' onClick={() => download(index)}>
                                Download
                              </Button>
                              </Col>
                            )}
                          
                          <Col span={9} className='mb-3'>
                            <Upload name='logo' {...uploadProps}>
                              <Button icon={<UploadOutlined />} className='save-details w-100' onClick={() => setuploadIndex(index)}>
                                Upload
                              </Button>
                            </Upload>
                          </Col>
                        </Row>
                      </Form.Item>

                      <p  className=" drawer-pd mb-1 mt-1">Role Access</p>
            <p className="inter-body2-regular  drawer-pd mb-1">Enter comma separated values viz. admin/driver</p>
            
            <Form.Item  name={[field.name, "accessGiven"]} rules={[{ required: false, message: "Please select State!" }]}>
  <Select className='drawer-select location-tag'  mode="tags"  size='large' bordered={false} placeholder='Role *' style={{ width: '100%' }} >
                {roles.map((option: any) => (
                  <Option key={option._id} value={option._id}>
                    {option.roleName}
                  </Option>
                ))}
              </Select>
  </Form.Item>


  <Row>
               <Col span={2}>
                 <Form.Item  name={[field.name, "status"]} valuePropName='checked' className='drawer-switch'>
                   <Switch checked />
                 </Form.Item>
               </Col>
               <Col span={5}>
                 <p className='drawer-required'>Status</p>
               </Col>
               <Col span={13}></Col>
              
               <Col span={2}>
               <Button icon={<ArrowUpOutlined />}  onClick={() => {
                        move(index,index - 1 );
                      }} />
               </Col>
               <Col span={2}>
               <Button icon={<ArrowDownOutlined />}  onClick={() => {
                        move(index,index + 1 );
                      }} />
               </Col>
               </Row>
                        
                      
                    </Card>
                  ))}
                  <Form.Item>
                    <Button
                      type='dashed'
                      onClick={() => {
                        add();
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
<Form.Item>
                    <Row gutter={[16, 16]}>
                    
                      <Col span={12}>
                        <Button   htmlType='submit' className='auth-button' type='primary'>
                          {props.editFlag ? "Update" : "Create"}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>

          </Form>
        </Row>
      </Drawer>
     
    </div>
  );
};

export default DocumentAccessMaster;
