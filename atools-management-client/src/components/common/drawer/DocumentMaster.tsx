import React, { useState, useRef } from "react";
import { Drawer, Button, Row, Col, Form, Input, Select, Space, Switch, message, Upload } from "antd";
import { useEffect } from "react";
import DocumentMasterImage from "../../../assets/common/drawer/Documents.svg";
import Attach from "../../../assets/common/drawer/Attach.svg";
import Close from "../../../assets/common/drawer/Close.svg";
import "./drawer.scss";
import service from "../../../services/service";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import AddDocument from "../../atools-services/utils/addDocument";
var qs = require("qs");
interface DrawerProps {
  visible: boolean;
  data?: any;
  editFlag?: boolean;
  callback: any;
  drawerClose: () => void;
}

const { Option } = Select;

const uploadprops = {
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange({ file, fileList }) {
    if (file.status !== "uploading") {
      console.log(file, fileList);
    }
  },
};

const DocumentMasterDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  const [roles, SetRolesData] = useState([]);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  useEffect(() => {
    setVisible(props.visible);
    getRoleData();
  }, [props.visible]);
  useEffect(() => {
    if (props.data) {
      var document = [];

      props.data.documentName.forEach((x, index) => {
        var obj = {
          name: x,
          required: props.data.required[index],
        };
        document.push(obj);
      });
      var f = document;

      form.setFieldsValue({ role: props.data.role._id, documents: document });
    } else {
      form.resetFields();
    }
  }, [props.editFlag, props.data]);

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
  const onSelectChange = (values) => {
    form.setFieldsValue({ roleName: values });
  };
  const onClose = () => {
    setVisible(false);
    props.drawerClose();
  };
  let formData = new FormData();
  // this.state.Audience_Locations.forEach((x, index) => {
  //   formData.append("location[" + index + "]", x);
  // });
  const addSuccess = (response) => {
    console.log(response);
    props.callback(false, "OpsComplete");
    props.editFlag ? message.success("Document Selector updated succesfully") : message.success("Document Selector added succesfully");
  };
  const addError = (error) => {
    console.log(error);
    message.error(error.message)
  };
  const onFinish = (values: any) => {
    // let formData = new FormData();
    var obj = { role: values.role, documentName: [], required: [], fileUpload: [] };

    // formData.append("roleName",values.role)
    values.documents.forEach((x, index) => {
      obj.documentName.push(x.name);
      obj.required.push(x.required);
      obj.fileUpload.push(x.fileUpload);
    });

    console.log(values, "values");

    if (props.editFlag && props.data) {
      service.putData(`/master/documentMaster/${props.data._id}`, obj, addSuccess, addError);
    } else {
      service.postData("/master/documentMaster", obj, addSuccess, addError);
    }
  };

  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={513} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={DocumentMasterImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Role Document Master</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1} style={{ float: "right" }}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form form={form} ref={formRef} name='documentMaster' onFinish={onFinish} style={{ width: "100%" }}>
            <Form.Item name='role' rules={[{ required: true, message: "Please select role!" }]}>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Select Role *' onChange={onSelectChange}>
                {roles.map((option: any) => (
                  <Option key={option._id} value={option._id}>
                    {option.roleName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <p className='drawer-pd'>Document List</p>
            <Form.List name='documents'>
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key} style={{ marginBottom: 16 }}>
                      <Row className='drawer-test'>
                        <Form.Item {...field} style={{ width: "100%" }} name={[field.name, "name"]}>
                          <Input className='auth-input' placeholder='Enter Document Name' />
                        </Form.Item>
                      </Row>
                      <Row style={{ height: 26 }} align='top'>
                        <Col span={3}>
                          <Form.Item {...field} name={[field.name, "required"]} valuePropName='checked' className='drawer-switch'>
                            <Switch checked />
                          </Form.Item>
                        </Col>
                        <Col span={14}>
                          <p className='drawer-required'>Required</p>
                        </Col>
                        <Col className='drawer-remove' onClick={() => remove(field.name)} span={7}>
                          -Remove
                        </Col>
                      </Row>
                      <Row style={{ marginTop: 10 }}>
                        <Form.Item {...field} name={[field.name, "fileUpload"]} valuePropName='checked'>
                          <Upload {...uploadprops}>
                            <Button type='dashed' className='drawer-attach' style={{ width: "445px" }}>
                              <img src={Attach} alt='att' />
                              &nbsp; Attach Sample/Document
                            </Button>
                          </Upload>
                        </Form.Item>
                      </Row>
                    </div>
                  ))}
                  <Form.Item>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button className='drawer-addmore' onClick={() => add()} block icon={<PlusOutlined />}>
                          Add More Documents
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button htmlType='submit' className='auth-button' type='primary'>
                          {props.editFlag ? "Update" : "Create"}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                </>
              )}
            </Form.List>
            {/* <Form.Item>
              <Button htmlType='submit' className='auth-button' type='primary'>
                {props.editFlag ? "Update" : "Create"}
              </Button>
            </Form.Item> */}
          </Form>
        </Row>
      </Drawer>
    </div>
  );
};

export default DocumentMasterDrawer;
