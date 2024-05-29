import React, { useState, useEffect, useRef } from "react";
import { Drawer, Button, Row, Col, Form, Input, Select, message } from "antd";
import RoleMasterImage from "../../../assets/common/drawer/RoleMaster.svg";
import Close from "../../../assets/common/drawer/Close.svg";
import "./drawer.scss";
import service from "../../../services/service";

interface DrawerProps {
  visible: boolean;
  data?: any;
  editFlag?: boolean;
  callback: any;
  drawerClose: () => void;
}

const { Option } = Select;

const RoleMasterDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({ roleName: props.data.roleName });
    } else {
      form.resetFields();
    }
  }, [props.editFlag, props.data]);

  const onClose = () => {
    setVisible(false);
    props.drawerClose();
  };

  const addSuccess = (response) => {
    console.log(response);
    props.callback(false, "OpsComplete");
    props.editFlag ? message.success("Role updated succesfully") : message.success("Role added succesfully");
  };
  const addError = (error) => {
    console.log(error);
    message.error(error.message)
  };
  const onFinish = (values: any) => {
    var data = {
      ...values,
    };
    if (props.editFlag && props.data) {
      service.putData(`/master/roleMaster/${props.data._id}`, data, addSuccess, addError);
    } else {
      service.postData("/master/roleMaster", data, addSuccess, addError);
    }
  };

  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={513} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={RoleMasterImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Role Master</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1} style={{ float: "right" }}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form name='roleMaster' form={form} ref={formRef} initialValues={{ remember: true }} onFinish={onFinish} style={{ width: "100%" }}>
            <Form.Item name='roleName' rules={[{ required: true, message: "Please input Role Name!" }]}>
              <Input className='auth-input' placeholder='Enter Role Name *' />
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

export default RoleMasterDrawer;
