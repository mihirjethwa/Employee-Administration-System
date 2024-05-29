import React, { useState, useRef } from "react";
import { Drawer, Button, Row, Col, Form, Input, Select, message } from "antd";
import { useEffect } from "react";
import LocationMasterImage from "../../../assets/common/drawer/Location.svg";
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
const countries = {
  England: [
    "Avon",
    "Bedfordshire",
    "Berkshire",
    "Buckinghamshire",
    "Cambridgeshire",
    "Cheshire",
    "Cleveland",
    "Cornwall",
    "Cumbria",
    "Derbyshire",
    "Devon",
    "Dorset",
    "Durham",
    "East-Sussex",
    "Essex",
    "Gloucestershire",
    "Hampshire",
    "Herefordshire",
    "Hertfordshire",
    "Isle-of-Wight",
    "Kent",
    "Lancashire",
    "Leicestershire",
    "Lincolnshire",
    "London",
    "Merseyside",
    "Middlesex",
    "Norfolk",
    "Northamptonshire",
    "Northumberland",
    "North-Humberside",
    "North-Yorkshire",
    "Nottinghamshire",
    "Oxfordshire",
    "Rutland",
    "Shropshire",
    "Somerset",
    "South-Humberside",
    "South-Yorkshire",
    "Staffordshire",
    "Suffolk",
    "Surrey",
    "Tyne-and-Wear",
    "Warwickshire",
    "West-Midlands",
    "West-Sussex",
    "West-Yorkshire",
    "Wiltshire",
    "Worcestershire",
  ],

  Wales: ["Clwyd", "Dyfed", "Gwent", "Gwynedd", "Mid-Glamorgan", "Powys", "South-Glamorgan", "West-Glamorgan"],

  Scotland: [
    "Aberdeenshire",
    "Angus",
    "Argyll",
    "Ayrshire",
    "Banffshire",
    "Berwickshire",
    "Bute",
    "Caithness",
    "Clackmannanshire",
    "Dumfriesshire",
    "Dunbartonshire",
    "East-Lothian",
    "Fife",
    "Inverness-shire",
    "Kincardineshire",
    "Kinross-shire",
    "Kirkcudbrightshire",
    "Lanarkshire",
    "Midlothian",
    "Moray",
    "Nairnshire",
    "Orkney",
    "Peeblesshire",
    "Perthshire",
    "Renfrewshire",
    "Ross-shire",
    "Roxburghshire",
    "Selkirkshire",
    "Shetland",
    "Stirlingshire",
    "Sutherland",
    "West Lothian",
    "Wigtownshire",
  ],

  NorthernIreland: ["Antrim", "Armagh", "Down", "Fermanagh", "Londonderry", "Tyrone"],
};
const LocationMasterDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  const [myState, setMyState] = useState([]);
  const [myCities, setMyCities] = useState<string[]>([]);
  const [form] = Form.useForm();
  const formRef = useRef(null);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({ state: props.data.state, city: props.data.city, locationCode: props.data.locationCode });
    } else {
      form.resetFields();
    }
  }, [props.editFlag, props.data]);

  var stateArr: string[] = [];
  stateArr = Object.keys(countries);
  var filteredByKey: string[] = [];
  // const getLocationDatabyID = () => {
  //   service.getData('/master/locationMaster',isSuccess,isError)
  // }
  const onClose = () => {
    setVisible(false);
    props.drawerClose();
  };

  const onChange = (value: any) => {
    form.setFieldsValue({ state: value });
    setMyState(value);
    const filtered = Object.fromEntries(Object.entries(countries).filter(([key]) => key === value));
    filteredByKey = filtered[value];
    //console.log(filteredByKey);
    setMyCities(filteredByKey);
    form.setFieldsValue({ city: null });
  };

  const onChange2 = (value: any) => {
    form.setFieldsValue({ city: value });
  };
  const addSuccess = (response) => {
    console.log(response);
    props.callback(false, "OpsComplete");
    props.editFlag ? message.success("Location updated succesfully") : message.success("Location added succesfully");
  };
  const addError = (error) => {
    console.log(error);
    message.error(error.message)
  };
  const onFinish = (values: any) => {
    var data = {
      ...values,
      location: values.state,
    };
    if (props.editFlag && props.data) {
      service.putData(`/master/locationMaster/${props.data._id}`, data, addSuccess, addError);
    } else {
      service.postData("/master/locationMaster", data, addSuccess, addError);
    }
  };

  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} destroyOnClose={true} visible={visible} width={513} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={LocationMasterImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Location Master</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1} style={{ float: "right" }}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form form={form} ref={formRef} name='locationMaster' initialValues={{ remember: true }} onFinish={onFinish} style={{ width: "100%" }}>
            <Form.Item name='locationCode' rules={[{ required: true, message: "Please input Location Code!" }]}>
              <Input className='auth-input' placeholder='Location Code *' />
            </Form.Item>

            <Form.Item name='state' rules={[{ required: true, message: "Please select State!" }]}>
              <Select className='drawer-select' size='large' bordered={false} optionFilterProp='children' onChange={onChange} placeholder='State *'>
                {stateArr.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name='city' rules={[{ required: true, message: "Please select City!" }]}>
              <Select className='drawer-select' size='large' bordered={false} optionFilterProp='children' onChange={onChange2} placeholder='City *'>
                {myCities.map((option: any) => (
                  <Option key={option} value={option}>
                    {option}
                  </Option>
                ))}
              </Select>
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

export default LocationMasterDrawer;
