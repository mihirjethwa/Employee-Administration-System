import { DownloadOutlined, MinusCircleOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, message, Radio, Row, Upload } from "antd";
import * as React from "react";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import service from "../../../services/service";
import DatePicker from "../../../utils/datepicker";
import "./utils.scss";
const { TextArea } = Input;

/**
 * Upload/Download Document in Edit/View flow
*/
const ViewDocument = ({ Filename, required = false, docDetails, onChange, input = false, expiryStatusOn = false, addNew = false }) => {
  const [form] = Form.useForm();
  const [expiryOn, setExpiryOn] = useState(false);
  const [DocVer, setDocVer] = useState(true);
  useEffect(() => {
    //      if(docDetails.expiryDate.toString() == [null].toString()) docDetails.expiryDate = new Date().toISOString()

    if (docDetails.reason) {
      setDocVer(false);
    }
  }, []);

  let location = useLocation();
  // var localeData = require("dayjs/plugin/localeData");
  // dayjs.extend(localeData);
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

  const download = () => {
    service.downloadFile("/file-manager/download?s3Path=" + docDetails.s3Path, docDetails.fileName,function () {});
  };
  const formItemlongLayout = {
    wrapperCol: { span: 10 },
  };
  const formItemFullLayout = {
    wrapperCol: { span: 24 },
  };

  return (
    <>
      <div className='view-doc'>
        {input && (
          <Form.Item name={["uniqueID", Filename]} {...formItemFullLayout}>
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
        <Form.Item name={camelCase(Filename)} label={required === true ? "File (Required)" : "File (Optional)"} valuePropName='fileList' extra={Filename} className='fileUpload' >
          <Row>
            <Col span={11}>
              <Button icon={<DownloadOutlined />} className='save-details ' type='primary' onClick={() => download()}>
                Download
              </Button>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <Upload name='logo' {...props} className="w-100">
                <Button icon={<UploadOutlined />} className='save-details ' type='primary'>
                  Update
                </Button>
              </Upload>
            </Col>
          </Row>
        </Form.Item>

        {expiryStatusOn && (
          <Form.List name={["expiryField", Filename]}>
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
                {fields.length < 1 && (
                  <Form.Item>
                    <Button type='link' className=' text-right drawer-pd mb-3 d-flex' onClick={() => add()} block icon={<PlusOutlined />}>
                      Add Expiry Date
                    </Button>
                  </Form.Item>
                )}
              </>
            )}
          </Form.List>
        )}
        {addNew === false && (
          <>
            <Form.Item label='Document Verified?' name={["docVer", Filename]} className='Three-options-side'>
              <Radio.Group onChange={(event) => setDocVer(event.target.value)} defaultValue={docDetails.reason ? false : true}>
                <Radio.Button className='gender-buttons' value={true}>
                  Yes
                </Radio.Button>
                <Radio.Button className='gender-buttons' value={false}>
                  No
                </Radio.Button>
              </Radio.Group>
            </Form.Item>
            {DocVer === false && (
              <Form.Item label='Reason' name={["reason", Filename]} className='Two-options-side'>
                <TextArea placeholder='Please mention the reason' />
              </Form.Item>
            )}

            <Form.Item label='Verified By' name='verifiedBy'>
              <Input placeholder='Verified By' disabled />
            </Form.Item>
            <Form.Item label='Verified Date' name='verifiedDate' className='mb-0'>
              <DatePicker placeholder='verified date' disabled />
            </Form.Item>
          </>
        )}
      </div>
    </>
  );
};

export default ViewDocument;
