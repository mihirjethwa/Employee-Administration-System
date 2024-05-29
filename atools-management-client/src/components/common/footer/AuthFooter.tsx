import { Col, Row } from "antd";
import React from "react";

const AuthFooter = () => {
  return (
    <div style={{ position: "fixed", bottom: 0, width: "34%" }}>
      <Row>
        <Col span={3}></Col>
        <Col span={18} className='auth-copyright'>
          <p className='mb-0'>©2022-2023 All Rights Reserved.</p>
          <p>Atools® is just a personal project demo. Cookie Policy, Privacy and Terms.</p>
        </Col>
        <Col span={3}></Col>
      </Row>
    </div>
  );
};

export default AuthFooter;
