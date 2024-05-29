import { Button, Checkbox, Col, Form, Input, Row, Alert } from "antd";
import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import LoginImage from "../../assets/authentication/Login.svg";
import AuthFooter from "../common/footer/AuthFooter";
import "./Authentication.css";
import { login } from "../../redux/actions/AuthActions";
import { useDispatch, useSelector } from "react-redux";
import Layout from "antd/lib/layout/layout";

const Login = () => {
  const userData = useSelector((state: any) => state.auth);

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [Error, setIsError] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  const makeData = (values: any) => {
    return {
      email: values.email,
      password: values.password,
    };
  };

  const isSuccess = (response: any) => {
    console.log(response);
    setLoggedIn(true);
  };
  const isError = (error: any) => {
    console.log(error);
    setIsError(true);
    setErrorMessage(error.data.status.message);
  };
  const onFinish = (values: any) => {
    const data = makeData(values);
    // dispatch(getAccessRoutes);
    dispatch(login(data, isSuccess, isError));
  };

  return userData.isAuthenticated ? (
    <Redirect to='/services/employee-manager' />
  ) : (
    <Layout style={{ height: "100vh" }}>
      <Row className='bg-white h-100'>
        <Col span={24}>
          <Row className='h-100'>
            <Col span={8}>
              <Row align='middle' className='h-100'>
                <Col span={3}></Col>
                <Col span={18}>
                  <Row justify='center' className='h-100'>
                    <Col>
                      <p className='auth-heading-text mb-0'>Welcome to ATools</p>
                      <p className='auth-heading-subtext'>An employee authentication system</p>
                    </Col>
                  </Row>
                  <Form name='login' initialValues={{ remember: true }} onFinish={onFinish}>
                    <Form.Item name='email' rules={[{ required: true, message: "Please input your username!" }]}>
                      <Input className='auth-input' placeholder='Email Address *' />
                    </Form.Item>

                    <Form.Item name='password' rules={[{ required: true, message: "Please input your password!" }]}>
                      <Input.Password className='auth-input' placeholder='Password *' />
                    </Form.Item>

                    <Form.Item>
                      <Button htmlType='submit' className='auth-button' type='primary'>
                        Login
                      </Button>
                    </Form.Item>
                  </Form>

                  {Error && <Alert message={ErrorMessage} showIcon type='error' className='mb-3' />}
                  <Row align='middle' justify='space-between' style={{ marginTop: -10 }}>
                    <Col>{/* <Checkbox className='auth-remember-pass'>Remember Password</Checkbox> */}</Col>
                    <Col>
                      <Link to='./forgot-password'>
                        <p className='auth-forgot-password mb-0'>Forgot Password?</p>
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
                  <img src={LoginImage} alt='login' style={{ width: "60%", marginLeft: "4%" }} />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};

export default Login;
