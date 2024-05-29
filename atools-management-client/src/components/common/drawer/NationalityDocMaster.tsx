import React, { useState, useRef } from "react";
import { Drawer, Button, Row, Col, Form, Input, Select, Checkbox, message,Space,Switch} from "antd";
import { useEffect } from "react";
import NationalityDocImage from "../../../assets/common/drawer/NationalityDoc.svg";
import Close from "../../../assets/common/drawer/Close.svg";
import service from "../../../services/service";
import { MinusOutlined,PlusOutlined } from "@ant-design/icons";
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

const NationalityDocDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  const [roles, SetRolesData] = useState([]);
  const [addNationality,setaddNationality]=useState(false);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({...props.data });
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
    props.editFlag ? message.success("Access Manager updated succesfully") : message.success("Access Manager created succesfully");
  };
  const addError = (error) => {
    console.log(error);
    message.error(error.message)
  };
  const onFinish = (values: any) => {
    var data = {
      ...values,
    };
    console.log(values);
    
    if (props.editFlag && props.data) {
      service.putData(`/master/nationalityMaster/${props.data._id}`, data, addSuccess, addError);
    } else {
      service.postData("/master/nationalityMaster", data, addSuccess, addError);
    }
  };

  const nationality =[{label:"EU citizens",value:"1"},{label:"British",value:"2"},{label:"Others",value:"3"}]
  const DocGroup =["Passport","Nationality Documents","Residential Permit","Create New Group"]
  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={613} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={NationalityDocImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Nationality Documents</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1} style={{ float: "right" }}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form form={form} ref={formRef} name='accessMaster'  initialValues={{ remember: true }} onFinish={onFinish} style={{ width: "100%" }}>
              <p className="inter-subtitle2-medium drawer-pd">Create your document group based on the employee citizenship status</p>
            <Form.Item name='nationalityName' className="mb-2" rules={[{ required: true, message: "Please select Nationality!" }]}>
              {/* <Select className='drawer-select' size='large' bordered={false} placeholder='Select Nationality *' onChange={onSelectChange}>
                {nationality.map((option: any) => (
                  <Option key={option.label} value={option.label}>
                    {option.label}
                  </Option>
                ))}
              </Select> */}
               <Input className='auth-input' placeholder='Add Nationality' />
            </Form.Item>
            {/* <Button type="link" className=" text-right drawer-pd mb-3 d-flex" icon={!addNationality ? <PlusOutlined /> : <MinusOutlined />} onClick={() => (setaddNationality(!addNationality))}>Create New Nationality Option</Button>
   {addNationality && <Form.Item name='newNationality' rules={[{ required: false, message: "Please input Store Name!" }]}>
              <Input className='auth-input' placeholder='Add Nationality' />
            </Form.Item> } */}
            <p  className=" drawer-pd mb-1 mt-1">Sub-Location (if any)</p>
            <p className="inter-body2-regular  drawer-pd mb-1">Enter comma separated values viz. state/city</p>
            
            <Form.Item name='subLocation' rules={[{ required: false, message: "Please select State!" }]}>
            <Select mode="tags" className='drawer-select location-tag' open={false} size='large' bordered={false} placeholder='Select Sub-locations' style={{ width: '100%' }} onKeyDown={(e)=> e.keyCode == 13 ? e.preventDefault(): ''}>
  </Select>
  </Form.Item>
  <Form.List name="documentGroups">
        {(fields, { add, remove }) => (
          <React.Fragment>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
               <div>
                 <Row>
                  <Col  className=" drawer-pd mb-1 mt-1" span={12}>Document Group</Col>
                  <Col className='drawer-remove' onClick={() => remove(name)} span={12}>
                    -Remove
                  </Col>
                </Row>

          <Form.Item name={[name, 'label']} rules={[{ required: false, message: "Please select State!" }]}>
          <Input placeholder="Enter Document Name" className='auth-input' />
            {/* <Select className='drawer-select' size='large' bordered={false} placeholder='Docment Type (Passport, National Id, Residency Permit,etc)' style={{ width: '100%' }} >
            {DocGroup.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
         </Select> */}
         </Form.Item>
            <Form.List  name={[name,"DocGroup"]}>
                  {(fields, { add, remove }) => (
               <React.Fragment>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <>
               <Row key={key} >
               <Col span={24}>
                <Form.Item
                  {...restField}
                  name={[name,'label']}
                  fieldKey={[fieldKey, 'DocumentName']}
                  rules={[{ required: false, message: 'Missing first name' }]}
                >
                  <Input placeholder="Enter Document Group Name" className='auth-input' />
                </Form.Item>
                </Col>
                {/* <Col span={4} className="align-self-center  d-flex justify-content-center text-center">
                <p className="inter-subtitle2-medium drawer-pd">OR</p>
                </Col> */}
                {/* <Col span={10}>
                <Form.Item
                  {...restField}
                  name={[name, 'last']}
                  fieldKey={[fieldKey, 'last']}
                  rules={[{ required: false, message: 'Missing last name' }]}
                >
                  <Input placeholder="Enter Document Name" className='auth-input' />
                </Form.Item>
               </Col> */}
               </Row>
             
                  <Row>
               <Col span={2}>
                 <Form.Item {...restField} name={[name, "required"]} valuePropName='checked' className='drawer-switch'>
                   <Switch checked />
                 </Form.Item>
               </Col>
               <Col span={5}>
                 <p className='drawer-required'>Required</p>
               </Col>
               <Col span={3}></Col>
               <Col span={2}>
                 <Form.Item {...restField} name={[name, "input"]} valuePropName='checked' className='drawer-switch'>
                   <Switch checked />
                 </Form.Item>
               </Col>
               <Col span={7}>
                 <p className='drawer-required'>Require ID</p>
               </Col>
               <Col className='drawer-remove' onClick={() => remove(name)} span={5}>
                 -Remove
               </Col>
               </Row>
                 </>
             ))}
 <Form.Item>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button  type="link" className=" text-right drawer-pd mb-3 d-flex"  onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Documents
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item> 
                
                </React.Fragment>
               )}

          </Form.List>
          </div>
          ))}
           <Form.Item>
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <Button className='drawer-addmore' onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Doc Group
                        </Button>
                      </Col>
                      <Col span={12}>
                        <Button   htmlType='submit' className='auth-button' type='primary'>
                          {props.editFlag ? "Update" : "Create"}
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                  </React.Fragment>
        )}
      </Form.List>
          </Form>
        </Row>
      </Drawer>
    </div>
  );
};

export default NationalityDocDrawer;
