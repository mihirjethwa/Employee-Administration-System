import { Button, Checkbox, Col, Form, Input, Row, Alert } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ForgotPasswordImage from "../../assets/authentication/ForgotPassword.svg";
import AuthFooter from "../common/footer/AuthFooter";
import "./Authentication.css";
import Layout from "antd/lib/layout/layout";
import service from "../../services/service";

const ForgotPassword = () => {
  const [Success, setSuccess] = useState(false);
  const [Error, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const [SuccessMessage, setSuccessMessage] = useState("");

  const makeData = (values: any) => {
    return {
      email: values.email,
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
    service.postData("/auth/forgotPassword", data, isSuccess, isError);
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
                      <p className='auth-heading-text mb-0'>Forgot Password?</p>
                      <p className='auth-heading-subtext'>Sub-title text goes here</p>
                    </Col>
                  </Row>
                  <Form name='login' initialValues={{ remember: true }} onFinish={onFinish}>
                    <Form.Item
                      name='email'
                      rules={[
                        {
                          type: "email",
                          message: "The input is not valid E-mail!",
                        },
                        {
                          required: true,
                          message: "Please input your E-mail!",
                        },
                      ]}
                    >
                      <Input className='auth-input' placeholder='Email Address *' />
                    </Form.Item>

                    <Form.Item>
                      <Button htmlType='submit' className='auth-button' type='primary'>
                        Send Reset Link
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
                  <img src={ForgotPasswordImage} alt='login' style={{ width: "60%", marginLeft: "4%" }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default ForgotPassword;
