import * as React from "react";
import { useEffect, useState } from "react";
import "./utils.scss";
import { Tabs, Card, Skeleton, List, Form, Row, Col, Button, Radio, Upload, message, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { DownOutlined, RightOutlined, CheckCircleFilled, PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import DatePicker from "../../../utils/datepicker";
import dayjs from "dayjs";
import service from "../../../services/service";

/**
 * Upload Document in create flow
 */
const AddDocument = ({ Filename, required = false, input = false, docDetails, onChange, expiryStatusOn = false }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const [expiryOn, setExpiryOn] = useState(false);
  const [requiredstatus, setRequired] = useState(required);
  let location = useLocation();
  var localeData = require("dayjs/plugin/localeData");
  dayjs.extend(localeData);

  const props = {
    beforeUpload: (file) => {
      console.log(file);
      let formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", file.name);
      formData.append("documentType", docDetails.docType);
      formData.append("documentName", docDetails.fieldName);
      formData.append("employeeId", docDetails.employeeId);
      formData.append("fieldName", docDetails.fieldName.replace(/\s/g, "_"));

      service.postData(
        "/file-manager/upload",
        formData,
        function (response) {
          message.success(`${docDetails.fieldName} document uploaded successfully`);
          setRequired(false);
          onChange(response, file, docDetails);
        },
        function (error) {
          message.error(`${docDetails.fieldName} document upload failed.`);
          onChange(error, file, docDetails);
        }
      );
      return false;
    },
  };
  const normFile = (e: any) => {
    console.log("Upload event:", fileList);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const camelCase = (str) => {
    return str
      .replace(/\s(.)/g, function (a) {
        return a.toUpperCase();
      })
      .replace(/\s/g, "")
      .replace(/^(.)/, function (b) {
        return b.toLowerCase();
      });
  };
  const formItemlongLayout = {
    wrapperCol: { span: 10 },
  };
  const formItemFullLayout = {
    wrapperCol: { span: 24 },
  };
  return (
    <>
     
      {input && (
        <Form.Item name={["uniqueID", Filename]} {...formItemlongLayout}>
          <Row>
            <Col span={12}>
              <p className='inter-body2-medium'>Unique ID</p>
            </Col>

            <Col span={12}>
              <Input placeholder='Unique ID' />
            </Col>
          </Row>
        </Form.Item>
      )}
      <Form.Item getValueFromEvent={normFile} valuePropName='fileList' label={required ? "File (Required)" : "File (Optional)"} name={camelCase(Filename)} rules={[{ required: requiredstatus, message: "Please upload a doc" }]}>
        <div className='d-flex flex-column'>
          <p className='inter-body2-medium'>{Filename}</p>
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Upload name='logo' {...props} maxCount={1}>
                <Button icon={<UploadOutlined />} className='save-details' type='primary'>
                  Upload {Filename}
                </Button>
              </Upload>
            </Col>
          </Row>
        </div>
      </Form.Item>
      {expiryStatusOn && (
        <Form.List name={["expiryField", Filename]} {...formItemlongLayout}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((field, index1) => (
                <Form.Item {...formItemlongLayout} label={"Expiry Date"} required={false} key={field.key}>
                <Row key={index1} style={{ display: "flex", marginBottom: 8 }} align="middle" >
                  <Col span={19}>
                    <Form.Item
                      {...field}
                      style={{ display: "flex", marginBottom: 0}}>
        
                      <DatePicker placeholder='Expiry Date'  />
                    </Form.Item>
                  </Col>
                  <Col span={5} >
                    <MinusCircleOutlined onClick={() => remove(0)} style={{ color: "red", marginLeft: 40,marginBottom:5}} />
                </Col>
                </Row>
              </Form.Item>
              ))}
              <Form.Item>
                {fields.length < 1 && (
                   <Form.Item>
                  <Button type='link' className=' text-right drawer-pd mb-3 d-flex' onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Expiry Date
                  </Button>
                  </Form.Item>
                  
                )}
              </Form.Item>
            </>
          )}
        </Form.List>
      )}
    </>
  );
};

export default AddDocument;
