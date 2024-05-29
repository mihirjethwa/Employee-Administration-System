import React, { useState } from "react";
import dayjs from "dayjs";
import Calendar from "../../../utils/calender";
import DatePicker from "../../../utils/datepicker";
import { Drawer, Button, Row, Col, Form, Input, Select, Typography, Radio, message } from "antd";
import { useEffect, useRef } from "react";
import HolidayMasterImage from "../../../assets/common/drawer/HolidayMaster.svg";
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

var localeData = require("dayjs/plugin/localeData");
const { Option } = Select;

const HolidayMasterDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
  const [visible, setVisible] = useState(false);
  const [sdate, setsdate] = useState(dayjs());
  const [form] = Form.useForm();
  const formRef = useRef(null);
  useEffect(() => {
    setVisible(props.visible);
  }, [props.visible]);
  useEffect(() => {
    if (props.data) {
      form.setFieldsValue({ holidayDate: dayjs(props.data.holidayDate), holidayReason: props.data.holidayReason });
      setsdate(dayjs(props.data.holidayDate));
    } else {
      form.resetFields();
    }
  }, [props.editFlag, props.data]);
  const onClose = () => {
    setVisible(false);
    props.drawerClose();
  };

  dayjs.extend(localeData);
  const addSuccess = (response) => {
    console.log(response);
    props.callback(false, "OpsComplete");
    props.editFlag ? message.success("Holiday Log updated succesfully") : message.success("Holiday Log added succesfully");
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
      service.putData(`/master/holidayMaster/${props.data._id}`, data, addSuccess, addError);
    } else {
      service.postData("/master/holidayMaster", data, addSuccess, addError);
    }
  };

  const onPanelChange = (value: any, mode: any) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div>
      <Drawer placement='right' closable={false} onClose={onClose} visible={visible} width={513} drawerStyle={{ paddingTop: "80px", paddingLeft: 20 }}>
        <Row justify='space-between' align='middle'>
          <Col span={2}>
            <img src={HolidayMasterImage} alt='store' />
          </Col>
          <Col span={18}>
            <Row className='drawer-title'>Holiday Master</Row>
            <Row className='drawer-sub-title'>Sub-title text will be displayed here</Row>
          </Col>
          <Col span={1} style={{ float: "right" }}>
            <img src={Close} alt='close' onClick={() => onClose()} style={{ cursor: "pointer" }} />
          </Col>
        </Row>
        <Row style={{ paddingTop: 24 }}>
          <Form form={form} ref={formRef} name='holidayMaster' initialValues={{ remember: true }} onFinish={onFinish} style={{ width: "100%" }}>
            <p className='drawer-pd'>Pick a date from the calendar to mention holiday for the employees</p>

            <Form.Item name='holidayDate' rules={[{ required: true, message: "Please input Location Code!" }]}>
              <Calendar fullscreen={false} onPanelChange={onPanelChange} className='holiday-calender' />

              {/* <Calendar
                fullscreen={false}
                onPanelChange={onPanelChange}
                headerRender={({ value,type, onChange, onTypeChange }) => {
                  const start = 0;
                  const end = 12;
                  const monthOptions = [];
                  const current = value.clone();
                  // const localeData = value.localeData()
                  const months = [];
                  for (let i = 0; i < 12; i++) {
                    months.push(current.month(i));
                    // months.push(localeData.monthsShort(current));
                  }

                  for (let index = start; index < end; index++) {
                    monthOptions.push(
                      <Select.Option className='month-item' value={`${index}`} key={`${index}`}>
                        {months[index]}
                      </Select.Option>
                    );
                  }
                  const month = value.month();

                  const year = value.year();
                  const options = [];
                  for (let i = year - 10; i < year + 10; i += 1) {
                    options.push(
                      <Select.Option key={i} value={i} className='year-item'>
                        {i}
                      </Select.Option>
                    );
                  }
                  return (
                    <div style={{ padding: 8 }}>
                      <Row gutter={8}>
                        <Col>
                          <Radio.Group size='small' onChange={(e) => onTypeChange(e.target.value)} value={type}>
                            <Radio.Button value='month'>Month</Radio.Button>
                            <Radio.Button value='year'>Year</Radio.Button>
                          </Radio.Group>
                        </Col>
                        <Col>
                          <Select
                            size='small'
                            dropdownMatchSelectWidth={false}
                            className='my-year-select'
                            onChange={(newYear) => {
                              const now = value.clone().year(parseInt(newYear));
                              onChange(now);
                            }}
                            value={String(year)}
                          >
                            {options}
                          </Select>
                        </Col>
                        <Col>
                          <Select
                            size='small'
                            dropdownMatchSelectWidth={false}
                            value={String(month)}
                            onChange={(selectedMonth) => {
                              const newValue = value.clone();
                              newValue.month(parseInt(selectedMonth, 10));
                              onChange(newValue);
                            }}
                          >
                            {monthOptions}
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  );
                }}
              /> */}
            </Form.Item>

            <Form.Item name='holidayDate'>
              <DatePicker className='auth-input' disabled />
            </Form.Item>

            <Form.Item name='holidayReason' rules={[{ required: true, message: "Please input reason for holiday!" }]}>
              <Input className='auth-input' placeholder='Holiday Reason' />
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

export default HolidayMasterDrawer;
