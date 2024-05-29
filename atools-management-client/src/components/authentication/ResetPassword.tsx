import { Button, Checkbox, Col, Form, Input, Row, Alert } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ResetPasswordImage from "../../assets/authentication/ResetPassword.svg";
import AuthFooter from "../common/footer/AuthFooter";
import { PasswordInput } from "antd-password-input-strength";
import Layout from "antd/lib/layout/layout";
import { useHistory, useLocation } from "react-router-dom";
import service from "../../services/service";
import "./Authentication.css";
const queryString = require("query-string");
const ResetPassword = () => {
  const [Success, setSuccess] = useState(false);
  const [Error, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");
  const history = useHistory();
  const parsed = queryString.parse(history.location.search);

  const makeData = (values: any) => {
    return {
      email: parsed.e,
      passCode: parsed.t,
      password: values.password1,
      confirmPassword: values.password2,
    };
  };

  const isSuccess = (response: any) => {
    console.log(response);
    setSuccess(true);
    setSuccessMessage(response.data.data);
  };
  const isError = (error: any) => {
    console.log(error.message);
    setErrorMessage(error.message);
    setIsError(true);
  };
  const onFinish = (values: any) => {
    console.log(values.email);

    const data = makeData(values);
    service.postData("/auth/resetPassword", data, isSuccess, isError);
  };

  return (
    <Layout>
      <Row className='bg-white h-100'>
        <Col span={24}>
          <Row className='h-100'>
            <Col span={8}>
              <Row align='middle' className='h-100'>
                <Col span={3}></Col>
                <Col span={18}>
                  <Row justify='center' className='h-100'>
                    <Col>
                      <p className='auth-heading-text mb-0'>Reset Password</p>
                      <p className='auth-heading-subtext'>Sub-title text goes here</p>
                    </Col>
                  </Row>
                  <Form name='login' initialValues={{ remember: true }} onFinish={onFinish}>
                    <Form.Item name='password1' rules={[{ required: true, message: "Please input new password!" }]} hasFeedback>
                      <PasswordInput inputProps={{ placeholder: "New Password *", style: { height: 56, borderRadius: 5, border: "1px solid #e4e4e4" } }} />
                    </Form.Item>

                    <Form.Item
                      name='password2'
                      dependencies={["password1"]}
                      hasFeedback
                      rules={[
                        { required: true, message: "Please confirm new password!" },
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (!value || getFieldValue("password1") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject("The two passwords that you entered do not match!");
                          },
                        }),
                      ]}
                    >
                      <PasswordInput inputProps={{ placeholder: "Confirm New Password *", style: { height: 56, borderRadius: 5, border: "1px solid #e4e4e4" } }} />
                    </Form.Item>

                    <Form.Item>
                      <Button htmlType='submit' className='auth-button' type='primary'>
                        Proceed
                      </Button>
                    </Form.Item>
                  </Form>
                  {Error && <Alert message={ErrorMessage} showIcon type='error' className='mb-3' />}
                  {Success && <Alert message={SuccessMessage} showIcon type='success' className='mb-3' />}
                  <Row align='middle' justify='center' style={{ marginTop: -10 }}>
                    <Col>
                      <Link to='./login'>
                        <p className='auth-back-to-login'>Back to Login</p>
                      </Link>
                    </Col>
                  </Row>
                </Col>
                <Col span={3}></Col>
              </Row>
              <AuthFooter />
            </Col>
            <Col span={16}>
              <Row style={{ width: "100%", height: "100%", backgroundColor: "#023047", position: "fixed" }} align='middle'>
                <Col span={24}>
                  <img src={ResetPasswordImage} alt='login' style={{ width: "60%", marginLeft: "15%", marginTop: "5%" }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default ResetPassword;
