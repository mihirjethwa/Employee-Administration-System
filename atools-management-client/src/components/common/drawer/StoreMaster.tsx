import React, { useState, useRef } from "react";
import { Drawer, Button, Row, Col, Form, Input, Select, message } from "antd";
import { useEffect } from "react";
import StoreMasterImage from "../../../assets/common/drawer/StoreMaster.svg";
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
const cities = [
  "Aberdeenshire",
  "Angus",
  "Antrim",
  "Argyll",
  "Armagh",
  "Ayrshire",
  "Banffshire",
  "Berkshire",
  "Berwickshire",
  "Bristol",
  "Buckinghamshire",
  "Bute",
  "Caithness",
  "Cambridgeshire",
  "Cheshire",
  "City of London",
  "Clackmannanshire",
  "Clwyd",
  "Cornwall",
  "Cumbria",
  "Derbyshire",
  "Devon",
  "Dorset",
  "Down",
  "Dumfriesshire",
  "Dunbartonshire",
  "Durham",
  "Dyfed",
  "East Lothian",
  "East Riding of Yorkshire",
  "East Sussex",
  "Essex",
  "Fermanagh",
  "Fife",
  "Gloucestershire",
  "Greater London",
  "Greater Manchester",
  "Gwent",
  "Gwynedd",
  "Hampshire",
  "Herefordshire",
  "Hertfordshire",
  "Inverness-shire",
  "Isle of Wight",
  "Kent",
  "Kincardineshire",
  "Kinross-shire",
  "Kirkcudbrightshire",
  "Lanarkshire",
  "Lancashire",
  "Leicestershire",
  "Lincolnshire",
  "Londonderry",
  "Merseyside",
  "Mid Glamorgan",
  "Midlothian",
  "Moray",
  "Nairnshire",
  "Norfolk",
  "North Yorkshire",
  "Northamptonshire",
  "Northumberland",
  "Nottinghamshire",
  "Orkney",
  "Oxfordshire",
  "Peeblesshire",
  "Perthshire",
  "Powys",
  "Renfrewshire",
  "Ross and Cromarty",
  "Roxburghshire",
  "Rutland",
  "Selkirkshire",
  "Shetland",
  "Shropshire",
  "Somerset",
  "South Glamorgan",
  "South Yorkshire",
  "Staffordshire",
  "Stirlingshire",
  "Suffolk",
  "Surrey",
  "Sutherland",
  "Tyne and Wear",
  "Tyrone",
  "Warwickshire",
  "West Glamorgan",
  "West Lothian",
  "West Midlands",
  "West Sussex",
  "West Yorkshire",
  "Wigtownshire",
  "Wiltshire",
  "Worcestershire",
];
const StoreMasterDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({
        storeCode:props.data.storeCode,
        storeName: props.data.storeName,
        storeLocation: props.data.storeLocation,
        storeAddress: props.data.storeAddress,
        storeZip: props.data.storeZip,
        contactPerson: props.data.contactPerson,
        contactNumber: props.data.contactNumber,
        contactEmail: props.data.contactEmail,
      });
    } else {
      form.resetFields();
    }
  }, [props.editFlag, props.data]);

  const onClose = () => {
    setVisible(false);
    props.drawerClose();
  };
  const onChange = (value: any) => {
    form.setFieldsValue({ storeLocation: value });
  };
  const addSuccess = (response) => {
    console.log(response);
    props.callback(false, "OpsComplete");
    props.editFlag ? message.success("Store updated succesfully") : message.success("Store added succesfully");
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
      service.putData(`/master/storeMaster/${props.data._id}`, data, addSuccess, addError);
    } else {
      service.postData("/master/storeMaster", data, addSuccess, addError);
    }
  };

  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={513} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={StoreMasterImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Store Master</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form name='storeForm' form={form} ref={formRef} initialValues={{ remember: true }} onFinish={onFinish} style={{ width: "100%" }}>
            {/* <Form.Item name='storeId' rules={[{ required: true, message: "Please input Location Code!" }]}>
              <Input className='auth-input' placeholder='Store ID *' />
            </Form.Item> */}

            <Form.Item name='storeName' rules={[{ required: true, message: "Please input Store Name!" }]}>
              <Input className='auth-input' placeholder='Store Name *' />
            </Form.Item>

            <Form.Item name='storeLocation' rules={[{ required: true, message: "Please select State!" }]}>
              <Select className='drawer-select' size='large' bordered={false} placeholder='Store Location *' onChange={onChange}>
                {cities.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name='storeCode' rules={[{ required: true, message: "Please input Store Code!" }]}>
              <Input className='auth-input' placeholder='Store Code *' />
            </Form.Item>

            <Form.Item name='storeAddress' rules={[{ required: true, message: "Please input Store Address!" }]}>
              <Input className='auth-input' placeholder='Store Address *' />
            </Form.Item>

            <Form.Item name='storeZip' rules={[{ required: true, message: "Please input Store Zip Code!" }]}>
              <Input className='auth-input' placeholder='Store Zip Code *' />
            </Form.Item>

            <p className='drawer-pd'>Store Contact personal details</p>

            <Form.Item name='contactPerson'>
              <Input className='auth-input' placeholder='Name' />
            </Form.Item>

            <Form.Item name='contactNumber'>
              <Input className='auth-input' placeholder='Number' />
            </Form.Item>

            <Form.Item name='contactEmail'>
              <Input className='auth-input' placeholder='Email Address' />
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

export default StoreMasterDrawer;
