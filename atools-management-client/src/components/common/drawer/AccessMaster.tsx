import React, { useState, useRef } from "react";
import { Drawer, Button, Row, Col, Form, Input, Select, Checkbox, message } from "antd";
import { useEffect } from "react";
import AccessMasterImage from "../../../assets/common/drawer/AccessMaster.svg";
import Close from "../../../assets/common/drawer/Close.svg";
import service from "../../../services/service";
import "./drawer.scss";

interface DrawerProps {
  visible: boolean;
  data?: any;
  editFlag?: boolean;
  callback: any;
  drawerClose: () => void;
}

const { Option } = Select;
const plainOptions = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Module 6"];

const AccessMasterDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
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
      console.log(props.data.role);
      
      form.setFieldsValue({ role: props.data.role._id, modulesAccess: makedata1(props.data.modulesAccess) });
    } else {
      form.resetFields();
    }
  }, [props.editFlag, props.data]);
  const onCheckboxChange = (values) => {
    form.setFieldsValue({ modulesAccess: values });
  };
  const getRoleData = () => {
    service.getData("/master/roleMaster", roleSuccess, roleError);
  };
 const makedata1 = (data) =>{
  var obj = new Array();
  if(data){
    console.log(data);
    
    data.map(k => {if(k.access === true){obj.push(k.name)}} )
   }
   return obj
 }
  const roleSuccess = (response: any) => {
    console.log(response);
    var array = [];
    response.data.data.map((m) => array.push({_id:m._id,roleName:m.roleName}));
    SetRolesData(array);
  };
  const roleError = (error: any) => {
    console.log(error.message);
  };
  const onChange = () => {};
  const onSelectChange = (values) => {
    // form.setFieldsValue({ roleName: values });
  };
  const onClose = () => {
    setVisible(false);
    props.drawerClose();
  };

  const addSuccess = (response) => {
    console.log(response);
    props.callback(false, "OpsComplete");
    props.editFlag ? message.success("Access Manager updated succesfully") : message.success("Access Manager created succesfully");
  };
  const addError = (error) => {
    console.log(error);
    message.error(error.message)
  };
  const modules = ["View_Employee_Manager","Edit_Employee_Manager","View_Master_Manager","Edit_Master_Manager"]

  const makedata = (data) =>{
var obj = new Array();
 function module(name:string,access:boolean){
   this.name = name;
   this.access = access
 }
modules.map(m => {
  obj.push(new module(m,data.includes(m)));
      })

      
return  obj;
  }
  const onFinish = (values: any) => {
    var data = {
      ...values,
      modulesAccess:makedata(values.modulesAccess)
    };
console.log(data);

    if (props.editFlag && props.data) {
      service.putData(`/master/accessMaster/${props.data._id}`, data, addSuccess, addError);
    } else {
      service.postData("/master/accessMaster", data, addSuccess, addError);
    }
  };

  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={560} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={AccessMasterImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Access Manager Master</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1} style={{ float: "right" }}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form form={form} ref={formRef} name='accessMaster' initialValues={{ remember: true }} onFinish={onFinish} style={{ width: "100%" }}>
            <Form.Item name='role' rules={[{ required: true, message: "Please select role!" }]}>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Role *' >
                {roles.map((option: any) => (
                  <Option key={option._id} value={option._id}>
                    {option.roleName}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <p className='drawer-pd'>Select all that applies</p>
            <Form.Item name='modulesAccess'>
              <Checkbox.Group style={{ width: "100%" }} className='drawer-checkbox' onChange={onCheckboxChange}>
                <Row>
                  <Col span={12}>
                    <Checkbox value='View_Employee_Manager'>View Employee Manager</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='Edit_Employee_Manager'>Add/Edit Employee Manager</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='View_Master_Manager'>View Master Manager</Checkbox>
                  </Col>
                  <Col span={12}>
                    <Checkbox value='Edit_Master_Manager'>Add/Edit Master Manager</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item>
              <Button htmlType='submit' className='auth-button' type='primary'>
                {props.editFlag ? "Update" : "Create"}
              </Button>
            </Form.Item>
          </Form>
        </Row>
      </Drawer>
    </div>
  );
};

export default AccessMasterDrawer;
